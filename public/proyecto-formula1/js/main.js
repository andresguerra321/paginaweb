import { api } from './api/f1ApiClient.js';

// ============================================================================
// SOUND SYNTHESIZER (Native Web Audio API - Zero External Dependencies)
// ============================================================================
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
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
    } catch (e) {
        // Audio optional
    }
}

function playBeepLight() {
    playTone(660, 'triangle', 0.18, 0.12);
}

function playLightsOutSound() {
    playTone(1320, 'square', 0.35, 0.15);
    setTimeout(() => playTone(880, 'sawtooth', 0.4, 0.1), 100);
}

// ============================================================================
// SIMULATION ENGINE STATE
// ============================================================================
const teamsConfig = {
    "RED_BULL": { name: "Red Bull Racing", color: "#3671C6" },
    "FERRARI": { name: "Scuderia Ferrari", color: "#E80020" },
    "MERCEDES": { name: "Mercedes-AMG", color: "#27F4D2" },
    "MCLAREN": { name: "McLaren F1 Team", color: "#FF8000" },
    "ASTON_MARTIN": { name: "Aston Martin", color: "#229971" }
};

let simDrivers = []; // Array of active driver simulation objects

let state = {
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
    lastFrameTime: performance.now()
};

// Base lap time at Monaco (seconds)
const BASE_LAP_TIME = 73.5;

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log("[F1 Sim Pro] Initializing unified simulation engine...");

    try {
        initNavigation();
        initTabs();
        initTrackSVG();
        initDeltaChart();
        
        // Load initial drivers and setup grid
        await initSimulationDrivers();
        
        initSimControls();
        initSetupForm();
        initHeroActions();
        
        // Render initial leaderboard & cockpit
        renderLeaderboard();
        updateCockpitHUD(state.activeDriverCode);
        updateCockpitGauges(0, 0);
        
        logRadio("Monoplazas alineados en la recta de salida de Mónaco.");
    } catch (err) {
        console.error("[F1 Sim Pro] Init error:", err);
    }
});

// ============================================================================
// DRIVER SIMULATION MODEL & STARTING GRID
// ============================================================================
async function initSimulationDrivers() {
    const rawDrivers = await api.getPilotos();
    
    // Initial qualifying order based on driver skill
    const sorted = [...rawDrivers].sort((a, b) => b.habilidad - a.habilidad);
    
    simDrivers = sorted.map((driver, index) => {
        // Starting grid formation on main straight just behind Start/Finish line (0.0 / 1.0)
        // P1: 0.985, P2: 0.970, P3: 0.955, etc.
        const gridDistance = 0.985 - (index * 0.015);
        
        return {
            ...driver,
            gridSlot: index + 1,
            totalDistance: gridDistance,
            lapProgress: gridDistance * 100,
            currentLap: 0,
            speedKmh: 0,
            baseSpeedFactor: 0.00032 + (driver.habilidad * 0.0000015), // Smooth progression per frame
            paceModifier: 1.0,
            tyreWear: 100,
            bestLapTime: null,
            lastLapTime: null,
            gapToLeader: 0.0,
            isLeader: index === 0
        };
    });
    
    // Position all cars onto their starting grid spots
    updateAllCarsOnTrack();
    populateDriverStatsTable(simDrivers);
}

// Reset grid back to starting positions
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

// ============================================================================
// HERO & NAVIGATION
// ============================================================================
function initNavigation() {
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
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
        btnEs.addEventListener('click', () => {
            btnEs.classList.add('active');
            btnEn.classList.remove('active');
        });
        btnEn.addEventListener('click', () => {
            btnEn.classList.add('active');
            btnEs.classList.remove('active');
        });
    }
}

function initHeroActions() {
    const btnHeroStart = document.getElementById('btnHeroStart');
    if (btnHeroStart) {
        btnHeroStart.addEventListener('click', () => {
            const simSec = document.getElementById('sim-engine');
            if (simSec) {
                simSec.scrollIntoView({ behavior: 'smooth' });
            }
            
            const trackTabBtn = document.getElementById('tab-btn-track');
            if (trackTabBtn) trackTabBtn.click();
            
            setTimeout(() => {
                if (!state.isRacing) {
                    startRaceSequence();
                }
            }, 500);
        });
    }
}

// ============================================================================
// TABS SWITCHER
// ============================================================================
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
            if (targetPane) {
                targetPane.classList.add('active');
            }
            
            if (targetId === 'pane-track' && state.chartInstance) {
                state.chartInstance.resize();
            }
        });
    });
}

