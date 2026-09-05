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
       3. SIMULATION STATE & MULTI-CAR PHYSICAL ENTITIES
       ═══════════════════════════════════════════════════════════════ */
    let isRunning = true;
    let simSpeed = 1; // 1x, 2x, 4x
    let activeDriverId = 'VER';
    let currentLap = 1;
    const TOTAL_LAPS = 53;
    let weatherMode = 'DRY'; // DRY, WET
    let raceTicks = 0;

    // Build physical state for each car
    const cars = DRIVERS_DB.map((driver, index) => {
        return {
            ...driver,
            trackProgress: (1 - (index * 0.04)) % 1.0, // Staggered grid starting positions
            speed: 180, // km/h
            targetSpeed: 200,
            throttle: 0.8,
            brake: 0,
            gear: 4,
            rpm: 10500,
            batterySOC: 92 - (index * 2), // %
            tireWear: 8 + (index * 1.5), // %
            compound: index % 2 === 0 ? 'SOFT' : 'MEDIUM',
            tireTemps: { fl: 102, fr: 104, rl: 108, rr: 109 },
            inPit: false,
            pitTimer: 0,
            lapCount: 1,
            gapToLeader: index === 0 ? 0 : index * 0.48,
            lastSectorTime: '18.420',
            currentSector: 1,
            activeAero: 'CORNER'
        };
    });

    /* ═══════════════════════════════════════════════════════════════
       4. SPLINE INTERPOLATION & TRACK RENDER ENGINE
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

        // Current target speed determined by track segment
        const maxSpeed = pt1.maxSpeed + (pt2.maxSpeed - pt1.maxSpeed) * smoothT;
        const segmentType = pt1.type;
        const segmentName = pt1.name;

        return { x, y, maxSpeed, segmentType, segmentName };
    }

    /* ═══════════════════════════════════════════════════════════════
       5. PHYSICAL INTEGRATION LOOP (60 FPS Non-Linear Dynamics)
       ═══════════════════════════════════════════════════════════════ */
    function updatePhysics(dt) {
        if (!isRunning) return;

        raceTicks++;
        const scaledDt = dt * simSpeed;

        cars.forEach((car, index) => {
            // Check if car is currently in Pit Stop
            if (car.inPit) {
                car.pitTimer -= scaledDt;
                car.speed = 60; // Pit lane speed limiter (60 km/h)
                car.gear = 2;
                car.rpm = 4800;
                car.throttle = 0.2;
                car.brake = 0;
                car.activeAero = 'PIT';
                if (car.pitTimer <= 0) {
                    car.inPit = false;
                    car.tireWear = 4; // Fresh tires
                    car.compound = car.compound === 'SOFT' ? 'MEDIUM' : 'HARD';
                    car.tireTemps = { fl: 88, fr: 88, rl: 92, rr: 92 };
                }
                return;
            }

            // Get current point on track topology
            const trackPt = getTrackPointAt(car.trackProgress);

            // Calculate Base Speed from Driver Offset & Weather
            let targetSpeed = trackPt.maxSpeed * car.speedOffset;
            if (weatherMode === 'WET') targetSpeed *= 0.82;

            // Tire Wear Penalty: When wear > 50%, cornering and speed drops
            if (car.tireWear > 50) {
                const gripLoss = (car.tireWear - 50) * 0.006;
                targetSpeed *= (1 - gripLoss);
            }

            // Scheduled Pit Stop at 70% tire wear
            if (car.tireWear >= 70 && !car.inPit) {
                car.inPit = true;
                car.pitTimer = 22; // 22 seconds pit lane loss in Monaco
                return;
            }

            // Active Aero F1 2026 Detection:
            // Straight Mode in straights, Corner Mode in curves
            if (trackPt.segmentType === 'S' && car.speed > 220) {
                car.activeAero = 'STRAIGHT MODE (LOW DRAG)';
                targetSpeed += 15; // 2026 Low Drag Boost
            } else {
                car.activeAero = 'CORNER MODE (HIGH GRIP)';
            }

            // Check for Slipstream / DRS if following car ahead
            cars.forEach(otherCar => {
                if (otherCar !== car) {
                    const diff = otherCar.trackProgress - car.trackProgress;
                    if (diff > 0.005 && diff < 0.035 && trackPt.segmentType === 'S') {
                        targetSpeed += 12; // Rebufo (Slipstream) +12 km/h
                        car.activeAero = 'OVERTAKE BOOST (DRS+ERS)';
                    }
                }
            });

            // Acceleration and Braking Forces (Non-Linear Newton Dynamics)
            const speedDiff = targetSpeed - car.speed;
            if (speedDiff > 0) {
                // Accelerating out of corner / straight
                const accelRate = 45 * (car.speed < 150 ? 1.4 : 0.85); // High torque at low gear
                car.speed += accelRate * scaledDt;
                car.throttle = Math.min(1.0, car.speed / targetSpeed);
                car.brake = 0;
            } else {
                // Hard Braking zone into corner (Up to 5.2G deceleration)
                const brakeRate = 85; 
                car.speed += (speedDiff * 4.5) * scaledDt;
                car.brake = Math.min(1.0, Math.abs(speedDiff) / 40);
                car.throttle = 0;
                
                // Regenerate MGU-K Hybrid Battery under braking
                car.batterySOC = Math.min(100, car.batterySOC + 0.15 * scaledDt);
            }

            // Clamp Speed Limits
            car.speed = Math.max(50, Math.min(345, car.speed));

            // Gear & RPM Calculations
            car.gear = Math.max(1, Math.min(8, Math.floor(car.speed / 42) + 1));
            const baseGearSpeed = (car.gear - 1) * 42;
            const gearProgress = (car.speed - baseGearSpeed) / 42;
            car.rpm = Math.floor(9000 + gearProgress * 5500);

            // Tire Wear & Thermals
            car.tireWear += 0.004 * (car.speed > 200 ? 1.2 : 0.9) * scaledDt;
            const lateralHeat = car.brake > 0.4 ? 1.8 : 0.4;
            car.tireTemps.fl = Math.round(98 + (car.speed / 340) * 16 + lateralHeat);
            car.tireTemps.fr = Math.round(101 + (car.speed / 340) * 18 + lateralHeat);
            car.tireTemps.rl = Math.round(104 + (car.speed / 340) * 15);
            car.tireTemps.rr = Math.round(106 + (car.speed / 340) * 17);

            // Advance Track Position
            // Total track length = 3337 meters. Speed in m/s = km/h / 3.6
            const speedMps = car.speed / 3.6;
            const progressDelta = (speedMps * scaledDt) / 3337;
            const prevProgress = car.trackProgress;
            car.trackProgress = (car.trackProgress + progressDelta) % 1.0;

            // Lap Counter when crossing start/finish line (progress resets)
            if (car.trackProgress < prevProgress) {
                car.lapCount++;
                if (index === 0) currentLap = Math.min(TOTAL_LAPS, car.lapCount);
            }
        });

        // Re-sort Standings by Track Progress and Laps
        cars.sort((a, b) => {
            const scoreA = a.lapCount + a.trackProgress;
            const scoreB = b.lapCount + b.trackProgress;
            return scoreB - scoreA;
        });

        // Calculate deltas to leader
        const leader = cars[0];
        cars.forEach((car, idx) => {
            if (idx === 0) {
                car.gapToLeader = 0;
            } else {
                const gapProgress = (leader.lapCount + leader.trackProgress) - (car.lapCount + car.trackProgress);
                car.gapToLeader = Math.max(0.1, gapProgress * 78.5); // Approx seconds
            }
        });
    }

    /* ═══════════════════════════════════════════════════════════════
       6. CANVAS RENDERER: CIRCUITO Y MONOPLAZAS VECTORIALES
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

        // 1. Draw Circuit Path (Double Titanium Layer)
        ctx.beginPath();
        const steps = 200;
        for (let i = 0; i <= steps; i++) {
            const pt = getTrackPointAt(i / steps);
            const cx = pt.x * width;
            const cy = pt.y * height;
            if (i === 0) ctx.moveTo(cx, cy);
            else ctx.lineTo(cx, cy);
        }
        ctx.closePath();

        // Asphalt Track base
        ctx.strokeStyle = '#1a1d26';
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // High contrast racing groove
        ctx.strokeStyle = '#272c3a';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Racing Line (Active Aero highlight on straights)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // 2. Draw DRS & Active Aero Zones
        ctx.strokeStyle = 'rgba(0, 163, 137, 0.4)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let i = 0; i <= 25; i++) {
            const pt = getTrackPointAt(i / 200);
            const cx = pt.x * width;
            const cy = pt.y * height;
            if (i === 0) ctx.moveTo(cx, cy);
            else ctx.lineTo(cx, cy);
        }
        ctx.stroke();

        // 3. Draw Cars as Vector Directional Dots with Team Livery
        cars.forEach((car, index) => {
            const pt = getTrackPointAt(car.trackProgress);
            const nextPt = getTrackPointAt(car.trackProgress + 0.005);
            const cx = pt.x * width;
            const cy = pt.y * height;
            const angle = Math.atan2((nextPt.y - pt.y) * height, (nextPt.x - pt.x) * width);

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);

            // Car Halo Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(-6, -3, 12, 6);

            // Active Driver Pulsing Ring
            if (car.id === activeDriverId) {
                ctx.beginPath();
                ctx.arc(0, 0, 12, 0, Math.PI * 2);
                ctx.strokeStyle = '#E10600';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Monoplaza Body
            ctx.fillStyle = car.color;
            ctx.beginPath();
            ctx.roundRect(-7, -4, 14, 8, 2);
            ctx.fill();

            // Cockpit White Helm
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(0, 0, 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            // Driver Code Label
            ctx.font = 'bold 9px "JetBrains Mono"';
            ctx.fillStyle = car.id === activeDriverId ? '#E10600' : '#D8DCE5';
            ctx.fillText(car.id, cx + 10, cy - 6);
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
            
            const pitBadge = car.inPit ? '<span style="color: #FFB800; font-size: 9px; font-weight: 800;">PIT</span>' : '';

            return `
                <div class="timing-row ${isActive ? 'active' : ''}" data-driver="${car.id}">
                    <span class="timing-pos">${idx + 1}</span>
                    <span class="timing-team-stripe" style="background: ${car.color};"></span>
                    <div class="timing-info">
                        <span class="timing-code">${car.id} <span style="font-size: 10px; color: #8E95A5;">#${car.num}</span> ${pitBadge}</span>
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

        // Speed & Gear
        const speedValEl = document.getElementById('hudSpeedVal');
        const gearValEl = document.getElementById('hudGearVal');
        const rpmValEl = document.getElementById('hudRpmVal');
        const aeroValEl = document.getElementById('hudAeroMode');
        if (speedValEl) speedValEl.textContent = Math.round(car.speed);
        if (gearValEl) gearValEl.textContent = car.gear;
        if (rpmValEl) rpmValEl.textContent = `${car.rpm} RPM`;
        if (aeroValEl) aeroValEl.textContent = car.activeAero;

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
            });
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
