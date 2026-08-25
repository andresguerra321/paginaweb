/**
 * F1 SIM PRO — Core Simulation Engine & UI Controller
 * ===================================================
 * High-precision concurrent statistical racing engine.
 * Computes telemetry, driver attributes, tire degradation,
 * live SVG track animation, and interactive cockpit HUD.
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
    const BASE_LAP_TIME = 73.5; // Monaco baseline (seconds)

    const state = {
        isRacing: false,
        currentLap: 0,
        totalLaps: 53,
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
            hero_btn_start: 'Iniciar Demo',
            hero_btn_explore: 'Explorar Características',
            sim_title: 'Mission Control Room',
            sim_subtitle: 'Interactúa en tiempo real con la carrera. Cambia entre la telemetría gráfica en vivo, la tabla de estadísticas de pilotos, el setup aerodinámico y los principios del motor.',
            tab_track: 'Pista & Telemetría',
            tab_stats: 'Estadísticas de Pilotos',
            tab_config: 'Configuración de Escudería',
            tab_arch: 'Motor de Simulación',
            btn_start_race: 'Iniciar Demo',
            btn_weather: 'Clima',
            btn_sc: 'Safety Car',
            btn_reset: 'Reset',
            waiting_start: 'ESPERANDO INICIO',
            racing: 'CARRERA EN CURSO',
            sc_active: 'SAFETY CAR',
            finished: 'BANDERA A CUADROS',
            flag_green: 'Bandera Verde',
            flag_yellow: 'Safety Car Activo',
            radio_init: 'Monoplazas alineados en la recta de salida de Mónaco.',
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
            hero_btn_start: 'Launch Demo',
            hero_btn_explore: 'Explore Features',
            sim_title: 'Mission Control Room',
            sim_subtitle: 'Interact in real time with the race. Switch between live telemetry HUD, driver stats matrix, aerodynamic setup, and concurrency architecture.',
            tab_track: 'Track & Telemetry',
            tab_stats: 'Driver Statistics',
            tab_config: 'Team Setup',
            tab_arch: 'Simulation Engine',
            btn_start_race: 'Launch Demo',
            btn_weather: 'Weather',
            btn_sc: 'Safety Car',
            btn_reset: 'Reset',
            waiting_start: 'WAITING FOR START',
            racing: 'RACE IN PROGRESS',
            sc_active: 'SAFETY CAR',
            finished: 'CHECKERED FLAG',
            flag_green: 'Green Flag',
            flag_yellow: 'Safety Car Deployed',
            radio_init: 'Cars positioned on the Monaco starting grid.',
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
        initDeltaChart();
        initSimulationDrivers();
        initSimControls();
        initSetupForm();
        initHeroActions();

        renderLeaderboard();
        updateCockpitHUD(state.activeDriverCode);
        updateCockpitGauges(0, 0);

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
    // DRIVER SIMULATION MODEL & STARTING GRID
    // ═══════════════════════════════════════
    function initSimulationDrivers() {
        const sorted = [...DRIVERS_DB].sort((a, b) => b.habilidad - a.habilidad);

        simDrivers = sorted.map((driver, index) => {
            const gridDistance = 0.985 - (index * 0.015);
            return {
                ...driver,
                gridSlot: index + 1,
                totalDistance: gridDistance,
                lapProgress: gridDistance * 100,
                currentLap: 0,
                speedKmh: 0,
                baseSpeedFactor: 0.00032 + (driver.habilidad * 0.0000015),
                paceModifier: 1.0,
                tyreWear: 100,
                bestLapTime: null,
                lastLapTime: null,
                gapToLeader: 0.0,
                isLeader: index === 0
            };
        });

        updateAllCarsOnTrack();
        populateDriverStatsTable(simDrivers);
    }

    function resetDriversToGrid() {
        simDrivers.forEach((driver, index) => {
            const gridDistance = 0.985 - (index * 0.015);
            driver.totalDistance = gridDistance;
            driver.lapProgress = gridDistance * 100;
            driver.currentLap = 0;
            driver.speedKmh = 0;
            driver.tyreWear = 100;
            driver.paceModifier = 1.0;
            driver.gapToLeader = 0.0;
            driver.isLeader = index === 0;
        });

        updateAllCarsOnTrack();
        renderLeaderboard();
    }

    // ═══════════════════════════════════════
    // NAVIGATION & I18N
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

                setTimeout(() => {
                    if (!state.isRacing) startRaceSequence();
                }, 500);
            });
        }
    }

    // ═══════════════════════════════════════
    // TABS SWITCHER
    // ═══════════════════════════════════════
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

    // ═══════════════════════════════════════
    // DELTA TELEMETRY CHART
    // ═══════════════════════════════════════
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

    // ═══════════════════════════════════════
    // DRIVER STATS TABLE
    // ═══════════════════════════════════════
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
    // MONACO TRACK SVG & CAR RENDERING
    // ═══════════════════════════════════════
    function initTrackSVG() {
        const container = document.getElementById('trackContainer');
        if (!container) return;

        const svgHTML = `
        <svg viewBox="0 0 800 480" class="circuit-svg" id="f1CircuitSvg">
            <pattern id="circuitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuitGrid)" />
            
            <!-- Harbor Water Accent -->
            <path d="M 400 320 C 500 320, 600 330, 700 340 L 700 420 L 400 420 Z" fill="rgba(56, 189, 248, 0.03)" />
            
            <!-- Kerbs Glow Line -->
            <path d="M 450 410 L 520 410 C 560 410, 595 390, 595 345 C 595 300, 570 210, 535 155 C 505 105, 440 85, 385 100 C 345 112, 310 135, 280 160 C 255 180, 225 195, 225 220 C 225 245, 275 255, 315 262 C 355 268, 400 275, 440 280 C 485 285, 545 290, 600 295 C 660 300, 725 312, 740 332 C 750 350, 720 365, 675 365 C 630 365, 585 360, 540 360 C 495 360, 465 372, 425 372 C 385 372, 350 360, 305 360 C 260 360, 235 382, 245 408 C 255 428, 310 410, 380 410 L 450 410 Z" fill="none" stroke="rgba(225,6,0,0.22)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
            
            <!-- Asphalt Surface -->
            <path id="mainTrackPath" d="M 450 410 L 520 410 C 560 410, 595 390, 595 345 C 595 300, 570 210, 535 155 C 505 105, 440 85, 385 100 C 345 112, 310 135, 280 160 C 255 180, 225 195, 225 220 C 225 245, 275 255, 315 262 C 355 268, 400 275, 440 280 C 485 285, 545 290, 600 295 C 660 300, 725 312, 740 332 C 750 350, 720 365, 675 365 C 630 365, 585 360, 540 360 C 495 360, 465 372, 425 372 C 385 372, 350 360, 305 360 C 260 360, 235 382, 245 408 C 255 428, 310 410, 380 410 L 450 410 Z" fill="none" stroke="#0B1324" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
            
            <!-- Racing Line -->
            <path d="M 450 410 L 520 410 C 560 410, 595 390, 595 345 C 595 300, 570 210, 535 155 C 505 105, 440 85, 385 100 C 345 112, 310 135, 280 160 C 255 180, 225 195, 225 220 C 225 245, 275 255, 315 262 C 355 268, 400 275, 440 280 C 485 285, 545 290, 600 295 C 660 300, 725 312, 740 332 C 750 350, 720 365, 675 365 C 630 365, 585 360, 540 360 C 495 360, 465 372, 425 372 C 385 372, 350 360, 305 360 C 260 360, 235 382, 245 408 C 255 428, 310 410, 380 410 L 450 410 Z" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="6 6" stroke-linecap="round"/>
            
            <!-- Start/Finish Gantry Line -->
            <line x1="450" y1="398" x2="450" y2="422" stroke="#ffffff" stroke-width="3"/>
            <text x="450" y="440" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">SALIDA / META</text>
            
            <!-- Key Landmark Labels -->
            <text x="615" y="348" fill="#38BDF8" font-family="monospace" font-size="8" font-weight="bold">SAINTE DÉVOTE</text>
            <text x="410" y="78" fill="#38BDF8" font-family="monospace" font-size="8" font-weight="bold">CASINO</text>
            <text x="135" y="222" fill="#A855F7" font-family="monospace" font-size="8" font-weight="bold">FAIRMONT</text>
            <text x="680" y="280" fill="#FBBF24" font-family="monospace" font-size="8" font-weight="bold">TUNNEL</text>
            <text x="490" y="348" fill="#FF1801" font-family="monospace" font-size="8" font-weight="bold">TABAC</text>
            
            <g id="carsLayer"></g>
        </svg>
        `;
        container.innerHTML = svgHTML;
    }

    function updateAllCarsOnTrack() {
        const layer = document.getElementById('carsLayer');
        if (!layer) return;
        layer.innerHTML = '';

        simDrivers.forEach(driver => {
            const teamColor = TEAMS_CONFIG[driver.equipo]?.color || '#ffffff';

            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.setAttribute("class", "svg-car-marker");
            g.setAttribute("id", `car-${driver.codigo}`);

            if (driver.isLeader) {
                const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                pulse.setAttribute("cx", "0"); pulse.setAttribute("cy", "0");
                pulse.setAttribute("r", "9"); pulse.setAttribute("fill", teamColor);
                pulse.setAttribute("class", "car-pulse");
                g.appendChild(pulse);
            }

            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute("cx", "0"); dot.setAttribute("cy", "0");
            dot.setAttribute("r", driver.isLeader ? "5.5" : "4.5");
            dot.setAttribute("fill", teamColor);
            dot.setAttribute("stroke", "#040814");
            dot.setAttribute("stroke-width", "1.5");

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "8"); text.setAttribute("y", "3.5");
            text.setAttribute("fill", "#ffffff");
            text.setAttribute("font-family", "monospace");
            text.setAttribute("font-size", "10");
            text.setAttribute("font-weight", "bold");
            text.textContent = driver.codigo;

            g.appendChild(dot);
            g.appendChild(text);
            layer.appendChild(g);

            animateCarAlongPath(g, driver.lapProgress);
        });
    }

    function animateCarAlongPath(carElement, progressPct) {
        const path = document.getElementById('mainTrackPath');
        if (!path || !carElement) return;

        try {
            const length = path.getTotalLength();
            if (length > 0) {
                const pct = ((progressPct % 100) + 100) % 100;
                const pt = path.getPointAtLength((pct / 100) * length);
                carElement.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
            }
        } catch (e) {}
    }

    // ═══════════════════════════════════════
    // SIMULATION CONTROLS & RACE SEQUENCER
    // ═══════════════════════════════════════
    function initSimControls() {
        const btnStart = document.getElementById('btnStartRace');
        const btnReset = document.getElementById('btnResetSim');
        const btnWeather = document.getElementById('btnChangeWeather');
        const btnSC = document.getElementById('btnTriggerSC');

        if (btnStart) {
            btnStart.addEventListener('click', () => {
                if (!state.isRacing) startRaceSequence();
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', () => resetRace());
        }

        if (btnWeather) {
            btnWeather.addEventListener('click', () => {
                if (!state.isRacing) {
                    logRadio("Inicia la carrera para cambiar el clima.");
                    return;
                }
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
                if (!state.isRacing) {
                    logRadio("Inicia la carrera para desplegar el Safety Car.");
                    return;
                }
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
            banner.textContent = "SECUENCIA DE SALIDA";
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

                    if (btnReset) btnReset.disabled = false;

                    const dot = document.getElementById('simStatusDot');
                    const text = document.getElementById('simStatusText');
                    if (dot) dot.className = 'status-indicator racing';
                    if (text) text.textContent = I18N[state.lang].racing;

                    logRadio("¡Luces apagadas en Mónaco! Salida limpia hacia Sainte Dévote.");
                    startSimulationEngineLoop();
                }, 500 + Math.random() * 400);
            }
        }, 300);
    }

    function resetRace() {
        if (state.animFrameId) cancelAnimationFrame(state.animFrameId);
        if (state.telemetryTimer) clearInterval(state.telemetryTimer);

        state.isRacing = false;
        state.currentLap = 0;
        state.safetyCarDeployed = false;
        state.flag = 'GREEN';

        const lapEl = document.getElementById('currentLapCounter');
        if (lapEl) lapEl.textContent = 0;

        const btnStart = document.getElementById('btnStartRace');
        const btnReset = document.getElementById('btnResetSim');
        if (btnStart) btnStart.disabled = false;
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
    // REAL-TIME PHYSICS LOOP (60 FPS)
    // ═══════════════════════════════════════
    function startSimulationEngineLoop() {
        state.lastFrameTime = performance.now();

        function frame(now) {
            if (!state.isRacing) return;

            const dt = Math.min((now - state.lastFrameTime) / 1000, 0.1);
            state.lastFrameTime = now;

            advancePhysics(dt);
            updateAllCarsOnTrack();
            updateSimulationRanking();

            state.animFrameId = requestAnimationFrame(frame);
        }

        state.animFrameId = requestAnimationFrame(frame);

        state.telemetryTimer = setInterval(() => {
            if (!state.isRacing) return;

            const activeDriver = simDrivers.find(d => d.codigo === state.activeDriverCode) || simDrivers[0];

            if (state.safetyCarDeployed) {
                updateCockpitGauges(130, 45);
            } else {
                const isStraight = activeDriver.lapProgress < 15 || (activeDriver.lapProgress > 60 && activeDriver.lapProgress < 75);
                const targetSpd = isStraight ? (310 + Math.floor(Math.random() * 25)) : (140 + Math.floor(Math.random() * 30));
                updateCockpitGauges(targetSpd, isStraight ? 100 : 25);
            }

            updateDeltaChart();

            if (state.currentLap === 4) logRadio("Presión en los neumáticos estabilizada en ventana óptima.");
            if (state.currentLap === 10) logRadio("Modo de motor STRAT-2 activado para defender posición.");
            if (state.currentLap === 18) logRadio("Monitoreando desgaste: 65% de vida útil en juego de blandos.");
        }, 120);
    }

    function advancePhysics(dt) {
        simDrivers.forEach(driver => {
            let speedMultiplier = driver.paceModifier;

            if (state.safetyCarDeployed) {
                speedMultiplier = 0.35;
            } else {
                const microDelta = (Math.random() - 0.48) * 0.12;
                speedMultiplier += microDelta;

                if (state.weather === 'LLUVIA') {
                    speedMultiplier *= (0.75 + (driver.experiencia * 0.002));
                }
            }

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
        if (state.animFrameId) cancelAnimationFrame(state.animFrameId);
        if (state.telemetryTimer) clearInterval(state.telemetryTimer);
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
            const timeStr = `1:${(12 + Math.floor(Math.random() * 2))}.${Math.floor(Math.random() * 890) + 100}`;
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
                    <span class="tire-pill medium">M</span>
                </div>
            `;

            row.addEventListener('click', () => {
                document.querySelectorAll('.sim-driver-row').forEach(r => r.classList.remove('active-driver'));
                row.classList.add('active-driver');
                state.activeDriverCode = driver.codigo;
                state.activeDriverPos = index + 1;
                updateCockpitHUD(driver.codigo, driver, teamInfo, index + 1);
                playTone(600, 'sine', 0.1, 0.08);
            });

            list.appendChild(row);
        });
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
            const wear = Math.max(40, 100 - (state.currentLap * 1.3));
            tireWearEl.textContent = `${Math.floor(wear)}%`;
        }
    }

    function updateCockpitGauges(targetSpeed, throttlePct) {
        const speedEl = document.getElementById('hudSpeed');
        const dial = document.getElementById('speedDial');
        const gearEl = document.getElementById('hudGear');

        if (!speedEl) return;

        let currentSpeed = parseInt(speedEl.textContent) || 0;
        currentSpeed += (targetSpeed - currentSpeed) * 0.2;
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

    // ═══════════════════════════════════════
    // RADIO LOG
    // ═══════════════════════════════════════
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
