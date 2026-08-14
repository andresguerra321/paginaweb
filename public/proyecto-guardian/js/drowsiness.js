/**
 * GUARDIAN Lite — Drowsiness Detection Engine
 * ============================================
 * Uses MediaPipe Face Mesh landmarks to compute:
 *   - EAR  (Eye Aspect Ratio)  → eyes closing
 *   - MAR  (Mouth Aspect Ratio) → yawning
 *   - Head Pitch               → nodding off
 *   - Head Yaw                 → looking away (distraction)
 *
 * All detection runs in-browser, no server needed.
 */

const DrowsinessEngine = (() => {
    // ═══════════════════════════════════════
    // Landmark Indices (MediaPipe 468 mesh)
    // ═══════════════════════════════════════

    // Left eye (6 points for EAR)
    const LEFT_EYE = {
        p1: 33,   // left corner
        p2: 160,  // upper-left
        p3: 158,  // upper-right
        p4: 133,  // right corner
        p5: 153,  // lower-right
        p6: 144,  // lower-left
    };

    // Right eye (6 points for EAR)
    const RIGHT_EYE = {
        p1: 362,  // left corner
        p2: 385,  // upper-left
        p3: 387,  // upper-right
        p4: 263,  // right corner
        p5: 373,  // lower-right
        p6: 380,  // lower-left
    };

    // Mouth (for yawn detection)
    const MOUTH = {
        top: 13,     // upper lip top
        bottom: 14,  // lower lip bottom
        left: 78,    // left corner
        right: 308,  // right corner
        upperInner: 82,  // upper inner lip
        lowerInner: 87,  // lower inner lip
    };

    // Head pose reference points
    const HEAD_POSE = {
        nose: 1,       // nose tip
        forehead: 10,  // top of face
        chin: 152,     // bottom of face
        leftEar: 234,  // left side
        rightEar: 454, // right side
    };

    // ═══════════════════════════════════════
    // Thresholds & Config (Tuned for easy demoing)
    // ═══════════════════════════════════════
    const EAR_THRESHOLD = 0.25;          // Below this = eyes closing (was 0.21)
    const EAR_CONSEC_FRAMES = 5;         // Triggers faster
    const YAWN_THRESHOLD = 0.45;         // Above this = yawning (was 0.55)
    const YAWN_CONSEC_FRAMES = 5;        
    const HEAD_PITCH_THRESHOLD = 12;     // Degrees — nodding off (was 20)
    const HEAD_PITCH_CONSEC_FRAMES = 5;  
    const HEAD_YAW_THRESHOLD = 1.3;      // Ratio threshold — looking away (was 2.0)
    const HEAD_YAW_CONSEC_FRAMES = 8;    // ~1 second

    // ═══════════════════════════════════════
    // State
    // ═══════════════════════════════════════
    let eyeClosedFrames = 0;
    let yawnFrames = 0;
    let headDropFrames = 0;
    let headYawFrames = 0;
    let drowsinessLevel = 'alert'; // 'alert' | 'warning' | 'danger'
    let lastDrowsinessEvent = 0;
    const DROWSINESS_COOLDOWN = 5000; // 5 seconds between events

    // ═══════════════════════════════════════
    // Math Helpers
    // ═══════════════════════════════════════
    function distance(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Compute Eye Aspect Ratio (EAR) from 6 landmarks.
     * EAR = (|p2-p6| + |p3-p5|) / (2 * |p1-p4|)
     * Higher = more open, Lower = more closed
     */
    function computeEAR(landmarks, eyePoints) {
        const p1 = landmarks[eyePoints.p1];
        const p2 = landmarks[eyePoints.p2];
        const p3 = landmarks[eyePoints.p3];
        const p4 = landmarks[eyePoints.p4];
        const p5 = landmarks[eyePoints.p5];
        const p6 = landmarks[eyePoints.p6];

        const vertical1 = distance(p2, p6);
        const vertical2 = distance(p3, p5);
        const horizontal = distance(p1, p4);

        if (horizontal === 0) return 0.3; // Fallback
        return (vertical1 + vertical2) / (2.0 * horizontal);
    }

    /**
     * Compute Mouth Aspect Ratio (MAR) for yawn detection.
     * MAR = vertical_opening / horizontal_width
     */
    function computeMAR(landmarks) {
        const top = landmarks[MOUTH.upperInner];
        const bottom = landmarks[MOUTH.lowerInner];
        const left = landmarks[MOUTH.left];
        const right = landmarks[MOUTH.right];

        const vertical = distance(top, bottom);
        const horizontal = distance(left, right);

        if (horizontal === 0) return 0;
        return vertical / horizontal;
    }

    /**
     * Estimate head pitch angle (simplified).
     * Uses nose-to-forehead vs nose-to-chin vertical ratio.
     */
    function computeHeadPitch(landmarks) {
        const nose = landmarks[HEAD_POSE.nose];
        const forehead = landmarks[HEAD_POSE.forehead];
        const chin = landmarks[HEAD_POSE.chin];

        // Vertical distances
        const noseToForehead = forehead.y - nose.y; // Negative when face forward
        const noseToChin = chin.y - nose.y;         // Positive when face forward

        if (noseToChin === 0) return 0;

        // Ratio changes as head tilts
        const ratio = Math.abs(noseToForehead) / Math.abs(noseToChin);

        // Convert to approximate pitch angle
        // Normal upright ratio is ~0.7-1.0
        // Head dropping forward: forehead-nose distance decreases
        const normalRatio = 0.85;
        const deviation = normalRatio - ratio;

        // Map deviation to degrees (approximate)
        const pitchDeg = deviation * 60; // Rough scaling
        return Math.max(0, pitchDeg);
    }

    /**
     * Estimate head yaw (looking left/right).
     * Uses ratio of nose-to-left-ear vs nose-to-right-ear horizontal distance.
     */
    function computeHeadYaw(landmarks) {
        const nose = landmarks[HEAD_POSE.nose];
        const leftEar = landmarks[HEAD_POSE.leftEar];
        const rightEar = landmarks[HEAD_POSE.rightEar];

        const distLeft = Math.abs(nose.x - leftEar.x);
        const distRight = Math.abs(nose.x - rightEar.x);

        if (distLeft === 0 || distRight === 0) return 1.0;

        // The ratio will be >> 1 or << 1 if looking away
        return Math.max(distLeft / distRight, distRight / distLeft);
    }

    // ═══════════════════════════════════════
    // Main Analysis Function
    // ═══════════════════════════════════════

    /**
     * Analyze face landmarks and return drowsiness state.
     * @param {Array} landmarks - 468 MediaPipe Face Mesh landmarks
     * @returns {Object} Drowsiness state
     */
    function analyze(landmarks) {
        if (!landmarks || landmarks.length < 468) {
            return getDefaultState();
        }

        // Compute metrics
        const leftEAR = computeEAR(landmarks, LEFT_EYE);
        const rightEAR = computeEAR(landmarks, RIGHT_EYE);
        const ear = (leftEAR + rightEAR) / 2.0;

        const yawnRatio = computeMAR(landmarks);
        const headPitch = computeHeadPitch(landmarks);
        const headYawRatio = computeHeadYaw(landmarks);

        // Drowsiness & Distraction checks
        const isEyesClosed = ear < EAR_THRESHOLD;
        const isYawning = yawnRatio > YAWN_THRESHOLD;
        const isNodding = headPitch > HEAD_PITCH_THRESHOLD;
        const isLookingAway = headYawRatio > HEAD_YAW_THRESHOLD;

        // Frame counters
        if (isEyesClosed) {
            eyeClosedFrames++;
        } else {
            eyeClosedFrames = Math.max(0, eyeClosedFrames - 2); // Decay
        }

        if (isYawning) {
            yawnFrames++;
        } else {
            yawnFrames = Math.max(0, yawnFrames - 2);
        }

        if (isNodding) {
            headDropFrames++;
        } else {
            headDropFrames = Math.max(0, headDropFrames - 2);
        }
        
        if (isLookingAway) {
            headYawFrames++;
        } else {
            headYawFrames = Math.max(0, headYawFrames - 2);
        }

        // Determine drowsiness level
        const isDrowsy = eyeClosedFrames >= EAR_CONSEC_FRAMES;
        const isYawnConfirmed = yawnFrames >= YAWN_CONSEC_FRAMES;
        const isNoddingConfirmed = headDropFrames >= HEAD_PITCH_CONSEC_FRAMES;
        const isDistracted = headYawFrames >= HEAD_YAW_CONSEC_FRAMES;

        let prevLevel = drowsinessLevel;

        if (isDrowsy && (isYawnConfirmed || isNoddingConfirmed)) {
            drowsinessLevel = 'danger';
        } else if (isDrowsy || isNoddingConfirmed || isDistracted) {
            drowsinessLevel = 'danger';
        } else if (isYawnConfirmed || eyeClosedFrames >= EAR_CONSEC_FRAMES / 2) {
            drowsinessLevel = 'warning';
        } else {
            drowsinessLevel = 'alert';
        }

        // Check if we need to fire a drowsiness event
        let shouldFireEvent = false;
        const now = Date.now();
        if (drowsinessLevel !== 'alert' && (now - lastDrowsinessEvent) > DROWSINESS_COOLDOWN) {
            if (drowsinessLevel === 'danger' || (drowsinessLevel === 'warning' && prevLevel === 'alert')) {
                shouldFireEvent = true;
                lastDrowsinessEvent = now;
            }
        }

        return {
            ear: Math.round(ear * 1000) / 1000,
            yawnRatio: Math.round(yawnRatio * 1000) / 1000,
            headPitch: Math.round(headPitch * 10) / 10,
            headYawRatio: Math.round(headYawRatio * 100) / 100,
            isEyesClosed,
            isYawning,
            isNodding,
            isLookingAway,
            isDrowsy,
            isYawnConfirmed,
            isNoddingConfirmed,
            isDistracted,
            level: drowsinessLevel,
            shouldFireEvent,
            eyeClosedFrames,
            yawnFrames,
            headDropFrames,
            headYawFrames
        };
    }

    function getDefaultState() {
        return {
            ear: 0,
            yawnRatio: 0,
            headPitch: 0,
            headYawRatio: 1.0,
            isEyesClosed: false,
            isYawning: false,
            isNodding: false,
            isLookingAway: false,
            isDrowsy: false,
            isYawnConfirmed: false,
            isNoddingConfirmed: false,
            isDistracted: false,
            level: 'alert',
            shouldFireEvent: false,
            eyeClosedFrames: 0,
            yawnFrames: 0,
            headDropFrames: 0,
            headYawFrames: 0
        };
    }

    function reset() {
        eyeClosedFrames = 0;
        yawnFrames = 0;
        headDropFrames = 0;
        headYawFrames = 0;
        drowsinessLevel = 'alert';
        lastDrowsinessEvent = 0;
    }

    // ═══════════════════════════════════════
    // Landmark indices for drawing eye contours
    // ═══════════════════════════════════════
    const LEFT_EYE_CONTOUR = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246];
    const RIGHT_EYE_CONTOUR = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398];
    const LIPS_CONTOUR = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185];

    return {
        analyze,
        reset,
        getDefaultState,
        LEFT_EYE_CONTOUR,
        RIGHT_EYE_CONTOUR,
        LIPS_CONTOUR,
        EAR_THRESHOLD,
        YAWN_THRESHOLD,
        HEAD_PITCH_THRESHOLD,
    };
})();