// ============================================================================
// DELTA TELEMETRY CHART
// ============================================================================
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
                plugins: { 
                    legend: { display: false }, 
                    tooltip: { enabled: false } 
                },
                scales: {
                    x: { display: false },
                    y: { 
                        display: false, 
                        min: -0.35, 
                        max: 0.1 
                    }
                },
                animation: false
            }
        });
    } catch (e) {
        console.warn("Chart.js init failed:", e);
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

// ============================================================================
// TAB 2: DRIVER STATS TABLE
// ============================================================================
function populateDriverStatsTable(drivers) {
    const tbody = document.getElementById('driverStatsTbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    const sorted = [...drivers].sort((a, b) => b.habilidad - a.habilidad);
    
    sorted.forEach(driver => {
        const teamInfo = teamsConfig[driver.equipo] || { name: driver.equipo, color: '#fff' };
        const tr = document.createElement('tr');
        
        const skillW = Math.min(100, driver.habilidad);
        const expW = Math.min(100, driver.experiencia);
        const tireW = Math.min(100, driver.gestionNeumaticos);
        
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
                <div class="stat-bar-container"><div class="stat-bar-fill" style="width: ${skillW}%; background: var(--f1-red);"></div></div>
            </td>
            <td>
                <span style="font-weight:700;">${driver.experiencia}</span>
                <div class="stat-bar-container"><div class="stat-bar-fill" style="width: ${expW}%; background: var(--data-cyan);"></div></div>
            </td>
            <td>
                <span style="font-weight:700;">${driver.gestionNeumaticos}</span>
                <div class="stat-bar-container"><div class="stat-bar-fill" style="width: ${tireW}%; background: var(--telemetry-green);"></div></div>
            </td>
            <td><span class="mono">${(driver.probabilidadError * 100).toFixed(1)}%</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// ============================================================================
// TAB 3: VEHICLE SETUP FORM
// ============================================================================
function initSetupForm() {
    const form = document.getElementById('setupForm');
    const feedback = document.getElementById('setupFeedback');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const escuderiaId = document.getElementById('setupEscuderia').value;
        const aero = document.getElementById('setupAero').value;
        const tires = document.getElementById('setupTires').value;
        
        try {
            await api.putSetupVehiculo(escuderiaId, {
                cargaAerodinamica: aero,
                neumaticos: tires
            });
            
            playTone(800, 'sine', 0.2, 0.1);
            
            // Apply setup directly to driver physics
            simDrivers.forEach(d => {
                if (d.equipo === escuderiaId) {
                    if (aero === 'BAJA') d.baseSpeedFactor *= 1.04;
                    if (aero === 'ALTA') d.baseSpeedFactor *= 0.98;
                    if (tires === 'SOFT') d.paceModifier = 1.08;
                    if (tires === 'HARD') d.paceModifier = 0.96;
                }
            });
            
            const teamInfo = teamsConfig[escuderiaId] || { name: escuderiaId };
            const titleEl = document.getElementById('setupFeedbackTitle');
            if (titleEl) {
                titleEl.textContent = `SETUP APLICADO A ${teamInfo.name.toUpperCase()}`;
            }
            
            let speed = "336 KM/H";
            let deg = "2.4% / vuelta";
            let grip = "Equilibrado";
            
            if (aero === 'ALTA') { speed = "318 KM/H"; grip = "Alto (Mejor paso por curva)"; }
            if (aero === 'BAJA') { speed = "352 KM/H"; grip = "Bajo (Máxima velocidad punta)"; }
            
            if (tires === 'SOFT') { deg = "4.6% / vuelta (Agarre inicial máximo)"; }
            if (tires === 'HARD') { deg = "1.2% / vuelta (Máxima durabilidad)"; }
            
            if (feedback) {
                const statsGrid = feedback.querySelector('.feedback-stats-grid');
                if (statsGrid) {
                    statsGrid.innerHTML = `
                        <div class="feedback-stat-box">
                            <div class="stat-label">Velocidad Punta Estimada</div>
                            <div class="stat-val ${aero === 'BAJA' ? 'positive' : ''}">${speed}</div>
                        </div>
                        <div class="feedback-stat-box">
                            <div class="stat-label">Degradación de Neumáticos</div>
                            <div class="stat-val ${tires === 'SOFT' ? 'negative' : 'positive'}">${deg}</div>
                        </div>
                        <div class="feedback-stat-box">
                            <div class="stat-label">Agarre en Curva</div>
                            <div class="stat-val ${aero === 'ALTA' ? 'positive' : ''}">${grip}</div>
                        </div>
                    `;
                }
                
                feedback.classList.add('show');
                logRadio(`Configuración actualizada para ${teamInfo.name}.`);
                
                setTimeout(() => {
                    feedback.classList.remove('show');
                }, 7000);
            }
            
        } catch (error) {
            console.error("Error applying setup:", error);
        }
    });
}

// ============================================================================
// CIRCUIT TRACK SVG (CIRCUIT DE MONACO WITH ACCURATE STARTING GRID)
// ============================================================================

function initTrackSVG() {
    const container = document.getElementById('trackContainer');
    if (!container) return;
    
    // The Monaco Path begins at M 450 410 (Start/Finish line)
    // and travels around all 19 corners back to (450, 410)
    const svgHTML = `
    <svg viewBox="0 0 800 480" class="circuit-svg" id="f1CircuitSvg">
        <!-- Gridlines -->
        <pattern id="circuitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuitGrid)" />
        
        <!-- Harbor Water Accent -->
        <path d="M 400 320 C 500 320, 600 330, 700 340 L 700 420 L 400 420 Z" fill="rgba(56, 189, 248, 0.03)" />
        
        <!-- Track Kerbs Base (Monaco Red & White / Track Glow) -->
        <path d="M 450 410 L 520 410 C 560 410, 595 390, 595 345 C 595 300, 570 210, 535 155 C 505 105, 440 85, 385 100 C 345 112, 310 135, 280 160 C 255 180, 225 195, 225 220 C 225 245, 275 255, 315 262 C 355 268, 400 275, 440 280 C 485 285, 545 290, 600 295 C 660 300, 725 312, 740 332 C 750 350, 720 365, 675 365 C 630 365, 585 360, 540 360 C 495 360, 465 372, 425 372 C 385 372, 350 360, 305 360 C 260 360, 235 382, 245 408 C 255 428, 310 410, 380 410 L 450 410 Z" fill="none" stroke="rgba(225,6,0,0.22)" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
        
        <!-- Asphalt Track Surface -->
        <path id="mainTrackPath" d="M 450 410 L 520 410 C 560 410, 595 390, 595 345 C 595 300, 570 210, 535 155 C 505 105, 440 85, 385 100 C 345 112, 310 135, 280 160 C 255 180, 225 195, 225 220 C 225 245, 275 255, 315 262 C 355 268, 400 275, 440 280 C 485 285, 545 290, 600 295 C 660 300, 725 312, 740 332 C 750 350, 720 365, 675 365 C 630 365, 585 360, 540 360 C 495 360, 465 372, 425 372 C 385 372, 350 360, 305 360 C 260 360, 235 382, 245 408 C 255 428, 310 410, 380 410 L 450 410 Z" fill="none" stroke="#0B1324" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
        
        <!-- Racing Line -->
        <path d="M 450 410 L 520 410 C 560 410, 595 390, 595 345 C 595 300, 570 210, 535 155 C 505 105, 440 85, 385 100 C 345 112, 310 135, 280 160 C 255 180, 225 195, 225 220 C 225 245, 275 255, 315 262 C 355 268, 400 275, 440 280 C 485 285, 545 290, 600 295 C 660 300, 725 312, 740 332 C 750 350, 720 365, 675 365 C 630 365, 585 360, 540 360 C 495 360, 465 372, 425 372 C 385 372, 350 360, 305 360 C 260 360, 235 382, 245 408 C 255 428, 310 410, 380 410 L 450 410 Z" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" stroke-dasharray="6 6" stroke-linecap="round" stroke-linejoin="round"/>
        
        <!-- Tunnel Section Glow -->
        <path d="M 600 295 C 660 300, 725 312, 740 332" fill="none" stroke="rgba(251, 191, 36, 0.4)" stroke-width="4" stroke-linecap="round"/>

        <!-- Start / Finish Gantry Line at (450, 410) -->
        <line x1="450" y1="398" x2="450" y2="422" stroke="#ffffff" stroke-width="4"/>
        <text x="450" y="440" fill="rgba(255,255,255,0.7)" font-family="monospace" font-size="9" font-weight="bold" text-anchor="middle">SALIDA / META</text>

        <!-- Iconic Monaco Turn Landmark Badges -->
        <text x="615" y="348" fill="#38BDF8" font-family="monospace" font-size="8" font-weight="bold">SAINTE DÉVOTE (T1)</text>
        <text x="410" y="78" fill="#38BDF8" font-family="monospace" font-size="8" font-weight="bold">CASINO SQUARE (T4)</text>
        <text x="135" y="222" fill="#A855F7" font-family="monospace" font-size="8" font-weight="bold">FAIRMONT HAIRPIN (T6)</text>
        <text x="680" y="280" fill="#FBBF24" font-family="monospace" font-size="8" font-weight="bold">TUNNEL</text>
        <text x="735" y="380" fill="#A855F7" font-family="monospace" font-size="8" font-weight="bold">NOUVELLE CHICANE</text>
        <text x="490" y="348" fill="#FF1801" font-family="monospace" font-size="8" font-weight="bold">TABAC (T12)</text>
        <text x="375" y="352" fill="#FF1801" font-family="monospace" font-size="8" font-weight="bold">PISCINE (T14)</text>
        <text x="180" y="420" fill="#FF1801" font-family="monospace" font-size="8" font-weight="bold">LA RASCASSE (T18)</text>

        <!-- Dynamic Car Nodes -->
        <g id="carsLayer"></g>
    </svg>
    `;
    container.innerHTML = svgHTML;
}

function updateAllCarsOnTrack() {
    const layer = document.getElementById('carsLayer');
    if (!layer) return;
    layer.innerHTML = '';
    
    simDrivers.forEach((driver) => {
        const teamColor = teamsConfig[driver.equipo]?.color || '#ffffff';
        
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
            // Ensure positive wrap 0 to 100
            let pct = ((progressPct % 100) + 100) % 100;
            const pt = path.getPointAtLength((pct / 100) * length);
            carElement.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
        }
    } catch (e) {
        // Fallback
    }
}

// ============================================================================
// SIMULATION CONTROLS (START, RESET, CLIMA, SC)
// ============================================================================
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
            api.postEventosCarrera({ tipo: 'CLIMA', descripcion: w });
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
                if (text) text.textContent = 'BANDERA VERDE';
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
    
    // Quick 300ms intervals per light
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
                if (text) text.textContent = 'CARRERA EN CURSO';
                
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
    if (text) text.textContent = 'ESPERANDO INICIO';
    
    const flagDot = document.getElementById('flagDot');
    const flagText = document.getElementById('flagText');
    if (flagDot) flagDot.className = 'flag-dot green';
    if (flagText) flagText.textContent = 'Bandera Verde';
    
    const banner = document.getElementById('gantryBanner');
    if (banner) {
        banner.textContent = "WAITING";
        banner.classList.remove('lights-out');
    }
    
    resetDriversToGrid();
    updateCockpitGauges(0, 0);
    logRadio("Sesión reiniciada. Monoplazas posicionados en la parrilla de salida.");
}

// ============================================================================
// CONTINUOUS REAL-TIME PHYSICS SIMULATION LOOP (60 FPS)
// ============================================================================
function startSimulationEngineLoop() {
    state.lastFrameTime = performance.now();
    
    function frame(now) {
        if (!state.isRacing) return;
        
        const dt = Math.min((now - state.lastFrameTime) / 1000, 0.1);
        state.lastFrameTime = now;
        
        // Advance all drivers physics
        advancePhysics(dt);
        
        // Render updated car positions on SVG track
        updateAllCarsOnTrack();
        
        // Check if leaderboard order changed and sort accordingly
        updateSimulationRanking();
        
        state.animFrameId = requestAnimationFrame(frame);
    }
    
    state.animFrameId = requestAnimationFrame(frame);
    
    // Telemetry updates (Gauges, Delta Chart, Radio)
    state.telemetryTimer = setInterval(() => {
        if (!state.isRacing) return;
        
        // Find focused active driver
        const activeDriver = simDrivers.find(d => d.codigo === state.activeDriverCode) || simDrivers[0];
        
        if (state.safetyCarDeployed) {
            updateCockpitGauges(130, 45);
        } else {
            const isStraight = activeDriver.lapProgress < 15 || (activeDriver.lapProgress > 60 && activeDriver.lapProgress < 75);
            const targetSpd = isStraight ? (310 + Math.floor(Math.random() * 25)) : (140 + Math.floor(Math.random() * 30));
            updateCockpitGauges(targetSpd, isStraight ? 100 : 25);
        }
        
        updateDeltaChart();
        
        // Dynamic radio chatter on key laps
        if (state.currentLap === 4) logRadio("Presión en los neumáticos estabilizada en ventana óptima.");
        if (state.currentLap === 10) logRadio("Modo de motor STRAT-2 activado para defender posición.");
        if (state.currentLap === 18) logRadio("Monitoreando desgaste: 65% de vida útil en juego de blandos.");
        
    }, 120);
}

function advancePhysics(dt) {
    simDrivers.forEach((driver) => {
        // Speed calculation based on skill, weather, safety car, and random battle fluctuations
        let speedMultiplier = driver.paceModifier;
        
        if (state.safetyCarDeployed) {
            speedMultiplier = 0.35; // Controlled delta pace
        } else {
            // Natural race pace variance (slipstream, tire management, overtaking pushes)
            const microDelta = (Math.random() - 0.48) * 0.12;
            speedMultiplier += microDelta;
            
            if (state.weather === 'LLUVIA') {
                speedMultiplier *= (0.75 + (driver.experiencia * 0.002));
            }
        }
        
        // Advance distance (each 1.0 is 1 complete lap of Monaco)
        const distanceDelta = driver.baseSpeedFactor * speedMultiplier * (dt * 60);
        driver.totalDistance += distanceDelta;
        driver.lapProgress = (driver.totalDistance % 1) * 100;
        
        // Calculate laps completed
        const driverLap = Math.floor(driver.totalDistance) + 1;
        if (driver.isLeader && driverLap > state.currentLap) {
            state.currentLap = driverLap;
            
            const lapEl = document.getElementById('currentLapCounter');
            if (lapEl) lapEl.textContent = state.currentLap;
            
            const heroLapBadge = document.getElementById('heroLapBadge');
            if (heroLapBadge) heroLapBadge.textContent = `VUELTA ${state.currentLap}/53`;
            
            if (state.currentLap > state.totalLaps) {
                endRace();
            }
        }
    });
}

// Check positions and sort leaderboard dynamically
let lastLeaderboardOrder = "";

function updateSimulationRanking() {
    // Sort strictly by totalDistance descending (leader is the furthest ahead)
    simDrivers.sort((a, b) => b.totalDistance - a.totalDistance);
    
    // Update leader flag and calculate accurate gaps
    const leader = simDrivers[0];
    leader.isLeader = true;
    
    simDrivers.forEach((driver, idx) => {
        if (idx > 0) driver.isLeader = false;
        
        // Gap in seconds based on distance difference
        const distanceGap = leader.totalDistance - driver.totalDistance;
        driver.gapToLeader = Number((distanceGap * BASE_LAP_TIME).toFixed(3));
        
        if (driver.codigo === state.activeDriverCode) {
            state.activeDriverPos = idx + 1;
            const hudPos = document.getElementById('hudPos');
            if (hudPos) hudPos.textContent = `P${idx + 1}`;
        }
    });
    
    // Check if order changed to avoid excessive DOM re-renders
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
    if (text) text.textContent = 'BANDERA A CUADROS';
    
    const winner = simDrivers[0];
    logRadio(`¡BANDERA A CUADROS EN MÓNACO! Victoria para ${winner.nombre} (${teamsConfig[winner.equipo]?.name}).`);
    updateCockpitGauges(0, 0);
    playLightsOutSound();
}

// ============================================================================
// LEADERBOARD & COCKPIT HUD
// ============================================================================
function renderLeaderboard() {
    const list = document.getElementById('leaderboardList');
    if (!list) return;
    
    list.innerHTML = '';
    
    simDrivers.forEach((driver, index) => {
        const teamInfo = teamsConfig[driver.equipo] || { name: driver.equipo, color: '#fff' };
        const isLeader = index === 0;
        const gapStr = isLeader ? 'LÍDER' : `+${driver.gapToLeader.toFixed(3)}s`;
        
        // Simulated lap times
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
    
    const team = teamInfo || teamsConfig[targetDriver.equipo] || { name: targetDriver.equipo };
    
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
    
    let offset = 150 - ((currentSpeed / 350) * 150);
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

// ============================================================================
// UTILS
// ============================================================================
function logRadio(msg) {
    const el = document.getElementById('raceRadioMsg');
    if (el) {
        el.textContent = `[RADIO] ${msg}`;
        el.classList.remove('feed-pulse');
        void el.offsetWidth;
        el.classList.add('feed-pulse');
    }
}
