/**
 * i18n Translation Engine — Andrés Felipe Guerra Portfolio
 * Fast, lightweight, zero-latency client-side translation module.
 */

(function () {
    'use strict';

    const translations = {
        es: {
            nav_about: 'Sobre Mí',
            nav_projects: 'Proyectos',
            nav_skills: 'Habilidades',
            nav_timeline: 'Trayectoria',
            nav_contact: 'Contacto',
            
            hero_subtitle: '> Fullstack Dev, AI Automation & Scripting (Lua / Luau / Node.js / Python)',
            hero_btn_projects: 'VER PROYECTOS',
            hero_btn_contact: 'CONTACTO',

            about_label_sub: '02 // OVERVIEW',
            about_label_title: 'SOBRE<br>MÍ',
            about_badge_role: 'Experto en Automatización',
            about_p1: 'Soy <strong>Andrés Felipe Guerra</strong>, desarrollador fullstack con experiencia en <strong>Lua &amp; Luau</strong>, automatización inteligente e integración de IA. Mi enfoque está en diseñar y construir soluciones tecnológicas de alto rendimiento, desde scripts y motores de ejecución ligera hasta arquitecturas backend, bots y plataformas web.',
            about_p2: 'Formado en <strong>Campuslands</strong> bajo metodologías Scrum/Agile, he participado en proyectos que abarcan automatización empresarial con n8n, bots de WhatsApp impulsados por IA, plataformas web fullstack y sistemas de seguridad predictiva con Computer Vision. Como desarrollador freelance, he trabajado en la optimización de procesos y la creación de productos digitales para clientes internacionales.',
            about_p3: 'Actualmente continúo fortaleciendo mis habilidades en desarrollo de software, automatización y arquitectura de sistemas, con un interés creciente en la ciberseguridad y las tecnologías de inteligencia artificial aplicadas a entornos reales.',
            
            stat_auto_title: 'Automatización',
            stat_auto_desc: 'Flujos inteligentes con n8n, bots y APIs conectadas.',
            stat_fullstack_title: 'Fullstack Dev',
            stat_fullstack_desc: 'Node.js, React, Python, MySQL — extremo a extremo.',
            stat_agile_title: 'Metodologías Ágiles',
            stat_agile_desc: 'Scrum, sprints, entregas iterativas y mejora continua.',

            projects_label: '03 // PROYECTOS DESPLEGADOS',
            projects_title: 'Proyectos',
            project_btn_view: 'Ver Más ↗',

            proj_delivery_desc: 'Terminal de pedidos automatizada integrando Telegram y n8n para gestión de entregas en tiempo real. <strong>Procesamiento de +500 pedidos/mes con latencia &lt;2s.</strong>',
            proj_whatsapp_desc: 'Asistente conversacional con memoria, personalidad de agente de ventas, compatible con arquitecturas Cloud y Serverless (como Vercel).',
            proj_guardian_desc: 'Sistema de seguridad predictiva para transporte terrestre con Computer Vision e IA colaborativa. Arquitectura de 3 agentes: Centinela (visión), Oráculo (riesgo), Copiloto (conversacional).',
            proj_banco_desc: 'Plataforma financiera simulada con arquitectura de bases de datos resiliente y transacciones seguras.',
            proj_luau_desc: 'Motor de gestión de tareas asíncronas y eventos concurrentes en Luau con tipado estricto (Strict Typing). Estructuras de datos inmutables y ejecución de alta velocidad.',

            skills_label: '04 // ARQUITECTURA Y LÓGICA',
            skills_title: 'Stack Técnico',
            cat_scripting: '// Scripting & Lenguajes',
            cat_backend: '// Backend & APIs',
            cat_frameworks: '// Frameworks',
            cat_frontend: '// Frontend',
            cat_automation: '// Automatización',
            skill_auto_n8n: 'n8n / Workflows',
            skill_auto_ai: 'Integración de IA',

            core_comp_title: 'Core Competencies',
            comp_flow_title: 'Ingeniería de Flujos',
            comp_flow_desc: 'Convierto procesos manuales en sistemas automatizados eficientes. Cada flujo de trabajo está diseñado para minimizar la intervención humana y maximizar la productividad.',
            comp_vision_title: 'Visión Integral',
            comp_vision_desc: 'Desarrollo desde la arquitectura de bases de datos hasta la interfaz de usuario. Comprendo cómo cada capa del stack se conecta para crear soluciones cohesivas.',
            comp_sec_title: 'Seguridad y Escalabilidad',
            comp_sec_desc: 'Código pensado para el futuro. Implemento principios de seguridad desde el diseño y arquitecturas que soportan crecimiento sin reestructuración.',

            timeline_label: '05 // TRAYECTORIA',
            timeline_title: 'Commit History',
            item1_title: 'Fundación Colegio UIS',
            item1_desc: 'Bachiller Académico. Desarrollo de habilidades analíticas, trabajo en equipo y primer acercamiento estructurado a la resolución de problemas lógicos y tecnológicos.',
            item2_title: 'Campuslands — Técnico Laboral en Software',
            item2_desc: 'Formación técnica intensiva en desarrollo de software con metodologías Scrum/Agile. Proyectos reales, sprints, y entrega continua.',
            item3_title: 'Arquitectura de Ciberseguridad',
            item3_desc: 'Google Cybersecurity Certificate en curso. Enfoque en auditoría, arquitectura defensiva y diseño de sistemas resilientes.',

            tech_label: '06 // DATA STREAM',

            contact_label: '07 // CONTACTO',
            contact_title: '¿TIENES UN PROYECTO?',
            contact_sub: 'Inicia una conversación o solicita una cotización para tu próxima automatización.',
            contact_name_ph: 'Tu nombre',
            contact_email_ph: 'Tu email',
            contact_msg_ph: 'Cuéntame sobre tu proyecto...',
            contact_btn_send: 'ENVIAR MENSAJE',

            modal_title: 'Selecciona tu idioma / Select Language',
            modal_sub: 'Escoge el idioma preferido para navegar el portafolio.',
            modal_es: '🇪🇸 Español',
            modal_en: '🇺🇸 English',

            // WhatsApp Bot Landing Translations
            wa_nav_back: 'Volver al Portafolio',
            wa_hero_title: 'Asistente Virtual de WhatsApp <br><span class="gradient-text">&amp; Agendamiento IA 24/7</span>',
            wa_hero_sub: 'Automatización comercial para agendar citas en tiempo real, transcribir audios de voz y transferir a un asesor humano cuando se requiere.',
            wa_btn_demo: 'Solicitar Demo en Vivo',
            wa_btn_plans: 'Ver Tabla de Planes',
            wa_m1_label: 'Citas Automáticas',
            wa_m2_label: 'Respuesta Inmediata',
            wa_m3_label: 'Disponibilidad',
            wa_demo_tag: 'Demostración en Vivo',
            wa_demo_title: 'Experiencia Conversacional en Real Time',
            wa_demo_sub: 'Mira cómo el bot responde de forma fluida a las solicitudes de los clientes en formato vertical 9:16.',
            wa_demo_btn: 'Ver Video Demo',
            wa_case_tag: 'El Caso de Negocio',
            wa_case_title: 'Del Problema a la Solución',
            wa_case_sub: 'Transformación del flujo de atención de clientes.',
            wa_prob_tag: 'El Problema',
            wa_sol_tag: 'La Solución',
            wa_zoom: 'Ampliar',
            wa_arch_tag: 'Capacidades Técnicas',
            wa_arch_title: 'Arquitectura Resiliente',
            wa_arch_sub: 'Enrutamiento inteligente diseñado para evitar bloqueos ante mensajes fuera de contexto.',
            wa_feat1_t: 'Transcripción con IA (Whisper)',
            wa_feat1_d: 'Procesa notas de voz instantáneamente a texto para continuar el flujo de agendamiento sin interrupción.',
            wa_feat2_t: 'Modo Asesor Humano',
            wa_feat2_d: 'Pausa automática del bot al detectar solicitudes de atención personalizada y alerta directa al administrador.',
            wa_feat3_t: 'Aislamiento por Cliente',
            wa_feat3_d: 'Garantía de privacidad en MongoDB donde cada número telefónico accede únicamente a sus datos de cita.',
            wa_feat4_t: 'Panel de Control Rápido',
            wa_feat4_d: 'Comando administrativo directo (opción 4) para listar citas pendientes del día en tiempo real.',
            wa_feat5_t: 'Filtro Anti-Spam &amp; Emojis',
            wa_feat5_d: 'Protección contra ráfagas de mensajes y descarte de reacciones para evitar duplicados en pantalla.',
            wa_feat6_t: 'Auto-Recuperación de Sesión',
            wa_feat6_d: 'Persistencia transparente en Baileys que restablece la conexión ante reinicios del servidor.',
            wa_pricing_h: 'EMPIEZA A RECUPERAR TUS CLIENTES HOY.',
            wa_pricing_s: 'Ideal para negocios que inician su automatización.',
            wa_badge_offer: 'OFERTA',
            wa_period: '/ MES',
            wa_starter_btn: 'Solicitar Plan Starter',
            wa_pro_btn: 'Obtener Plan Profesional',
            wa_ent_btn: 'Cotizar Enterprise',
            wa_cta_h: 'Empieza hoy mismo',
            wa_cta_sub: 'Despliegue listo en menos de 24 horas',
            wa_cta_btn: 'Agendar Demo en Vivo',
            wa_footer_rights: '© 2026 Andrés Correa | Tech Studio &amp; Automatización. Todos los derechos reservados.',
            wa_footer_main: 'Portafolio Principal'
        },
        en: {
            nav_about: 'About Me',
            nav_projects: 'Projects',
            nav_skills: 'Skills',
            nav_timeline: 'Experience',
            nav_contact: 'Contact',

            hero_subtitle: '> Fullstack Dev, AI Automation & Scripting (Lua / Luau / Node.js / Python)',
            hero_btn_projects: 'VIEW PROJECTS',
            hero_btn_contact: 'GET IN TOUCH',

            about_label_sub: '02 // OVERVIEW',
            about_label_title: 'ABOUT<br>ME',
            about_badge_role: 'Automation Expert',
            about_p1: 'I am <strong>Andrés Felipe Guerra</strong>, fullstack developer with experience in <strong>Lua &amp; Luau</strong>, intelligent automation, and AI integration. My focus is on designing and building high-performance tech solutions, from scripts and lightweight execution engines to backend architectures, bots, and web platforms.',
            about_p2: 'Trained at <strong>Campuslands</strong> under Scrum/Agile methodologies, I have worked on projects spanning enterprise automation with n8n, AI-driven WhatsApp bots, fullstack web platforms, and predictive security systems with Computer Vision. As a freelance developer, I optimize workflows and build digital products for international clients.',
            about_p3: 'Currently, I continue to strengthen my software development, automation, and systems architecture skills, with a growing interest in cybersecurity and AI technologies applied to real-world environments.',

            stat_auto_title: 'Automation',
            stat_auto_desc: 'Intelligent workflows with n8n, bots, and connected APIs.',
            stat_fullstack_title: 'Fullstack Dev',
            stat_fullstack_desc: 'Node.js, React, Python, MySQL — end-to-end.',
            stat_agile_title: 'Agile Methodologies',
            stat_agile_desc: 'Scrum, sprints, iterative delivery, and continuous improvement.',

            projects_label: '03 // DEPLOYED PROJECTS',
            projects_title: 'Projects',
            project_btn_view: 'View More ↗',

            proj_delivery_desc: 'Automated order terminal integrating Telegram and n8n for real-time delivery management. <strong>Processing +500 orders/month with &lt;2s latency.</strong>',
            proj_whatsapp_desc: 'Conversational assistant with memory, sales agent personality, compatible with Cloud and Serverless architectures (like Vercel).',
            proj_guardian_desc: 'Predictive security system for road transport with Computer Vision and collaborative AI. 3-agent architecture: Sentinel (vision), Oracle (risk), Copilot (conversational).',
            proj_banco_desc: 'Simulated financial platform with resilient database architecture and secure transactions.',
            proj_luau_desc: 'Asynchronous task management and concurrent event engine in Luau with Strict Typing. Immutable data structures and high-speed execution.',

            skills_label: '04 // ARCHITECTURE & LOGIC',
            skills_title: 'Technical Stack',
            cat_scripting: '// Scripting & Languages',
            cat_backend: '// Backend & APIs',
            cat_frameworks: '// Frameworks',
            cat_frontend: '// Frontend',
            cat_automation: '// Automation',
            skill_auto_n8n: 'n8n / Workflows',
            skill_auto_ai: 'AI Integration',

            core_comp_title: 'Core Competencies',
            comp_flow_title: 'Workflow Engineering',
            comp_flow_desc: 'I transform manual processes into efficient automated systems. Every workflow is engineered to minimize human intervention and maximize productivity.',
            comp_vision_title: 'Full Spectrum Vision',
            comp_vision_desc: 'I develop from database architecture all the way to user interface. I understand how each stack layer connects to build cohesive solutions.',
            comp_sec_title: 'Security & Scalability',
            comp_sec_desc: 'Future-proof code. I implement security-by-design principles and architectures built to handle growth without restructuring.',

            timeline_label: '05 // EXPERIENCE',
            timeline_title: 'Commit History',
            item1_title: 'Fundación Colegio UIS',
            item1_desc: 'Academic High School Diploma. Development of analytical skills, teamwork, and structured problem-solving in tech.',
            item2_title: 'Campuslands — Software Technician',
            item2_desc: 'Intensive software development technical training with Scrum/Agile methodologies. Real projects, sprints, and continuous delivery.',
            item3_title: 'Cybersecurity Architecture',
            item3_desc: 'Google Cybersecurity Certificate in progress. Focused on auditing, defensive architecture, and resilient system design.',

            tech_label: '06 // DATA STREAM',

            contact_label: '07 // CONTACT',
            contact_title: 'HAVE A PROJECT?',
            contact_sub: 'Start a conversation or request a quote for your next automation project.',
            contact_name_ph: 'Your name',
            contact_email_ph: 'Your email',
            contact_msg_ph: 'Tell me about your project...',
            contact_btn_send: 'SEND MESSAGE',

            modal_title: 'Selecciona tu idioma / Select Language',
            modal_sub: 'Choose your preferred language to explore the portfolio.',
            modal_es: '🇪🇸 Español',
            modal_en: '🇺🇸 English',

            // WhatsApp Bot Landing Translations
            wa_nav_back: 'Back to Portfolio',
            wa_hero_title: 'WhatsApp Virtual Assistant <br><span class="gradient-text">&amp; 24/7 AI Scheduling</span>',
            wa_hero_sub: 'Commercial automation for real-time appointment scheduling, voice note transcription, and seamless transfer to human advisors.',
            wa_btn_demo: 'Request Live Demo',
            wa_btn_plans: 'View Pricing Plans',
            wa_m1_label: 'Automated Booking',
            wa_m2_label: 'Instant Response',
            wa_m3_label: 'Availability',
            wa_demo_tag: 'Live Demonstration',
            wa_demo_title: 'Real-Time Conversational Experience',
            wa_demo_sub: 'Watch how the bot fluently responds to customer requests in vertical 9:16 format.',
            wa_demo_btn: 'Watch Video Demo',
            wa_case_tag: 'The Business Case',
            wa_case_title: 'From Problem to Solution',
            wa_case_sub: 'Transformation of customer service workflow.',
            wa_prob_tag: 'The Problem',
            wa_sol_tag: 'The Solution',
            wa_zoom: 'Enlarge',
            wa_arch_tag: 'Technical Capabilities',
            wa_arch_title: 'Resilient Architecture',
            wa_arch_sub: 'Intelligent routing engineered to prevent stalls during out-of-context conversations.',
            wa_feat1_t: 'AI Transcription (Whisper)',
            wa_feat1_d: 'Instantly processes voice notes to text to keep the scheduling flow uninterrupted.',
            wa_feat2_t: 'Human Advisor Mode',
            wa_feat2_d: 'Automatic bot pause upon detecting requests for personalized assistance and direct admin alerts.',
            wa_feat3_t: 'Per-Client Data Isolation',
            wa_feat3_d: 'Privacy guarantee in MongoDB where each phone number accesses only its own booking data.',
            wa_feat4_t: 'Quick Control Panel',
            wa_feat4_d: 'Direct admin command (option 4) to list pending daily appointments in real-time.',
            wa_feat5_t: 'Anti-Spam &amp; Emoji Filter',
            wa_feat5_d: 'Protection against message bursts and reaction discarding to prevent duplicate prompts.',
            wa_feat6_t: 'Session Auto-Recovery',
            wa_feat6_d: 'Transparent Baileys persistence that automatically restores connectivity on server restarts.',
            wa_pricing_h: 'START RECOVERING YOUR CUSTOMERS TODAY.',
            wa_pricing_s: 'Ideal for businesses starting their automation journey.',
            wa_badge_offer: 'OFFER',
            wa_period: '/ MO',
            wa_starter_btn: 'Request Starter Plan',
            wa_pro_btn: 'Get Professional Plan',
            wa_ent_btn: 'Request Enterprise Quote',
            wa_cta_h: 'Get started today',
            wa_cta_sub: 'Deployment ready in under 24 hours',
            wa_cta_btn: 'Schedule Live Demo',
            wa_footer_rights: '© 2026 Andrés Correa | Tech Studio &amp; Automation. All rights reserved.',
            wa_footer_main: 'Main Portfolio'
        }
    };

    function setLanguage(lang) {
        if (!translations[lang]) lang = 'es';
        
        localStorage.setItem('portfolio_lang', lang);
        document.documentElement.lang = lang;

        const dict = translations[lang];

        // Translate text / innerHTML
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        // Translate placeholders
        const placeholders = document.querySelectorAll('[data-i18n-ph]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (dict[key]) {
                el.placeholder = dict[key];
            }
        });

        // Update active class on switcher buttons
        const btnES = document.getElementById('langBtnES');
        const btnEN = document.getElementById('langBtnEN');

        if (btnES && btnEN) {
            btnES.classList.toggle('active', lang === 'es');
            btnEN.classList.toggle('active', lang === 'en');
        }

        // Trigger custom event for other components if needed
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    function initModal() {
        const savedLang = localStorage.getItem('portfolio_lang');
        const modal = document.getElementById('langModal');

        if (!savedLang && modal) {
            // Show modal on first visit
            setTimeout(() => {
                modal.classList.add('active');
            }, 400);
        } else {
            setLanguage(savedLang || 'es');
        }

        // Attach modal listeners
        const modalBtnES = document.getElementById('modalBtnES');
        const modalBtnEN = document.getElementById('modalBtnEN');

        if (modalBtnES) {
            modalBtnES.addEventListener('click', function () {
                setLanguage('es');
                if (modal) modal.classList.remove('active');
            });
        }

        if (modalBtnEN) {
            modalBtnEN.addEventListener('click', function () {
                setLanguage('en');
                if (modal) modal.classList.remove('active');
            });
        }

        // Attach Navbar toggle listeners
        const btnES = document.getElementById('langBtnES');
        const btnEN = document.getElementById('langBtnEN');

        if (btnES) {
            btnES.addEventListener('click', function () {
                setLanguage('es');
            });
        }

        if (btnEN) {
            btnEN.addEventListener('click', function () {
                setLanguage('en');
            });
        }
    }

    // Expose globally
    window.i18nEngine = {
        setLanguage: setLanguage,
        getLanguage: function () {
            return localStorage.getItem('portfolio_lang') || 'es';
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }
})();
