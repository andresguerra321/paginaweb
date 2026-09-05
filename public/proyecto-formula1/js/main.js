/**
 * ═══════════════════════════════════════════════════════════════════
 * F1 SIM PRO — OFFICIAL FORMULA 1 2026 MOTOR DE SIMULACIÓN FÍSICA
 * • Física no lineal a 60 FPS con aceleración, frenadas G y V_apex
 * • Aerodinámica activa F1 2026 (Straight Mode vs Corner Mode)
 * • Modelo térmico Pirelli de 4 ruedas & degradación de neumáticos
 * • Paradas en boxes (Pit Stops) & adelantamientos con rebufo
 * • Telemetría multicanal conmutable por piloto
 * • Comparador cara a cara interactivo (Head-to-Head)
 * • Cuenta regresiva en vivo del calendario 2026
 * ═══════════════════════════════════════════════════════════════════
 */

(function() {
    'use strict';

    /* ═══════════════════════════════════════════════════════════════
       1. DATABASE: 2026 GRID, DRIVERS & CONSTRUCTORS
       ═══════════════════════════════════════════════════════════════ */
    const DRIVERS_DB = [
        { id: 'VER', num: 1, name: 'Max Verstappen', team: 'Red Bull Ford', color: '#1E41FF', flag: 'NL', pts: 314, wins: 7, poles: 6, qualyPace: 98, racePace: 99, tireCare: 92, speedOffset: 1.04 },
        { id: 'LEC', num: 16, name: 'Charles Leclerc', team: 'Ferrari HP', color: '#E80020', flag: 'MC', pts: 298, wins: 5, poles: 8, qualyPace: 99, racePace: 96, tireCare: 90, speedOffset: 1.03 },
        { id: 'NOR', num: 4, name: 'Lando Norris', team: 'McLaren', color: '#FF8000', flag: 'GB', pts: 285, wins: 4, poles: 5, qualyPace: 97, racePace: 97, tireCare: 93, speedOffset: 1.025 },
        { id: 'HAM', num: 44, name: 'Lewis Hamilton', team: 'Ferrari HP', color: '#E80020', flag: 'GB', pts: 260, wins: 3, poles: 3, qualyPace: 95, racePace: 98, tireCare: 98, speedOffset: 1.02 },
        { id: 'RUS', num: 63, name: 'George Russell', team: 'Mercedes-AMG', color: '#27F4D2', flag: 'GB', pts: 218, wins: 2, poles: 2, qualyPace: 96, racePace: 94, tireCare: 89, speedOffset: 1.01 },
        { id: 'PIA', num: 81, name: 'Oscar Piastri', team: 'McLaren', color: '#FF8000', flag: 'AU', pts: 205, wins: 2, poles: 1, qualyPace: 94, racePace: 95, tireCare: 91, speedOffset: 1.005 },
        { id: 'ALO', num: 14, name: 'Fernando Alonso', team: 'Aston Martin', color: '#006F62', flag: 'ES', pts: 142, wins: 0, poles: 1, qualyPace: 92, racePace: 94, tireCare: 96, speedOffset: 0.995 },
        { id: 'ALB', num: 23, name: 'Alex Albon', team: 'Williams', color: '#00A0DE', flag: 'TH', pts: 78, wins: 0, poles: 0, qualyPace: 90, racePace: 89, tireCare: 91, speedOffset: 0.98 }
    ];

    const TEAMS_DB = [
        { name: 'Scuderia Ferrari HP', pu: 'Ferrari 066/12 (350kW ERS)', pts: 558, color: '#E80020', wins: 8, gap: 'LÍDER', chassis: 'SF-26' },
        { name: 'Red Bull Ford Powertrains', pu: 'Red Bull Ford DM-01', pts: 512, color: '#1E41FF', wins: 7, gap: '+46 PTS', chassis: 'RB22' },
        { name: 'McLaren Formula 1 Team', pu: 'Mercedes-AMG M17 E', pts: 490, color: '#FF8000', wins: 6, gap: '+68 PTS', chassis: 'MCL40' },
        { name: 'Mercedes-AMG PETRONAS', pu: 'Mercedes-AMG M17 E', pts: 384, color: '#27F4D2', wins: 2, gap: '+174 PTS', chassis: 'W17' },
        { name: 'Aston Martin Aramco F1', pu: 'Honda RA626H Hybrid', pts: 210, color: '#006F62', wins: 0, gap: '+348 PTS', chassis: 'AMR26' },
        { name: 'Williams Racing', pu: 'Mercedes-AMG M17 E', pts: 112, color: '#00A0DE', wins: 0, gap: '+446 PTS', chassis: 'FW48' },
        { name: 'Audi Revolut F1 Team', pu: 'Audi F1 Power Unit 1.6T', pts: 74, color: '#EE0000', wins: 0, gap: '+484 PTS', chassis: 'AU01' },
        { name: 'BWT Alpine F1 Team', pu: 'Mercedes-AMG M17 E', pts: 52, color: '#0090FF', wins: 0, gap: '+506 PTS', chassis: 'A526' }
    ];

    /* ═══════════════════════════════════════════════════════════════
       1B. 2D TOP-DOWN F1 2026 CAR SPRITE ASSETS (OpenGameArt / itch.io style)
       ═══════════════════════════════════════════════════════════════ */
    const DRIVER_SPRITES = {
        'VER': 'img/cars/topdown/topdown-redbull.png',
        'LEC': 'img/cars/topdown/topdown-ferrari.png',
        'HAM': 'img/cars/topdown/topdown-ferrari-44.png',
        'NOR': 'img/cars/topdown/topdown-mclaren.png',
        'PIA': 'img/cars/topdown/topdown-mclaren-81.png',
        'RUS': 'img/cars/topdown/topdown-mercedes.png',
        'ALO': 'img/cars/topdown/topdown-astonmartin.png',
        'ALB': 'img/cars/topdown/topdown-williams.png'
    };

    // Preload top-down car sprite textures into memory
    const carSpriteImages = {};
    Object.entries(DRIVER_SPRITES).forEach(([id, src]) => {
        const img = new Image();
        img.src = src;
        carSpriteImages[id] = img;
    });

    /* ═══════════════════════════════════════════════════════════════
       2. CIRCUIT TOPOLOGY & CORNER DATA (Mónaco GP Simulation)
       ═══════════════════════════════════════════════════════════════ */
    // Closed normalized spline points (0.0 to 1.0) with segment types:
    // S = Straight (Active Aero / Top Speed), C = Corner (Braking / Apex Speed), H = Hairpin
    const TRACK_POINTS = [
        { x: 0.15, y: 0.85, type: 'S', maxSpeed: 330, name: 'Pit Straight' },
        { x: 0.35, y: 0.85, type: 'C', maxSpeed: 110, name: 'Sainte Dévote' },
        { x: 0.48, y: 0.70, type: 'S', maxSpeed: 290, name: 'Beau Rivage' },
        { x: 0.62, y: 0.48, type: 'C', maxSpeed: 145, name: 'Massenet' },
        { x: 0.75, y: 0.40, type: 'C', maxSpeed: 125, name: 'Casino' },
        { x: 0.84, y: 0.46, type: 'C', maxSpeed: 95,  name: 'Mirabeau' },
        { x: 0.88, y: 0.58, type: 'H', maxSpeed: 60,  name: 'Loews Hairpin' },
        { x: 0.82, y: 0.70, type: 'C', maxSpeed: 85,  name: 'Portier' },
        { x: 0.88, y: 0.82, type: 'S', maxSpeed: 315, name: 'Tunnel Exit' },
        { x: 0.78, y: 0.88, type: 'C', maxSpeed: 80,  name: 'Nouvelle Chicane' },
        { x: 0.62, y: 0.90, type: 'C', maxSpeed: 170, name: 'Tabac' },
        { x: 0.48, y: 0.94, type: 'C', maxSpeed: 195, name: 'Swimming Pool' },
        { x: 0.32, y: 0.92, type: 'C', maxSpeed: 75,  name: 'La Rascasse' },
        { x: 0.20, y: 0.90, type: 'C', maxSpeed: 95,  name: 'Anthony Noghès' }
    ];

    /* ═══════════════════════════════════════════════════════════════
       3. SIMULATION STATE, PARTICLES & RACE CONTROL
       ═══════════════════════════════════════════════════════════════ */
    let isRunning = true;
    let simSpeed = 1; // 1x, 2x, 4x
    const BASE_SIM_SPEED = 2.4; // Real racing visual pace (~23s lap around Monaco)
    let activeDriverId = 'VER';
    let currentLap = 1;
    const TOTAL_LAPS = 53;
    let weatherMode = 'DRY'; // DRY, WET
    let raceTicks = 0;
    let raceState = 'GREEN'; // 'GREEN', 'YELLOW', 'VSC'

    // Particle system (brake smoke, sparks, ERS energy aura)
    const particles = [];
    function addParticle(p) {
        if (particles.length > 140) particles.shift();
        particles.push(p);
    }

    // Race Control live radio & event feed
    const raceControlEvents = [
        { time: '14:32:00', type: 'green', text: 'FIA: SESIÓN GP MÓNACO INICIADA // BANDERA VERDE' },
        { time: '14:32:04', type: 'green', text: 'DRS Y AERODINÁMICA ACTIVA 2026 HABILITADOS POR RACE CONTROL' }
    ];

    function logRaceEvent(type, text) {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        raceControlEvents.unshift({ time: timeStr, type, text });
        if (raceControlEvents.length > 8) raceControlEvents.pop();

        const listEl = document.getElementById('raceControlList');
        if (!listEl) return;
        listEl.innerHTML = raceControlEvents.map(ev => `
            <div class="race-event-item ${ev.type}">
                <span class="event-time">${ev.time}</span>
                <span class="event-badge ${ev.type}">${ev.type.toUpperCase()}</span>
                <span class="event-text">${ev.text}</span>
            </div>
        `).join('');
    }

    function setRaceState(newState, reason) {
        raceState = newState;
        const badge = document.getElementById('raceStateBadge');
        const text = document.getElementById('raceStateText');
        const flagBadge = document.getElementById('trackFlagBadge');

        if (badge) {
            badge.className = `situation-status-chip ${newState.toLowerCase()}`;
        }
        if (text) {
            if (newState === 'GREEN') text.textContent = 'PISTA LIBRE // BANDERA VERDE';
            else if (newState === 'YELLOW') text.textContent = 'BANDERA AMARILLA // S2 PELIGRO';
            else if (newState === 'VSC') text.textContent = 'VIRTUAL SAFETY CAR // DELTA ACTIVO';
        }
        if (flagBadge) {
            flagBadge.textContent = `BANDERA: ${newState === 'GREEN' ? 'VERDE' : (newState === 'YELLOW' ? 'AMARILLA S2' : 'VSC')}`;
            flagBadge.style.color = newState === 'GREEN' ? '#00D2BE' : (newState === 'YELLOW' ? '#FFB800' : '#FF8000');
        }
        logRaceEvent(newState.toLowerCase(), `FIA RACE CONTROL: ${reason}`);
    }

    // Build physical state for each car with complete 2026 dynamics
    const cars = DRIVERS_DB.map((driver, index) => {
        return {
            ...driver,
            trackProgress: ((1 - (index * 0.042)) % 1.0 + 1.0) % 1.0, // Staggered grid positions
            speed: 185, // km/h
            targetSpeed: 210,
            throttle: 0.85,
            brake: 0,
            gear: 4,
            rpm: 10600,
            batterySOC: 94 - (index * 2), // %
            tireWear: 8 + (index * 1.6), // %
            compound: index % 3 === 0 ? 'SOFT' : (index % 3 === 1 ? 'MEDIUM' : 'HARD'),
            tireTemps: { fl: 100, fr: 102, rl: 105, rr: 106 },
            inPitLane: false,
            pitState: 'NONE', // 'NONE', 'IN_LANE', 'STOPPED', 'EXITING'
            pitTimer: 0,
            wantsPit: false,
            lapCount: 1,
            gapToLeader: index === 0 ? 0 : index * 0.46,
            lastSectorTime: '18.420',
            currentSector: 1,
            activeAero: 'CORNER MODE',
            laneOffset: 0,
            targetLaneOffset: 0,
            longGForce: 0.9,
            isBrakingHard: false,
            ersDeployTimer: 0,
            lockupTimer: 0
        };
    });

    /* ═══════════════════════════════════════════════════════════════
       4. SPLINE INTERPOLATION & TRACK TOPOLOGY HELPER
       ═══════════════════════════════════════════════════════════════ */
    function getTrackPointAt(progress) {
        const p = ((progress % 1.0) + 1.0) % 1.0;
        const count = TRACK_POINTS.length;
        const exactIndex = p * count;
        const i1 = Math.floor(exactIndex) % count;
        const i2 = (i1 + 1) % count;
        const t = exactIndex - Math.floor(exactIndex);

        // Smooth cubic-like Hermite interpolation
        const pt1 = TRACK_POINTS[i1];
        const pt2 = TRACK_POINTS[i2];
        const smoothT = t * t * (3 - 2 * t);

        const x = pt1.x + (pt2.x - pt1.x) * smoothT;
        const y = pt1.y + (pt2.y - pt1.y) * smoothT;

        // Current target apex speed determined by track topology
        const maxSpeed = pt1.maxSpeed + (pt2.maxSpeed - pt1.maxSpeed) * smoothT;
        const segmentType = pt1.type;
        const segmentName = pt1.name;

        return { x, y, maxSpeed, segmentType, segmentName };
    }

    /* ═══════════════════════════════════════════════════════════════
       5. PHYSICAL INTEGRATION LOOP (60 FPS Non-Linear Newtonian Dynamics)
       ═══════════════════════════════════════════════════════════════ */
    function updatePhysics(dt) {
        if (!isRunning) return;

        raceTicks++;
        const scaledDt = dt * simSpeed;

        // Update active particles (smoke puffs, sparks, ERS aura)
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx * simSpeed;
            p.y += p.vy * simSpeed;
            p.radius = Math.max(0.2, p.radius + (p.growth || 0));
            p.alpha -= (p.fade || 0.03) * simSpeed;
            if (p.alpha <= 0.01) {
                particles.splice(i, 1);
            }
        }

        cars.forEach((car) => {
            // Sector calculation
            car.currentSector = car.trackProgress < 0.35 ? 1 : (car.trackProgress < 0.72 ? 2 : 3);

            // ═══════════════════════════════════════════════════════════
            // PIT STOP SYSTEM & PIT LANE DETOUR
            // ═══════════════════════════════════════════════════════════
            // Trigger pit stop when reaching pit entrance (between 0.93 and 0.98)
            if (car.wantsPit && !car.inPitLane) {
                if (car.trackProgress >= 0.92 || car.trackProgress <= 0.03) {
                    car.inPitLane = true;
                    car.pitState = 'IN_LANE';
                    car.wantsPit = false;
                    logRaceEvent('box', `${car.id} (${car.team}) ENTRA EN PIT LANE // VELOCIDAD LIMITADA A 60 KM/H`);
                }
            }

            if (car.inPitLane) {
                car.targetLaneOffset = 20; // Detour along pit lane line

                if (car.pitState === 'IN_LANE') {
                    // Slow down to 60 km/h pit limiter
                    car.targetSpeed = 60;
                    car.activeAero = 'PIT LIMITER 60 KM/H';
                    // Stop at the pit box location (around progress 0.02 - 0.05)
                    if (car.trackProgress >= 0.01 && car.trackProgress <= 0.06) {
                        car.pitState = 'STOPPED';
                        car.pitTimer = 2.4; // 2.4s stationary tire change
                        car.speed = 0;
                        logRaceEvent('box', `BOX BOX: ${car.id} DETENIDO EN GARAJE // CAMBIO DE NEUMÁTICOS 2.4s`);
                    }
                } else if (car.pitState === 'STOPPED') {
                    car.speed = 0;
                    car.throttle = 0;
                    car.brake = 1.0;
                    car.gear = 1;
                    car.rpm = 5200;
                    car.pitTimer -= scaledDt;

                    // Emit mechanic air gun sparks/dust
                    if (Math.random() < 0.3) {
                        addParticle({
                            x: 0, y: 0, // Assigned in render
                            vx: (Math.random() - 0.5) * 2,
                            vy: (Math.random() - 0.5) * 2,
                            radius: 2, growth: 0.1, alpha: 0.6, fade: 0.04, color: 'rgba(255, 255, 255, '
                        });
                    }

                    if (car.pitTimer <= 0) {
                        car.pitState = 'EXITING';
                        car.tireWear = 0; // Fresh tires
                        // Rotate tire compound
                        car.compound = car.compound === 'SOFT' ? 'MEDIUM' : (car.compound === 'MEDIUM' ? 'HARD' : 'SOFT');
                        car.tireTemps = { fl: 88, fr: 88, rl: 92, rr: 92 };
                        logRaceEvent('box', `${car.id} SALE DEL BOX // MONTA ${car.compound} NUEVO`);
                    }
                    return; // Stationary in box, do not advance track position
                } else if (car.pitState === 'EXITING') {
                    car.targetSpeed = 60;
                    car.activeAero = 'PIT EXIT ACELERACIÓN';
                    // Merge back onto track at Turn 1 (progress > 0.12)
                    if (car.trackProgress > 0.10 && car.trackProgress < 0.20) {
                        car.inPitLane = false;
                        car.pitState = 'NONE';
                        car.targetLaneOffset = 0;
                        logRaceEvent('green', `${car.id} SE INCORPORA A PISTA EN T1 // BANDERA VERDE`);
                    }
                }
            }

            // ═══════════════════════════════════════════════════════════
            // TARGET SPEED DYNAMICS (TOPOLOGY, AERO, COMPOUND & SITUATION)
            // ═══════════════════════════════════════════════════════════
            const trackPt = getTrackPointAt(car.trackProgress);
            let targetSpeed = trackPt.maxSpeed * car.speedOffset;

            // Weather modifier
            if (weatherMode === 'WET') targetSpeed *= 0.81;

            // Tire compound grip modifier
            const compoundGrip = car.compound === 'SOFT' ? 1.05 : (car.compound === 'MEDIUM' ? 1.0 : 0.95);
            targetSpeed *= compoundGrip;

            // Tire wear grip degradation (cliff after 45%)
            if (car.tireWear > 45) {
                const gripLoss = (car.tireWear - 45) * 0.0055;
                targetSpeed *= Math.max(0.72, 1 - gripLoss);
            }

            // Automatic scheduled pit stop when wear > 75%
            if (car.tireWear > 75 && !car.inPitLane && !car.wantsPit) {
                car.wantsPit = true;
            }

            // Active Aero F1 2026: Straight Mode (Low Drag) vs Corner Mode (High Downforce)
            if (!car.inPitLane) {
                if (trackPt.segmentType === 'S' && car.speed > 210) {
                    car.activeAero = 'STRAIGHT MODE (LOW DRAG)';
                    targetSpeed += 22; // Low drag aerodynamic boost
                } else {
                    car.activeAero = 'CORNER MODE (ALTA CARGA)';
                }
            }

            // ERS Attack Mode (350kW boost for 6s)
            if (car.ersDeployTimer > 0) {
                car.ersDeployTimer -= scaledDt;
                targetSpeed += 32;
                car.activeAero = 'MODO ATAQUE 350kW ACTIVO';
            }

            // Race Situation speed caps
            if (raceState === 'YELLOW' && car.currentSector === 2) {
                targetSpeed = Math.min(targetSpeed, 120); // Sector 2 hazard slow down
            } else if (raceState === 'VSC') {
                targetSpeed = Math.min(targetSpeed, 140); // Virtual Safety Car delta
            }

            // ═══════════════════════════════════════════════════════════
            // TRAFFIC, SLIPSTREAM & LATERAL OVERTAKE LINE SPLITTING
            // ═══════════════════════════════════════════════════════════
            if (!car.inPitLane) {
                car.targetLaneOffset = 0; // Default racing groove
            }

            // Find car immediately ahead
            let carAhead = null;
            let minGap = Infinity;
            cars.forEach(other => {
                if (other !== car && !other.inPitLane && !car.inPitLane) {
                    let gap = other.trackProgress - car.trackProgress;
                    if (gap < -0.5) gap += 1.0;
                    if (gap > 0 && gap < minGap) {
                        minGap = gap;
                        carAhead = other;
                    }
                }
            });

            // If close to car ahead (within ~110m)
            if (carAhead && minGap < 0.038) {
                if (trackPt.segmentType === 'S') {
                    // Straight: Slipstream tow (+16 km/h) & lateral overtake pull
                    targetSpeed += 16;
                    car.activeAero = 'REBUFO + OVERTAKE (DRS)';
                    car.targetLaneOffset = -7; // Trailing car darts to inside line
                    carAhead.targetLaneOffset = 5; // Leading car covers outside line

                    // Check if overtake succeeded
                    if (car.speed > carAhead.speed && minGap < 0.012) {
                        logRaceEvent('overtake', `ADELANTAMIENTO: ${car.id} SUPERA A ${carAhead.id} EN ${trackPt.segmentName.toUpperCase()}`);
                    }
                } else {
                    // In corners: Car ahead blocks apex, trailing car must match pace
                    if (minGap < 0.015) {
                        targetSpeed = Math.min(targetSpeed, carAhead.speed * 0.98);
                    }
                }
            }

            // ═══════════════════════════════════════════════════════════
            // NON-LINEAR ACCELERATION & 5G BRAKING DYNAMICS
            // ═══════════════════════════════════════════════════════════
            const speedDiff = targetSpeed - car.speed;
            const prevSpeed = car.speed;

            if (speedDiff > 0) {
                // Accelerating: Engine torque + ERS, reduced by aerodynamic drag (v^2)
                const dragResistance = (car.speed * car.speed) / 75000;
                const powerMultiplier = car.ersDeployTimer > 0 ? 1.45 : 1.0;
                const torqueCurve = car.speed < 120 ? 1.55 : (car.speed < 230 ? 1.1 : 0.78);
                const accelRate = Math.max(12, (52 * torqueCurve * powerMultiplier) - (dragResistance * 22));

                car.speed += accelRate * scaledDt;
                if (car.speed > targetSpeed) car.speed = targetSpeed;

                car.throttle = Math.min(1.0, 0.45 + (car.speed / targetSpeed) * 0.55);
                car.brake = 0;
                car.isBrakingHard = false;

                // Battery discharge under acceleration
                car.batterySOC = Math.max(12, car.batterySOC - (car.ersDeployTimer > 0 ? 0.38 : 0.08) * scaledDt);

                // G-Force (+0.8G to +1.8G)
                const accelMps2 = ((car.speed - prevSpeed) / 3.6) / (scaledDt || 0.016);
                car.longGForce = Math.min(2.1, Math.max(0.1, accelMps2 / 9.81));

            } else {
                // Hard Braking into apex (Up to 5.2G deceleration)
                const brakeRate = 96; // km/h/s base braking power
                car.speed += (speedDiff * 4.6) * scaledDt;
                if (car.speed < targetSpeed) car.speed = targetSpeed;

                car.brake = Math.min(1.0, Math.abs(speedDiff) / 36);
                car.throttle = 0;
                car.isBrakingHard = car.brake > 0.55;

                // MGU-K Energy Recovery under braking
                car.batterySOC = Math.min(100, car.batterySOC + 0.32 * scaledDt);

                // Deceleration G-Force (-1.2G to -5.2G)
                const decelMps2 = ((car.speed - prevSpeed) / 3.6) / (scaledDt || 0.016);
                car.longGForce = Math.max(-5.4, Math.min(-0.2, decelMps2 / 9.81));

                // Tire Lockup Trigger (Braking hard on degraded tires)
                if (car.brake > 0.82 && car.tireWear > 42 && Math.random() < 0.03 && car.lockupTimer <= 0) {
                    car.lockupTimer = 1.2;
                    logRaceEvent('yellow', `BLOQUEO DE FRENO: ${car.id} BLOQUEA RUEDA DELANTERA EN ${trackPt.segmentName}`);
                }
            }

            // Decrement lockup timer
            if (car.lockupTimer > 0) car.lockupTimer -= scaledDt;

            // Clamp velocity boundaries
            car.speed = Math.max(car.inPitLane && car.pitState === 'STOPPED' ? 0 : 45, Math.min(352, car.speed));

            // Gear & RPM calculations
            if (car.speed === 0) {
                car.gear = 'N';
                car.rpm = 5000;
            } else {
                car.gear = Math.max(1, Math.min(8, Math.floor(car.speed / 41) + 1));
                const baseGearSpeed = (car.gear - 1) * 41;
                const gearProgress = (car.speed - baseGearSpeed) / 41;
                car.rpm = Math.floor(9200 + gearProgress * 5400);
            }

            // Tire wear and heat progression
            car.tireWear += 0.0035 * (car.speed > 220 ? 1.25 : 0.85) * scaledDt;
            const lateralHeat = car.brake > 0.4 ? 2.2 : 0.4;
            car.tireTemps.fl = Math.round(98 + (car.speed / 340) * 15 + lateralHeat);
            car.tireTemps.fr = Math.round(101 + (car.speed / 340) * 17 + lateralHeat);
            car.tireTemps.rl = Math.round(103 + (car.speed / 340) * 14);
            car.tireTemps.rr = Math.round(105 + (car.speed / 340) * 16);

            // Smooth lateral lane offset interpolation
            car.laneOffset += (car.targetLaneOffset - car.laneOffset) * Math.min(1, 5 * scaledDt);

            // Advance Track Position
            if (car.speed > 0) {
                const speedMps = car.speed / 3.6;
                const progressDelta = (speedMps * scaledDt * BASE_SIM_SPEED) / 3337;
                const prevProgress = car.trackProgress;
                car.trackProgress = (car.trackProgress + progressDelta) % 1.0;

                // Lap crossing detection
                if (car.trackProgress < prevProgress && prevProgress > 0.85) {
                    car.lapCount++;
                    if (car === cars[0]) currentLap = Math.min(TOTAL_LAPS, car.lapCount);
                }
            }
        });

        // Re-sort Standings by Laps and Track Progress
        cars.sort((a, b) => {
            const scoreA = a.lapCount + a.trackProgress;
            const scoreB = b.lapCount + b.trackProgress;
            return scoreB - scoreA;
        });

        // Update gap to leader
        const leader = cars[0];
        cars.forEach((car, idx) => {
            if (idx === 0) {
                car.gapToLeader = 0;
            } else {
                const gapProgress = (leader.lapCount + leader.trackProgress) - (car.lapCount + car.trackProgress);
                car.gapToLeader = Math.max(0.1, gapProgress * 78.5);
            }
        });
    }

    /* ═══════════════════════════════════════════════════════════════
       6. CANVAS RENDERER: CIRCUITO Y MONOPLAZAS VECTORIALES F1 2026
       ═══════════════════════════════════════════════════════════════ */
    let canvas, ctx;

    function initCanvas() {
        canvas = document.getElementById('trackCanvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function renderTrack() {
        if (!canvas || !ctx) return;
        const width = canvas.getBoundingClientRect().width;
        const height = canvas.getBoundingClientRect().height;

        ctx.clearRect(0, 0, width, height);

        // 1. Draw Circuit Base Track
        ctx.beginPath();
        const steps = 220;
        for (let i = 0; i <= steps; i++) {
            const pt = getTrackPointAt(i / steps);
            const cx = pt.x * width;
            const cy = pt.y * height;
            if (i === 0) ctx.moveTo(cx, cy);
            else ctx.lineTo(cx, cy);
        }
        ctx.closePath();

        // Asphalt Track base
        ctx.strokeStyle = '#181b24';
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Dark Titanium Kerb borders
        ctx.strokeStyle = '#222736';
        ctx.lineWidth = 14;
        ctx.stroke();

        // High contrast racing groove
        ctx.strokeStyle = '#2c3345';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Racing Line (Dashed guide)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // 2. Draw Pit Lane Detour (Parallel line along pit straight)
        ctx.beginPath();
        for (let p = 0.93; p <= 1.0; p += 0.005) {
            const pt = getTrackPointAt(p);
            const nextPt = getTrackPointAt(p + 0.003);
            const angle = Math.atan2((nextPt.y - pt.y) * height, (nextPt.x - pt.x) * width);
            const nx = -Math.sin(angle);
            const ny = Math.cos(angle);
            const px = pt.x * width + nx * 20;
            const py = pt.y * height + ny * 20;
            if (p === 0.93) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        for (let p = 0.0; p <= 0.12; p += 0.005) {
            const pt = getTrackPointAt(p);
            const nextPt = getTrackPointAt(p + 0.003);
            const angle = Math.atan2((nextPt.y - pt.y) * height, (nextPt.x - pt.x) * width);
            const nx = -Math.sin(angle);
            const ny = Math.cos(angle);
            const px = pt.x * width + nx * 20;
            const py = pt.y * height + ny * 20;
            ctx.lineTo(px, py);
        }
        ctx.strokeStyle = 'rgba(255, 184, 0, 0.45)';
        ctx.lineWidth = 3;
        ctx.setLineDash([3, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Pit Box Marking
        const pitBoxPt = getTrackPointAt(0.035);
        const pitNextPt = getTrackPointAt(0.038);
        const pitAngle = Math.atan2((pitNextPt.y - pitBoxPt.y) * height, (pitNextPt.x - pitBoxPt.x) * width);
        const pitNx = -Math.sin(pitAngle);
        const pitNy = Math.cos(pitAngle);
        const pitBoxX = pitBoxPt.x * width + pitNx * 20;
        const pitBoxY = pitBoxPt.y * height + pitNy * 20;
        ctx.fillStyle = '#FFB800';
        ctx.fillRect(pitBoxX - 4, pitBoxY - 3, 8, 6);

        // 3. Draw Active DRS / Aero Zones
        ctx.strokeStyle = 'rgba(0, 210, 190, 0.45)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let i = 0; i <= 28; i++) {
            const pt = getTrackPointAt(i / 220);
            const cx = pt.x * width;
            const cy = pt.y * height;
            if (i === 0) ctx.moveTo(cx, cy);
            else ctx.lineTo(cx, cy);
        }
        ctx.stroke();

        // 4. Render Active Particles (Smoke puffs, sparks, ERS aura)
        particles.forEach(p => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `${p.color}${p.alpha})`;
            ctx.fill();
            ctx.restore();
        });

        // 5. Draw Cars as Vector F1 2026 Monoplazas
        cars.forEach((car) => {
            const pt = getTrackPointAt(car.trackProgress);
            const nextPt = getTrackPointAt(car.trackProgress + 0.003);
            const angle = Math.atan2((nextPt.y - pt.y) * height, (nextPt.x - pt.x) * width);
            const nx = -Math.sin(angle);
            const ny = Math.cos(angle);

            // Compute actual position on track applying lane separation
            const cx = pt.x * width + nx * car.laneOffset;
            const cy = pt.y * height + ny * car.laneOffset;

            // Emit sparks on straights at high speed
            if (car.speed > 280 && trackPt.segmentType === 'S' && Math.random() < 0.45) {
                const sparkAngle = angle + Math.PI + (Math.random() - 0.5) * 0.4;
                const sparkSpeed = 2.5 + Math.random() * 2.5;
                addParticle({
                    x: cx - Math.cos(angle) * 8,
                    y: cy - Math.sin(angle) * 8,
                    vx: Math.cos(sparkAngle) * sparkSpeed,
                    vy: Math.sin(sparkAngle) * sparkSpeed,
                    radius: 1.4, growth: -0.04, alpha: 0.95, fade: 0.05,
                    color: 'rgba(255, 190, 40, '
                });
            }

            // Emit smoke on brake lockup
            if (car.lockupTimer > 0 && Math.random() < 0.6) {
                addParticle({
                    x: cx + Math.cos(angle) * 6,
                    y: cy + Math.sin(angle) * 6,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    radius: 3 + Math.random() * 2,
                    growth: 0.18, alpha: 0.75, fade: 0.03,
                    color: 'rgba(235, 240, 250, '
                });
            }

            // Emit ERS attack aura motes
            if (car.ersDeployTimer > 0 && Math.random() < 0.5) {
                addParticle({
                    x: cx + (Math.random() - 0.5) * 14,
                    y: cy + (Math.random() - 0.5) * 14,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    radius: 1.5, growth: -0.03, alpha: 0.85, fade: 0.04,
                    color: 'rgba(0, 240, 255, '
                });
            }

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);

            // Ground Effect / Diffuser Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.beginPath();
            ctx.ellipse(0, 0, 18, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Active Driver Tracking Reticle
            if (car.id === activeDriverId) {
                ctx.beginPath();
                ctx.arc(0, 0, 22, 0, Math.PI * 2);
                ctx.strokeStyle = '#E10600';
                ctx.lineWidth = 1.6;
                ctx.setLineDash([4, 3]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // ERS Attack Mode Aura Halo
            if (car.ersDeployTimer > 0) {
                ctx.beginPath();
                ctx.arc(0, 0, 20, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
                ctx.lineWidth = 2.2;
                ctx.stroke();
            }

            // ── TOP-DOWN 2D F1 2026 MONOPLAZA SPRITE ──
            const spriteImg = carSpriteImages[car.id];
            const carLength = 38; // Length along track line (proportional to F1 2026 scale)
            const carWidth = 15.2; // Width across track (240x600 aspect ratio)

            if (spriteImg && (spriteImg.complete || spriteImg.naturalWidth > 0)) {
                ctx.save();
                // Rotate +90deg (PI/2) so the top-down SVG/PNG nose (pointing UP) aligns with +X forward motion
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(spriteImg, -carWidth / 2, -carLength / 2, carWidth, carLength);
                ctx.restore();
            } else {
                // High-contrast vector monoplaza fallback while image textures load
                const compoundColor = car.compound === 'SOFT' ? '#E10600' : (car.compound === 'MEDIUM' ? '#FFB800' : '#FFFFFF');
                ctx.fillStyle = '#111318';
                ctx.fillRect(6, -8, 6, 3.5);
                ctx.fillRect(6, 4.5, 6, 3.5);
                ctx.fillRect(-10, -9, 7, 4.2);
                ctx.fillRect(-10, 4.8, 7, 4.2);

                ctx.fillStyle = compoundColor;
                ctx.fillRect(7, -7, 4, 1.2);
                ctx.fillRect(7, 5.8, 4, 1.2);
                ctx.fillRect(-9, -8, 5, 1.4);
                ctx.fillRect(-9, 6.6, 5, 1.4);

                ctx.fillStyle = '#0B0D12';
                ctx.fillRect(12, -7, 2.5, 14);
                ctx.fillStyle = car.color;
                ctx.fillRect(13, -8, 2, 3);
                ctx.fillRect(13, 5, 2, 3);

                ctx.fillStyle = car.color;
                ctx.beginPath();
                ctx.moveTo(13, 0);
                ctx.lineTo(5, -3.5);
                ctx.lineTo(-4, -5.5);
                ctx.lineTo(-9, -4.5);
                ctx.lineTo(-9, 4.5);
                ctx.lineTo(-4, 5.5);
                ctx.lineTo(5, 3.5);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#060709';
                ctx.fillRect(-1.5, -2, 5, 4);
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(0.8, 0, 2, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = 'rgba(220, 225, 235, 0.85)';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(0.8, 0, 3, -Math.PI * 0.5, Math.PI * 0.5);
                ctx.stroke();

                ctx.fillStyle = '#0B0D12';
                ctx.fillRect(-11, -7, 2.5, 14);
                ctx.fillStyle = car.color;
                ctx.fillRect(-12, -8, 2.5, 2.5);
                ctx.fillRect(-12, 5.5, 2.5, 2.5);
            }

            // Rear Rain/Brake LED Light (Illuminates bright red under braking over the rear diffuser)
            if (car.isBrakingHard) {
                ctx.fillStyle = '#FF1801';
                ctx.shadowColor = '#FF1801';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(-carLength / 2 + 1.8, 0, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            } else {
                ctx.fillStyle = '#660505';
                ctx.fillRect(-carLength / 2 + 1, -1, 1.8, 2);
            }

            ctx.restore();

            // 8. Overhead Driver Badge Tag & Live Speed Indicator
            const tagX = cx + 11;
            const tagY = cy - 8;
            ctx.font = '700 8.5px "JetBrains Mono", monospace';
            const speedText = `${Math.round(car.speed)}`;
            
            // Badge background pill
            ctx.fillStyle = 'rgba(11, 14, 20, 0.85)';
            ctx.fillRect(tagX - 2, tagY - 8, 48, 11);
            ctx.strokeStyle = car.id === activeDriverId ? '#E10600' : 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1;
            ctx.strokeRect(tagX - 2, tagY - 8, 48, 11);

            // Team color dot
            ctx.fillStyle = car.color;
            ctx.fillRect(tagX, tagY - 6, 2.5, 7);

            // Driver Code & Speed text
            ctx.fillStyle = car.id === activeDriverId ? '#FFFFFF' : '#C8CED9';
            ctx.fillText(`${car.id} ${speedText}`, tagX + 5, tagY);
        });
    }

    /* ═══════════════════════════════════════════════════════════════
       7. DOM UPDATERS: TIMING TOWER & COCKPIT HUD
       ═══════════════════════════════════════════════════════════════ */
    function updateTimingTower() {
        const towerEl = document.getElementById('timingTowerRows');
        if (!towerEl) return;

        towerEl.innerHTML = cars.map((car, idx) => {
            const isActive = car.id === activeDriverId;
            const gapDisplay = idx === 0 
                ? '<span class="timing-gap leader">LÍDER</span>' 
                : `<span class="timing-gap">+${car.gapToLeader.toFixed(3)}s</span>`;
            
            const pitBadge = car.inPitLane ? '<span style="color: #FFB800; font-size: 9px; font-weight: 800; margin-left: 4px;">PIT</span>' : '';
            const compoundColor = car.compound === 'SOFT' ? '#E10600' : (car.compound === 'MEDIUM' ? '#FFB800' : '#FFFFFF');

            return `
                <div class="timing-row ${isActive ? 'active' : ''}" data-driver="${car.id}">
                    <span class="timing-pos">${idx + 1}</span>
                    <span class="timing-team-stripe" style="background: ${car.color};"></span>
                    <div class="timing-info">
                        <span class="timing-code">
                            ${car.id} 
                            <span style="font-size: 10px; color: #8E95A5;">#${car.num}</span>
                            <span style="font-size: 9px; font-weight: 800; color: ${compoundColor}; margin-left: 3px;">${car.compound[0]}</span>
                            ${pitBadge}
                        </span>
                        <span class="timing-team-name">${car.team}</span>
                    </div>
                    ${gapDisplay}
                </div>
            `;
        }).join('');

        // Wire click events to switch active driver
        towerEl.querySelectorAll('.timing-row').forEach(row => {
            row.addEventListener('click', () => {
                activeDriverId = row.getAttribute('data-driver');
                updateCockpitHUD();
            });
        });
    }

    function updateCockpitHUD() {
        const car = cars.find(c => c.id === activeDriverId) || cars[0];

        // Driver details
        const driverNameEl = document.getElementById('hudDriverName');
        const driverTeamEl = document.getElementById('hudDriverTeam');
        const driverNumEl = document.getElementById('hudDriverNum');
        if (driverNameEl) driverNameEl.textContent = car.name;
        if (driverTeamEl) driverTeamEl.textContent = `${car.team} · F1 2026`;
        if (driverNumEl) driverNumEl.textContent = car.num;

        // Top-Down Sprite Preview in HUD
        const topdownImgEl = document.getElementById('hudTopdownImg');
        if (topdownImgEl && DRIVER_SPRITES[car.id]) {
            topdownImgEl.src = DRIVER_SPRITES[car.id];
            topdownImgEl.alt = `${car.name} (${car.team}) Top-Down F1 2026`;
        }

        // Speed & Gear
        const speedValEl = document.getElementById('hudSpeedVal');
        const gearValEl = document.getElementById('hudGearVal');
        const rpmValEl = document.getElementById('hudRpmVal');
        const aeroValEl = document.getElementById('hudAeroMode');
        if (speedValEl) speedValEl.textContent = Math.round(car.speed);
        if (gearValEl) gearValEl.textContent = car.gear;
        if (rpmValEl) rpmValEl.textContent = `${car.rpm} RPM`;
        if (aeroValEl) aeroValEl.textContent = car.activeAero;

        // Longitudinal G-Force Indicator
        const gForceEl = document.getElementById('hudGforceVal');
        if (gForceEl) {
            const g = car.longGForce || 0;
            if (g >= 0) {
                gForceEl.textContent = `+${g.toFixed(1)}G`;
                gForceEl.style.color = '#00D2BE';
            } else {
                gForceEl.textContent = `${g.toFixed(1)}G`;
                gForceEl.style.color = '#E10600';
            }
        }

        // Live Active Aero & Attack Badges
        const aeroBadge = document.getElementById('liveAeroStatusBadge');
        if (aeroBadge) aeroBadge.textContent = car.activeAero;
        const attackBadge = document.getElementById('liveAttackStatusBadge');
        if (attackBadge) {
            attackBadge.style.display = car.ersDeployTimer > 0 ? 'inline-flex' : 'none';
        }

        // Shift Lights (13 LEDs based on RPM)
        const leds = document.querySelectorAll('.shift-led');
        const rpmRatio = Math.max(0, (car.rpm - 9000) / 5500);
        const ledsOn = Math.floor(rpmRatio * 13);
        leds.forEach((led, idx) => {
            if (idx < ledsOn) led.classList.add('on');
            else led.classList.remove('on');
        });

        // Throttle & Brake Bars
        const throttleBar = document.getElementById('hudThrottleBar');
        const brakeBar = document.getElementById('hudBrakeBar');
        const throttleVal = document.getElementById('hudThrottleVal');
        const brakeVal = document.getElementById('hudBrakeVal');
        if (throttleBar) throttleBar.style.width = `${Math.round(car.throttle * 100)}%`;
        if (brakeBar) brakeBar.style.width = `${Math.round(car.brake * 100)}%`;
        if (throttleVal) throttleVal.textContent = `${Math.round(car.throttle * 100)}%`;
        if (brakeVal) brakeVal.textContent = `${Math.round(car.brake * 100)}%`;

        // Battery & Tires
        const batteryVal = document.getElementById('hudBatteryVal');
        const tireWearVal = document.getElementById('hudTireWearVal');
        if (batteryVal) batteryVal.textContent = `${Math.round(car.batterySOC)}% MGU-K`;
        if (tireWearVal) tireWearVal.textContent = `${Math.round(car.tireWear)}% DESGASTE`;

        // Pirelli Thermals
        const fl = document.getElementById('tempFL');
        const fr = document.getElementById('tempFR');
        const rl = document.getElementById('tempRL');
        const rr = document.getElementById('tempRR');
        if (fl) fl.textContent = `${car.tireTemps.fl}°C`;
        if (fr) fr.textContent = `${car.tireTemps.fr}°C`;
        if (rl) rl.textContent = `${car.tireTemps.rl}°C`;
        if (rr) rr.textContent = `${car.tireTemps.rr}°C`;

        // Floating Track Status
        const lapBadge = document.getElementById('trackLapBadge');
        if (lapBadge) lapBadge.textContent = `VUELTA ${currentLap}/${TOTAL_LAPS}`;
    }

    /* ═══════════════════════════════════════════════════════════════
       8. HEAD-TO-HEAD COMPARATOR LOGIC
       ═══════════════════════════════════════════════════════════════ */
    function initComparator() {
        const selectA = document.getElementById('compDriverA');
        const selectB = document.getElementById('compDriverB');
        if (!selectA || !selectB) return;

        // Populate selects
        const optionsHtml = DRIVERS_DB.map(d => `<option value="${d.id}">${d.name} (${d.team})</option>`).join('');
        selectA.innerHTML = optionsHtml;
        selectB.innerHTML = optionsHtml;

        selectA.value = 'LEC';
        selectB.value = 'VER';

        function updateComparison() {
            const d1 = DRIVERS_DB.find(d => d.id === selectA.value) || DRIVERS_DB[0];
            const d2 = DRIVERS_DB.find(d => d.id === selectB.value) || DRIVERS_DB[1];

            // Points
            const ptsLeft = document.getElementById('h2hPtsLeft');
            const ptsRight = document.getElementById('h2hPtsRight');
            const ptsBarLeft = document.getElementById('h2hPtsBarLeft');
            const ptsBarRight = document.getElementById('h2hPtsBarRight');
            if (ptsLeft) ptsLeft.textContent = d1.pts;
            if (ptsRight) ptsRight.textContent = d2.pts;
            const maxPts = Math.max(d1.pts, d2.pts, 1);
            if (ptsBarLeft) ptsBarLeft.style.width = `${(d1.pts / maxPts) * 100}%`;
            if (ptsBarRight) ptsBarRight.style.width = `${(d2.pts / maxPts) * 100}%`;

            // Wins
            const winsLeft = document.getElementById('h2hWinsLeft');
            const winsRight = document.getElementById('h2hWinsRight');
            const winsBarLeft = document.getElementById('h2hWinsBarLeft');
            const winsBarRight = document.getElementById('h2hWinsBarRight');
            if (winsLeft) winsLeft.textContent = d1.wins;
            if (winsRight) winsRight.textContent = d2.wins;
            const maxWins = Math.max(d1.wins, d2.wins, 1);
            if (winsBarLeft) winsBarLeft.style.width = `${(d1.wins / maxWins) * 100}%`;
            if (winsBarRight) winsBarRight.style.width = `${(d2.wins / maxWins) * 100}%`;

            // Qualy Pace
            const qualyLeft = document.getElementById('h2hQualyLeft');
            const qualyRight = document.getElementById('h2hQualyRight');
            const qualyBarLeft = document.getElementById('h2hQualyBarLeft');
            const qualyBarRight = document.getElementById('h2hQualyBarRight');
            if (qualyLeft) qualyLeft.textContent = `${d1.qualyPace}%`;
            if (qualyRight) qualyRight.textContent = `${d2.qualyPace}%`;
            if (qualyBarLeft) qualyBarLeft.style.width = `${d1.qualyPace}%`;
            if (qualyBarRight) qualyBarRight.style.width = `${d2.qualyPace}%`;

            // Race Pace
            const raceLeft = document.getElementById('h2hRaceLeft');
            const raceRight = document.getElementById('h2hRaceRight');
            const raceBarLeft = document.getElementById('h2hRaceBarLeft');
            const raceBarRight = document.getElementById('h2hRaceBarRight');
            if (raceLeft) raceLeft.textContent = `${d1.racePace}%`;
            if (raceRight) raceRight.textContent = `${d2.racePace}%`;
            if (raceBarLeft) raceBarLeft.style.width = `${d1.racePace}%`;
            if (raceBarRight) raceBarRight.style.width = `${d2.racePace}%`;

            // Tire Care
            const tireLeft = document.getElementById('h2hTireLeft');
            const tireRight = document.getElementById('h2hTireRight');
            const tireBarLeft = document.getElementById('h2hTireBarLeft');
            const tireBarRight = document.getElementById('h2hTireBarRight');
            if (tireLeft) tireLeft.textContent = `${d1.tireCare}%`;
            if (tireRight) tireRight.textContent = `${d2.tireCare}%`;
            if (tireBarLeft) tireBarLeft.style.width = `${d1.tireCare}%`;
            if (tireBarRight) tireBarRight.style.width = `${d2.tireCare}%`;
        }

        selectA.addEventListener('change', updateComparison);
        selectB.addEventListener('change', updateComparison);
        updateComparison();
    }

    /* ═══════════════════════════════════════════════════════════════
       9. COUNTDOWN TIMER: 2026 CALENDAR NEXT GP
       ═══════════════════════════════════════════════════════════════ */
    function initCountdown() {
        // Target: Monaco GP May 24, 2026
        const targetDate = new Date('2026-05-24T13:00:00Z').getTime();

        function tick() {
            const now = new Date().getTime();
            const diff = Math.max(0, targetDate - now);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            const dEl = document.getElementById('countDays');
            const hEl = document.getElementById('countHours');
            const mEl = document.getElementById('countMins');
            const sEl = document.getElementById('countSecs');

            if (dEl) dEl.textContent = String(days).padStart(2, '0');
            if (hEl) hEl.textContent = String(hours).padStart(2, '0');
            if (mEl) mEl.textContent = String(mins).padStart(2, '0');
            if (sEl) sEl.textContent = String(secs).padStart(2, '0');
        }

        tick();
        setInterval(tick, 1000);
    }

    /* ═══════════════════════════════════════════════════════════════
       10. SIMULATION CONTROLS & EVENT WIRING
       ═══════════════════════════════════════════════════════════════ */
    function initControls() {
        // Play / Pause
        const btnPlay = document.getElementById('btnSimPlay');
        if (btnPlay) {
            btnPlay.addEventListener('click', () => {
                isRunning = !isRunning;
                btnPlay.textContent = isRunning ? 'PAUSA' : 'REANUDAR';
                btnPlay.classList.toggle('active', isRunning);
            });
        }

        // Speed multipliers
        const speedBtns = document.querySelectorAll('[data-speed]');
        speedBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                speedBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                simSpeed = parseFloat(btn.getAttribute('data-speed')) || 1;
            });
        });

        // Weather toggle
        const btnWeather = document.getElementById('btnSimWeather');
        if (btnWeather) {
            btnWeather.addEventListener('click', () => {
                weatherMode = weatherMode === 'DRY' ? 'WET' : 'DRY';
                btnWeather.textContent = weatherMode === 'DRY' ? 'CLIMA: SECO' : 'CLIMA: LLUVIA';
                btnWeather.classList.toggle('active', weatherMode === 'WET');
                logRaceEvent(weatherMode === 'WET' ? 'yellow' : 'green', `METEOROLOGÍA: ${weatherMode === 'WET' ? 'LLUVIA EN PISTA // NEUMÁTICOS INTERMEDIOS HABILITADOS' : 'PISTA SECA // CONDICIONES ÓPTIMAS'}`);
            });
        }

        // ═══════════════════════════════════════════════════════════
        // RACE SITUATION CONTROLLER BUTTONS (ERS, BOX, INCIDENTE)
        // ═══════════════════════════════════════════════════════════
        const btnTriggerERS = document.getElementById('btnTriggerERS');
        if (btnTriggerERS) {
            btnTriggerERS.addEventListener('click', () => {
                const car = cars.find(c => c.id === activeDriverId) || cars[0];
                if (car) {
                    car.ersDeployTimer = 6.0; // 6s burst of 350kW hybrid power
                    logRaceEvent('fastest', `⚡ MODO ATAQUE 350kW: ${car.id} (${car.team}) activa despliegue de potencia máxima MGU-K`);
                    btnTriggerERS.classList.add('active');
                    setTimeout(() => { if (btnTriggerERS) btnTriggerERS.classList.remove('active'); }, 6000);
                }
            });
        }

        const btnTriggerBox = document.getElementById('btnTriggerBox');
        if (btnTriggerBox) {
            btnTriggerBox.addEventListener('click', () => {
                const car = cars.find(c => c.id === activeDriverId) || cars[0];
                if (car) {
                    car.wantsPit = true;
                    logRaceEvent('box', `🛠️ RADIO ${car.id}: "BOX, BOX, BOX este giro para parada y cambio de compuestos"`);
                    btnTriggerBox.classList.add('active');
                    setTimeout(() => { if (btnTriggerBox) btnTriggerBox.classList.remove('active'); }, 5000);
                }
            });
        }

        const btnTriggerIncident = document.getElementById('btnTriggerIncident');
        if (btnTriggerIncident) {
            btnTriggerIncident.addEventListener('click', () => {
                if (raceState === 'GREEN') {
                    setRaceState('YELLOW', 'INCIDENTE EN SECTOR 2 // BANDERA AMARILLA EN PISTA');
                } else if (raceState === 'YELLOW') {
                    setRaceState('VSC', 'VIRTUAL SAFETY CAR DESPLEGADO // MANTENER DELTA POSITIVO');
                } else {
                    setRaceState('GREEN', 'PISTA DESPEJADA // BANDERA VERDE // DRS REHABILITADO');
                }
            });
        }

        // ═══════════════════════════════════════════════════════════
        // ESCUDERÍAS CAR VIEW TOGGLE (PERFIL LATERAL vs VISTA CENITAL 2D)
        // ═══════════════════════════════════════════════════════════
        const btnCarViewProfile = document.getElementById('btnCarViewProfile');
        const btnCarViewTopDown = document.getElementById('btnCarViewTopDown');

        function setCarView(mode) {
            const stages = document.querySelectorAll('.f1-team-car-stage');
            const carImgs = document.querySelectorAll('.f1-team-car-img');

            if (mode === 'topdown') {
                if (btnCarViewTopDown) btnCarViewTopDown.classList.add('active');
                if (btnCarViewProfile) btnCarViewProfile.classList.remove('active');
                stages.forEach(st => st.classList.add('view-topdown'));
                carImgs.forEach(img => {
                    const topdownSrc = img.getAttribute('data-topdown');
                    if (topdownSrc) img.src = topdownSrc;
                });
            } else {
                if (btnCarViewProfile) btnCarViewProfile.classList.add('active');
                if (btnCarViewTopDown) btnCarViewTopDown.classList.remove('active');
                stages.forEach(st => st.classList.remove('view-topdown'));
                carImgs.forEach(img => {
                    const profileSrc = img.getAttribute('data-profile');
                    if (profileSrc) img.src = profileSrc;
                });
            }
        }

        if (btnCarViewProfile) {
            btnCarViewProfile.addEventListener('click', () => setCarView('profile'));
        }
        if (btnCarViewTopDown) {
            btnCarViewTopDown.addEventListener('click', () => setCarView('topdown'));
        }

        // ═══════════════════════════════════════════════════════════
        // STANDINGS VIEW CONTROLLER (PILOTOS vs CONSTRUCTORES vs AMBOS)
        // ═══════════════════════════════════════════════════════════
        function setStandingsView(viewMode) {
            const grid = document.getElementById('standingsGrid');
            if (!grid) return;

            grid.classList.remove('view-pilotos', 'view-constructores', 'view-ambos');
            grid.classList.add(`view-${viewMode}`);

            // Update in-section tab buttons
            document.querySelectorAll('.standings-tab-btn').forEach(btn => {
                const isSelected = btn.getAttribute('data-tab') === viewMode;
                btn.classList.toggle('active', isSelected);
                btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
            });

            // Sync with navbar segment-btns
            const navPilotos = document.querySelector('.segment-btn[href="#pilotos"]');
            const navConstructores = document.querySelector('.segment-btn[href="#constructores"]');
            if (viewMode === 'constructores') {
                if (navPilotos) navPilotos.classList.remove('active');
                if (navConstructores) navConstructores.classList.add('active');
            } else if (viewMode === 'pilotos') {
                if (navConstructores) navConstructores.classList.remove('active');
                if (navPilotos) navPilotos.classList.add('active');
            }
        }

        // Section tab button click listeners
        document.querySelectorAll('.standings-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab') || 'ambos';
                setStandingsView(tab);
            });
        });

        // ═══════════════════════════════════════════════════════════
        // APPLE SEGMENTED NAV SMOOTH SCROLL & TAB SWITCHING
        // ═══════════════════════════════════════════════════════════
        document.querySelectorAll('.segment-btn[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');

                // If user clicks PILOTOS or CONSTRUCTORES, switch the view!
                if (href === '#pilotos') {
                    setStandingsView('pilotos');
                } else if (href === '#constructores') {
                    setStandingsView('constructores');
                }

                document.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Scroll with offset so header never covers content
                let targetId = href;
                if (href === '#pilotos' || href === '#constructores') {
                    targetId = '#clasificacion';
                }
                const target = document.querySelector(targetId) || document.querySelector(href);
                if (target) {
                    const headerOffset = 90;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ═══════════════════════════════════════════════════════════
        // SCROLLSPY (Keep navigation synchronized on scroll)
        // ═══════════════════════════════════════════════════════════
        const navSections = [
            { id: 'telemetria', nav: '.segment-btn[href="#telemetria"]' },
            { id: 'clasificacion', nav: '.segment-btn[href="#pilotos"]', altNav: '.segment-btn[href="#constructores"]' },
            { id: 'calendario', nav: '.segment-btn[href="#calendario"]' },
            { id: 'resultados', nav: '.segment-btn[href="#resultados"]' },
            { id: 'comparador', nav: '.segment-btn[href="#comparador"]' },
            { id: 'escuderias', nav: '.segment-btn[href="#escuderias"]' }
        ];

        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(() => {
                    const scrollPos = window.pageYOffset + 140;
                    for (let i = navSections.length - 1; i >= 0; i--) {
                        const sec = document.getElementById(navSections[i].id);
                        if (sec && sec.offsetTop <= scrollPos) {
                            let selector = navSections[i].nav;
                            const grid = document.getElementById('standingsGrid');
                            if (navSections[i].id === 'clasificacion' && grid && grid.classList.contains('view-constructores')) {
                                selector = navSections[i].altNav;
                            }
                            const targetBtn = document.querySelector(selector);
                            if (targetBtn && !targetBtn.classList.contains('active')) {
                                document.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
                                targetBtn.classList.add('active');
                            }
                            break;
                        }
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
    }

    /* ═══════════════════════════════════════════════════════════════
       11. MAIN RAF ANIMATION LOOP
       ═══════════════════════════════════════════════════════════════ */
    let lastTime = performance.now();

    function mainLoop(now) {
        const dt = Math.min(0.1, (now - lastTime) / 1000); // delta in seconds clamped
        lastTime = now;

        updatePhysics(dt);
        renderTrack();

        // Throttle DOM updates to 10 FPS for optimal CPU efficiency
        if (raceTicks % 6 === 0) {
            updateTimingTower();
            updateCockpitHUD();
        }

        requestAnimationFrame(mainLoop);
    }

    // Dismiss loader overlay
    function dismissLoader() {
        const overlay = document.getElementById('page-transition-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => { if (overlay) overlay.remove(); }, 250);
        }
    }

    /* ═══════════════════════════════════════════════════════════════
       12. INITIALIZATION
       ═══════════════════════════════════════════════════════════════ */
    document.addEventListener('DOMContentLoaded', () => {
        initCanvas();
        initControls();
        initComparator();
        initCountdown();
        updateTimingTower();
        updateCockpitHUD();
        setTimeout(dismissLoader, 350);
        requestAnimationFrame(mainLoop);
    });

})();
