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
            
            hero_title: '<span class="word-break" data-word="FULLSTACK">FULLSTACK</span><span class="word-break" data-word="DEVELOPER">DEVELOPER</span>',
            hero_subtitle: '> Fullstack Dev, AI Automation &amp; Scripting (Lua / Luau / Node.js / Python)',
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

            proj_1_title: 'DeliveryBot',
            proj_2_title: 'WhatsApp Bot IA',
            proj_3_title: 'GUARDIAN',
            proj_4_title: 'Banco ACME',
            proj_5_title: 'Luau Async Task Engine',

            proj_delivery_desc: 'Terminal de pedidos automatizada integrando Telegram y n8n para gestión de entregas en tiempo real. <strong>Procesamiento de +500 pedidos/mes con latencia &lt;2s.</strong>',
            proj_whatsapp_desc: 'Asistente conversacional con memoria, personalidad de agente de ventas, compatible con arquitecturas Cloud y Serverless (como Vercel).',
            proj_guardian_desc: 'Sistema de seguridad predictiva para transporte terrestre con Computer Vision e IA colaborativa. Arquitectura de 3 agentes: Centinela (visión), Oráculo (riesgo), Copiloto (conversacional).',
            proj_banco_desc: 'Plataforma financiera simulada con arquitectura de bases de datos resiliente y transacciones seguras.',
            proj_luau_desc: 'Motor de gestión de tareas asíncronas y eventos concurrentes en Luau con tipado estricto (Strict Typing). Estructuras de datos inmutables y ejecución de alta velocidad.',

            skills_label: '04 // ARQUITECTURA Y LÓGICA',
            skills_title: 'Stack Técnico',
            cat_scripting: '// Scripting &amp; Lenguajes',
            cat_backend: '// Backend &amp; APIs',
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
            timeline_date_present: 'PRESENTE',
            timeline_badge_progress: 'IN_PROGRESS',
            item1_title: 'Fundación Colegio UIS',
            item1_desc: 'Bachiller Académico. Desarrollo de habilidades analíticas, trabajo en equipo y primer acercamiento estructurado a la resolución de problemas lógicos y tecnológicos.',
            item2_title: 'Campuslands — Técnico Laboral en Software',
            item2_desc: 'Formación técnica intensiva en desarrollo de software con metodologías Scrum/Agile. Proyectos reales, sprints, y entrega continua.',
            item3_title: 'Arquitectura de Ciberseguridad',
            item3_desc: 'Google Cybersecurity Certificate en curso. Enfoque en auditoría, arquitectura defensiva y diseño de sistemas resilientes.',

            tech_label: '06 // DATA STREAM',

            contact_label: '07 // CONTACTO',
            contact_heading: 'INICIAR<br><span>CONEXIÓN</span>',
            contact_sub: 'Disponible para proyectos freelance y roles técnicos.<br>Hablemos de tu próxima idea.',
            contact_name_ph: 'Tu nombre',
            contact_email_ph: 'Tu email',
            contact_msg_ph: 'Cuéntame sobre tu proyecto...',
            contact_btn_send: 'ENVIAR MENSAJE',

            footer_rights: '© 2026 Andrés Felipe Guerra — Diseñado con código puro.',

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
            wa_demo_desc: 'Esta es una demostración del flujo principal del bot atendiendo a un cliente en tiempo real.',
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

            // Starter Plan Items
            wa_s_1: 'Escaneo QR (Conexión Baileys Web)',
            wa_s_2: 'Menú interactivo numerado (1..4)',
            wa_s_3: 'IA Básica para Preguntas Frecuentes',
            wa_s_4: 'Aislamiento de datos en MongoDB',
            wa_s_5: 'Soporte vía chat 5/7',
            wa_s_6: 'Transcripción de audios (Whisper AI)',
            wa_s_7: 'Agendamiento automático de citas',
            wa_s_8: 'Modo Asesor Humano (Auto-pausa)',
            wa_s_9: 'Notificaciones de citas al dueño',
            wa_starter_btn: 'Solicitar Plan Starter',

            // Pro Plan Items
            wa_p_tag: 'MÁS POPULAR',
            wa_p_desc: 'Automatización total con IA avanzada y agendamiento.',
            wa_p_1: 'Escaneo QR (Conexión Baileys Web)',
            wa_p_2: '<strong>100% Agendamiento Automático</strong>',
            wa_p_3: '<strong>Transcripción de Audios (Whisper AI)</strong>',
            wa_p_4: '<strong>Modo Asesor Humano (Auto-pausa)</strong>',
            wa_p_5: '<strong>Panel de Agenda en Vivo (Opción 4)</strong>',
            wa_p_6: 'IA Avanzada (Groq + LLaMA 3.1)',
            wa_p_7: 'Notificación instantánea de citas al dueño',
            wa_p_8: 'Filtros Anti-Spam y Silenciador de Reacciones',
            wa_p_9: 'Soporte Prioritario 7/7',
            wa_p_10: 'API Oficial de Meta Cloud API',
            wa_p_11: 'Botones &amp; Listas Nativas de WhatsApp',
            wa_p_12: 'Sincronización CRM &amp; Webhooks',
            wa_p_13: 'Enrutamiento Multi-Agente',
            wa_p_14: 'Entrenamiento de IA con PDFs de tu Empresa',
            wa_p_15: 'Campañas de Marketing Masivo (Ads)',
            wa_p_16: 'Pagos Directos en el Chat (Stripe/Wompi)',
            wa_pro_btn: 'Obtener Plan Profesional',

            // Enterprise Plan Items
            wa_e_desc: 'Solución oficial de Meta Cloud API con integración CRM.',
            wa_e_1: '<strong>API Oficial de Meta Cloud API</strong>',
            wa_e_2: '<strong>Cero riesgo de bloqueo (100% Oficial)</strong>',
            wa_e_3: 'Botones &amp; Listas Nativas de WhatsApp',
            wa_e_4: 'Agendamiento + Sincronización CRM',
            wa_e_5: 'Integración Google Calendar &amp; Webhooks',
            wa_e_6: 'Transcripción de audios + Multimodal',
            wa_e_7: 'Enrutamiento Multi-Agente &amp; Asesores',
            wa_e_8: 'Soporte 24/7 con SLA Garantizado',
            wa_e_9: '<strong>Entrenamiento de IA con PDFs de tu Empresa</strong>',
            wa_e_10: '<strong>Campañas de Marketing Masivo (Ads)</strong>',
            wa_e_11: '<strong>Pagos Directos en el Chat (Stripe/Wompi)</strong>',
            wa_ent_btn: 'Cotizar Enterprise',

            wa_cta_h: 'Empieza hoy mismo',
            wa_cta_sub: 'Despliegue listo en menos de 24 horas',
            wa_cta_btn: 'Agendar Demo en Vivo',
            wa_footer_rights: '© 2026 Andrés Correa | Tech Studio &amp; Automatización. Todos los derechos reservados.',
            wa_footer_main: 'Portafolio Principal',

            // Tab Switcher
            tab_servicios: 'WhatsApp Bot',
            tab_productos: 'DeliveryBot',

            // DeliveryBot Translations
            db_badge: 'Sistema de Pedidos Automatizado',
            db_hero_title_1: 'DeliveryBot',
            db_hero_title_2: 'Para Restaurantes',
            db_hero_sub: 'Plataforma inteligente de recepción de pedidos. Elimina los errores humanos, agiliza la cocina y aumenta las ventas con un motor desarrollado en Node.js.',
            db_btn_contact: 'Solicitar Demo',
            db_btn_github: 'Ver Planes',
            
            db_m1: 'Precisión de Pedidos',
            db_m2: 'Conversión de Ventas',
            db_m3: 'Reducción de Costos',
            db_m4: 'Disponibilidad Continua',
            db_m4_val: 'Total',

            db_feat_tag: 'Beneficios del Sistema',
            db_feat_title: 'Multiplica la <span class="delivery-gradient-text">Eficiencia</span>',
            db_feat_sub: 'Cada función está diseñada para vender más y operar mejor, sin fricción para tus clientes.',
            db_f1_t: 'Flujo de Compra Sin Fricción',
            db_f1_d: 'Catálogo digital intuitivo, carrito de compras integrado y proceso de checkout optimizado para cerrar ventas rápido.',
            db_f2_t: 'Control de Inventario en Vivo',
            db_f2_d: 'El bot verifica la disponibilidad en tiempo real. Si algo se agota, se oculta automáticamente del menú.',
            db_f3_t: 'Motor de Ventas Sugeridas',
            db_f3_d: 'Aumenta tu ticket promedio. El sistema sugiere bebidas o acompañamientos inteligentemente antes de pagar.',
            db_f4_t: 'Tiempos de Entrega Precisos',
            db_f4_d: 'Calcula dinámicamente la demora basándose en cuántos pedidos hay en la cola de tu cocina.',
            db_f5_t: 'Métricas de Negocio',
            db_f5_d: 'Recibe un corte de caja automático: producto estrella, hora pico, ingresos totales y patrones de demanda.',
            db_f6_t: 'Soporte Continuo Automático',
            db_f6_d: 'Manejo inteligente de errores. El cliente nunca se queda sin respuesta, garantizando una experiencia premium.',

            db_pricing_tag: 'Inversión Inteligente',
            db_pricing_title: 'Planes a la <span class="delivery-gradient-text">Medida</span>',
            db_pricing_sub: 'Ahorra miles en comisiones de apps de terceros. Paga solo por lo que necesitas.',
            
            db_p1_h: 'BÁSICO',
            db_p1_s: 'Para negocios que inician.',
            db_p1_price: '99.000',
            db_p1_1: 'Catálogo Digital Interactivo',
            db_p1_2: 'Recepción de Pedidos Ilimitada',
            db_p1_3: 'Actualización Manual de Stock',
            db_p1_btn: 'Empezar Básico',

            db_p2_h: 'PROFESIONAL',
            db_p2_s: 'Automatización total del flujo.',
            db_p2_price: '179.000',
            db_p2_1: '<strong>Control de Inventario en Vivo</strong>',
            db_p2_2: '<strong>Motor de Ventas Sugeridas (Upsell)</strong>',
            db_p2_3: 'Panel Administrativo en Tiempo Real',
            db_p2_btn: 'Obtener Pro',

            db_p3_h: 'MULTI-SUCURSAL',
            db_p3_s: 'Para cadenas y alto volumen.',
            db_p3_price: '349.000',
            db_p3_1: '<strong>Gestión de Múltiples Sedes</strong>',
            db_p3_2: 'Integración con Impresoras de Cocina',
            db_p3_3: 'Analítica Avanzada y Exportación',
            db_p3_btn: 'Cotizar Multi-Sede',

            db_cta_h: '¿Listo para modernizar tu <span class="delivery-gradient-text">restaurante</span>?',
            db_cta_sub: 'Empieza a recibir pedidos en automático hoy mismo. Cero comisiones por venta.',
            db_cta_btn: 'Agendar Instalación',
            db_cta_github: 'Ver Demo'
        },
        en: {
            nav_about: 'About Me',
            nav_projects: 'Projects',
            nav_skills: 'Skills',
            nav_timeline: 'Experience',
            nav_contact: 'Contact',

            hero_title: '<span class="word-break" data-word="FULLSTACK">FULLSTACK</span><span class="word-break" data-word="DEVELOPER">DEVELOPER</span>',
            hero_subtitle: '> Fullstack Dev, AI Automation &amp; Scripting (Lua / Luau / Node.js / Python)',
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

            proj_1_title: 'DeliveryBot',
            proj_2_title: 'WhatsApp Bot AI',
            proj_3_title: 'GUARDIAN',
            proj_4_title: 'ACME Bank',
            proj_5_title: 'Luau Async Task Engine',

            proj_delivery_desc: 'Automated order terminal integrating Telegram and n8n for real-time delivery management. <strong>Processing +500 orders/month with &lt;2s latency.</strong>',
            proj_whatsapp_desc: 'Conversational assistant with memory, sales agent personality, compatible with Cloud and Serverless architectures (like Vercel).',
            proj_guardian_desc: 'Predictive security system for road transport with Computer Vision and collaborative AI. 3-agent architecture: Sentinel (vision), Oracle (risk), Copilot (conversational).',
            proj_banco_desc: 'Simulated financial platform with resilient database architecture and secure transactions.',
            proj_luau_desc: 'Asynchronous task management and concurrent event engine in Luau with Strict Typing. Immutable data structures and high-speed execution.',

            skills_label: '04 // ARCHITECTURE &amp; LOGIC',
            skills_title: 'Technical Stack',
            cat_scripting: '// Scripting &amp; Languages',
            cat_backend: '// Backend &amp; APIs',
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
            comp_sec_title: 'Security &amp; Scalability',
            comp_sec_desc: 'Future-proof code. I implement security-by-design principles and architectures built to handle growth without restructuring.',

            timeline_label: '05 // EXPERIENCE',
            timeline_title: 'Commit History',
            timeline_date_present: 'PRESENT',
            timeline_badge_progress: 'IN_PROGRESS',
            item1_title: 'Fundación Colegio UIS',
            item1_desc: 'Academic High School Diploma. Development of analytical skills, teamwork, and structured problem-solving in tech.',
            item2_title: 'Campuslands — Software Technician',
            item2_desc: 'Intensive software development technical training with Scrum/Agile methodologies. Real projects, sprints, and continuous delivery.',
            item3_title: 'Cybersecurity Architecture',
            item3_desc: 'Google Cybersecurity Certificate in progress. Focused on auditing, defensive architecture, and resilient system design.',

            tech_label: '06 // DATA STREAM',

            contact_label: '07 // CONTACT',
            contact_heading: 'START<br><span>CONNECTION</span>',
            contact_sub: 'Available for freelance projects and technical roles.<br>Let\'s talk about your next idea.',
            contact_name_ph: 'Your name',
            contact_email_ph: 'Your email',
            contact_msg_ph: 'Tell me about your project...',
            contact_btn_send: 'SEND MESSAGE',

            footer_rights: '© 2026 Andrés Felipe Guerra — Crafted with pure code.',

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
            wa_demo_desc: 'This is a demonstration of the main flow of the bot serving a customer in real time.',
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

            // Starter Plan Items
            wa_s_1: 'QR Scan (Baileys Web Connection)',
            wa_s_2: 'Numbered interactive menu (1..4)',
            wa_s_3: 'Basic AI for FAQ Handling',
            wa_s_4: 'MongoDB Data Isolation',
            wa_s_5: 'Chat Support 5/7',
            wa_s_6: 'Audio Transcription (Whisper AI)',
            wa_s_7: 'Automated Appointment Booking',
            wa_s_8: 'Human Advisor Mode (Auto-pause)',
            wa_s_9: 'Owner Appointment Notifications',
            wa_starter_btn: 'Request Starter Plan',

            // Pro Plan Items
            wa_p_tag: 'MOST POPULAR',
            wa_p_desc: 'Full automation with advanced AI &amp; scheduling.',
            wa_p_1: 'QR Scan (Baileys Web Connection)',
            wa_p_2: '<strong>100% Automated Scheduling</strong>',
            wa_p_3: '<strong>Audio Transcription (Whisper AI)</strong>',
            wa_p_4: '<strong>Human Advisor Mode (Auto-pause)</strong>',
            wa_p_5: '<strong>Live Schedule Panel (Option 4)</strong>',
            wa_p_6: 'Advanced AI (Groq + LLaMA 3.1)',
            wa_p_7: 'Instant Owner Booking Alerts',
            wa_p_8: 'Anti-Spam &amp; Reaction Silencer',
            wa_p_9: 'Priority Support 7/7',
            wa_p_10: 'Official Meta Cloud API',
            wa_p_11: 'Native WhatsApp Buttons &amp; Lists',
            wa_p_12: 'CRM Sync &amp; Webhooks',
            wa_p_13: 'Multi-Agent Routing',
            wa_p_14: 'AI Training with Company PDFs',
            wa_p_15: 'Mass Marketing Campaigns (Ads)',
            wa_p_16: 'In-Chat Direct Payments (Stripe/Wompi)',
            wa_pro_btn: 'Get Professional Plan',

            // Enterprise Plan Items
            wa_e_desc: 'Official Meta Cloud API solution with CRM integration.',
            wa_e_1: '<strong>Official Meta Cloud API</strong>',
            wa_e_2: '<strong>Zero Ban Risk (100% Official)</strong>',
            wa_e_3: 'Native WhatsApp Buttons &amp; Lists',
            wa_e_4: 'Booking + CRM Synchronization',
            wa_e_5: 'Google Calendar &amp; Webhooks Integration',
            wa_e_6: 'Audio Transcription + Multimodal',
            wa_e_7: 'Multi-Agent &amp; Advisor Routing',
            wa_e_8: '24/7 Support with Guaranteed SLA',
            wa_e_9: '<strong>AI Training with Company PDFs</strong>',
            wa_e_10: '<strong>Mass Marketing Campaigns (Ads)</strong>',
            wa_e_11: '<strong>In-Chat Direct Payments (Stripe/Wompi)</strong>',
            wa_ent_btn: 'Request Enterprise Quote',

            wa_cta_h: 'Get started today',
            wa_cta_sub: 'Deployment ready in under 24 hours',
            wa_cta_btn: 'Schedule Live Demo',
            wa_footer_rights: '© 2026 Andrés Correa | Tech Studio &amp; Automation. All rights reserved.',
            wa_footer_main: 'Main Portfolio',

            // Tab Switcher
            tab_servicios: 'WhatsApp Bot',
            tab_productos: 'DeliveryBot',

            // DeliveryBot Translations
            db_badge: 'Automated Ordering System',
            db_hero_title_1: 'DeliveryBot',
            db_hero_title_2: 'For Restaurants',
            db_hero_sub: 'Smart order management platform. Eliminate human errors, speed up your kitchen, and increase sales with a robust Node.js engine.',
            db_btn_contact: 'Request Demo',
            db_btn_github: 'View Pricing',
            
            db_m1: 'Order Accuracy',
            db_m2: 'Sales Conversion',
            db_m3: 'Cost Reduction',
            db_m4: 'Uptime Availability',
            db_m4_val: 'Total',

            db_feat_tag: 'System Benefits',
            db_feat_title: 'Multiply Your <span class="delivery-gradient-text">Efficiency</span>',
            db_feat_sub: 'Every feature is designed to sell more and operate better, with zero friction for your customers.',
            db_f1_t: 'Frictionless Purchase Flow',
            db_f1_d: 'Intuitive digital catalog, integrated shopping cart, and optimized checkout to close sales fast.',
            db_f2_t: 'Live Inventory Control',
            db_f2_d: 'The bot checks availability in real-time. If something runs out, it\'s automatically hidden from the menu.',
            db_f3_t: 'Suggested Sales Engine',
            db_f3_d: 'Increase your average ticket. The system intelligently suggests drinks or sides before checkout.',
            db_f4_t: 'Accurate Delivery Times',
            db_f4_d: 'Dynamically calculates wait times based on how many orders are currently in your kitchen\'s queue.',
            db_f5_t: 'Business Metrics',
            db_f5_d: 'Receive an automatic daily summary: star product, peak hours, total revenue, and demand patterns.',
            db_f6_t: 'Automatic Continuous Support',
            db_f6_d: 'Smart error handling. The customer is never left without an answer, guaranteeing a premium experience.',

            db_pricing_tag: 'Smart Investment',
            db_pricing_title: 'Tailored <span class="delivery-gradient-text">Plans</span>',
            db_pricing_sub: 'Save thousands on third-party app commissions. Pay only for what you need.',
            
            db_p1_h: 'STARTER',
            db_p1_s: 'For new businesses.',
            db_p1_price: '25',
            db_p1_1: 'Interactive Digital Catalog',
            db_p1_2: 'Unlimited Order Reception',
            db_p1_3: 'Manual Stock Update',
            db_p1_btn: 'Start Basic',

            db_p2_h: 'PROFESSIONAL',
            db_p2_s: 'Full flow automation.',
            db_p2_price: '45',
            db_p2_1: '<strong>Live Inventory Control</strong>',
            db_p2_2: '<strong>Suggested Sales Engine (Upsell)</strong>',
            db_p2_3: 'Real-Time Admin Dashboard',
            db_p2_btn: 'Get Pro',

            db_p3_h: 'MULTI-BRANCH',
            db_p3_s: 'For chains and high volume.',
            db_p3_price: '85',
            db_p3_1: '<strong>Multi-Branch Management</strong>',
            db_p3_2: 'Kitchen Printer Integration',
            db_p3_3: 'Advanced Analytics &amp; Export',
            db_p3_btn: 'Quote Multi-Branch',

            db_cta_h: 'Ready to modernize your <span class="delivery-gradient-text">restaurant</span>?',
            db_cta_sub: 'Start receiving automated orders today. Zero commissions per sale.',
            db_cta_btn: 'Schedule Installation',
            db_cta_github: 'View Demo'
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

        // Update prices USD / COP if on landing page
        const priceAmounts = document.querySelectorAll('.price-amount');
        const priceOriginals = document.querySelectorAll('.price-original');
        if (priceAmounts.length > 0) {
            priceAmounts.forEach(el => {
                const cop = el.getAttribute('data-cop');
                const usd = el.getAttribute('data-usd');
                if (cop && usd) el.textContent = lang === 'en' ? usd : cop;
            });
            priceOriginals.forEach(el => {
                const cop = el.getAttribute('data-cop');
                const usd = el.getAttribute('data-usd');
                if (cop && usd) el.textContent = lang === 'en' ? usd : cop;
            });
        }

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
