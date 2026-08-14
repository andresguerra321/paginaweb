/**
 * GUARDIAN Lite — Road Danger Simulator
 * ======================================
 * Replaces the FastAPI WebSocket backend for the portfolio demo.
 * Generates simulated road danger alerts at random intervals
 * to provide the same experience as the full GUARDIAN system.
 */

const RoadSimulator = (() => {
    let isRunning = false;
    let timer = null;
    let onAlertCallback = null;
    let onCopilotCallback = null;

    // ═══════════════════════════════════════
    // Scenario Definitions
    // ═══════════════════════════════════════
    const SCENARIOS = [
        {
            type: 'road_danger',
            severity: 'warning',
            icon: '🚶',
            title: 'Pedestrian Detected',
            description: 'Pedestrian crossing 50m ahead — reduce speed.',
            copilot: 'Heads up — pedestrian crossing ahead. Slow down and stay alert.',
        },
        {
            type: 'road_danger',
            severity: 'danger',
            icon: '⚠️',
            title: 'Sharp Curve Ahead',
            description: 'Dangerous curve in 200m — reduce to 40 km/h.',
            copilot: 'Sharp curve approaching. I recommend reducing speed to 40 km/h for safety.',
        },
        {
            type: 'road_danger',
            severity: 'warning',
            icon: '🌧️',
            title: 'Wet Road Surface',
            description: 'Rain detected — slippery conditions. Maintain safe distance.',
            copilot: 'Road surface is wet. Keep extra distance from the vehicle ahead.',
        },
        {
            type: 'road_danger',
            severity: 'info',
            icon: '🏫',
            title: 'School Zone',
            description: 'Entering school zone — 20 km/h speed limit active.',
            copilot: 'You\'re entering a school zone. Speed limit is 20 km/h.',
        },
        {
            type: 'road_danger',
            severity: 'danger',
            icon: '🚗',
            title: 'Vehicle Too Close',
            description: 'Following distance critically low — increase gap immediately.',
            copilot: 'You\'re too close to the vehicle ahead! Please increase following distance now.',
        },
        {
            type: 'road_danger',
            severity: 'warning',
            icon: '🌫️',
            title: 'Low Visibility',
            description: 'Fog detected — visibility below 100m. Use fog lights.',
            copilot: 'Low visibility conditions detected. Make sure your fog lights are on.',
        },
        {
            type: 'road_danger',
            severity: 'info',
            icon: '🛑',
            title: 'Stop Sign Ahead',
            description: 'Stop sign in 100m — prepare to stop.',
            copilot: 'Stop sign coming up. Prepare to come to a full stop.',
        },
        {
            type: 'road_danger',
            severity: 'danger',
            icon: '🕳️',
            title: 'Pothole Detected',
            description: 'Large pothole detected on the road — avoid or slow down.',
            copilot: 'Pothole ahead! Try to avoid it or reduce speed significantly.',
        },
        {
            type: 'road_danger',
            severity: 'warning',
            icon: '🚧',
            title: 'Construction Zone',
            description: 'Road construction in 300m — lane merge required.',
            copilot: 'Construction zone ahead. Prepare to merge lanes safely.',
        },
        {
            type: 'road_danger',
            severity: 'danger',
            icon: '🦌',
            title: 'Animal on Road',
            description: 'Animal detected crossing the road — brake carefully.',
            copilot: 'Animal on the road! Brake gently and avoid swerving.',
        },
    ];

    let lastScenarioIndex = -1;

    // ═══════════════════════════════════════
    // Core Logic
    // ═══════════════════════════════════════

    function getRandomScenario() {
        let idx;
        do {
            idx = Math.floor(Math.random() * SCENARIOS.length);
        } while (idx === lastScenarioIndex && SCENARIOS.length > 1);
        lastScenarioIndex = idx;
        return { ...SCENARIOS[idx], timestamp: new Date().toISOString() };
    }

    function scheduleNext() {
        if (!isRunning) return;

        // Random interval between 18-40 seconds
        const delay = 18000 + Math.random() * 22000;

        timer = setTimeout(() => {
            if (!isRunning) return;

            const scenario = getRandomScenario();

            // Fire alert
            if (onAlertCallback) {
                onAlertCallback(scenario);
            }

            // Fire copilot message after 1.5s
            if (onCopilotCallback && scenario.copilot) {
                setTimeout(() => {
                    onCopilotCallback(scenario.copilot, scenario.severity);
                }, 1500);
            }

            scheduleNext();
        }, delay);
    }

    // ═══════════════════════════════════════
    // Public API
    // ═══════════════════════════════════════
    function start() {
        if (isRunning) return;
        isRunning = true;
        scheduleNext();
        console.log('[RoadSim] Simulator started');
    }

    function stop() {
        isRunning = false;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        console.log('[RoadSim] Simulator stopped');
    }

    return {
        start,
        stop,

        onAlert(cb) {
            onAlertCallback = cb;
        },

        onCopilotMessage(cb) {
            onCopilotCallback = cb;
        },
    };
})();
