/**
 * GUARDIAN Lite — Main Application Controller (Portfolio Version)
 * ================================================================
 * Adapted from the original GUARDIAN Lite app.js.
 * Replaces WebSocket backend with RoadSimulator for static hosting.
 * Orchestrates webcam, MediaPipe Face Mesh, drowsiness detection,
 * road simulator, alerts, and UI updates.
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════
    // DOM References
    // ═══════════════════════════════════════
    const video = document.getElementById('video');
    const canvas = document.getElementById('overlay-canvas');
    const ctx = canvas.getContext('2d');
    const placeholder = document.getElementById('camera-placeholder');
    const drowsyFlash = document.getElementById('drowsy-flash');
    const fullscreenWarning = document.getElementById('fullscreen-warning');
    const btnToggleCamera = document.getElementById('btn-toggle-camera');
    const btnToggleMesh = document.getElementById('btn-toggle-mesh');
    const btnDismissWarning = document.getElementById('btn-dismiss-warning');
    const copilotMessage = document.getElementById('copilot-message');
    const copilotStatus = document.getElementById('copilot-status');

    // ═══════════════════════════════════════
    // State
    // ═══════════════════════════════════════
    let isCameraActive = false;
    let showMesh = true;
    let faceMesh = null;
    let camera = null;
    let sessionStartTime = null;
    let sessionTimer = null;
    let attentionScore = 100;
    let drowsinessWarningActive = false;
    let lastDOMUpdateTime = 0;
    const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);

    // ═══════════════════════════════════════
    // Initialization
    // ═══════════════════════════════════════
    function init() {
        // Clock
        updateClock();
        setInterval(updateClock, 1000);

        // Button handlers
        btnToggleCamera.addEventListener('click', toggleCamera);
        btnToggleMesh.addEventListener('click', () => {
            showMesh = !showMesh;
            btnToggleMesh.style.opacity = showMesh ? '1' : '0.4';
        });
        btnDismissWarning.addEventListener('click', dismissFullscreenWarning);

        // Road Simulator setup (replaces WebSocket)
        setupRoadSimulator();

        // MediaPipe Face Mesh is initialized lazily on first camera start
        // to avoid downloading WASM files and freezing the page on load

        // Initialize GSAP Motion & Micro-Animations
        initGSAPAnimations();

        // Mark connection as "Demo Mode" since there's no backend
        updateConnectionUI(true, 'Demo Mode');

        console.log('🛡️ GUARDIAN Lite (Portfolio Demo) initialized');
    }

    function initGSAPAnimations() {
        if (typeof gsap === 'undefined') return;

        // Header entrance
        gsap.from('#status-bar', {
            y: -40,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        });

        // Staggered panel cards entrance
        gsap.from('.panel', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.15
        });

        // Staggered gauges entrance
        gsap.from('.gauge', {
            scale: 0.95,
            opacity: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out',
            delay: 0.45
        });

        // Staggered stat cards entrance
        gsap.from('.stat-card', {
            y: 15,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.6
        });
    }

    // ═══════════════════════════════════════
    // MediaPipe Face Mesh
    // ═══════════════════════════════════════
    function initFaceMesh() {
        faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            },
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: !isMobile,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceMesh.onResults(onFaceMeshResults);
    }

    // ═══════════════════════════════════════
    // Camera Control
    // ═══════════════════════════════════════
    async function toggleCamera() {
        if (isCameraActive) {
            stopCamera();
        } else {
            await startCamera();
        }
    }

    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: isMobile ? { ideal: 640 } : { ideal: 1280 },
                    height: isMobile ? { ideal: 480 } : { ideal: 720 },
                    facingMode: 'user',
                },
                audio: false,
            });

            video.srcObject = stream;
            await video.play();

            // Match canvas to video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Hide placeholder
            placeholder.classList.add('hidden');

            // Initialize Face Mesh lazily on first camera start
            if (!faceMesh) {
                initFaceMesh();
            }

            // Start MediaPipe camera loop
            camera = new Camera(video, {
                onFrame: async () => {
                    await faceMesh.send({ image: video });
                },
                width: isMobile ? 640 : 1280,
                height: isMobile ? 480 : 720,
            });
            camera.start();

            isCameraActive = true;
            document.getElementById('camera-btn-icon').textContent = '⏹️';

            // Start session timer
            sessionStartTime = Date.now();
            sessionTimer = setInterval(updateSessionTime, 1000);

            // Reset drowsiness engine
            DrowsinessEngine.reset();
            
            // Start Object Detection
            if (typeof ObjectDetectionEngine !== 'undefined') {
                ObjectDetectionEngine.start(video);
                ObjectDetectionEngine.onTargetDetected((detection) => {
                    if (detection.class === 'cell phone') {
                        attentionScore = Math.max(0, attentionScore - 5);
                        
                        AlertManager.processAlert({
                            type: 'distraction',
                            severity: 'danger',
                            icon: '📱',
                            title: 'CELL PHONE DETECTED!',
                            description: `Please put away your cell phone immediately. (Confidence: ${Math.round(detection.score * 100)}%)`,
                            timestamp: new Date().toISOString(),
                        });
                    }
                });
            }

            // Start road danger simulator
            RoadSimulator.start();

            updateCopilot('Monitoring active. Drive safely — I\'m watching out for you.', false);
            copilotStatus.textContent = 'Active';

            console.log('📷 Camera started');
        } catch (err) {
            console.error('Camera error:', err);
            updateCopilot('Camera access denied. Please allow camera permissions and try again.', false);
        }
    }

    function stopCamera() {
        if (camera) {
            camera.stop();
            camera = null;
        }

        const stream = video.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Show placeholder
        placeholder.classList.remove('hidden');

        isCameraActive = false;
        document.getElementById('camera-btn-icon').textContent = '▶️';

        // Stop session timer
        clearInterval(sessionTimer);
        
        // Stop Object Detection
        if (typeof ObjectDetectionEngine !== 'undefined') {
            ObjectDetectionEngine.stop();
        }

        // Stop road simulator
        RoadSimulator.stop();

        // Reset status
        updateStatusBar('safe');
        drowsyFlash.classList.remove('active');

        copilotStatus.textContent = 'Idle';
        updateCopilot('Camera stopped. Start the camera to resume monitoring.', false);

        console.log('📷 Camera stopped');
    }

    // ═══════════════════════════════════════
    // Face Mesh Results Handler
    // ═══════════════════════════════════════
    function onFaceMeshResults(results) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
            updateMetrics(DrowsinessEngine.getDefaultState());
            return;
        }

        const landmarks = results.multiFaceLandmarks[0];

        if (showMesh) {
            drawFaceMesh(landmarks);
        }

        const state = DrowsinessEngine.analyze(landmarks);

        if (state.level === 'warning') {
            attentionScore = Math.max(0, attentionScore - 0.2);
        } else if (state.level === 'danger') {
            attentionScore = Math.max(0, attentionScore - 0.5);
        } else {
            attentionScore = Math.min(100, attentionScore + 0.05);
        }

        const now = Date.now();
        if (now - lastDOMUpdateTime > (isMobile ? 100 : 33)) {
            updateMetrics(state);
            updateGauges(state);
            updateStatusBar(state.level === 'alert' ? 'safe' : state.level);
            document.getElementById('stat-attention-score').textContent = Math.round(attentionScore) + '%';
            lastDOMUpdateTime = now;
        }

        if (state.level === 'danger') {
            drowsyFlash.classList.add('active');
        } else {
            drowsyFlash.classList.remove('active');
        }

        if (state.level === 'danger' && !drowsinessWarningActive) {
            showFullscreenWarning();
        }

        if (state.shouldFireEvent) {
            let title = state.level === 'danger' ? 'DROWSINESS ALERT!' : 'Drowsiness Warning';
            let icon = '😴';
            
            if (state.isDistracted && !state.isDrowsy && !state.isYawnConfirmed) {
                title = 'DISTRACTION WARNING';
                icon = '👀';
            }

            AlertManager.processAlert({
                type: 'drowsiness',
                severity: state.level,
                icon: icon,
                title: title,
                description: buildDrowsinessDescription(state),
                timestamp: new Date().toISOString(),
            });
        }
    }

    // ═══════════════════════════════════════
    // Drawing
    // ═══════════════════════════════════════
    function drawFaceMesh(landmarks) {
        const w = canvas.width;
        const h = canvas.height;

        drawContour(landmarks, DrowsinessEngine.LEFT_EYE_CONTOUR, w, h, '#22d3ee', 1.5);
        drawContour(landmarks, DrowsinessEngine.RIGHT_EYE_CONTOUR, w, h, '#22d3ee', 1.5);
        drawContour(landmarks, DrowsinessEngine.LIPS_CONTOUR, w, h, '#f472b6', 1.5);

        const nose = landmarks[1];
        ctx.beginPath();
        ctx.arc(nose.x * w, nose.y * h, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#a855f7';
        ctx.fill();

        if (!isMobile) {
            ctx.fillStyle = 'rgba(148, 163, 184, 0.15)';
            for (let i = 0; i < landmarks.length; i += 5) {
                const lm = landmarks[i];
                ctx.beginPath();
                ctx.arc(lm.x * w, lm.y * h, 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    function drawContour(landmarks, indices, w, h, color, lineWidth) {
        if (indices.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = 'round';

        const first = landmarks[indices[0]];
        ctx.moveTo(first.x * w, first.y * h);

        for (let i = 1; i < indices.length; i++) {
            const pt = landmarks[indices[i]];
            ctx.lineTo(pt.x * w, pt.y * h);
        }

        ctx.closePath();
        ctx.stroke();
    }

    // ═══════════════════════════════════════
    // UI Updates
    // ═══════════════════════════════════════
    function updateMetrics(state) {
        document.getElementById('header-ear-value').textContent = state.ear.toFixed(3);
        document.getElementById('header-yawn-value').textContent = state.yawnRatio.toFixed(3);
        document.getElementById('header-pitch-value').textContent = state.headPitch.toFixed(1) + '°';
        document.getElementById('header-yaw-value').textContent = state.headYawRatio.toFixed(2);
    }

    function updateGauges(state) {
        const earPercent = Math.min(100, Math.max(0, (1 - state.ear / 0.4) * 100));
        const earFill = document.getElementById('gauge-ear-fill');
        earFill.style.width = earPercent + '%';
        earFill.className = 'gauge-fill' + (state.isEyesClosed ? ' danger' : earPercent > 50 ? ' warning' : '');
        document.getElementById('gauge-ear-value').textContent = state.ear.toFixed(3);
        document.getElementById('gauge-ear').className = 'gauge' + (state.isEyesClosed ? ' danger' : earPercent > 50 ? ' warning' : '');

        const yawnPercent = Math.min(100, (state.yawnRatio / 0.9) * 100);
        const yawnFill = document.getElementById('gauge-yawn-fill');
        yawnFill.style.width = yawnPercent + '%';
        yawnFill.className = 'gauge-fill gauge-fill-yawn' + (state.isYawning ? ' danger' : yawnPercent > 50 ? ' warning' : '');
        document.getElementById('gauge-yawn-value').textContent = state.yawnRatio.toFixed(3);
        document.getElementById('gauge-yawn').className = 'gauge' + (state.isYawning ? ' danger' : yawnPercent > 50 ? ' warning' : '');

        const pitchPercent = Math.min(100, (state.headPitch / 35) * 100);
        const pitchFill = document.getElementById('gauge-pitch-fill');
        pitchFill.style.width = pitchPercent + '%';
        pitchFill.className = 'gauge-fill gauge-fill-pitch' + (state.isNodding ? ' danger' : pitchPercent > 50 ? ' warning' : '');
        document.getElementById('gauge-pitch-value').textContent = state.headPitch.toFixed(1) + '°';
        document.getElementById('gauge-pitch').className = 'gauge' + (state.isNodding ? ' danger' : pitchPercent > 50 ? ' warning' : '');
        
        const yawPercent = Math.min(100, Math.max(0, (state.headYawRatio - 1.0) / 0.5 * 100));
        const yawFill = document.getElementById('gauge-yaw-fill');
        if (yawFill) {
            yawFill.style.width = yawPercent + '%';
            yawFill.className = 'gauge-fill gauge-fill-yaw' + (state.isLookingAway ? ' danger' : yawPercent > 50 ? ' warning' : '');
            document.getElementById('gauge-yaw-value').textContent = state.headYawRatio.toFixed(2);
            document.getElementById('gauge-yaw').className = 'gauge' + (state.isLookingAway ? ' danger' : yawPercent > 50 ? ' warning' : '');
        }
    }

    function updateStatusBar(level) {
        const bar = document.getElementById('status-bar');
        const badge = document.getElementById('status-badge');
        const dot = badge.querySelector('.status-dot');
        const label = badge.querySelector('.status-label');

        bar.className = 'status-bar';

        switch (level) {
            case 'safe':
                bar.classList.add('status-safe');
                label.textContent = 'MONITORING';
                label.style.color = '#34d399';
                dot.style.background = '#34d399';
                badge.style.background = 'rgba(52, 211, 153, 0.1)';
                badge.style.borderColor = 'rgba(52, 211, 153, 0.2)';
                break;
            case 'warning':
                bar.classList.add('status-warning');
                label.textContent = 'CAUTION';
                label.style.color = '#fbbf24';
                dot.style.background = '#fbbf24';
                badge.style.background = 'rgba(251, 191, 36, 0.1)';
                badge.style.borderColor = 'rgba(251, 191, 36, 0.2)';
                break;
            case 'danger':
                bar.classList.add('status-danger');
                label.textContent = 'DANGER';
                label.style.color = '#ef4444';
                dot.style.background = '#ef4444';
                badge.style.background = 'rgba(239, 68, 68, 0.15)';
                badge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                break;
        }
    }

    function updateClock() {
        const el = document.getElementById('time-display');
        if (el) {
            el.textContent = new Date().toLocaleTimeString();
        }
    }

    function updateSessionTime() {
        if (!sessionStartTime) return;
        const elapsed = Date.now() - sessionStartTime;
        const mins = Math.floor(elapsed / 60000);
        const secs = Math.floor((elapsed % 60000) / 1000);
        document.getElementById('stat-session-time').textContent =
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function updateCopilot(message, urgent) {
        if (copilotMessage) {
            copilotMessage.querySelector('p').textContent = message;
            copilotMessage.className = 'copilot-message' + (urgent ? ' urgent' : '');
        }
    }

    // ═══════════════════════════════════════
    // Fullscreen Warning
    // ═══════════════════════════════════════
    function showFullscreenWarning() {
        if (drowsinessWarningActive) return;
        drowsinessWarningActive = true;
        fullscreenWarning.classList.add('active');

        setTimeout(() => {
            dismissFullscreenWarning();
        }, 10000);
    }

    function dismissFullscreenWarning() {
        drowsinessWarningActive = false;
        fullscreenWarning.classList.remove('active');
    }

    // ═══════════════════════════════════════
    // Road Simulator Setup (replaces WebSocket)
    // ═══════════════════════════════════════
    function setupRoadSimulator() {
        RoadSimulator.onAlert((alert) => {
            AlertManager.processAlert(alert);
        });

        RoadSimulator.onCopilotMessage((message, level) => {
            const urgent = level === 'danger' || level === 'emergency';
            updateCopilot(message, urgent);
            copilotStatus.textContent = 'Speaking';
            setTimeout(() => {
                copilotStatus.textContent = isCameraActive ? 'Active' : 'Idle';
            }, 3000);
        });
    }

    // ═══════════════════════════════════════
    // Connection UI (Demo Mode)
    // ═══════════════════════════════════════
    function updateConnectionUI(connected, label) {
        const dot = document.querySelector('.conn-dot');
        const connLabel = document.querySelector('.conn-label');

        if (dot) {
            dot.classList.toggle('connected', connected);
        }
        if (connLabel) {
            connLabel.textContent = label || (connected ? 'Connected' : 'Disconnected');
        }
    }

    // ═══════════════════════════════════════
    // Helpers
    // ═══════════════════════════════════════
    function buildDrowsinessDescription(state) {
        const parts = [];
        if (state.isDrowsy) parts.push('Eyes closing detected');
        if (state.isYawnConfirmed) parts.push('Yawning detected');
        if (state.isNoddingConfirmed) parts.push('Head nodding detected');
        if (state.isDistracted) parts.push('Looking away from the road');
        
        if (state.level === 'danger') {
            parts.push('Pull over at the next safe location!');
        }
        return parts.join('. ') || 'Drowsiness/Distraction indicators detected.';
    }

    // ═══════════════════════════════════════
    // Boot (Lazy Load via Launcher)
    // ═══════════════════════════════════════
    const btnLaunch = document.getElementById('btn-launch-demo');
    const modal = document.getElementById('mobile-warning-modal');
    const btnCancel = document.getElementById('btn-cancel-demo');
    const btnForce = document.getElementById('btn-force-demo');
    const launcherScreen = document.getElementById('demo-launcher');
    const dashboardWrapper = document.getElementById('dashboard-wrapper');

    function startDemo() {
        if (launcherScreen) launcherScreen.style.display = 'none';
        
        const loadingScreen = document.getElementById('demo-loading-screen');
        const loadingTitle = document.getElementById('loading-text-title');
        const loadingDesc = document.getElementById('loading-text-desc');
        
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            
            // Sequence of loading texts
            setTimeout(() => {
                loadingTitle.textContent = "Cargando Modelos Edge...";
                loadingDesc.textContent = "MediaPipe Face Mesh (468 landmarks)";
            }, 1000);
            
            setTimeout(() => {
                loadingTitle.textContent = "Inicializando Detección...";
                loadingDesc.textContent = "TensorFlow.js COCO-SSD object detection";
            }, 2500);
            
            setTimeout(() => {
                loadingTitle.textContent = "Configurando Telemetría...";
                loadingDesc.textContent = "Conectando al Motor Oráculo y Copiloto";
            }, 4000);
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (dashboardWrapper) dashboardWrapper.style.display = 'block';
                init();
            }, 5000);
        } else {
            if (dashboardWrapper) dashboardWrapper.style.display = 'block';
            init();
        }
    }

    if (btnLaunch) {
        btnLaunch.addEventListener('click', () => {
            if (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)) {
                if (modal) modal.style.display = 'flex';
            } else {
                startDemo();
            }
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    if (btnForce) {
        btnForce.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
            startDemo();
        });
    }
})();
