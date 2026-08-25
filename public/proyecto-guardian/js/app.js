/**
 * GUARDIAN Lite — Main Application Controller (Scandinavian Telemetry UI)
 * =====================================================================
 * Refactored for AG Private Engineering Portfolio.
 * Orchestrates live webcam / synthetic simulation, MediaPipe Face Mesh,
 * drowsiness analytics, road hazard alerts, and real-time cockpit UI.
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════
    // DOM References
    // ═══════════════════════════════════════
    const video = document.getElementById('video');
    const canvas = document.getElementById('overlay-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const placeholder = document.getElementById('camera-placeholder');
    const drowsyFlash = document.getElementById('drowsy-flash');
    const fullscreenWarning = document.getElementById('fullscreen-warning');
    const btnToggleCamera = document.getElementById('btn-toggle-camera');
    const btnToggleMesh = document.getElementById('btn-toggle-mesh');
    const btnDismissWarning = document.getElementById('btn-dismiss-warning');
    const copilotMessage = document.getElementById('copilot-message');
    const copilotStatus = document.getElementById('copilot-status');
    const statusBadge = document.getElementById('status-badge');

    // ═══════════════════════════════════════
    // State
    // ═══════════════════════════════════════
    let isCameraActive = false;
    let isSimulationActive = false;
    let showMesh = true;
    let faceMesh = null;
    let camera = null;
    let sessionStartTime = null;
    let sessionTimer = null;
    let simTimer = null;
    let attentionScore = 100;
    let drowsinessWarningActive = false;
    let lastDOMUpdateTime = 0;
    const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);

    // ═══════════════════════════════════════
    // Initialization
    // ═══════════════════════════════════════
    function init() {
        updateClock();
        setInterval(updateClock, 1000);

        if (btnToggleCamera) {
            btnToggleCamera.addEventListener('click', toggleCamera);
        }
        if (btnToggleMesh) {
            btnToggleMesh.addEventListener('click', () => {
                showMesh = !showMesh;
                btnToggleMesh.classList.toggle('active', showMesh);
            });
        }
        if (btnDismissWarning) {
            btnDismissWarning.addEventListener('click', dismissFullscreenWarning);
        }

        setupRoadSimulator();
        initGSAPAnimations();
    }

    function initGSAPAnimations() {
        if (typeof gsap === 'undefined') return;

        gsap.from('#status-bar', {
            y: -30,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        });

        gsap.from('.panel', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.1
        });
    }

    // ═══════════════════════════════════════
    // MediaPipe Face Mesh
    // ═══════════════════════════════════════
    function initFaceMesh() {
        if (typeof FaceMesh === 'undefined') {
            console.warn('MediaPipe FaceMesh library not loaded');
            return;
        }

        try {
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
        } catch (e) {
            console.error('Error initializing FaceMesh:', e);
        }
    }

    // ═══════════════════════════════════════
    // Camera Control & Synthetic Mode
    // ═══════════════════════════════════════
    async function toggleCamera() {
        if (isCameraActive || isSimulationActive) {
            stopAll();
        } else {
            await startCamera();
        }
    }

    function stopAll() {
        stopCamera();
        stopSimulation();
        updateCameraBtnIcon(false);
        updateStatusLabel('EN ESPERA', false);
    }

    async function startCamera() {
        stopSimulation();
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

            if (canvas) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            }

            if (placeholder) placeholder.classList.add('hidden');

            if (!faceMesh) {
                initFaceMesh();
            }

            if (typeof Camera !== 'undefined') {
                camera = new Camera(video, {
                    onFrame: async () => {
                        if (faceMesh) {
                            try {
                                await faceMesh.send({ image: video });
                            } catch (e) {}
                        }
                    },
                    width: isMobile ? 640 : 1280,
                    height: isMobile ? 480 : 720,
                });
                camera.start();
            } else {
                const loop = async () => {
                    if (!isCameraActive) return;
                    if (faceMesh && video.readyState >= 2) {
                        try {
                            await faceMesh.send({ image: video });
                        } catch (e) {}
                    }
                    requestAnimationFrame(loop);
                };
                requestAnimationFrame(loop);
            }

            isCameraActive = true;
            updateCameraBtnIcon(true);
            updateStatusLabel('CÁMARA ACTIVA', true);

            startSessionTracking();

            if (typeof ObjectDetectionEngine !== 'undefined') {
                ObjectDetectionEngine.start(video);
            }

            RoadSimulator.start();
            updateCopilot('Centinela activo. Monitoreo biométrico de cabina en tiempo real.', false);
        } catch (err) {
            console.warn('Camera error, fallback to simulation:', err);
            startSimulation();
            updateCopilot('Acceso a cámara no disponible. Iniciando Simulación de Ruta con telemetría en vivo.', false);
        }
    }

    function stopCamera() {
        if (camera) {
            camera.stop();
            camera = null;
        }

        if (video && video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }

        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        if (placeholder) placeholder.classList.remove('hidden');
        isCameraActive = false;

        if (typeof ObjectDetectionEngine !== 'undefined') {
            ObjectDetectionEngine.stop();
        }
    }

    // ═══════════════════════════════════════
    // Synthetic Telemetry Simulation (No-Cam Mode)
    // ═══════════════════════════════════════
    function startSimulation() {
        stopCamera();
        isSimulationActive = true;
        updateCameraBtnIcon(true);
        updateStatusLabel('MODO SIMULACIÓN', true);

        if (placeholder) placeholder.classList.add('hidden');
        startSessionTracking();
        RoadSimulator.start();

        let simTicks = 0;
        let isBlinking = false;
        let blinkCountdown = 30;

        simTimer = setInterval(() => {
            if (!isSimulationActive) return;
            simTicks++;

            blinkCountdown--;
            if (blinkCountdown <= 0) {
                isBlinking = true;
                if (blinkCountdown <= -2) {
                    isBlinking = false;
                    blinkCountdown = Math.floor(25 + Math.random() * 30);
                }
            }

            const earVal = isBlinking ? (0.10 + Math.random() * 0.05) : (0.33 + Math.sin(simTicks * 0.2) * 0.03);
            const yawnVal = 0.16 + Math.abs(Math.sin(simTicks * 0.05)) * 0.06;
            const pitchVal = Math.sin(simTicks * 0.1) * 3.5;
            const yawVal = 1.0 + Math.cos(simTicks * 0.08) * 0.08;

            updateGaugesUI(earVal, yawnVal, pitchVal, yawVal);

            // Draw a subtle animated scan line in canvas
            if (ctx && canvas) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
                ctx.lineWidth = 1;
                const scanY = (simTicks * 4) % canvas.height;
                ctx.beginPath();
                ctx.moveTo(0, scanY);
                ctx.lineTo(canvas.width, scanY);
                ctx.stroke();
            }
        }, 100);

        updateCopilot('Modo Simulación de Telemetría activo. Generando flujo de datos de conducción.', false);
    }

    function stopSimulation() {
        if (simTimer) {
            clearInterval(simTimer);
            simTimer = null;
        }
        isSimulationActive = false;
    }

    function startSessionTracking() {
        if (!sessionStartTime) {
            sessionStartTime = Date.now();
            sessionTimer = setInterval(updateSessionTime, 1000);
        }
    }

    function updateCameraBtnIcon(active) {
        const btnSvg = document.getElementById('camera-btn-icon-svg');
        if (btnSvg) {
            btnSvg.innerHTML = active
                ? '<rect x="6" y="6" width="12" height="12" rx="1"/>'
                : '<polygon points="5 3 19 12 5 21 5 3"/>';
        }
        if (btnToggleCamera) {
            btnToggleCamera.classList.toggle('active', active);
        }
    }

    function updateStatusLabel(text, active) {
        if (statusBadge) {
            const label = statusBadge.querySelector('.status-label');
            const dot = statusBadge.querySelector('.status-dot');
            if (label) label.textContent = text;
            if (dot) dot.style.background = active ? 'var(--accent-emerald)' : 'var(--accent-amber)';
        }
    }

    // ═══════════════════════════════════════
    // Face Mesh Processing & Gauges
    // ═══════════════════════════════════════
    function onFaceMeshResults(results) {
        if (!ctx || !canvas) return;

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];

            if (showMesh && typeof drawConnectors !== 'undefined' && typeof FACEMESH_TESSELATION !== 'undefined') {
                drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, {
                    color: 'rgba(6, 182, 212, 0.25)',
                    lineWidth: 0.5,
                });
            }

            if (typeof DrowsinessEngine !== 'undefined') {
                const analysis = DrowsinessEngine.process(landmarks);
                updateGaugesUI(analysis.ear, analysis.yawnRatio, analysis.headPitch, analysis.headYaw);

                if (analysis.isDrowsy || analysis.isYawnConfirmed) {
                    attentionScore = Math.max(20, attentionScore - 4);
                    if (analysis.level === 'danger' && !drowsinessWarningActive) {
                        triggerFullscreenWarning();
                    }
                }
            }
        }
        ctx.restore();
    }

    function updateGaugesUI(ear, yawn, pitch, yaw) {
        const now = Date.now();
        if (now - lastDOMUpdateTime < 60) return;
        lastDOMUpdateTime = now;

        setElementText('header-ear-value', ear.toFixed(3));
        setElementText('header-yawn-value', yawn.toFixed(3));
        setElementText('header-pitch-value', `${pitch.toFixed(1)}°`);
        setElementText('header-yaw-value', yaw.toFixed(2));

        setElementText('gauge-ear-value', ear.toFixed(3));
        setElementText('gauge-yawn-value', yawn.toFixed(3));
        setElementText('gauge-pitch-value', `${pitch.toFixed(1)}°`);
        setElementText('gauge-yaw-value', yaw.toFixed(2));

        setGaugeFill('gauge-ear-fill', Math.min(100, (ear / 0.45) * 100));
        setGaugeFill('gauge-yawn-fill', Math.min(100, (yawn / 0.7) * 100));
        setGaugeFill('gauge-pitch-fill', Math.min(100, (Math.abs(pitch) / 25) * 100));
        setGaugeFill('gauge-yaw-fill', Math.min(100, (yaw / 2.0) * 100));

        const statAtt = document.getElementById('stat-attention-score');
        if (statAtt) statAtt.textContent = `${Math.round(attentionScore)}%`;
    }

    function setElementText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function setGaugeFill(id, percent) {
        const el = document.getElementById(id);
        if (el) el.style.width = `${Math.max(0, percent)}%`;
    }

    // ═══════════════════════════════════════
    // Road Simulator Listeners
    // ═══════════════════════════════════════
    function setupRoadSimulator() {
        if (typeof RoadSimulator === 'undefined') return;

        RoadSimulator.onAlert((alert) => {
            if (typeof AlertManager !== 'undefined') {
                AlertManager.processAlert(alert);
            }
        });

        RoadSimulator.onCopilotMessage((msg) => {
            updateCopilot(msg, false);
        });
    }

    function updateCopilot(text, isEmergency) {
        if (copilotMessage) {
            copilotMessage.innerHTML = `<p>${text}</p>`;
        }
        if (copilotStatus) {
            copilotStatus.textContent = isEmergency ? 'ALERTA' : 'Activo';
            copilotStatus.style.color = isEmergency ? 'var(--accent-crimson)' : 'var(--accent-indigo)';
        }
    }

    function triggerFullscreenWarning() {
        drowsinessWarningActive = true;
        if (fullscreenWarning) fullscreenWarning.classList.add('active');
        if (drowsyFlash) drowsyFlash.classList.add('active');
    }

    function dismissFullscreenWarning() {
        drowsinessWarningActive = false;
        if (fullscreenWarning) fullscreenWarning.classList.remove('active');
        if (drowsyFlash) drowsyFlash.classList.remove('active');
    }

    function updateClock() {
        const el = document.getElementById('time-display');
        if (el) {
            el.textContent = new Date().toLocaleTimeString();
        }
    }

    function updateSessionTime() {
        if (!sessionStartTime) return;
        const elapsedSec = Math.floor((Date.now() - sessionStartTime) / 1000);
        const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
        const secs = String(elapsedSec % 60).padStart(2, '0');
        const el = document.getElementById('stat-session-time');
        if (el) el.textContent = `${mins}:${secs}`;
    }

    // ═══════════════════════════════════════
    // Launcher Bindings
    // ═══════════════════════════════════════
    const btnLaunchCam = document.getElementById('btn-launch-demo');
    const btnLaunchSim = document.getElementById('btn-launch-sim');
    const launcherScreen = document.getElementById('demo-launcher');
    const dashboardWrapper = document.getElementById('dashboard-wrapper');

    function openCockpit(mode) {
        if (launcherScreen) launcherScreen.style.display = 'none';
        if (dashboardWrapper) dashboardWrapper.style.display = 'block';

        init();

        if (mode === 'camera') {
            startCamera();
        } else {
            startSimulation();
        }
    }

    if (btnLaunchCam) {
        btnLaunchCam.addEventListener('click', () => openCockpit('camera'));
    }

    if (btnLaunchSim) {
        btnLaunchSim.addEventListener('click', () => openCockpit('simulation'));
    }

})();
