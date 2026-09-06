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
       1B. 2D TOP-DOWN F1 MONOPLAZA LIVERIES & ASSETS (FIA Standard / GitHub)
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
       1C. OFFICIAL TEAM LOGOS FOR CIRCUIT BADGES & TIMING TOWER
       ═══════════════════════════════════════════════════════════════ */
    const DRIVER_TEAM_LOGOS = {
        'VER': 'img/teams/redbull-logo.webp',
        'LEC': 'img/teams/ferrari-logo.webp',
        'HAM': 'img/teams/ferrari-logo.webp',
        'NOR': 'img/teams/mclaren-logo.webp',
        'PIA': 'img/teams/mclaren-logo.webp',
        'RUS': 'img/teams/mercedes-logo.webp',
        'ALO': 'img/teams/astonmartin-logo.webp',
        'ALB': 'img/teams/williams-logo.webp'
    };

    // Preload official team logos into memory for high-performance canvas rendering
    const teamLogoImages = {};
    Object.entries(DRIVER_TEAM_LOGOS).forEach(([id, src]) => {
        const img = new Image();
        img.src = src;
        teamLogoImages[id] = img;
    });

    // Official Formula 1 Liveries & Colors (Front Wing, Monocoque, Halo, Helmet, Endplates)
    const F1_OFFICIAL_LIVERIES = {
        'VER': {
            primary: '#101C3D',       // Red Bull Dark Navy Blue
            secondary: '#E10600',     // Red Bull Racing Red
            accent: '#FFC800',        // Yellow Nose Tip & Bull
            carbon: '#0B0D12',        // Matte Carbon Floor
            endplate: '#FFC800',      // Yellow Endplates
            halo: '#101C3D',          // Navy Halo
            helmetBase: '#FF6B00',    // Max Gold/Orange Dutch Lion Helmet
            helmetAccent: '#101C3D',
            visor: '#00F0FF',
            number: '1',
            numColor: '#FFC800'
        },
        'LEC': {
            primary: '#E80020',       // Scuderia Rosso Corsa
            secondary: '#FFFFFF',     // Italian Racing White
            accent: '#FFE500',        // Modena Yellow
            carbon: '#08090C',
            endplate: '#FFFFFF',
            halo: '#08090C',
            helmetBase: '#E80020',    // Charles Red & White Helmet
            helmetAccent: '#FFFFFF',
            visor: '#111318',
            number: '16',
            numColor: '#FFFFFF'
        },
        'HAM': {
            primary: '#E80020',       // Scuderia Rosso Corsa
            secondary: '#08090C',     // Carbon Black Details
            accent: '#E1FF00',        // Neon Fluorescent Yellow (Lewis Signature)
            carbon: '#08090C',
            endplate: '#E1FF00',
            halo: '#E1FF00',
            helmetBase: '#E1FF00',    // Neon Yellow Helmet
            helmetAccent: '#6B21A8',  // Purple Crown Accent
            visor: '#111318',
            number: '44',
            numColor: '#E1FF00'
        },
        'NOR': {
            primary: '#FF8000',       // Papaya Orange
            secondary: '#0A0C10',     // Anthracite Carbon
            accent: '#00A0DE',        // McLaren Light Blue
            carbon: '#0A0C10',
            endplate: '#FF8000',
            halo: '#0A0C10',
            helmetBase: '#CCFF00',    // Fluorescent Lime-Yellow Helmet
            helmetAccent: '#111318',
            visor: '#111318',
            number: '4',
            numColor: '#FFFFFF'
        },
        'PIA': {
            primary: '#FF8000',       // Papaya Orange
            secondary: '#0A0C10',     // Anthracite Carbon
            accent: '#00A0DE',
            carbon: '#0A0C10',
            endplate: '#00A0DE',
            halo: '#0A0C10',
            helmetBase: '#0055B8',    // Aussie Blue Helmet
            helmetAccent: '#FFD700',
            visor: '#111318',
            number: '81',
            numColor: '#FFFFFF'
        },
        'RUS': {
            primary: '#D0D5DE',       // Silver Arrows Metallic
            secondary: '#0B0D12',     // Obsidian Carbon
            accent: '#27F4D2',        // Petronas Turquoise
            carbon: '#0B0D12',
            endplate: '#27F4D2',
            halo: '#0B0D12',
            helmetBase: '#1E3A8A',    // Deep Blue Helmet
            helmetAccent: '#E10600',
            visor: '#27F4D2',
            number: '63',
            numColor: '#27F4D2'
        },
        'ALO': {
            primary: '#00594F',       // British Racing Green
            secondary: '#003A33',     // Dark Emerald
            accent: '#D4FF00',        // Fluorescent Lime Accent
            carbon: '#08090C',
            endplate: '#D4FF00',
            halo: '#00594F',
            helmetBase: '#0284C7',    // Asturias Blue Helmet
            helmetAccent: '#FFCC00',
            visor: '#111318',
            number: '14',
            numColor: '#D4FF00'
        },
        'ALB': {
            primary: '#041E42',       // Williams Deep Navy
            secondary: '#002B7F',     // Royal Blue
            accent: '#00A0DE',        // Electric Cyan
            carbon: '#08090C',
            endplate: '#00A0DE',
            halo: '#041E42',
            helmetBase: '#DC2626',    // Red / Blue Helmet
            helmetAccent: '#041E42',
            visor: '#00A0DE',
            number: '23',
            numColor: '#00A0DE'
        }
    };

    function getDriverLivery(car) {
        if (F1_OFFICIAL_LIVERIES[car.id]) {
            return F1_OFFICIAL_LIVERIES[car.id];
        }
        return {
            primary: car.color || '#E10600',
            secondary: '#0B0D12',
            accent: '#FFFFFF',
            carbon: '#0B0D12',
            endplate: car.color || '#E10600',
            halo: '#151922',
            helmetBase: '#FFFFFF',
            helmetAccent: car.color || '#E10600',
            visor: '#111318',
            number: String(car.num || ''),
            numColor: '#FFFFFF'
        };
    }

    function drawRoundRect(ctx, x, y, w, h, r) {
        if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, r);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.arcTo(x + w, y, x + w, y + r, r);
            ctx.lineTo(x + w, y + h - r);
            ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
            ctx.lineTo(x + r, y + h);
            ctx.arcTo(x, y + h, x, y + h - r, r);
            ctx.lineTo(x, y + r);
            ctx.arcTo(x, y, x + r, y, r);
            ctx.closePath();
            ctx.fill();
        }
    }

    /**
     * Renders an authentic top-down open-wheel Formula 1 monoplaza vector directly to Canvas 2D
     * Scaled and aligned in car coordinate space (+X = Forward, -X = Rear, -Y = Left, +Y = Right)
     */
    function drawF1MonoplazaTopDown(ctx, car) {
        const livery = getDriverLivery(car);
        const compoundColor = car.compound === 'SOFT' ? '#E10600' : (car.compound === 'MEDIUM' ? '#FFB800' : '#E5E7EB');

        // 1. Carbon Floor & Venturi Aerodynamic Tunnels
        ctx.fillStyle = livery.carbon || '#0A0C10';
        ctx.beginPath();
        ctx.moveTo(9, -4.8);
        ctx.lineTo(9, 4.8);
        ctx.lineTo(7.5, 7.4);
        ctx.lineTo(-13.5, 7.4);
        ctx.lineTo(-15, 4.5);
        ctx.lineTo(-15, -4.5);
        ctx.lineTo(-13.5, -7.4);
        ctx.lineTo(7.5, -7.4);
        ctx.closePath();
        ctx.fill();

        // Floor Edge Aerodynamic Strakes
        ctx.fillStyle = livery.accent;
        ctx.fillRect(-6, -7.4, 9, 0.6);
        ctx.fillRect(-6, 6.8, 9, 0.6);

        // 2. Open-Wheel Carbon Suspension Wishbones
        ctx.strokeStyle = '#181B22';
        ctx.lineWidth = 1.3;
        // Front Wishbones (Pull-rod / Push-rod)
        ctx.beginPath();
        ctx.moveTo(9.5, -2.2); ctx.lineTo(12, -6.8);
        ctx.moveTo(6.5, -2.4); ctx.lineTo(8.5, -6.8);
        ctx.moveTo(9.5, 2.2); ctx.lineTo(12, 6.8);
        ctx.moveTo(6.5, 2.4); ctx.lineTo(8.5, 6.8);
        // Rear Wishbones
        ctx.moveTo(-10.5, -2.8); ctx.lineTo(-13.5, -6.8);
        ctx.moveTo(-14.5, -2.4); ctx.lineTo(-15.5, -6.8);
        ctx.moveTo(-10.5, 2.8); ctx.lineTo(-13.5, 6.8);
        ctx.moveTo(-14.5, 2.4); ctx.lineTo(-15.5, 6.8);
        ctx.stroke();

        // 3. Four Open Wheels (Pirelli Slicks with Compound Color Band)
        // Front-Left Wheel
        ctx.fillStyle = '#0F1116';
        drawRoundRect(ctx, 7.5, -9.0, 8.0, 3.6, 1.0);
        ctx.fillStyle = compoundColor;
        ctx.fillRect(8.5, -7.4, 6.0, 0.8);
        ctx.fillStyle = '#374151';
        ctx.beginPath(); ctx.arc(11.5, -7.2, 1.0, 0, Math.PI * 2); ctx.fill();

        // Front-Right Wheel
        ctx.fillStyle = '#0F1116';
        drawRoundRect(ctx, 7.5, 5.4, 8.0, 3.6, 1.0);
        ctx.fillStyle = compoundColor;
        ctx.fillRect(8.5, 6.6, 6.0, 0.8);
        ctx.fillStyle = '#374151';
        ctx.beginPath(); ctx.arc(11.5, 7.2, 1.0, 0, Math.PI * 2); ctx.fill();

        // Rear-Left Wheel (Wider rear slicks)
        ctx.fillStyle = '#0F1116';
        drawRoundRect(ctx, -17.5, -9.4, 9.0, 4.2, 1.2);
        ctx.fillStyle = compoundColor;
        ctx.fillRect(-16.5, -7.5, 7.0, 0.9);
        ctx.fillStyle = '#374151';
        ctx.beginPath(); ctx.arc(-13.0, -7.3, 1.1, 0, Math.PI * 2); ctx.fill();

        // Rear-Right Wheel
        ctx.fillStyle = '#0F1116';
        drawRoundRect(ctx, -17.5, 5.2, 9.0, 4.2, 1.2);
        ctx.fillStyle = compoundColor;
        ctx.fillRect(-16.5, 6.6, 7.0, 0.9);
        ctx.fillStyle = '#374151';
        ctx.beginPath(); ctx.arc(-13.0, 7.3, 1.1, 0, Math.PI * 2); ctx.fill();

        // 4. Front Wing Assembly (Aerodynamic swept mainplane with Endplates)
        ctx.fillStyle = livery.primary;
        ctx.beginPath();
        ctx.moveTo(17, -8.6);
        ctx.quadraticCurveTo(20.5, 0, 17, 8.6);
        ctx.lineTo(15, 8.6);
        ctx.quadraticCurveTo(18.5, 0, 15, -8.6);
        ctx.closePath();
        ctx.fill();

        // Flap slot gap
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(16, -8.4);
        ctx.quadraticCurveTo(19.5, 0, 16, 8.4);
        ctx.stroke();

        // Front Wing Endplates
        ctx.fillStyle = livery.endplate;
        ctx.fillRect(14.8, -9.2, 5.5, 1.0);
        ctx.fillRect(14.8, 8.2, 5.5, 1.0);

        // 5. Monocoque Chassis & Sculpted Sidepods (Coke-Bottle Undercut)
        ctx.fillStyle = livery.primary;
        ctx.beginPath();
        ctx.moveTo(20.0, 0);               // Nose Tip
        ctx.lineTo(18.5, 1.3);
        ctx.lineTo(10.5, 1.9);
        ctx.lineTo(4.5, 2.5);
        ctx.lineTo(2.5, 6.0);              // Right sidepod shoulder
        ctx.quadraticCurveTo(-0.5, 6.6, -4.5, 6.0);
        ctx.quadraticCurveTo(-10.0, 4.8, -14.5, 2.3); // Undercut to rear
        ctx.lineTo(-16.5, 2.3);
        ctx.lineTo(-16.5, -2.3);
        ctx.lineTo(-14.5, -2.3);
        ctx.quadraticCurveTo(-10.0, -4.8, -4.5, -6.0);
        ctx.quadraticCurveTo(-0.5, -6.6, 2.5, -6.0);  // Left sidepod shoulder
        ctx.lineTo(4.5, -2.5);
        ctx.lineTo(10.5, -1.9);
        ctx.lineTo(18.5, -1.3);
        ctx.closePath();
        ctx.fill();

        // Livery Nosecone Tip Accent
        ctx.fillStyle = livery.accent;
        ctx.beginPath();
        ctx.moveTo(20.0, 0);
        ctx.lineTo(17.2, 1.4);
        ctx.lineTo(15.8, 0);
        ctx.lineTo(17.2, -1.4);
        ctx.closePath();
        ctx.fill();

        // Radiator Sidepod Cooling Inlets
        ctx.fillStyle = '#060709';
        ctx.beginPath();
        ctx.moveTo(2.5, -5.8); ctx.lineTo(0.5, -5.6); ctx.lineTo(0.5, -3.2); ctx.lineTo(2.5, -3.0);
        ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(2.5, 5.8); ctx.lineTo(0.5, 5.6); ctx.lineTo(0.5, 3.2); ctx.lineTo(2.5, 3.0);
        ctx.closePath(); ctx.fill();

        // Livery Secondary Color Stripes
        ctx.fillStyle = livery.secondary;
        ctx.fillRect(7.5, -0.5, 5.0, 1.0);  // Center nose stripe
        ctx.fillRect(-3.0, -5.0, 4.8, 0.8); // Left sidepod livery streak
        ctx.fillRect(-3.0, 4.2, 4.8, 0.8);  // Right sidepod livery streak

        // 6. Driver Number Decal on Nosecone
        ctx.fillStyle = livery.numColor;
        ctx.font = '900 3.5px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(livery.number, 13.0, 0);

        // 7. Cockpit Tub & Driver Helmet
        ctx.fillStyle = '#07080B';
        ctx.beginPath();
        ctx.ellipse(0, 0, 4.5, 2.1, 0, 0, Math.PI * 2);
        ctx.fill();

        // Driver Helmet
        ctx.fillStyle = livery.helmetBase;
        ctx.beginPath();
        ctx.arc(0.4, 0, 1.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = livery.helmetAccent;
        ctx.beginPath();
        ctx.arc(0.1, 0, 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Visor facing forward (+X)
        ctx.fillStyle = livery.visor;
        ctx.beginPath();
        ctx.arc(0.9, 0, 1.1, -Math.PI * 0.45, Math.PI * 0.45);
        ctx.fill();

        // 8. Titanium Halo Safety Arch
        ctx.strokeStyle = '#181C24';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(3.0, 0);
        ctx.lineTo(1.6, 0);
        ctx.stroke();

        ctx.strokeStyle = livery.halo;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0.1, 0, 2.3, -Math.PI * 0.52, Math.PI * 0.52);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.arc(0.1, 0, 2.3, -Math.PI * 0.48, Math.PI * 0.48);
        ctx.stroke();

        // 9. Engine Airbox Intake, T-Cam & Shark Fin Spine
        ctx.fillStyle = '#0A0B0E';
        ctx.fillRect(-2.4, -1.1, 1.8, 2.2);

        const isPrimaryDriver = (livery.number === '1' || livery.number === '16' || livery.number === '4' || livery.number === '63' || livery.number === '14' || livery.number === '23');
        ctx.fillStyle = isPrimaryDriver ? '#111317' : '#FFE500';
        ctx.fillRect(-1.4, -0.5, 0.9, 1.0);

        ctx.fillStyle = livery.secondary;
        ctx.fillRect(-13.5, -0.4, 10.5, 0.8);

        // 10. Rear Wing Assembly & DRS Flap
        ctx.fillStyle = livery.primary;
        ctx.fillRect(-18.5, -7.8, 3.0, 15.6);

        ctx.fillStyle = livery.carbon || '#08090C';
        ctx.fillRect(-19.6, -8.3, 4.2, 1.0);
        ctx.fillRect(-19.6, 7.3, 4.2, 1.0);

        // 11. Rear FIA Rain/Brake LED Light
        if (car.isBrakingHard) {
            ctx.fillStyle = '#FF1801';
            ctx.shadowColor = '#FF1801';
            ctx.shadowBlur = 12;
            ctx.fillRect(-19.5, -0.8, 1.4, 1.6);
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = '#660505';
            ctx.fillRect(-19.5, -0.7, 1.1, 1.4);
        }
    }

    /* ═══════════════════════════════════════════════════════════════
       2. CIRCUIT TOPOLOGY & CORNER DATA (Mónaco GP Simulation)
       ═══════════════════════════════════════════════════════════════ */
    // Closed normalized spline points (0.0 to 1.0) with segment types:
    // S = Straight (Active Aero / Top Speed), C = Corner (Braking / Apex Speed), H = Hairpin
    const TRACK_POINTS = [
        { x: 0.22, y: 0.78, type: 'S', maxSpeed: 330, name: 'Recta Principal' },
        { x: 0.38, y: 0.78, type: 'S', maxSpeed: 335, name: 'Línea de Meta' },
        { x: 0.52, y: 0.78, type: 'C', maxSpeed: 110, name: 'Sainte Dévote' },
        { x: 0.62, y: 0.54, type: 'S', maxSpeed: 295, name: 'Beau Rivage' },
        { x: 0.72, y: 0.30, type: 'C', maxSpeed: 155, name: 'Massenet' },
        { x: 0.80, y: 0.16, type: 'C', maxSpeed: 130, name: 'Casino Square' },
        { x: 0.89, y: 0.25, type: 'C', maxSpeed: 95,  name: 'Mirabeau' },
        { x: 0.92, y: 0.42, type: 'H', maxSpeed: 55,  name: 'Loews Hairpin' },
        { x: 0.84, y: 0.58, type: 'C', maxSpeed: 85,  name: 'Portier' },
        { x: 0.89, y: 0.74, type: 'S', maxSpeed: 320, name: 'Túnel de Mónaco' },
        { x: 0.76, y: 0.85, type: 'C', maxSpeed: 85,  name: 'Nouvelle Chicane' },
        { x: 0.60, y: 0.88, type: 'C', maxSpeed: 175, name: 'Tabac' },
        { x: 0.42, y: 0.88, type: 'C', maxSpeed: 195, name: 'Piscine' },
        { x: 0.25, y: 0.86, type: 'C', maxSpeed: 75,  name: 'La Rascasse' },
        { x: 0.12, y: 0.78, type: 'C', maxSpeed: 95,  name: 'Anthony Noghès' }
    ];

    /* ═══════════════════════════════════════════════════════════════
       3. SIMULATION STATE, PARTICLES & RACE CONTROL
       ═══════════════════════════════════════════════════════════════ */
    let isRunning = false; // Simulation stays paused on standing grid until user clicks Play
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
        { time: '14:30:00', type: 'green', text: 'FIA: PROCEDIMIENTO DE SALIDA COMPLETADO // PARRILLA 2026 LISTA' },
        { time: '14:30:30', type: 'green', text: 'LISTO PARA LARGADA // PRESIONA "INICIAR CARRERA" PARA COMENZAR' }
    ];
    const recentEventTimestamps = {};
    const overtakeCooldowns = {};

    function logRaceEvent(type, text) {
        const now = new Date();
        const nowMs = now.getTime();

        // 1. Never allow duplicate notifications with the exact same text within 3.5 seconds
        if (recentEventTimestamps[text] && (nowMs - recentEventTimestamps[text]) < 3500) {
            return;
        }

        // 2. Never allow identical text to appear consecutively in the feed
        if (raceControlEvents.length > 0 && raceControlEvents[0].text === text) {
            return;
        }
        recentEventTimestamps[text] = nowMs;

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

    // Build physical state for each car positioned on the official standing grid
    function createInitialCarState(driver, index) {
        const isInside = index % 2 === 0;
        const gridSlotProgress = 0.091 - (index * 0.013);
        return {
            ...driver,
            gridIndex: index,
            trackProgress: gridSlotProgress,
            speed: 0, // Stationary on starting grid
            targetSpeed: 0,
            throttle: 0,
            brake: 1.0,
            gear: 'N',
            rpm: 4500, // Idling on grid
            batterySOC: 100, // Full charge
            tireWear: 0, // Fresh tyres
            compound: index % 3 === 0 ? 'SOFT' : (index % 3 === 1 ? 'MEDIUM' : 'HARD'),
            tireTemps: { fl: 100, fr: 100, rl: 100, rr: 100 },
            inPitLane: false,
            pitState: 'NONE',
            pitTimer: 0,
            wantsPit: false,
            lapCount: 1,
            gapToLeader: index === 0 ? 0 : index * 0.22,
            lastSectorTime: '--.---',
            currentSector: 1,
            activeAero: 'GRID MODE',
            laneOffset: isInside ? -7.5 : 7.5, // 2-by-2 official FIA grid stagger (wider)
            targetLaneOffset: isInside ? -7.5 : 7.5,
            longGForce: 0.0,
            isBrakingHard: false,
            ersDeployTimer: 0,
            lockupTimer: 0,
            headingAngle: undefined,
            smoothBadgeX: undefined,
            smoothBadgeY: undefined,
            currentRank: index + 1
        };
    }

    const cars = DRIVERS_DB.map(createInitialCarState);

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
            // Sector calculation (Monaco 3-sector split)
            car.currentSector = car.trackProgress < 0.30 ? 1 : (car.trackProgress < 0.72 ? 2 : 3);

            // ═══════════════════════════════════════════════════════════
            // PIT STOP SYSTEM & PIT LANE DETOUR
            // ═══════════════════════════════════════════════════════════
            // Trigger pit stop when reaching pit entrance
            if (car.wantsPit && !car.inPitLane) {
                if (car.trackProgress >= 0.93 || car.trackProgress <= 0.02) {
                    car.inPitLane = true;
                    car.pitState = 'IN_LANE';
                    car.wantsPit = false;
                    logRaceEvent('box', `${car.id} (${car.team}) ENTRA EN PIT LANE // VELOCIDAD LIMITADA A 60 KM/H`);
                }
            }

            if (car.inPitLane) {
                car.targetLaneOffset = 18; // Detour along pit lane line

                if (car.pitState === 'IN_LANE') {
                    // Slow down to 60 km/h pit limiter
                    car.targetSpeed = 60;
                    car.activeAero = 'PIT LIMITER 60 KM/H';
                    // Stop at the pit box location
                    if (car.trackProgress >= 0.02 && car.trackProgress <= 0.06) {
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
                    // Merge back onto track at Turn 1 (progress > 0.11)
                    if (car.trackProgress > 0.11 && car.trackProgress < 0.16) {
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
            // 1. Find car ahead in the driver's active path / lane
            let carAheadInLane = null;
            let minLaneGap = Infinity;
            cars.forEach(other => {
                if (other !== car && !other.inPitLane && !car.inPitLane) {
                    const forwardGap = (other.trackProgress - car.trackProgress + 1.0) % 1.0;
                    if (forwardGap > 0.0001 && forwardGap < 0.5) {
                        const latDist = Math.abs(car.laneOffset - other.laneOffset);
                        // In corners, cars share apex. On straights, check lane proximity:
                        const isInPath = (trackPt.segmentType !== 'S') || (latDist < 6.5);
                        if (isInPath && forwardGap < minLaneGap) {
                            minLaneGap = forwardGap;
                            carAheadInLane = other;
                        }
                    }
                }
            });

            // 2. Intelligent Dynamic Lane Selection & Stagger
            if (!car.inPitLane) {
                if (currentLap === 1 && car.trackProgress < 0.14) {
                    // Standing start sprint: locked to FIA grid lanes
                    const isInside = (car.gridIndex !== undefined ? car.gridIndex : 0) % 2 === 0;
                    car.targetLaneOffset = isInside ? -7.5 : 7.5;
                } else if (carAheadInLane && minLaneGap < 0.040) {
                    // In close combat: stagger lateral position to prevent bumper jamming
                    if (trackPt.segmentType === 'S' && raceTicks > 300) {
                        // Straight: Full DRS overtake attack
                        targetSpeed += 16;
                        car.activeAero = 'REBUFO + OVERTAKE (DRS)';
                        car.targetLaneOffset = (carAheadInLane.laneOffset >= 0) ? -7 : 7;
                    } else {
                        // Corners: Take complementary line (inside vs outside)
                        const leadLane = carAheadInLane.laneOffset;
                        car.targetLaneOffset = (leadLane <= 0) ? 5.5 : -5.5;
                    }
                } else {
                    // Clear air ahead: follow optimal central racing groove
                    car.targetLaneOffset = 0;
                }
            }

            // 3. Dynamic Safe Gap & Anti-Collision Pacing
            if (carAheadInLane && minLaneGap < 0.052) {
                const lateralDist = Math.abs(car.laneOffset - carAheadInLane.laneOffset);
                const isSeparateLane = lateralDist >= 6.8;

                // In corners OR when following directly behind in the same lane:
                if (trackPt.segmentType !== 'S' || !isSeparateLane) {
                    const minSafeGap = 0.026 + (car.speed / 350) * 0.010;
                    const leadPace = Math.max(65, carAheadInLane.speed);
                    if (minLaneGap < 0.048) {
                        // Progressively match speed of leading car
                        const paceFactor = Math.max(0, (minLaneGap - 0.026) / (0.048 - 0.026));
                        targetSpeed = Math.min(targetSpeed, leadPace * (0.86 + 0.14 * paceFactor));
                    }
                    if (minLaneGap < minSafeGap) {
                        // Apply emergency braking to prevent bumper overlap
                        targetSpeed = Math.min(targetSpeed, leadPace * 0.88);
                        car.brake = Math.max(car.brake, Math.min(1.0, (1.0 - (minLaneGap / minSafeGap)) * 1.6));
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
            car.speed = Math.max(0, Math.min(352, car.speed));

            // Gear & RPM calculations
            if (car.speed === 0) {
                car.gear = 'N';
                car.rpm = 4500;
            } else {
                car.gear = Math.max(1, Math.min(8, Math.floor(car.speed / 41) + 1));
                const baseGearSpeed = (car.gear - 1) * 41;
                const gearProgress = (car.speed - baseGearSpeed) / 41;
                car.rpm = Math.floor(9200 + gearProgress * 5400);
            }

            // Tire wear and heat progression (only when moving)
            if (car.speed > 0) {
                car.tireWear += 0.0035 * (car.speed > 220 ? 1.25 : 0.85) * scaledDt;
                const lateralHeat = car.brake > 0.4 ? 2.2 : 0.4;
                car.tireTemps.fl = Math.round(98 + (car.speed / 340) * 15 + lateralHeat);
                car.tireTemps.fr = Math.round(101 + (car.speed / 340) * 17 + lateralHeat);
                car.tireTemps.rl = Math.round(103 + (car.speed / 340) * 14);
                car.tireTemps.rr = Math.round(105 + (car.speed / 340) * 16);
            }

            // Smooth lateral lane offset interpolation
            car.laneOffset += (car.targetLaneOffset - car.laneOffset) * Math.min(1, 5 * scaledDt);

            // Advance Track Position with Multi-Car Non-Penetration Guard
            if (car.speed > 0) {
                const speedMps = car.speed / 3.6;
                let progressDelta = (speedMps * scaledDt * BASE_SIM_SPEED) / 3337;

                // Check collision avoidance against ALL cars on track
                if (!car.inPitLane) {
                    for (let o = 0; o < cars.length; o++) {
                        const other = cars[o];
                        if (other === car || other.inPitLane) continue;
                        const latGap = Math.abs(car.laneOffset - other.laneOffset);
                        const targetLatGap = Math.abs(car.targetLaneOffset - other.targetLaneOffset);
                        // If cars are in the same lane or converging laterally:
                        if (latGap < 8.0 || targetLatGap < 8.0) {
                            const forwardGap = (other.trackProgress - car.trackProgress + 1.0) % 1.0;
                            if (forwardGap > 0 && forwardGap < 0.5) {
                                // Clamp progress so car maintains at least 0.028 safe gap
                                const maxAllowedDelta = Math.max(0, forwardGap - 0.028);
                                if (progressDelta > maxAllowedDelta) {
                                    progressDelta = maxAllowedDelta;
                                    car.speed = Math.min(car.speed, other.speed * 0.92);
                                    car.brake = Math.max(car.brake, 0.75);
                                    car.throttle = 0;
                                }
                            }
                        }
                    }
                }

                const prevProgress = car.trackProgress;
                car.trackProgress = (car.trackProgress + progressDelta) % 1.0;

                // Lap crossing detection
                if (car.trackProgress < prevProgress && prevProgress > 0.85) {
                    car.lapCount++;
                }
            }
        });

        // 1. Snapshot previous standings positions
        const prevRanks = new Map();
        cars.forEach((c, idx) => {
            prevRanks.set(c.id, c.currentRank || (idx + 1));
        });

        // 2. Re-sort Standings with Hysteresis (0.003 ~ 10m delta prevents 60Hz flickering when neck-and-neck)
        const HYSTERESIS = 0.003;
        cars.sort((a, b) => {
            const scoreA = a.lapCount + a.trackProgress;
            const scoreB = b.lapCount + b.trackProgress;
            const rankA = prevRanks.get(a.id) || 1;
            const rankB = prevRanks.get(b.id) || 2;

            if (rankA < rankB) {
                // Car A was ranked ahead of Car B. B must surpass A by HYSTERESIS to take rank
                if (a.inPitLane && !b.inPitLane) return (scoreB > scoreA) ? -1 : 1;
                return (scoreB - HYSTERESIS > scoreA) ? -1 : 1;
            } else if (rankB < rankA) {
                // Car B was ranked ahead of Car A. A must surpass B by HYSTERESIS to take rank
                if (b.inPitLane && !a.inPitLane) return (scoreA > scoreB) ? 1 : -1;
                return (scoreA - HYSTERESIS > scoreB) ? 1 : -1;
            }
            return scoreB - scoreA;
        });

        // 3. Always calculate current race lap from the maximum lap achieved by the leader
        currentLap = Math.min(TOTAL_LAPS, Math.max(1, ...cars.map(c => c.lapCount)));

        // 4. Update gap to leader and detect legitimate on-track overtakes
        const leader = cars[0];
        const nowMs = Date.now();

        cars.forEach((car, idx) => {
            const newRank = idx + 1;
            const oldRank = prevRanks.get(car.id) || newRank;
            car.currentRank = newRank;

            if (idx === 0) {
                car.gapToLeader = 0;
            } else {
                const gapProgress = (leader.lapCount + leader.trackProgress) - (car.lapCount + car.trackProgress);
                car.gapToLeader = Math.max(0.1, gapProgress * 78.5);
            }

            // Genuine on-track overtake detection:
            // - Car gained at least 1 position (newRank < oldRank)
            // - Race has completed the initial standing grid launch (raceTicks > 180, ~3s)
            // - Car is actively on track, not in pit lane
            if (newRank < oldRank && raceTicks > 180 && !car.inPitLane) {
                // Find the displaced car that was overtaken
                const carPassed = cars.find(other => {
                    if (other === car || other.inPitLane) return false;
                    const otherOld = prevRanks.get(other.id);
                    return otherOld && otherOld < oldRank && other.currentRank > otherOld;
                });

                if (carPassed) {
                    const matchupKey = `${car.id}_${carPassed.id}`;
                    const reverseMatchupKey = `${carPassed.id}_${car.id}`;
                    const lastOvertake = overtakeCooldowns[matchupKey] || 0;
                    const lastReverse = overtakeCooldowns[reverseMatchupKey] || 0;

                    // Require at least 4.5s between repeated passes between the same pair
                    if (nowMs - lastOvertake > 4500 && nowMs - lastReverse > 2500) {
                        overtakeCooldowns[matchupKey] = nowMs;
                        const trackPt = getTrackPointAt(car.trackProgress);
                        const cornerName = trackPt.segmentName ? trackPt.segmentName.toUpperCase() : 'RECTA PRINCIPAL';
                        logRaceEvent('overtake', `ADELANTAMIENTO: ${car.id} SUPERA A ${carPassed.id} POR LA P${newRank} EN ${cornerName}`);
                    }
                }
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

    // Sprite rendering constants
    const CAR_SPRITE_W = 42;
    const CAR_SPRITE_H = 18;

    function resizeCanvas() {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
    }

    function renderTrack() {
        if (!canvas || !ctx) return;
        const width = canvas.getBoundingClientRect().width;
        const height = canvas.getBoundingClientRect().height;

        ctx.clearRect(0, 0, width, height);

        // 1. Draw Circuit Base Track
        ctx.beginPath();
        const steps = 260;
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

        // 1b. FIA 2-by-2 Staggered Starting Grid Markings
        for (let k = 0; k < 8; k++) {
            const boxProg = 0.091 - (k * 0.013);
            const boxIsInside = k % 2 === 0;
            const boxLane = boxIsInside ? -7.5 : 7.5;
            const pt = getTrackPointAt(boxProg);
            const nextPt = getTrackPointAt(boxProg + 0.002);
            const angle = Math.atan2((nextPt.y - pt.y) * height, (nextPt.x - pt.x) * width);
            const nx = -Math.sin(angle);
            const ny = Math.cos(angle);
            const bx = pt.x * width + nx * boxLane;
            const by = pt.y * height + ny * boxLane;

            ctx.save();
            ctx.translate(bx, by);
            ctx.rotate(angle);

            // Grid Box boundary outline (FIA White)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.lineWidth = 1;
            ctx.strokeRect(-12, -5, 24, 10);

            // Yellow front stop line
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(12, -5);
            ctx.lineTo(12, 5);
            ctx.stroke();

            // Grid Box Position Number
            ctx.font = '700 7px "JetBrains Mono", monospace';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillText(`P${k + 1}`, -10, 3);

            ctx.restore();
        }

        // 1c. Official Checkered Start/Finish Line (Línea de Meta) at progress 0.088
        const finishPt = getTrackPointAt(0.088);
        const finishNextPt = getTrackPointAt(0.090);
        const finishAngle = Math.atan2((finishNextPt.y - finishPt.y) * height, (finishNextPt.x - finishPt.x) * width);
        const fx = finishPt.x * width;
        const fy = finishPt.y * height;
        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(finishAngle);
        for (let c = -9; c < 9; c += 3) {
            ctx.fillStyle = (Math.floor(c / 3) % 2 === 0) ? '#FFFFFF' : '#181b24';
            ctx.fillRect(-2.5, c, 5, 3);
        }
        ctx.restore();

        // 2. Draw Pit Lane Detour (Parallel line along pit straight)
        ctx.beginPath();
        for (let p = 0.94; p <= 1.0; p += 0.005) {
            const pt = getTrackPointAt(p);
            const nextPt = getTrackPointAt(p + 0.003);
            const angle = Math.atan2((nextPt.y - pt.y) * height, (nextPt.x - pt.x) * width);
            const nx = -Math.sin(angle);
            const ny = Math.cos(angle);
            const px = pt.x * width + nx * 18;
            const py = pt.y * height + ny * 18;
            if (p === 0.94) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        for (let p = 0.0; p <= 0.12; p += 0.005) {
            const pt = getTrackPointAt(p);
            const nextPt = getTrackPointAt(p + 0.003);
            const angle = Math.atan2((nextPt.y - pt.y) * height, (nextPt.x - pt.x) * width);
            const nx = -Math.sin(angle);
            const ny = Math.cos(angle);
            const px = pt.x * width + nx * 18;
            const py = pt.y * height + ny * 18;
            ctx.lineTo(px, py);
        }
        ctx.strokeStyle = 'rgba(255, 184, 0, 0.45)';
        ctx.lineWidth = 3;
        ctx.setLineDash([3, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Pit Box Marking
        const pitBoxPt = getTrackPointAt(0.040);
        const pitNextPt = getTrackPointAt(0.043);
        const pitAngle = Math.atan2((pitNextPt.y - pitBoxPt.y) * height, (pitNextPt.x - pitBoxPt.x) * width);
        const pitNx = -Math.sin(pitAngle);
        const pitNy = Math.cos(pitAngle);
        const pitBoxX = pitBoxPt.x * width + pitNx * 18;
        const pitBoxY = pitBoxPt.y * height + pitNy * 18;
        ctx.fillStyle = '#FFB800';
        ctx.fillRect(pitBoxX - 4, pitBoxY - 3, 8, 6);

        // 3. Draw Active DRS / Aero Zones (Pit Straight)
        ctx.strokeStyle = 'rgba(0, 210, 190, 0.45)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        let drsStarted = false;
        for (let p = 0.98; p <= 1.0; p += 0.003) {
            const pt = getTrackPointAt(p);
            const cx = pt.x * width;
            const cy = pt.y * height;
            if (!drsStarted) { ctx.moveTo(cx, cy); drsStarted = true; }
            else ctx.lineTo(cx, cy);
        }
        for (let p = 0.0; p <= 0.105; p += 0.003) {
            const pt = getTrackPointAt(p);
            const cx = pt.x * width;
            const cy = pt.y * height;
            ctx.lineTo(cx, cy);
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

        // 5. Draw Cars as Premium F1 2026 Monoplazas (PNG Sprites + Dynamic Heading)
        cars.forEach((car) => {
            // Central difference for ultra-smooth curve tangent (second-order accuracy)
            const prevPt = getTrackPointAt(car.trackProgress - 0.005);
            const nextPt = getTrackPointAt(car.trackProgress + 0.005);
            const tangentAngle = Math.atan2((nextPt.y - prevPt.y) * height, (nextPt.x - prevPt.x) * width);
            const nx = -Math.sin(tangentAngle);
            const ny = Math.cos(tangentAngle);
            const pt = getTrackPointAt(car.trackProgress);

            // Screen position including lateral lane offset
            const cx = pt.x * width + nx * car.laneOffset;
            const cy = pt.y * height + ny * car.laneOffset;
            car.screenX = cx;
            car.screenY = cy;

            // Subtle dynamic yaw when car changes lanes during overtake
            let targetHeading = tangentAngle;
            const laneDelta = car.targetLaneOffset - car.laneOffset;
            if (Math.abs(laneDelta) > 0.25) {
                targetHeading += Math.max(-0.22, Math.min(0.22, laneDelta * 0.035));
            }

            // Smooth heading angle with angular delta normalization
            if (car.headingAngle === undefined) {
                car.headingAngle = targetHeading;
            } else {
                let diff = targetHeading - car.headingAngle;
                while (diff < -Math.PI) diff += Math.PI * 2;
                while (diff > Math.PI) diff -= Math.PI * 2;
                const damp = Math.min(1.0, 16 * 0.016);
                car.headingAngle += diff * damp;
            }
            const angle = car.headingAngle;

            // ── PARTICLE EMISSIONS ──

            // Emit sparks on straights at high speed
            if (car.speed > 280 && pt.segmentType === 'S' && Math.random() < 0.45) {
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

            // ── MOTION BLUR TRAIL (at high speed) ──
            const speedRatio = Math.min(1, car.speed / 340);
            if (car.speed > 120) {
                const trailLen = 6 + speedRatio * 18;
                const trailAlpha = 0.08 + speedRatio * 0.14;
                const livery = getDriverLivery(car);
                // Parse hex color to rgb for canvas-compatible rgba
                const hex = livery.primary;
                const r = parseInt(hex.slice(1, 3), 16) || 0;
                const g = parseInt(hex.slice(3, 5), 16) || 0;
                const b = parseInt(hex.slice(5, 7), 16) || 0;
                const grad = ctx.createLinearGradient(-trailLen - CAR_SPRITE_W * 0.38, 0, -CAR_SPRITE_W * 0.38, 0);
                grad.addColorStop(0, 'rgba(0,0,0,0)');
                grad.addColorStop(1, `rgba(${r},${g},${b},${trailAlpha})`);
                ctx.fillStyle = grad;
                ctx.fillRect(-trailLen - CAR_SPRITE_W * 0.38, -CAR_SPRITE_H * 0.28, trailLen, CAR_SPRITE_H * 0.56);
            }

            // ── GROUND EFFECT SHADOW (Radial Gradient – smaller, softer) ──
            const shadowGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 14);
            shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
            shadowGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.25)');
            shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = shadowGrad;
            ctx.beginPath();
            ctx.ellipse(0, 0, 14, 6, 0, 0, Math.PI * 2);
            ctx.fill();

            // ── SPEED GLOW (braking = red, ERS = cyan, high speed = warm) ──
            if (car.speed > 80) {
                let glowColor, glowAlpha;
                if (car.isBrakingHard) {
                    glowColor = '225, 6, 0';
                    glowAlpha = 0.3 + car.brake * 0.25;
                } else if (car.ersDeployTimer > 0) {
                    glowColor = '0, 240, 255';
                    glowAlpha = 0.35;
                } else {
                    glowColor = '255, 200, 60';
                    glowAlpha = speedRatio * 0.15;
                }
                const glowGrad = ctx.createRadialGradient(0, 0, 3, 0, 0, 18);
                glowGrad.addColorStop(0, `rgba(${glowColor}, ${glowAlpha})`);
                glowGrad.addColorStop(1, `rgba(${glowColor}, 0)`);
                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.ellipse(0, 0, 18, 10, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            // ── ACTIVE DRIVER TRACKING RETICLE ──
            if (car.id === activeDriverId) {
                ctx.beginPath();
                ctx.arc(0, 0, 24, 0, Math.PI * 2);
                ctx.strokeStyle = car.color;
                ctx.lineWidth = 1.8;
                ctx.setLineDash([5, 4]);
                ctx.stroke();
                ctx.setLineDash([]);

                // Dynamic team-colored inner glow ring
                const hex = car.color;
                const r = parseInt(hex.slice(1, 3), 16) || 225;
                const g = parseInt(hex.slice(3, 5), 16) || 6;
                const b = parseInt(hex.slice(5, 7), 16) || 0;
                const reticleGrad = ctx.createRadialGradient(0, 0, 16, 0, 0, 28);
                reticleGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
                reticleGrad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.18)`);
                reticleGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                ctx.fillStyle = reticleGrad;
                ctx.beginPath();
                ctx.ellipse(0, 0, 28, 16, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            // ── ERS ATTACK MODE AURA HALO ──
            if (car.ersDeployTimer > 0) {
                ctx.beginPath();
                ctx.arc(0, 0, 22, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(0, 240, 255, 0.75)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // ── RENDER CAR: PNG Sprite (primary) or Vector (fallback) ──
            const spriteImg = carSpriteImages[car.id];
            if (spriteImg && spriteImg.complete && spriteImg.naturalWidth > 0) {
                // Sprites are portrait (nose at top), rotate -90° so nose faces +X (forward)
                ctx.save();
                ctx.rotate(-Math.PI / 2);
                // After -90° rotation: sprite's original top (nose) now points right (+X)
                // Draw with swapped dimensions: height along X-axis, width along Y-axis
                ctx.drawImage(
                    spriteImg,
                    -CAR_SPRITE_H * 0.5,  // center vertically (now the "width" after rotation)
                    -CAR_SPRITE_W * 0.5,  // center horizontally (now the "height" after rotation)
                    CAR_SPRITE_H,
                    CAR_SPRITE_W
                );
                ctx.restore();
            } else {
                // Fallback: render the vector monoplaza if sprite hasn't loaded
                drawF1MonoplazaTopDown(ctx, car);
            }

            ctx.restore();
        });

        // 6. RENDER DRIVER BADGES (Pass 2: Stable, Non-Overlapping & Lerp-Smoothed)
        const badgeW = 62;
        const badgeH = 15;

        // Step A: Calculate ideal non-overlapping target positions
        // Stable vertical preference: even gridIndex above (-28), odd below (+22)
        // This is 100% constant throughout the race, preventing rank-swap vertical hopping
        const badgeSlots = cars.map(car => {
            const isUpper = (car.gridIndex % 2 === 0);
            let offsetY = isUpper ? -28 : 22;
            let targetX = Math.round(car.screenX - badgeW * 0.5);
            let targetY = Math.round(car.screenY + offsetY);
            return {
                car,
                isUpper,
                x: targetX,
                y: targetY,
                offsetY
            };
        });

        // Anti-overlap resolution: if two badges on the same side are within collision distance
        for (let i = 0; i < badgeSlots.length; i++) {
            for (let j = 0; j < i; j++) {
                const b1 = badgeSlots[i];
                const b2 = badgeSlots[j];
                if (Math.abs(b1.x - b2.x) < badgeW + 3 && Math.abs(b1.y - b2.y) < badgeH + 2) {
                    b1.offsetY += b1.isUpper ? -14 : 14;
                    b1.y = Math.round(b1.car.screenY + b1.offsetY);
                }
            }
        }

        // Step B: Render each badge with smooth coordinate interpolation (lerp)
        badgeSlots.forEach(slot => {
            const car = slot.car;
            const cx = car.screenX;
            const cy = car.screenY;
            const isCarActive = car.id === activeDriverId;

            // Exponential coordinate smoothing to prevent any visual jumps
            if (car.smoothBadgeX === undefined || !isRunning) {
                car.smoothBadgeX = slot.x;
                car.smoothBadgeY = slot.y;
            } else {
                car.smoothBadgeX += (slot.x - car.smoothBadgeX) * 0.25;
                car.smoothBadgeY += (slot.y - car.smoothBadgeY) * 0.25;
            }

            const tagX = Math.round(car.smoothBadgeX);
            const tagY = Math.round(car.smoothBadgeY);
            const isAbove = tagY < cy;

            // Leader line from car to badge
            ctx.strokeStyle = isCarActive ? car.color : 'rgba(255, 255, 255, 0.22)';
            ctx.lineWidth = isCarActive ? 1.2 : 0.8;
            ctx.beginPath();
            ctx.moveTo(cx, isAbove ? cy - 7 : cy + 7);
            ctx.lineTo(cx, isAbove ? tagY + badgeH : tagY);
            ctx.stroke();

            // Badge background with glassmorphism
            ctx.fillStyle = isCarActive ? 'rgba(12, 16, 26, 0.96)' : 'rgba(11, 14, 22, 0.9)';
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(tagX, tagY, badgeW, badgeH, 3);
            } else {
                ctx.rect(tagX, tagY, badgeW, badgeH);
            }
            ctx.fill();

            // Top edge highlight
            ctx.strokeStyle = isCarActive ? car.color : 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(tagX + 3, tagY);
            ctx.lineTo(tagX + badgeW - 3, tagY);
            ctx.stroke();

            // Border
            ctx.strokeStyle = isCarActive ? car.color : 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = isCarActive ? 1.4 : 0.6;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(tagX, tagY, badgeW, badgeH, 3);
            } else {
                ctx.rect(tagX, tagY, badgeW, badgeH);
            }
            ctx.stroke();

            // Team color accent bar
            ctx.fillStyle = car.color;
            ctx.fillRect(tagX + 2, tagY + 2.5, 2.5, badgeH - 5);

            // Official Team Logo (Canvas)
            const logoImg = teamLogoImages[car.id];
            if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
                ctx.drawImage(logoImg, tagX + 6, tagY + 2.5, 10, 10);
            }

            // Driver Code
            ctx.font = '700 8.5px "JetBrains Mono", monospace';
            ctx.fillStyle = isCarActive ? '#FFFFFF' : '#CDD3DE';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(car.id, tagX + 19, tagY + badgeH * 0.5);

            // Speed readout
            const speedText = Math.round(car.speed);
            ctx.font = '600 7.5px "JetBrains Mono", monospace';
            ctx.fillStyle = car.isBrakingHard ? '#FF4444' : (car.ersDeployTimer > 0 ? '#00F0FF' : 'rgba(255,255,255,0.6)');
            ctx.textAlign = 'right';
            ctx.fillText(speedText, tagX + badgeW - 3, tagY + badgeH * 0.5);
            ctx.textAlign = 'left';
        });
    }

    /* ═══════════════════════════════════════════════════════════════
       7. DOM UPDATERS: TIMING TOWER & COCKPIT HUD
       ═══════════════════════════════════════════════════════════════ */
    function selectActiveDriver(driverId, shouldScroll = false) {
        if (!driverId) return;
        activeDriverId = driverId;

        // Immediately update classes in the DOM Timing Tower
        const towerEl = document.getElementById('timingTowerRows');
        if (towerEl) {
            towerEl.querySelectorAll('.timing-row').forEach(row => {
                const isTarget = row.getAttribute('data-driver') === driverId;
                row.classList.toggle('active', isTarget);
                row.setAttribute('aria-selected', isTarget ? 'true' : 'false');
            });
        }

        // Immediately update Cockpit HUD with full telemetry
        updateCockpitHUD();

        // Immediately update track canvas reticle
        renderTrack();

        // Trigger visual pulse glow on HUD panel to show driver was switched
        const hudPanel = document.querySelector('.cockpit-hud-panel');
        if (hudPanel) {
            hudPanel.classList.remove('hud-pulse-highlight');
            void hudPanel.offsetWidth; // force DOM reflow
            hudPanel.classList.add('hud-pulse-highlight');
        }

        // On mobile/tablet where columns are stacked vertically, gently scroll to HUD only if user explicitly selected
        if (shouldScroll && window.innerWidth <= 992) {
            const telemetryPanel = document.querySelector('.cockpit-hud-panel');
            if (telemetryPanel) {
                telemetryPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }

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
            const logoSrc = DRIVER_TEAM_LOGOS[car.id] || '';

            return `
                <div class="timing-row ${isActive ? 'active' : ''}" data-driver="${car.id}" role="button" tabindex="0" aria-selected="${isActive ? 'true' : 'false'}" style="--row-team-color: ${car.color};">
                    <span class="timing-pos">${idx + 1}</span>
                    <span class="timing-team-stripe" style="background: ${car.color};"></span>
                    ${logoSrc ? `<img class="timing-team-logo" src="${logoSrc}" alt="${car.team}" loading="lazy" />` : ''}
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
    }

    function updateCockpitHUD() {
        const car = cars.find(c => c.id === activeDriverId) || cars[0];

        // Driver details
        const driverNameEl = document.getElementById('hudDriverName');
        const driverTeamEl = document.getElementById('hudDriverTeam');
        const driverNumEl = document.getElementById('hudDriverNum');
        if (driverNameEl) driverNameEl.textContent = car.name;
        if (driverTeamEl) driverTeamEl.textContent = `${car.team} · F1 2026`;
        if (driverNumEl) {
            driverNumEl.textContent = car.num;
            driverNumEl.style.borderColor = car.color;
            driverNumEl.style.boxShadow = `0 0 10px ${car.color}60`;
            driverNumEl.style.color = '#FFFFFF';
        }

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
       9. COUNTDOWN TIMER: DYNAMIC 2026 CALENDAR NEXT GP
       ═══════════════════════════════════════════════════════════════ */
    function initCountdown() {
        const F1_CALENDAR_EVENTS = [
            { round: 'ROUND 03', title: 'GRAND PRIX DE MONACO 2026', circuit: 'CIRCUIT DE MONACO · MONTE CARLO', date: new Date('2026-05-24T13:00:00Z') },
            { round: 'ROUND 04', title: 'GRAN PREMIO DE ESPAÑA 2026', circuit: 'IFEMA STREET CIRCUIT · MADRID', date: new Date('2026-06-21T13:00:00Z') },
            { round: 'ROUND 05', title: 'BRITISH GRAND PRIX 2026', circuit: 'SILVERSTONE CIRCUIT · NORTHAMPTONSHIRE', date: new Date('2026-07-12T13:00:00Z') },
            { round: 'ROUND 06', title: 'GRAN PREMIO D’ITALIA 2026', circuit: 'AUTODROMO NAZIONALE MONZA · MONZA', date: new Date('2026-09-06T13:00:00Z') },
            { round: 'ROUND 07', title: 'AZERBAIJAN GRAND PRIX 2026', circuit: 'BAKU CITY CIRCUIT · BAKU', date: new Date('2026-09-20T11:00:00Z') },
            { round: 'ROUND 08', title: 'SINGAPORE GRAND PRIX 2026', circuit: 'MARINA BAY STREET CIRCUIT · SINGAPORE', date: new Date('2026-10-04T12:00:00Z') },
            { round: 'ROUND 09', title: 'UNITED STATES GP 2026', circuit: 'CIRCUIT OF THE AMERICAS · AUSTIN', date: new Date('2026-10-18T19:00:00Z') }
        ];

        function getNextEvent() {
            const now = Date.now();
            const upcoming = F1_CALENDAR_EVENTS.find(ev => ev.date.getTime() > now);
            if (upcoming) return upcoming;

            // If all hardcoded calendar dates have elapsed, schedule rolling next Sunday GP
            const nextSunday = new Date();
            const day = nextSunday.getUTCDay();
            const daysToAdd = (7 - day) % 7 || 7;
            nextSunday.setUTCDate(nextSunday.getUTCDate() + daysToAdd);
            nextSunday.setUTCHours(13, 0, 0, 0);
            return {
                round: 'PRÓXIMO GP',
                title: 'FIA F1 WORLD CHAMPIONSHIP',
                circuit: 'PRÓXIMA SESIÓN OFICIAL',
                date: nextSunday
            };
        }

        const event = getNextEvent();
        const roundBadge = document.getElementById('nextGpRoundBadge');
        const titleEl = document.getElementById('nextGpTitle');
        const circuitEl = document.getElementById('nextGpCircuit');

        if (roundBadge) roundBadge.textContent = event.round;
        if (titleEl) titleEl.textContent = event.title;
        if (circuitEl) circuitEl.textContent = `${event.circuit} · ${event.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}`;

        function tick() {
            const now = Date.now();
            let diff = event.date.getTime() - now;
            if (diff <= 0) diff = 7 * 86400000;

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
       10. SIMULATION CONTROLS, RESET & EVENT WIRING
       ═══════════════════════════════════════════════════════════════ */
    function resetSimulation() {
        isRunning = false;
        currentLap = 1;
        raceTicks = 0;
        raceState = 'GREEN';

        // Reset all cars to initial standing grid formation
        DRIVERS_DB.forEach((driver, index) => {
            const car = cars.find(c => c.id === driver.id);
            if (car) {
                const isInside = index % 2 === 0;
                const gridSlot = 0.091 - (index * 0.013);
                car.gridIndex = index;
                car.trackProgress = gridSlot;
                car.speed = 0;
                car.targetSpeed = 0;
                car.throttle = 0;
                car.brake = 1.0;
                car.gear = 'N';
                car.rpm = 4500;
                car.batterySOC = 100;
                car.tireWear = 0;
                car.compound = index % 3 === 0 ? 'SOFT' : (index % 3 === 1 ? 'MEDIUM' : 'HARD');
                car.tireTemps = { fl: 100, fr: 100, rl: 100, rr: 100 };
                car.inPitLane = false;
                car.pitState = 'NONE';
                car.pitTimer = 0;
                car.wantsPit = false;
                car.lapCount = 1;
                car.gapToLeader = index === 0 ? 0 : index * 0.22;
                car.lastSectorTime = '--.---';
                car.currentSector = 1;
                car.activeAero = 'GRID MODE';
                car.laneOffset = isInside ? -7.5 : 7.5;
                car.targetLaneOffset = isInside ? -7.5 : 7.5;
                car.longGForce = 0.0;
                car.isBrakingHard = false;
                car.ersDeployTimer = 0;
                car.lockupTimer = 0;
                car.headingAngle = undefined;
                car.smoothBadgeX = undefined;
                car.smoothBadgeY = undefined;
                car.currentRank = index + 1;
            }
        });

        // Clear particles
        particles.length = 0;

        // Reset Race Control Feed & Cooldowns
        raceControlEvents.length = 0;
        Object.keys(recentEventTimestamps).forEach(k => delete recentEventTimestamps[k]);
        Object.keys(overtakeCooldowns).forEach(k => delete overtakeCooldowns[k]);
        raceControlEvents.push(
            { time: '14:30:00', type: 'green', text: 'FIA: PROCEDIMIENTO DE SALIDA COMPLETADO // PARRILLA 2026 LISTA' },
            { time: '14:30:30', type: 'green', text: 'LISTO PARA LARGADA // PRESIONA "INICIAR CARRERA" PARA COMENZAR' }
        );

        const listEl = document.getElementById('raceControlList');
        if (listEl) {
            listEl.innerHTML = raceControlEvents.map(ev => `
                <div class="race-event-item ${ev.type}">
                    <span class="event-time">${ev.time}</span>
                    <span class="event-badge ${ev.type}">${ev.type.toUpperCase()}</span>
                    <span class="event-text">${ev.text}</span>
                </div>
            `).join('');
        }

        const lapBadge = document.getElementById('trackLapBadge');
        if (lapBadge) lapBadge.textContent = `VUELTA 1/${TOTAL_LAPS}`;

        const flagBadge = document.getElementById('trackFlagBadge');
        if (flagBadge) {
            flagBadge.textContent = 'ESTADO: PARRILLA DE SALIDA';
            flagBadge.style.color = '#00D2BE';
        }

        const raceBadge = document.getElementById('raceStateBadge');
        const raceText = document.getElementById('raceStateText');
        if (raceBadge) raceBadge.className = 'situation-status-chip green';
        if (raceText) raceText.textContent = 'PARRILLA LISTA // ESPERANDO SEMÁFORO';

        updateTimingTower();
        updateCockpitHUD();
        renderTrack();
    }

    function initControls() {
        const btnPlay = document.getElementById('btnSimPlay');
        const btnReset = document.getElementById('btnSimReset');

        function updatePlayButtonUI() {
            if (!btnPlay) return;
            if (isRunning) {
                btnPlay.innerHTML = `
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    <span>PAUSAR</span>
                `;
                btnPlay.classList.add('is-running');
                btnPlay.classList.remove('active');
            } else {
                const isGridStart = currentLap === 1 && cars.every(c => c.lapCount === 1 && c.speed === 0);
                btnPlay.innerHTML = `
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    <span>${isGridStart ? 'INICIAR CARRERA' : 'REANUDAR'}</span>
                `;
                btnPlay.classList.remove('is-running');
                btnPlay.classList.toggle('active', isGridStart);
            }
        }

        if (btnPlay) {
            btnPlay.addEventListener('click', () => {
                const wasRunning = isRunning;
                isRunning = !isRunning;
                if (!wasRunning) {
                    const isGridStart = currentLap === 1 && cars.some(c => c.speed === 0);
                    if (isGridStart) {
                        logRaceEvent('green', '🚦 FIA: ¡SEMÁFOROS APAGADOS! LARGADA OFICIAL DEL GRAN PREMIO DE MÓNACO 2026');
                        const flagBadge = document.getElementById('trackFlagBadge');
                        if (flagBadge) {
                            flagBadge.textContent = 'BANDERA: VERDE';
                            flagBadge.style.color = '#00D2BE';
                        }
                    } else {
                        logRaceEvent('green', '▶ SIMULACIÓN REANUDADA POR EL OPERADOR');
                    }
                } else {
                    logRaceEvent('yellow', '⏸ SIMULACIÓN EN PAUSA // TELEMETRÍA CONGELADA');
                }
                updatePlayButtonUI();
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', () => {
                resetSimulation();
                updatePlayButtonUI();
                logRaceEvent('green', '🔄 PARRILLA DE SALIDA REINICIADA // LISTO PARA NUEVA LARGADA');
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
        // TIMING TOWER SELECTION (Click & Keyboard Delegation)
        // ═══════════════════════════════════════════════════════════
        const towerEl = document.getElementById('timingTowerRows');
        if (towerEl) {
            towerEl.addEventListener('click', (e) => {
                const row = e.target.closest('.timing-row');
                if (row) {
                    const driverId = row.getAttribute('data-driver');
                    if (driverId) {
                        selectActiveDriver(driverId, true);
                    }
                }
            });
            towerEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const row = e.target.closest('.timing-row');
                    if (row) {
                        e.preventDefault();
                        const driverId = row.getAttribute('data-driver');
                        if (driverId) {
                            selectActiveDriver(driverId, true);
                        }
                    }
                }
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

        // Throttle DOM updates to 10 FPS when race is running
        if (isRunning && raceTicks % 6 === 0) {
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
        selectActiveDriver('VER');
        setTimeout(dismissLoader, 350);
        requestAnimationFrame(mainLoop);
    });

})();
