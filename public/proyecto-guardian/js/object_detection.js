/**
 * GUARDIAN Lite — Object Detection Engine
 * ============================================
 * Uses TensorFlow.js and COCO-SSD to detect cell phones.
 * Runs less frequently than Face Mesh to save CPU.
 */

const ObjectDetectionEngine = (() => {
    let model = null;
    let isDetecting = false;
    let detectionInterval = null;
    
    // Config
    const DETECTION_RATE_MS = 600; // Run every ~600ms
    const CONFIDENCE_THRESHOLD = 0.5;
    const TARGET_CLASSES = ['cell phone'];

    let onDetectionCallback = null;

    async function loadModel() {
        if (model) return;
        try {
            console.log('Loading COCO-SSD object detection model...');
            model = await cocoSsd.load();
            console.log('COCO-SSD loaded successfully.');
        } catch (e) {
            console.error('Failed to load COCO-SSD model:', e);
        }
    }

    async function detectFrame(videoElement) {
        if (!model || isDetecting || !videoElement || videoElement.readyState !== 4) return;
        
        isDetecting = true;
        try {
            const predictions = await model.detect(videoElement);
            
            // Check for cell phones
            for (const p of predictions) {
                if (TARGET_CLASSES.includes(p.class) && p.score > CONFIDENCE_THRESHOLD) {
                    if (onDetectionCallback) {
                        onDetectionCallback({
                            class: p.class,
                            score: p.score,
                            bbox: p.bbox
                        });
                    }
                    // Prevent firing multiple events per frame
                    break; 
                }
            }
        } catch (e) {
            console.warn('Object detection error:', e);
        } finally {
            isDetecting = false;
        }
    }

    function start(videoElement) {
        if (!model) {
            loadModel().then(() => {
                start(videoElement);
            });
            return;
        }
        
        stop();
        detectionInterval = setInterval(() => {
            detectFrame(videoElement);
        }, DETECTION_RATE_MS);
    }

    function stop() {
        if (detectionInterval) {
            clearInterval(detectionInterval);
            detectionInterval = null;
        }
        isDetecting = false;
    }

    function onTargetDetected(cb) {
        onDetectionCallback = cb;
    }

    // Model will be loaded on-demand when start() is called
    // (no eager pre-loading to avoid freezing the page)

    return {
        start,
        stop,
        onTargetDetected
    };
})();
