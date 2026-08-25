/* ============================================================
   F1 SIM PRO — Spring Boot 3.2 In-Memory API Engine (Lite)
   Handles Driver Stats, Vehicle Configurations, and Race Events.
   ============================================================ */

export class F1ApiClient {
    constructor() {
        this.baseUrl = 'https://api.f1sim.agengineering.io/api/v1';
        
        // Driver Database with Stats for the Simulation Engine
        this.pilotos = [
            { 
                id: 1, 
                codigo: 'VER', 
                numero: 1, 
                nombre: 'Max Verstappen', 
                equipo: 'RED_BULL', 
                equipoNombre: 'Red Bull Racing',
                habilidad: 98, 
                experiencia: 92, 
                gestionNeumaticos: 94, 
                probabilidadError: 0.02,
                victorias: 58, 
                podios: 104, 
                puntos: 2580, 
                vehiculo: 'RB20' 
            },
            { 
                id: 2, 
                codigo: 'LEC', 
                numero: 16, 
                nombre: 'Charles Leclerc', 
                equipo: 'FERRARI', 
                equipoNombre: 'Scuderia Ferrari',
                habilidad: 95, 
                experiencia: 88, 
                gestionNeumaticos: 90, 
                probabilidadError: 0.04,
                victorias: 6, 
                podios: 36, 
                puntos: 1250, 
                vehiculo: 'SF-24' 
            },
            { 
                id: 3, 
                codigo: 'NOR', 
                numero: 4, 
                nombre: 'Lando Norris', 
                equipo: 'MCLAREN', 
                equipoNombre: 'McLaren F1 Team',
                habilidad: 94, 
                experiencia: 85, 
                gestionNeumaticos: 89, 
                probabilidadError: 0.03,
                victorias: 3, 
                podios: 21, 
                puntos: 840, 
                vehiculo: 'MCL38' 
            },
            { 
                id: 4, 
                codigo: 'HAM', 
                numero: 44, 
                nombre: 'Lewis Hamilton', 
                equipo: 'MERCEDES', 
                equipoNombre: 'Mercedes-AMG PETRONAS',
                habilidad: 93, 
                experiencia: 99, 
                gestionNeumaticos: 96, 
                probabilidadError: 0.02,
                victorias: 105, 
                podios: 201, 
                puntos: 4780, 
                vehiculo: 'W15' 
            },
            { 
                id: 5, 
                codigo: 'SAI', 
                numero: 55, 
                nombre: 'Carlos Sainz', 
                equipo: 'FERRARI', 
                equipoNombre: 'Scuderia Ferrari',
                habilidad: 91, 
                experiencia: 90, 
                gestionNeumaticos: 93, 
                probabilidadError: 0.03,
                victorias: 3, 
                podios: 22, 
                puntos: 1180, 
                vehiculo: 'SF-24' 
            },
            { 
                id: 6, 
                codigo: 'PIA', 
                numero: 81, 
                nombre: 'Oscar Piastri', 
                equipo: 'MCLAREN', 
                equipoNombre: 'McLaren F1 Team',
                habilidad: 90, 
                experiencia: 80, 
                gestionNeumaticos: 86, 
                probabilidadError: 0.04,
                victorias: 1, 
                podios: 8, 
                puntos: 350, 
                vehiculo: 'MCL38' 
            },
            { 
                id: 7, 
                codigo: 'RUS', 
                numero: 63, 
                nombre: 'George Russell', 
                equipo: 'MERCEDES', 
                equipoNombre: 'Mercedes-AMG PETRONAS',
                habilidad: 91, 
                experiencia: 84, 
                gestionNeumaticos: 88, 
                probabilidadError: 0.04,
                victorias: 2, 
                podios: 14, 
                puntos: 620, 
                vehiculo: 'W15' 
            },
            { 
                id: 8, 
                codigo: 'ALO', 
                numero: 14, 
                nombre: 'Fernando Alonso', 
                equipo: 'ASTON_MARTIN', 
                equipoNombre: 'Aston Martin Aramco',
                habilidad: 92, 
                experiencia: 100, 
                gestionNeumaticos: 97, 
                probabilidadError: 0.01,
                victorias: 32, 
                podios: 106, 
                puntos: 2290, 
                vehiculo: 'AMR24' 
            }
        ];

        this.vehiculos = {
            'RED_BULL': {
                modelo: 'RB20',
                motor: 'Honda RBPT V6 Turbo Hybrid',
                velocidadPuntaKmh: 352.0,
                aceleracion: 2.3,
                cargaAerodinamica: 'MEDIA',
                neumaticos: 'MEDIUM'
            },
            'FERRARI': {
                modelo: 'SF-24',
                motor: 'Ferrari 066/12 V6 Turbo',
                velocidadPuntaKmh: 349.5,
                aceleracion: 2.4,
                cargaAerodinamica: 'MEDIA',
                neumaticos: 'MEDIUM'
            },
            'MCLAREN': {
                modelo: 'MCL38',
                motor: 'Mercedes M15 V6 Turbo',
                velocidadPuntaKmh: 350.0,
                aceleracion: 2.35,
                cargaAerodinamica: 'MEDIA',
                neumaticos: 'MEDIUM'
            },
            'MERCEDES': {
                modelo: 'W15',
                motor: 'Mercedes M15 V6 Turbo',
                velocidadPuntaKmh: 348.0,
                aceleracion: 2.45,
                cargaAerodinamica: 'MEDIA',
                neumaticos: 'MEDIUM'
            },
            'ASTON_MARTIN': {
                modelo: 'AMR24',
                motor: 'Mercedes M15 V6 Turbo',
                velocidadPuntaKmh: 347.0,
                aceleracion: 2.48,
                cargaAerodinamica: 'MEDIA',
                neumaticos: 'MEDIUM'
            }
        };

        this.circuitos = [
            {
                id: 'circuit-monaco',
                nombre: 'Circuit de Monaco',
                pais: 'Mónaco',
                longitudKm: 3.337,
                vueltas: 78,
                curvas: 19,
                recordVuelta: { piloto: 'Lewis Hamilton', tiempoSegundos: 72.909 }
            }
        ];

        this.eventosHistorial = [];
    }

    async getPilotos() {
        return [...this.pilotos];
    }

    async getVehiculos() {
        return { ...this.vehiculos };
    }

    async putSetupVehiculo(escuderiaKey, setupData) {
        // Simulate async latency
        await new Promise(r => setTimeout(r, 80));

        if (this.vehiculos[escuderiaKey]) {
            this.vehiculos[escuderiaKey] = {
                ...this.vehiculos[escuderiaKey],
                ...setupData
            };
            return {
                status: 'SUCCESS',
                mensaje: `Setup aplicado a ${escuderiaKey}`,
                vehiculo: this.vehiculos[escuderiaKey]
            };
        }
        return { status: 'NOT_FOUND', mensaje: 'Escudería no encontrada' };
    }

    async postEventosCarrera(evento) {
        this.eventosHistorial.push({
            ...evento,
            timestamp: new Date().toISOString()
        });
        return { status: 'OK', evento };
    }
}

// Export singleton instance
export const api = new F1ApiClient();
