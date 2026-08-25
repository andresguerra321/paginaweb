/**
 * F1 SIM PRO — Core Simulation Engine & UI Controller
 * ===================================================
 * High-precision concurrent statistical racing engine.
 * Computes telemetry, driver attributes, tire degradation,
 * live SVG track animation with directional vehicle heading,
 * precomputed lookup table, and interactive cockpit HUD.
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════
    // DRIVER & VEHICLE DATABASE (In-Memory Engine)
    // ═══════════════════════════════════════
    const DRIVERS_DB = [
        { 
            id: 1, codigo: 'VER', numero: 1, nombre: 'Max Verstappen', 
            equipo: 'RED_BULL', equipoNombre: 'Red Bull Racing',
            habilidad: 98, experiencia: 92, gestionNeumaticos: 94, probabilidadError: 0.02,
            victorias: 58, podios: 104, puntos: 2580, vehiculo: 'RB20' 
        },
        { 
            id: 2, codigo: 'LEC', numero: 16, nombre: 'Charles Leclerc', 
            equipo: 'FERRARI', equipoNombre: 'Scuderia Ferrari',
            habilidad: 95, experiencia: 88, gestionNeumaticos: 90, probabilidadError: 0.04,
            victorias: 6, podios: 36, puntos: 1250, vehiculo: 'SF-24' 
        },
        { 
            id: 3, codigo: 'NOR', numero: 4, nombre: 'Lando Norris', 
            equipo: 'MCLAREN', equipoNombre: 'McLaren F1 Team',
            habilidad: 94, experiencia: 85, gestionNeumaticos: 89, probabilidadError: 0.03,
            victorias: 3, podios: 21, puntos: 840, vehiculo: 'MCL38' 
        },
        { 
            id: 4, codigo: 'HAM', numero: 44, nombre: 'Lewis Hamilton', 
            equipo: 'MERCEDES', equipoNombre: 'Mercedes-AMG PETRONAS',
            habilidad: 93, experiencia: 99, gestionNeumaticos: 96, probabilidadError: 0.02,
            victorias: 105, podios: 201, puntos: 4780, vehiculo: 'W15' 
        },
        { 
            id: 5, codigo: 'SAI', numero: 55, nombre: 'Carlos Sainz', 
            equipo: 'FERRARI', equipoNombre: 'Scuderia Ferrari',
            habilidad: 91, experiencia: 90, gestionNeumaticos: 93, probabilidadError: 0.03,
            victorias: 3, podios: 22, puntos: 1180, vehiculo: 'SF-24' 
        },
        { 
            id: 6, codigo: 'PIA', numero: 81, nombre: 'Oscar Piastri', 
            equipo: 'MCLAREN', equipoNombre: 'McLaren F1 Team',
            habilidad: 90, experiencia: 80, gestionNeumaticos: 87, probabilidadError: 0.04,
            victorias: 2, podios: 9, puntos: 380, vehiculo: 'MCL38' 
        },
        { 
            id: 7, codigo: 'RUS', numero: 63, nombre: 'George Russell', 
            equipo: 'MERCEDES', equipoNombre: 'Mercedes-AMG PETRONAS',
            habilidad: 89, experiencia: 84, gestionNeumaticos: 88, probabilidadError: 0.04,
            victorias: 2, podios: 14, puntos: 590, vehiculo: 'W15' 
        },
        { 
            id: 8, codigo: 'ALO', numero: 14, nombre: 'Fernando Alonso', 
            equipo: 'ASTON_MARTIN', equipoNombre: 'Aston Martin Aramco',
            habilidad: 92, experiencia: 100, gestionNeumaticos: 95, probabilidadError: 0.02,
            victorias: 32, podios: 106, puntos: 2320, vehiculo: 'AMR24' 
        }
    ];

    const TEAMS_CONFIG = {
        "RED_BULL": { name: "Red Bull Racing", color: "#3671C6" },
        "FERRARI": { name: "Scuderia Ferrari", color: "#E80020" },
        "MERCEDES": { name: "Mercedes-AMG", color: "#27F4D2" },
        "MCLAREN": { name: "McLaren F1 Team", color: "#FF8000" },
        "ASTON_MARTIN": { name: "Aston Martin", color: "#229971" }
    };

    // ═══════════════════════════════════════
    // SOUND SYNTHESIZER (Native Web Audio API)
    // ═══════════════════════════════════════
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) audioCtx = new AudioContext();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => {});
        }
        return audioCtx;
    }

    function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.08) {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    }

    function playBeepLight() {
        playTone(660, 'triangle', 0.18, 0.12);
    }

    function playLightsOutSound() {
        playTone(1320, 'square', 0.35, 0.15);
        setTimeout(() => playTone(880, 'sawtooth', 0.4, 0.1), 100);
    }

    // ═══════════════════════════════════════
    // SIMULATION ENGINE STATE
    // ═══════════════════════════════════════
    let simDrivers = [];
    let trackLUT = []; // Precomputed Track Look-Up Table (LUT) for 60fps locked interpolation
    const BASE_LAP_TIME = 73.5; // Monaco baseline (seconds)

    const state = {
        isRacing: true, // Active simulation running by default
        currentLap: 1,
        totalLaps: 53,
        speedMultiplier: 1.0, // 1x, 2x, 4x
        weather: 'SOLEADO',
        weatherTemp: 28,
        safetyCarDeployed: false,
        flag: 'GREEN',
        activeDriverCode: 'VER',
        activeDriverPos: 1,
        deltaHistory: [-0.05, -0.12, -0.08, -0.15, -0.11, -0.09, -0.14, -0.18, -0.12, -0.15],
        animFrameId: null,
        telemetryTimer: null,
        chartInstance: null,
        lastFrameTime: performance.now(),
        lang: 'es'
    };

    // ═══════════════════════════════════════
    // I18N DICTIONARY
    // ═══════════════════════════════════════
    const I18N = {
        es: {
            nav_back: 'Volver a Soluciones',
            nav_sim: 'Simulador',
            nav_features: 'Características',
            nav_how: 'Cómo Funciona',
            nav_status: 'SISTEMA ACTIVO',
            hero_eyebrow: 'Motor Estadístico de Alta Fidelidad',
            hero_title: 'Siente la carrera.<br><span class="gradient-text">Simulada por Datos.</span>',
            hero_subtitle: 'F1 Sim Pro calcula el ritmo de cada monoplaza evaluando la habilidad de los pilotos, la degradación de los compuestos, la carga aerodinámica y eventos de pista en tiempo real.',
            hero_btn_start: 'Reiniciar Salida',
            hero_btn_explore: 'Explorar Características',
            sim_title: 'Mission Control Room',
            sim_subtitle: 'Interactúa en tiempo real con la carrera. Cambia entre la telemetría gráfica en vivo, la tabla de estadísticas de pilotos, el setup aerodinámico y los principios del motor.',
            tab_track: 'Pista & Telemetría',
            tab_stats: 'Estadísticas de Pilotos',
            tab_config: 'Configuración de Escudería',
            tab_arch: 'Motor de Simulación',
            btn_start_race: 'Salida FIA',
            btn_weather: 'Clima',
            btn_sc: 'Safety Car',
            btn_reset: 'Parrilla',
            waiting_start: 'ESPERANDO INICIO',
            racing: 'CARRERA EN VIVO',
            sc_active: 'SAFETY CAR',
            finished: 'BANDERA A CUADROS',
            flag_green: 'Bandera Verde',
            flag_yellow: 'Safety Car Activo',
            radio_init: 'Simulación en vivo: Monoplazas en batalla en el circuito de Mónaco.',
            cta_title: '¿Necesitas un Motor Estadístico o Simulador a Medida?',
            cta_desc: 'Desarrollo algoritmos de cálculo numérico, motores de simulación concurrentes y dashboards de telemetría de alto rendimiento para tu negocio.',
            cta_btn: 'Contactar por WhatsApp'
        },
        en: {
            nav_back: 'Back to Solutions',
            nav_sim: 'Simulator',
            nav_features: 'Features',
            nav_how: 'How It Works',
            nav_status: 'SYSTEM ACTIVE',
            hero_eyebrow: 'High-Fidelity Statistical Engine',
            hero_title: 'Feel the race.<br><span class="gradient-text">Driven by Data.</span>',
            hero_subtitle: 'F1 Sim Pro computes each car\'s pace by evaluating driver skill, compound degradation, downforce levels, and live track events in real time.',
            hero_btn_start: 'Restart Race',
            hero_btn_explore: 'Explore Features',
            sim_title: 'Mission Control Room',
            sim_subtitle: 'Interact in real time with the race. Switch between live telemetry HUD, driver stats matrix, aerodynamic setup, and concurrency architecture.',
            tab_track: 'Track & Telemetry',
            tab_stats: 'Driver Statistics',
            tab_config: 'Team Setup',
            tab_arch: 'Simulation Engine',
            btn_start_race: 'FIA Start',
            btn_weather: 'Weather',
            btn_sc: 'Safety Car',
            btn_reset: 'Grid Reset',
            waiting_start: 'WAITING FOR START',
            racing: 'RACE LIVE',
            sc_active: 'SAFETY CAR',
            finished: 'CHECKERED FLAG',
            flag_green: 'Green Flag',
            flag_yellow: 'Safety Car Deployed',
            radio_init: 'Live simulation: Cars racing on the Circuit de Monaco.',
            cta_title: 'Need a Custom Statistical Engine or Simulator?',
            cta_desc: 'I develop high-performance numerical algorithms, concurrent simulation engines, and real-time telemetry dashboards for your enterprise.',
            cta_btn: 'Contact on WhatsApp'
        }
    };

    // ═══════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════
    document.addEventListener('DOMContentLoaded', () => {
        initPageTransition();
        initNavigation();
        initTabs();
        initTrackSVG();
        buildTrackLookupTable();
        initDeltaChart();
        initSimulationDrivers();
        initSimControls();
        initSetupForm();
        initHeroActions();

        renderLeaderboard();
        updateCockpitHUD(state.activeDriverCode);
        updateCockpitGauges(240, 80);

        // Start live continuous simulation loop immediately
        startSimulationEngineLoop();
        logRadio(I18N[state.lang].radio_init);
    });

    function initPageTransition() {
        const overlay = document.getElementById('page-transition-overlay');
        const bar = document.getElementById('minimal-bar');
        if (!overlay) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += 25;
            if (bar) bar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => overlay.remove(), 300);
                }, 100);
            }
        }, 30);
    }

    // ═══════════════════════════════════════
    // TRACK SVG & PRECOMPUTED GEOMETRY LUT
    // ═══════════════════════════════════════
    function initTrackSVG() {
        const container = document.getElementById('trackContainer');
        if (!container) return;

        // Elegant, non-intersecting authentic Circuit de Monaco path
        const svgHTML = `
        <svg viewBox="0 0 800 480" class="circuit-svg" id="f1CircuitSvg">
            <defs>
                <filter id="carGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <pattern id="circuitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuitGrid)" />
            
            <!-- Harbor Water Accent -->
            <path d="M 380 320 C 480 320, 580 330, 680 340 L 680 430 L 380 430 Z" fill="rgba(56, 189, 248, 0.03)" />
            
            <!-- Kerbs Outer Base (Monaco Red & White / Track Border) -->
            <path d="M 450 420 L 580 420 C 630 420, 670 380, 670 330 C 670 270, 630 180, 560 130 C 510 95, 430 80, 360 85 C 290 90, 240 130, 230 180 C 220 220, 160 230, 160 260 C 160 290, 220 295, 290 295 C 380 295, 520 290, 640 295 C 710 300, 750 330, 740 360 C 730 380, 670 375, 600 375 C 500 375, 410 365, 310 365 C 230 365, 190 395, 220 420 C 250 420, 350 420, 450 420 Z" fill="none" stroke="rgba(225,6,0,0.28)" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
            
            <!-- Asphalt Surface -->
            <path id="mainTrackPath" d="M 450 420 L 580 420 C 630 420, 670 380, 670 330 C 670 270, 630 180, 560 130 C 510 95, 430 80, 360 85 C 290 90, 240 130, 230 180 C 220 220, 160 230, 160 260 C 160 290, 220 295, 290 295 C 380 295, 520 290, 640 295 C 710 300, 750 330, 740 360 C 730 380, 670 375, 600 375 C 500 375, 410 365, 310 365 C 230 365, 190 395, 220 420 C 250 420, 350 420, 450 420 Z" fill="none" stroke="#080E1C" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
            
            <!-- Racing Line -->
            <path d="M 450 420 L 580 420 C 630 420, 670 380, 670 330 C 670 270, 630 180, 560 130 C 510 95, 430 80, 360 85 C 290 90, 240 130, 230 180 C 220 220, 160 230, 160 260 C 160 290, 220 295, 290 295 C 380 295, 520 290, 640 295 C 710 300, 750 330, 740 360 C 730 380, 670 375, 600 375 C 500 375, 410 365, 310 365 C 230 365, 190 395, 220 420 C 250 420, 350 420, 450 420 Z" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" stroke-dasharray="6 6" stroke-linecap="round"/>
            
            <!-- Tunnel Glow Line -->
            <path d="M 520 290 C 640 295, 710 300, 740 360" fill="none" stroke="rgba(251, 191, 36, 0.45)" stroke-width="4" stroke-linecap="round"/>

            <!-- Start/Finish Line -->
            <line x1="450" y1="408" x2="450" y2="432" stroke="#ffffff" stroke-width="3.5"/>
            <text x="450" y="452" fill="rgba(255,255,255,0.75)" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" text-anchor="middle">SALIDA / META</text>
            
            <!-- Landmark Labels -->
            <text x="615" y="405" fill="#38BDF8" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold">SAINTE DÉVOTE (T1)</text>
            <text x="390" y="70" fill="#38BDF8" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold">CASINO SQUARE (T4)</text>
            <text x="120" y="245" fill="#A855F7" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold">FAIRMONT (T6)</text>
            <text x="630" y="278" fill="#FBBF24" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold">TUNNEL</text>
            <text x="490" y="358" fill="#FF1801" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold">TABAC (T12)</text>

            <!-- Dynamic Cars Layer -->
            <g id="carsLayer"></g>
        </svg>
        `;
        container.innerHTML = svgHTML;
    }

    function buildTrackLookupTable() {
        const path = document.getElementById('mainTrackPath');
        if (!path) return;

        const totalLength = path.getTotalLength();
        if (!totalLength || totalLength <= 0) return;

        trackLUT = [];
        const samples = 1500;

        for (let i = 0; i < samples; i++) {
            const s = (i / samples) * totalLength;
            const pt = path.getPointAtLength(s);

            const nextS = ((i + 4) / samples) * totalLength % totalLength;
            const nextPt = path.getPointAtLength(nextS);

            const dx = nextPt.x - pt.x;
            const dy = nextPt.y - pt.y;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            const len = Math.hypot(dx, dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;

            // Speed profile modifier along corners (0.65 in tight hairpins, 1.3 in straights)
            let speedProfile = 1.0;
            if (i < 200 || (i > 650 && i < 950)) speedProfile = 1.35; // Straights
            else if (i > 350 && i < 550) speedProfile = 0.70; // Fairmont Hairpin & Mirabeau
            else if (i > 1050 && i < 1250) speedProfile = 0.85; // Chicane & Tabac

            trackLUT.push({ x: pt.x, y: pt.y, angle, nx, ny, speedProfile });
        }
    }

    // ═══════════════════════════════════════
    // DRIVER SIMULATION MODEL & PERSISTENT SVG CARS
    // ═══════════════════════════════════════
    function initSimulationDrivers() {
        const sorted = [...DRIVERS_DB].sort((a, b) => b.habilidad - a.habilidad);

        simDrivers = sorted.map((driver, index) => {
            // Staggered grid formation
            const initialDist = 0.985 - (index * 0.045);
            // Alternating lateral racing line offset (-5px to +5px)
            const laneOffset = (index % 2 === 0 ? 1 : -1) * (2 + (index % 3) * 1.5);

            return {
                ...driver,
                gridSlot: index + 1,
                totalDistance: initialDist,
                lapProgress: initialDist * 100,
                laneOffset: laneOffset,
                targetLaneOffset: laneOffset,
                currentLap: 1,
                speedKmh: 240,
                // Calibrated baseline speed for smooth continuous movement (~14s per lap)
                baseSpeedFactor: 0.00115 + (driver.habilidad * 0.000004),
                paceModifier: 1.0,
                tyreWear: 100,
                bestLapTime: null,
                lastLapTime: null,
                gapToLeader: 0.0,
                isLeader: index === 0
            };
        });

        createPersistentCarSVGElements();
        populateDriverStatsTable(simDrivers);
    }

    function createPersistentCarSVGElements() {
        const layer = document.getElementById('carsLayer');
        if (!layer) return;
        layer.innerHTML = '';

        simDrivers.forEach(driver => {
            const teamColor = TEAMS_CONFIG[driver.equipo]?.color || '#ffffff';

            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.setAttribute("class", "svg-car-marker");
            g.setAttribute("id", `car-${driver.codigo}`);
            g.style.cursor = 'pointer';

            g.addEventListener('click', () => {
                selectDriver(driver.codigo);
            });

            // 1. Leader Pulse Ring
            const leaderPulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            leaderPulse.setAttribute("cx", "0");
            leaderPulse.setAttribute("cy", "0");
            leaderPulse.setAttribute("r", "16");
            leaderPulse.setAttribute("fill", "none");
            leaderPulse.setAttribute("stroke", teamColor);
            leaderPulse.setAttribute("stroke-width", "2");
            leaderPulse.setAttribute("class", "car-leader-pulse");
            leaderPulse.style.display = driver.isLeader ? "block" : "none";
            g.appendChild(leaderPulse);

            // 2. Halo Glow
            const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            halo.setAttribute("cx", "0");
            halo.setAttribute("cy", "0");
            halo.setAttribute("r", "11");
            halo.setAttribute("fill", teamColor);
            halo.setAttribute("opacity", "0.35");
            g.appendChild(halo);

            // 3. Directional Vehicle Body (Aerodynamic Capsule Arrow)
            const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
            body.setAttribute("d", "M 10 0 L -7 -5.5 L -3.5 0 L -7 5.5 Z");
            body.setAttribute("fill", teamColor);
            body.setAttribute("stroke", "#ffffff");
            body.setAttribute("stroke-width", "1.2");
            g.appendChild(body);

            // 4. White Cockpit Center Pip
            const pip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            pip.setAttribute("cx", "1");
            pip.setAttribute("cy", "0");
            pip.setAttribute("r", "2");
            pip.setAttribute("fill", "#ffffff");
            g.appendChild(pip);

            // 5. Driver Code Tag (Counter-rotated for perfect horizontal readability)
            const tagGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
            tagGroup.setAttribute("class", "car-tag-group");

            const tagBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            tagBg.setAttribute("x", "12");
            tagBg.setAttribute("y", "-8");
            tagBg.setAttribute("width", "30");
            tagBg.setAttribute("height", "16");
            tagBg.setAttribute("rx", "3.5");
            tagBg.setAttribute("fill", "rgba(4, 8, 20, 0.88)");
            tagBg.setAttribute("stroke", teamColor);
            tagBg.setAttribute("stroke-width", "1");
            tagGroup.appendChild(tagBg);

            const tagText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            tagText.setAttribute("x", "27");
            tagText.setAttribute("y", "3.5");
            tagText.setAttribute("text-anchor", "middle");
            tagText.setAttribute("font-family", "'JetBrains Mono', monospace");
            tagText.setAttribute("font-size", "8.5");
            tagText.setAttribute("font-weight", "800");
            tagText.setAttribute("fill", "#ffffff");
            tagText.textContent = driver.codigo;
            tagGroup.appendChild(tagText);

            g.appendChild(tagGroup);
            layer.appendChild(g);
        });

        renderAllCarsOnTrack();
    }

    function getTrackData(progress) {
        if (!trackLUT || trackLUT.length === 0) {
            return { x: 450, y: 420, angle: 0, nx: 0, ny: -1, speedProfile: 1.0 };
        }

        const p = ((progress % 1) + 1) % 1;
        const indexFloat = p * trackLUT.length;
        const idx0 = Math.floor(indexFloat) % trackLUT.length;
        const idx1 = (idx0 + 1) % trackLUT.length;
        const t = indexFloat - Math.floor(indexFloat);

        const d0 = trackLUT[idx0];
        const d1 = trackLUT[idx1];

        // Smooth interpolation
        const x = d0.x + (d1.x - d0.x) * t;
        const y = d0.y + (d1.y - d0.y) * t;

        // Angle interpolation with wrap handling
        let a0 = d0.angle;
        let a1 = d1.angle;
        if (a1 - a0 > 180) a1 -= 360;
        if (a1 - a0 < -180) a1 += 360;
        const angle = a0 + (a1 - a0) * t;

        const nx = d0.nx + (d1.nx - d0.nx) * t;
        const ny = d0.ny + (d1.ny - d0.ny) * t;
        const speedProfile = d0.speedProfile;

        return { x, y, angle, nx, ny, speedProfile };
    }

    function renderAllCarsOnTrack() {
        simDrivers.forEach(driver => {
            const carEl = document.getElementById(`car-${driver.codigo}`);
            if (!carEl) return;

            const { x, y, angle, nx, ny } = getTrackData(driver.totalDistance);

            // Apply lateral lane offset
            const finalX = x + (nx * driver.laneOffset);
            const finalY = y + (ny * driver.laneOffset);

            carEl.setAttribute("transform", `translate(${finalX.toFixed(2)}, ${finalY.toFixed(2)}) rotate(${angle.toFixed(1)})`);

            // Counter-rotate the tag so driver text stays horizontal
            const tagGroup = carEl.querySelector('.car-tag-group');
            if (tagGroup) {
                tagGroup.setAttribute("transform", `rotate(${(-angle).toFixed(1)})`);
            }

            // Update leader pulse
            const pulse = carEl.querySelector('.car-leader-pulse');
            if (pulse) {
                pulse.style.display = driver.isLeader ? "block" : "none";
            }
        });
    }

    function resetDriversToGrid() {
        simDrivers.forEach((driver, index) => {
            const gridDistance = 0.985 - (index * 0.02);
            driver.totalDistance = gridDistance;
            driver.lapProgress = gridDistance * 100;
            driver.currentLap = 0;
            driver.speedKmh = 0;
            driver.tyreWear = 100;
            driver.paceModifier = 1.0;
            driver.gapToLeader = 0.0;
            driver.isLeader = index === 0;
        });

        renderAllCarsOnTrack();
        renderLeaderboard();
    }

    // ═══════════════════════════════════════
    // REAL-TIME CONTINUOUS PHYSICS LOOP (60 FPS)
    // ═══════════════════════════════════════
    function startSimulationEngineLoop() {
        state.lastFrameTime = performance.now();

        function frame(now) {
            const dt = Math.min((now - state.lastFrameTime) / 1000, 0.05);
            state.lastFrameTime = now;

            if (state.isRacing) {
                advancePhysics(dt);
            }

            // Direct instant hardware render (0ms latency, 0 CSS transition collision)
            renderAllCarsOnTrack();
            updateSimulationRanking();

            state.animFrameId = requestAnimationFrame(frame);
        }

        state.animFrameId = requestAnimationFrame(frame);

        // Telemetry loop (every 100ms)
        state.telemetryTimer = setInterval(() => {
            const activeDriver = simDrivers.find(d => d.codigo === state.activeDriverCode) || simDrivers[0];

            if (!state.isRacing) {
                updateCockpitGauges(0, 0);
                return;
            }

            if (state.safetyCarDeployed) {
                updateCockpitGauges(130, 45);
            } else {
                const trackInfo = getTrackData(activeDriver.totalDistance);
                const targetSpd = Math.floor(activeDriver.speedKmh || (trackInfo.speedProfile * 240));
                const isFullThrottle = trackInfo.speedProfile > 1.1;
                updateCockpitGauges(targetSpd, isFullThrottle ? 100 : (trackInfo.speedProfile * 70));
            }

            updateDeltaChart();
            updateHeroTelemetry();

            if (state.currentLap === 5) logRadio("Presión en los neumáticos estabilizada en ventana óptima.");
            if (state.currentLap === 12) logRadio("Modo de motor STRAT-2 activado para defender posición.");
            if (state.currentLap === 20) logRadio("Monitoreando desgaste: 65% de vida útil en juego de blandos.");
        }, 100);
    }

    function advancePhysics(dt) {
        simDrivers.forEach(driver => {
            const trackInfo = getTrackData(driver.totalDistance);

            let speedMultiplier = driver.paceModifier * state.speedMultiplier * trackInfo.speedProfile;

            if (state.safetyCarDeployed) {
                speedMultiplier = 0.45 * state.speedMultiplier;
            } else {
                if (state.weather === 'LLUVIA') {
                    speedMultiplier *= (0.75 + (driver.experiencia * 0.002));
                }
            }

            // Smooth speed calculation (km/h)
            driver.speedKmh = Math.floor(speedMultiplier * 230 + (driver.habilidad * 0.6));

            // Smooth lateral lane convergence
            driver.laneOffset += (driver.targetLaneOffset - driver.laneOffset) * 0.05;

            // Distance advance
            const distanceDelta = driver.baseSpeedFactor * speedMultiplier * (dt * 60);
            driver.totalDistance += distanceDelta;
            driver.lapProgress = (driver.totalDistance % 1) * 100;

            const driverLap = Math.floor(driver.totalDistance) + 1;
            if (driver.isLeader && driverLap > state.currentLap) {
                state.currentLap = driverLap;

                const lapEl = document.getElementById('currentLapCounter');
                if (lapEl) lapEl.textContent = state.currentLap;

                const heroLapBadge = document.getElementById('heroLapBadge');
                if (heroLapBadge) heroLapBadge.textContent = `VUELTA ${state.currentLap}/53`;

                if (state.currentLap > state.totalLaps) endRace();
            }
        });

        // Overtaking & lateral lane shifting check
        for (let i = 0; i < simDrivers.length - 1; i++) {
            const dAhead = simDrivers[i];
            const dBehind = simDrivers[i + 1];
            const gap = dAhead.totalDistance - dBehind.totalDistance;

            // If behind car is within 0.015 distance, move to overtaking line
            if (gap < 0.02 && gap > 0) {
                dBehind.targetLaneOffset = -dAhead.laneOffset;
            }
        }
    }

    let lastLeaderboardOrder = "";

    function updateSimulationRanking() {
        simDrivers.sort((a, b) => b.totalDistance - a.totalDistance);

        const leader = simDrivers[0];
        leader.isLeader = true;

        simDrivers.forEach((driver, idx) => {
            if (idx > 0) driver.isLeader = false;

            const distanceGap = leader.totalDistance - driver.totalDistance;
            driver.gapToLeader = Number((distanceGap * BASE_LAP_TIME).toFixed(3));

            if (driver.codigo === state.activeDriverCode) {
                state.activeDriverPos = idx + 1;
                const hudPos = document.getElementById('hudPos');
                if (hudPos) hudPos.textContent = `P${idx + 1}`;
            }
        });

        const currentOrder = simDrivers.map(d => d.codigo).join(",");
        if (currentOrder !== lastLeaderboardOrder) {
            lastLeaderboardOrder = currentOrder;
            renderLeaderboard();
        }
    }

    function endRace() {
        state.isRacing = false;

        const dot = document.getElementById('simStatusDot');
        const text = document.getElementById('simStatusText');
        if (dot) dot.className = 'status-indicator finished';
        if (text) text.textContent = I18N[state.lang].finished;

        const winner = simDrivers[0];
        logRadio(`¡BANDERA A CUADROS EN MÓNACO! Victoria para ${winner.nombre} (${TEAMS_CONFIG[winner.equipo]?.name}).`);
        updateCockpitGauges(0, 0);
        playLightsOutSound();
    }

    // ═══════════════════════════════════════
    // LEADERBOARD & COCKPIT HUD
    // ═══════════════════════════════════════
    function renderLeaderboard() {
        const list = document.getElementById('leaderboardList');
        if (!list) return;

        list.innerHTML = '';

        simDrivers.forEach((driver, index) => {
            const teamInfo = TEAMS_CONFIG[driver.equipo] || { name: driver.equipo, color: '#fff' };
            const isLeader = index === 0;
            const gapStr = isLeader ? 'LÍDER' : `+${driver.gapToLeader.toFixed(3)}s`;
            const timeStr = `1:${(12 + (index % 3))}.${Math.floor(Math.random() * 800) + 100}`;
            const isActive = driver.codigo === state.activeDriverCode;

            const row = document.createElement('div');
            row.className = `sim-driver-row ${isActive ? 'active-driver' : ''}`;
            row.innerHTML = `
                <span class="sim-row-pos ${isLeader ? 'p1' : ''}">${index + 1}</span>
                <div class="sim-row-info">
                    <div class="sim-team-indicator" style="background: ${teamInfo.color}"></div>
                    <span class="sim-row-name">${driver.nombre}</span>
                </div>
                <span class="sim-row-time text-right">${timeStr}</span>
                <span class="sim-row-gap text-right ${isLeader ? 'leader' : ''}">${gapStr}</span>
                <div class="sim-row-tire text-right">
                    <span class="tire-pill ${index < 3 ? 'soft' : 'medium'}">${index < 3 ? 'S' : 'M'}</span>
                </div>
            `;

            row.addEventListener('click', () => {
                selectDriver(driver.codigo, index + 1);
            });

            list.appendChild(row);
        });
    }

    function selectDriver(driverCode, pos = null) {
        document.querySelectorAll('.sim-driver-row').forEach(r => r.classList.remove('active-driver'));
        state.activeDriverCode = driverCode;

        const driverIdx = simDrivers.findIndex(d => d.codigo === driverCode);
        const actualPos = pos || (driverIdx >= 0 ? driverIdx + 1 : 1);
        state.activeDriverPos = actualPos;

        const allRows = document.querySelectorAll('.sim-driver-row');
        if (allRows[driverIdx]) allRows[driverIdx].classList.add('active-driver');

        updateCockpitHUD(driverCode, simDrivers[driverIdx], null, actualPos);
        playTone(600, 'sine', 0.1, 0.08);
    }

    function updateCockpitHUD(driverCode, driverData = null, teamInfo = null, pos = null) {
        const targetDriver = driverData || simDrivers.find(x => x.codigo === driverCode) || simDrivers[0];
        if (!targetDriver) return;

        const team = teamInfo || TEAMS_CONFIG[targetDriver.equipo] || { name: targetDriver.equipo };

        const codeEl = document.getElementById('hudDriverCode');
        const nameEl = document.getElementById('hudDriverName');
        const teamEl = document.getElementById('hudDriverTeam');
        const posEl = document.getElementById('hudPos');

        if (codeEl) codeEl.textContent = targetDriver.codigo;
        if (nameEl) nameEl.textContent = targetDriver.nombre;
        if (teamEl) teamEl.textContent = team.name;
        if (posEl) posEl.textContent = `P${pos || state.activeDriverPos}`;

        const tireWearEl = document.getElementById('hudTireWear');
        if (tireWearEl) {
            const wear = Math.max(40, 100 - (state.currentLap * 1.2));
            tireWearEl.textContent = `${Math.floor(wear)}%`;
        }
    }

    function updateCockpitGauges(targetSpeed, throttlePct) {
        const speedEl = document.getElementById('hudSpeed');
        const dial = document.getElementById('speedDial');
        const gearEl = document.getElementById('hudGear');

        if (!speedEl) return;

        let currentSpeed = parseInt(speedEl.textContent) || 0;
        currentSpeed += (targetSpeed - currentSpeed) * 0.25;
        currentSpeed = Math.floor(currentSpeed);

        speedEl.textContent = currentSpeed;

        // Calibrate SVG stroke-dashoffset (Circumference ~212)
        let offset = 212 - ((Math.min(360, currentSpeed) / 360) * 212);
        if (offset < 0) offset = 0;
        if (dial) dial.style.strokeDashoffset = offset;

        let gear = 'N';
        if (currentSpeed > 5) gear = '1';
        if (currentSpeed > 60) gear = '2';
        if (currentSpeed > 105) gear = '3';
        if (currentSpeed > 150) gear = '4';
        if (currentSpeed > 195) gear = '5';
        if (currentSpeed > 240) gear = '6';
        if (currentSpeed > 280) gear = '7';
        if (currentSpeed > 310) gear = '8';
        if (gearEl) gearEl.textContent = gear;

        const thr = document.getElementById('hudThrottle');
        const brk = document.getElementById('hudBrake');

        if (thr) thr.style.height = `${throttlePct}%`;
        if (brk) brk.style.height = throttlePct === 0 ? '75%' : '0%';
    }

    function updateHeroTelemetry() {
        const heroTopSpeed = document.getElementById('heroTopSpeed');
        const heroTireWear = document.getElementById('heroTireWear');
        const heroBattery = document.getElementById('heroBattery');

        if (heroTopSpeed) {
            const spd = 310 + Math.floor(Math.random() * 28);
            heroTopSpeed.textContent = `${spd} KM/H`;
        }
        if (heroTireWear) {
            const wear = Math.max(50, 95 - Math.floor(state.currentLap * 1.1));
            heroTireWear.textContent = `${wear}%`;
        }
        if (heroBattery) {
            const batt = 70 + Math.floor(Math.random() * 25);
            heroBattery.textContent = `${batt}%`;
        }
    }

    // ═══════════════════════════════════════
    // SIMULATION CONTROLS & EVENT LISTENERS
    // ═══════════════════════════════════════
    function initSimControls() {
        const btnStart = document.getElementById('btnStartRace');
        const btnReset = document.getElementById('btnResetSim');
        const btnWeather = document.getElementById('btnChangeWeather');
        const btnSC = document.getElementById('btnTriggerSC');
        const btnSpeed = document.getElementById('btnSpeedMultiplier');

        if (btnStart) {
            btnStart.addEventListener('click', () => {
                startRaceSequence();
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', () => resetRace());
        }

        if (btnSpeed) {
            btnSpeed.addEventListener('click', () => {
                if (state.speedMultiplier === 1.0) state.speedMultiplier = 2.0;
                else if (state.speedMultiplier === 2.0) state.speedMultiplier = 4.0;
                else state.speedMultiplier = 1.0;

                const textEl = document.getElementById('speedMultiplierText');
                if (textEl) textEl.textContent = `${state.speedMultiplier}x`;
                playTone(520, 'sine', 0.1, 0.05);
            });
        }

        if (btnWeather) {
            btnWeather.addEventListener('click', () => {
                const weathers = ['LLUVIA', 'SOLEADO', 'NUBLADO'];
                const nextWeathers = weathers.filter(w => w !== state.weather);
                const w = nextWeathers[Math.floor(Math.random() * nextWeathers.length)];
                state.weather = w;
                state.weatherTemp = w === 'LLUVIA' ? 18 : (w === 'SOLEADO' ? 32 : 22);

                playTone(440, 'triangle', 0.25, 0.1);

                const weatherEl = document.getElementById('weatherText');
                if (weatherEl) {
                    const icon = w === 'LLUVIA' ? '🌧️' : (w === 'SOLEADO' ? '☀️' : '☁️');
                    weatherEl.textContent = `${icon} ${w} (${state.weatherTemp}°C)`;
                }
                logRadio(`Alerta meteorológica: Condiciones de ${w} en el circuito.`);
            });
        }

        if (btnSC) {
            btnSC.addEventListener('click', () => {
                state.safetyCarDeployed = !state.safetyCarDeployed;
                const dot = document.getElementById('flagDot');
                const text = document.getElementById('flagText');

                if (state.safetyCarDeployed) {
                    state.flag = 'YELLOW';
                    playTone(550, 'sawtooth', 0.4, 0.15);
                    if (dot) dot.className = 'flag-dot safety-car';
                    if (text) text.textContent = 'SAFETY CAR';
                    logRadio("¡SAFETY CAR DESPLEGADO! Reducción de delta obligatoria.");
                } else {
                    state.flag = 'GREEN';
                    playTone(770, 'triangle', 0.25, 0.1);
                    if (dot) dot.className = 'flag-dot green';
                    if (text) text.textContent = 'Bandera Verde';
                    logRadio("Safety Car entra a boxes. ¡Bandera Verde!");
                }
            });
        }
    }

    function startRaceSequence() {
        const banner = document.getElementById('gantryBanner');
        const lights = document.querySelectorAll('.pod-light');
        const btnStart = document.getElementById('btnStartRace');
        const btnReset = document.getElementById('btnResetSim');

        if (btnStart) btnStart.disabled = true;

        if (banner) {
            banner.textContent = "SECUENCIA DE SALIDA FIA";
            banner.classList.remove('lights-out');
        }

        let step = 0;
        const seq = setInterval(() => {
            if (step < lights.length) {
                lights[step].classList.add('active');
                playBeepLight();
                step++;
            } else {
                clearInterval(seq);
                setTimeout(() => {
                    lights.forEach(l => l.classList.remove('active'));
                    playLightsOutSound();

                    if (banner) {
                        banner.textContent = "¡LUCES APAGADAS Y ARRANCAMOS!";
                        banner.classList.add('lights-out');
                    }

                    state.isRacing = true;
                    state.currentLap = 1;

                    const lapEl = document.getElementById('currentLapCounter');
                    if (lapEl) lapEl.textContent = 1;

                    const heroLapBadge = document.getElementById('heroLapBadge');
                    if (heroLapBadge) heroLapBadge.textContent = 'VUELTA 1/53';

                    if (btnStart) btnStart.disabled = false;
                    if (btnReset) btnReset.disabled = false;

                    const dot = document.getElementById('simStatusDot');
                    const text = document.getElementById('simStatusText');
                    if (dot) dot.className = 'status-indicator racing';
                    if (text) text.textContent = I18N[state.lang].racing;

                    logRadio("¡Luces apagadas en Mónaco! Salida limpia hacia Sainte Dévote.");
                }, 500 + Math.random() * 400);
            }
        }, 300);
    }

    function resetRace() {
        state.isRacing = false;
        state.currentLap = 0;
        state.safetyCarDeployed = false;
        state.flag = 'GREEN';

        const lapEl = document.getElementById('currentLapCounter');
        if (lapEl) lapEl.textContent = 0;

        const btnReset = document.getElementById('btnResetSim');
        if (btnReset) btnReset.disabled = true;

        const dot = document.getElementById('simStatusDot');
        const text = document.getElementById('simStatusText');
        if (dot) dot.className = 'status-indicator ready';
        if (text) text.textContent = I18N[state.lang].waiting_start;

        const flagDot = document.getElementById('flagDot');
        const flagText = document.getElementById('flagText');
        if (flagDot) flagDot.className = 'flag-dot green';
        if (flagText) flagText.textContent = I18N[state.lang].flag_green;

        const banner = document.getElementById('gantryBanner');
        if (banner) {
            banner.textContent = "WAITING";
            banner.classList.remove('lights-out');
        }

        resetDriversToGrid();
        updateCockpitGauges(0, 0);
        logRadio(I18N[state.lang].radio_init);
    }

    // ═══════════════════════════════════════
    // VEHICLE SETUP FORM
    // ═══════════════════════════════════════
    function initSetupForm() {
        const form = document.getElementById('setupForm');
        const feedback = document.getElementById('setupFeedback');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const escuderiaId = document.getElementById('setupEscuderia').value;
            const aero = document.getElementById('setupAero').value;
            const tires = document.getElementById('setupTires').value;

            playTone(800, 'sine', 0.2, 0.1);

            simDrivers.forEach(d => {
                if (d.equipo === escuderiaId) {
                    if (aero === 'BAJA') d.baseSpeedFactor *= 1.04;
                    if (aero === 'ALTA') d.baseSpeedFactor *= 0.98;
                    if (tires === 'SOFT') d.paceModifier = 1.08;
                    if (tires === 'HARD') d.paceModifier = 0.96;
                }
            });

            const teamInfo = TEAMS_CONFIG[escuderiaId] || { name: escuderiaId };
            const titleEl = document.getElementById('setupFeedbackTitle');
            if (titleEl) titleEl.textContent = `SETUP APLICADO A ${teamInfo.name.toUpperCase()}`;

            let speed = "336 KM/H";
            let deg = "2.4% / vuelta";
            let grip = "Equilibrado";

            if (aero === 'ALTA') { speed = "318 KM/H"; grip = "Alto (Paso por curva superior)"; }
            if (aero === 'BAJA') { speed = "352 KM/H"; grip = "Bajo (Máxima velocidad punta)"; }
            if (tires === 'SOFT') { deg = "4.6% / vuelta (Agarre inicial máximo)"; }
            if (tires === 'HARD') { deg = "1.2% / vuelta (Máxima durabilidad)"; }

            if (feedback) {
                const statsGrid = feedback.querySelector('.feedback-stats-grid');
                if (statsGrid) {
                    statsGrid.innerHTML = `
                        <div class="feedback-stat-box">
                            <div class="stat-label">Velocidad Punta Est.</div>
                            <div class="stat-val ${aero === 'BAJA' ? 'positive' : ''}">${speed}</div>
                        </div>
                        <div class="feedback-stat-box">
                            <div class="stat-label">Degradación Estimada</div>
                            <div class="stat-val ${tires === 'SOFT' ? 'negative' : 'positive'}">${deg}</div>
                        </div>
                        <div class="feedback-stat-box">
                            <div class="stat-label">Agarre en Curva</div>
                            <div class="stat-val ${aero === 'ALTA' ? 'positive' : ''}">${grip}</div>
                        </div>
                    `;
                }
                feedback.classList.add('show');
                logRadio(`Configuración de monoplaza actualizada para ${teamInfo.name}.`);
                setTimeout(() => feedback.classList.remove('show'), 6000);
            }
        });
    }

    // ═══════════════════════════════════════
    // NAVIGATION, TABS & HERO ACTIONS
    // ═══════════════════════════════════════
    function initNavigation() {
        const navbar = document.getElementById('mainNav');
        if (navbar) {
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 30);
            });
        }

        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navLinks.classList.toggle('open');
            });
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        const btnEs = document.getElementById('btnLangEs');
        const btnEn = document.getElementById('btnLangEn');
        if (btnEs && btnEn) {
            btnEs.addEventListener('click', () => setLanguage('es'));
            btnEn.addEventListener('click', () => setLanguage('en'));
        }
    }

    function setLanguage(lang) {
        state.lang = lang;
        const btnEs = document.getElementById('btnLangEs');
        const btnEn = document.getElementById('btnLangEn');
        if (btnEs && btnEn) {
            btnEs.classList.toggle('active', lang === 'es');
            btnEn.classList.toggle('active', lang === 'en');
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (I18N[lang] && I18N[lang][key]) {
                el.innerHTML = I18N[lang][key];
            }
        });
    }

    function initHeroActions() {
        const btnHeroStart = document.getElementById('btnHeroStart');
        if (btnHeroStart) {
            btnHeroStart.addEventListener('click', () => {
                const simSec = document.getElementById('sim-engine');
                if (simSec) simSec.scrollIntoView({ behavior: 'smooth' });

                const trackTabBtn = document.getElementById('tab-btn-track');
                if (trackTabBtn) trackTabBtn.click();

                startRaceSequence();
            });
        }
    }

    function initTabs() {
        const tabBtns = document.querySelectorAll('.sim-tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                tabPanes.forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                const targetId = btn.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                if (targetPane) targetPane.classList.add('active');

                if (targetId === 'pane-track' && state.chartInstance) {
                    state.chartInstance.resize();
                }
            });
        });
    }

    function initDeltaChart() {
        const canvas = document.getElementById('deltaChart');
        if (!canvas || !window.Chart) return;

        try {
            const ctx = canvas.getContext('2d');
            state.chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: state.deltaHistory.map((_, i) => `L${i + 1}`),
                    datasets: [{
                        label: 'Delta (s)',
                        data: state.deltaHistory,
                        borderColor: '#00E676',
                        backgroundColor: 'rgba(0, 230, 118, 0.12)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false, min: -0.35, max: 0.1 }
                    },
                    animation: false
                }
            });
        } catch (e) {
            console.warn('Chart.js error:', e);
        }
    }

    function updateDeltaChart() {
        if (!state.chartInstance) return;
        const newDelta = Number((-0.03 - (Math.random() * 0.18)).toFixed(3));
        state.deltaHistory.shift();
        state.deltaHistory.push(newDelta);

        state.chartInstance.data.datasets[0].data = state.deltaHistory;
        state.chartInstance.update('none');

        const deltaEl = document.getElementById('hudDelta');
        if (deltaEl) {
            deltaEl.textContent = `${newDelta > 0 ? '+' : ''}${newDelta.toFixed(3)}s`;
        }
    }

    function populateDriverStatsTable(drivers) {
        const tbody = document.getElementById('driverStatsTbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        const sorted = [...drivers].sort((a, b) => b.habilidad - a.habilidad);

        sorted.forEach(driver => {
            const teamInfo = TEAMS_CONFIG[driver.equipo] || { name: driver.equipo, color: '#fff' };
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    <div class="driver-cell">
                        <div class="driver-number" style="color: ${teamInfo.color};">#${driver.numero}</div>
                        <div class="driver-info">
                            <span class="driver-name-text">${driver.nombre}</span>
                            <span class="driver-team-text">${teamInfo.name}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span style="font-weight:700;">${driver.habilidad} OVR</span>
                    <div class="stat-bar-container"><div class="stat-bar-fill" style="width: ${driver.habilidad}%; background: var(--f1-red);"></div></div>
                </td>
                <td>
                    <span style="font-weight:700;">${driver.experiencia}</span>
                    <div class="stat-bar-container"><div class="stat-bar-fill" style="width: ${driver.experiencia}%; background: var(--data-cyan);"></div></div>
                </td>
                <td>
                    <span style="font-weight:700;">${driver.gestionNeumaticos}</span>
                    <div class="stat-bar-container"><div class="stat-bar-fill" style="width: ${driver.gestionNeumaticos}%; background: var(--telemetry-green);"></div></div>
                </td>
                <td><span class="mono">${(driver.probabilidadError * 100).toFixed(1)}%</span></td>
            `;
            tbody.appendChild(tr);
        });
    }

    function logRadio(msg) {
        const el = document.getElementById('raceRadioMsg');
        if (el) {
            el.textContent = `[RADIO] ${msg}`;
            el.classList.remove('feed-pulse');
            void el.offsetWidth;
            el.classList.add('feed-pulse');
        }
    }

})();
