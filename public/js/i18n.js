/**
 * i18n Translation Engine — Andrés Felipe Guerra Portfolio
 * Fast, lightweight, zero-latency client-side translation module.
 */

(function () {
    'use strict';

    const translations = {
        es: {
            nav_about: 'Visión',
            nav_projects: 'Experiencia',
            nav_skills: 'Capacidades',
            nav_timeline: 'Trayectoria',
            nav_contact: 'Contacto',
            
            hero_title: '<span class="word-break" data-word="DIGITAL">DIGITAL</span><span class="word-break" data-word="CRAFTSMAN">CRAFTSMAN</span>',
            hero_subtitle: '> Soluciones Digitales Premium, Arquitectura y Automatización Inteligente (Lua / Node.js / Python)',
            hero_btn_projects: 'EXPLORAR TRABAJO',
            hero_btn_contact: 'INICIAR PROYECTO',

            about_label_sub: '02 // THE VISION',
            about_label_title: 'SOBRE<br>MÍ',
            about_badge_role: 'Consultor & Ingeniero de Software',
            about_p1: 'Soy <strong>Andrés Felipe Guerra</strong>, un ingeniero de software enfocado en crear <strong>soluciones digitales premium</strong>. Mi objetivo es transformar la complejidad tecnológica en experiencias fluidas y eficientes, construyendo desde motores asíncronos y automatizaciones inteligentes hasta plataformas web de alto rendimiento.',
            about_p2: 'Combinando ingeniería y diseño estratégico bajo metodologías ágiles, he desarrollado infraestructuras resilientes para startups y empresas, incluyendo bots de IA conversacional, sistemas de seguridad por visión computacional y motores de ejecución en <strong>Lua & Node.js</strong>. Cada proyecto está diseñado a medida para escalar y generar impacto real.',
            about_p3: 'Colaboro con marcas y organizaciones visionarias para optimizar sus procesos, reducir la fricción operativa y materializar productos digitales excepcionales que destaquen en el mercado global.',
            
            stat_auto_title: 'Automatización Inteligente',
            stat_auto_desc: 'Flujos de trabajo autónomos y bots empresariales impulsados por IA.',
            stat_fullstack_title: 'Ingeniería a Medida',
            stat_fullstack_desc: 'Arquitecturas sólidas en Node.js, Python y React. Construidas para escalar.',
            stat_agile_title: 'Ejecución Estratégica',
            stat_agile_desc: 'Desarrollo iterativo y entrega continua para soluciones rápidas y efectivas.',

            projects_label: '03 // PORTAFOLIO',
            projects_title: 'Casos de Éxito',
            project_btn_view: 'Ver Caso ↗',
            proj_1_unified_title: 'Suite Empresarial de IA',
            proj_1_unified_desc: 'Ecosistema integral de automatización que combina un <strong>Asistente Conversacional en WhatsApp (IA)</strong> y una <strong>Terminal de Pedidos en WhatsApp (DeliveryBot)</strong>. Arquitectura Cloud serverless con procesamiento en tiempo real de más de 500 interacciones mensuales.',
            project_btn_view_unified: 'Explorar Ecosistema ↗',

            proj_1_title: 'DeliveryBot',
            proj_2_title: 'WhatsApp Bot IA',
            proj_3_title: 'GUARDIAN',
            proj_4_title: 'Banco ACME',
            proj_5_title: 'Luau Async Engine',

            proj_delivery_desc: 'Plataforma automatizada de pedidos integrando WhatsApp. Creada para optimizar la logística de restaurantes con procesamiento en tiempo real.',
            proj_whatsapp_desc: 'Asistente conversacional premium con memoria y personalidad de ventas, impulsado por arquitecturas Serverless y LLMs avanzados.',
            proj_guardian_desc: 'Sistema de seguridad predictiva para flotas. Integra Visión Computacional Edge y asistentes de IA en la nube para prevenir riesgos.',
            proj_banco_desc: 'Plataforma financiera simulada con arquitectura de bases de datos de alta resiliencia y seguridad transaccional.',
            proj_luau_desc: 'Motor asíncrono para gestión de concurrencia en Luau. Estructuras de datos inmutables y tipado estricto para máximo rendimiento.',

            skills_label: '04 // EXPERTISE',
            skills_title: 'Capacidades Core',
            cat_scripting: '// Scripting & Lenguajes',
            cat_backend: '// Arquitectura Backend',
            cat_frameworks: '// Ecosistema & UI',
            cat_frontend: '// Experiencias Visuales',
            cat_automation: '// Operaciones & IA',
            skill_auto_n8n: 'n8n & Workflows',
            skill_auto_ai: 'Integración LLM',

            core_comp_title: 'Valor Diferencial',
            comp_flow_title: 'Ingeniería de Procesos',
            comp_flow_desc: 'Transformo operaciones manuales en ecosistemas digitales autónomos. Cada solución es diseñada para maximizar la rentabilidad y el tiempo de tus equipos.',
            comp_vision_title: 'Visión Holística',
            comp_vision_desc: 'Comprendo el ciclo completo del producto, desde la optimización de bases de datos hasta la creación de interfaces estéticamente impecables.',
            comp_sec_title: 'Fundamentos Sólidos',
            comp_sec_desc: 'Construyo software pensado a largo plazo. Implemento arquitecturas resilientes y seguras preparadas para el crecimiento constante.',

            timeline_label: '05 // EVOLUCIÓN',
            timeline_title: 'Trayectoria',
            timeline_date_present: 'PRESENTE',
            timeline_badge_progress: 'EN_PROGRESO',
            item1_title: 'Fundación Colegio UIS',
            item1_desc: 'Desarrollo temprano de habilidades analíticas y pensamiento estructurado, sentando las bases para la resolución algorítmica.',
            item2_title: 'Campuslands — Ingeniería y Software',
            item2_desc: 'Inmersión profunda en desarrollo de software corporativo y metodologías ágiles, creando soluciones funcionales bajo estándares internacionales.',
            item3_title: 'Especialización en Ciberseguridad',
            item3_desc: 'Formación avanzada por Google, orientada al diseño de arquitecturas defensivas y auditoría de sistemas.',

            tech_label: '06 // STACK DE DATOS',

            contact_label: '07 // CONTACTO',
            contact_heading: 'HABLEMOS DE<br><span>NEGOCIOS</span>',
            contact_sub: 'Estoy disponible para consultorías, proyectos a medida y alianzas estratégicas.<br>Eleva el estándar de tu presencia digital.',
            contact_name_ph: 'Tu nombre o empresa',
            contact_email_ph: 'Correo corporativo',
            contact_msg_ph: 'Detalles del proyecto o requerimiento...',
            contact_btn_send: 'SOLICITAR ASESORÍA',

            footer_rights: '© 2026 Andrés Felipe Guerra — Diseñado a medida con código puro.',

            modal_title: 'Select Language / Selecciona tu idioma',
            modal_sub: 'Choose your preferred language to explore the portfolio.',
            modal_es: '🇪🇸 Español',
            modal_en: '🇺🇸 English',

            // WhatsApp Bot Landing Translations
            wa_nav_back: 'Volver al Portafolio',
            wa_hero_title: 'Inteligencia Artificial para <br><span class="gradient-text">Atención y Ventas 24/7</span>',
            wa_hero_sub: 'Automatiza el agendamiento y la conversión de clientes en WhatsApp. Un asistente inteligente que transcribe audios y se integra con tu equipo comercial.',
            wa_btn_demo: 'Agendar Demo Privada',
            wa_btn_plans: 'Ver Soluciones',
            wa_m1_label: 'Agendamiento Automático',
            wa_m2_label: 'Conversión Aumentada',
            wa_m3_label: 'Atención Continua',
            wa_demo_tag: 'Demostración Interactiva',
            wa_demo_title: 'Experiencia Conversacional',
            wa_demo_sub: 'Observa la naturalidad con la que nuestra IA atiende y convierte leads en tiempo real.',
            wa_demo_btn: 'Ver Demostración',
            wa_demo_desc: 'El flujo de conversación está optimizado para retener al cliente y concretar la venta.',
            wa_case_tag: 'Business Case',
            wa_case_title: 'Resolviendo la Fricción Comercial',
            wa_case_sub: 'De la pérdida de mensajes a un funnel de ventas automatizado.',
            wa_prob_tag: 'El Desafío',
            wa_sol_tag: 'Nuestra Solución',
            wa_zoom: 'Explorar',
            wa_arch_tag: 'Tecnología Subyacente',
            wa_arch_title: 'Arquitectura Enterprise',
            wa_arch_sub: 'Sistemas diseñados para alta disponibilidad, privacidad de datos y contingencia autónoma.',
            wa_feat1_t: 'Análisis de Voz por IA',
            wa_feat1_d: 'Transcribe notas de voz al instante, permitiendo que la negociación fluya sin interrupciones.',
            wa_feat2_t: 'Escalamiento Humano',
            wa_feat2_d: 'El bot transfiere el control a un asesor humano de manera transparente cuando se requiere cierre especializado.',
            wa_feat3_t: 'Aislamiento de Privacidad',
            wa_feat3_d: 'Arquitectura multi-tenant en bases de datos NoSQL, garantizando la confidencialidad absoluta por usuario.',
            wa_feat4_t: 'Insights en Tiempo Real',
            wa_feat4_d: 'Dashboard integrado en WhatsApp para consultar métricas y citas del día mediante comandos secretos.',
            wa_feat5_t: 'Filtros de Interferencia',
            wa_feat5_d: 'Sistemas anti-spam integrados que ignoran emojis excesivos y ráfagas para mantener el contexto limpio.',
            wa_feat6_t: 'Resiliencia de Sesión',
            wa_feat6_d: 'Recuperación de conexiones en milisegundos para asegurar que el canal de ventas nunca se interrumpa.',
            wa_pricing_h: 'AUTOMATIZACIÓN A MEDIDA',
            wa_pricing_s: 'Diseñamos el plan perfecto basado en el volumen de tu negocio.',
            wa_badge_offer: 'CONSULTORÍA',
            wa_period: 'Personalizado',

            wa_s_1: 'Integración WhatsApp Web',
            wa_s_2: 'Flujos de Navegación Guiados',
            wa_s_3: 'Soporte FAQ Inteligente',
            wa_s_4: 'Almacenamiento Aislado',
            wa_s_5: 'Soporte Técnico',
            wa_s_6: 'Transcripción de Audio Básica',
            wa_s_7: 'Agendamiento de Calendario',
            wa_s_8: 'Pausa para Asesor Humano',
            wa_s_9: 'Reporte de Leads Diarios',
            wa_starter_btn: 'Agendar Consulta',

            wa_p_tag: 'CORPORATIVO',
            wa_p_desc: 'Automatización total impulsada por Modelos de Lenguaje Avanzados.',
            wa_p_1: 'Integración WhatsApp Web',
            wa_p_2: '<strong>Cierre de Ventas Automatizado</strong>',
            wa_p_3: '<strong>Procesamiento Avanzado de Audio</strong>',
            wa_p_4: '<strong>Notificaciones en Tiempo Real</strong>',
            wa_p_5: '<strong>Dashboard Operativo</strong>',
            wa_p_6: 'Motor LLM (OpenAI / Meta)',
            wa_p_7: 'Sincronización de Base de Datos',
            wa_p_8: 'Protección Anti-Spam Avanzada',
            wa_p_9: 'Atención Prioritaria',
            wa_p_10: 'Meta Cloud API Oficial',
            wa_p_11: 'Botones y UI Nativa de WhatsApp',
            wa_p_12: 'Integración CRM Personalizada',
            wa_p_13: 'Asignación de Multi-Agentes',
            wa_p_14: 'Entrenamiento con Datos de la Empresa',
            wa_p_15: 'Campañas de Retargeting',
            wa_p_16: 'Pasarela de Pagos en Chat',
            wa_pro_btn: 'Cotizar Solución Pro',

            wa_e_desc: 'Infraestructura empresarial para grandes volúmenes y Meta API oficial.',
            wa_e_1: '<strong>Integración Meta Cloud API</strong>',
            wa_e_2: '<strong>Operación Oficial Libre de Riesgos</strong>',
            wa_e_3: 'Botones y Listas Interactivas',
            wa_e_4: 'Sincronización Total con CRM',
            wa_e_5: 'Webhooks y Eventos Personalizados',
            wa_e_6: 'Capacidad Multimodal de IA',
            wa_e_7: 'Enrutamiento a Múltiples Departamentos',
            wa_e_8: 'Acuerdo de Nivel de Servicio (SLA)',
            wa_e_9: '<strong>Fine-Tuning con Datos Privados</strong>',
            wa_e_10: '<strong>Automatización de Marketing</strong>',
            wa_e_11: '<strong>Cobro y Facturación Directa</strong>',
            wa_ent_btn: 'Solicitar Presupuesto Enterprise',

            wa_cta_h: 'Impulsa tus ventas de manera inteligente',
            wa_cta_sub: 'Conversamos sobre los desafíos de tu negocio y diseñamos la solución.',
            wa_cta_btn: 'Solicitar Asesoría',
            wa_footer_rights: '© 2026 Andrés Felipe Guerra | Soluciones de Automatización.',
            wa_footer_main: 'Volver al Inicio',

            tab_servicios: 'Bot Conversacional',
            tab_productos: 'Sistema Delivery',

            // DeliveryBot Translations
            db_badge: 'Solución Logística',
            db_hero_title_1: 'DeliveryBot',
            db_hero_title_2: 'Premium',
            db_hero_sub: 'Centraliza y automatiza la recepción de pedidos. Una plataforma robusta diseñada para erradicar errores, acelerar operaciones y elevar la experiencia del cliente.',
            db_btn_contact: 'Agendar Demo',
            db_btn_github: 'Consultar Opciones',
            
            db_m1: 'Precisión de Entregas',
            db_m2: 'Retención de Clientes',
            db_m3: 'Reducción de Costos',
            db_m4: 'Control Operativo',
            db_m4_val: 'Total',

            db_feat_tag: 'Ventaja Competitiva',
            db_feat_title: 'Revoluciona tus <span class="delivery-gradient-text">Operaciones</span>',
            db_feat_sub: 'Herramientas precisas diseñadas para maximizar tus ingresos y minimizar la fricción en la cocina.',
            db_f1_t: 'Checkout Sin Fricciones',
            db_f1_d: 'Una experiencia de compra fluida con menús interactivos que guían al cliente hasta el pago final.',
            db_f2_t: 'Sincronización de Stock',
            db_f2_d: 'El sistema retira automáticamente los productos agotados, evitando cancelaciones y molestias al cliente.',
            db_f3_t: 'Algoritmo de Upselling',
            db_f3_d: 'Incrementa el ticket promedio sugiriendo complementos perfectos basados en la selección actual.',
            db_f4_t: 'Tiempos de Preparación Dinámicos',
            db_f4_d: 'Informa al cliente el tiempo exacto de entrega analizando el volumen de órdenes activas.',
            db_f5_t: 'Analítica de Negocios',
            db_f5_d: 'Accede a reportes detallados sobre demanda, productos estrella y proyecciones de venta.',
            db_f6_t: 'Soporte Continuo',
            db_f6_d: 'Intervención automatizada ante excepciones. Tus clientes siempre reciben atención oportuna.',

            db_pill_admin: 'Panel Admin',
            db_pill_reports: 'Reportes Automáticos',
            db_timeline_tag: 'Proceso de Automatización',
            db_timeline_title: '¿Cómo Funciona <span class="delivery-gradient-text">DeliveryBot?</span>',
            db_timeline_sub: 'Un flujo perfectamente engranado desde que el cliente escribe hasta que la orden llega a cocina.',
            db_s1_step: 'Paso 1',
            db_s1_title: 'Recepción Inmediata',
            db_s1_desc: 'El cliente inicia el chat en WhatsApp. El bot responde en milisegundos con un menú digital e interactivo, ahorrando tiempo de espera.',
            db_s2_step: 'Paso 2',
            db_s2_title: 'Carrito Inteligente',
            db_s2_desc: 'FSM Router procesa la orden, valida el stock en tiempo real y ofrece ventas cruzadas (Upselling) antes del checkout.',
            db_s3_step: 'Paso 3',
            db_s3_title: 'Sincronización en la Nube',
            db_s3_desc: 'La orden se inyecta automáticamente en Google Sheets y en tu base de datos MongoDB. Cero errores manuales.',
            db_s4_step: 'Paso 4',
            db_s4_title: 'Cocina & Entrega',
            db_s4_desc: 'Tu equipo recibe la comanda limpia en una pantalla o ticketera. El cliente es notificado con el ETA Dinámico.',
            db_s_final: '<br>¡Flujo<br>Completo!',

            db_pricing_tag: 'Soluciones Escalables',
            db_pricing_title: 'Adaptado a tu <span class="delivery-gradient-text">Escala</span>',
            db_pricing_sub: 'Libérate de las altas comisiones de terceros. Un sistema propio que crece contigo.',
            
            db_p1_h: 'ESTÁNDAR',
            db_p1_s: 'Para establecimientos emergentes.',
            db_p1_price: 'Cotizar',
            db_p1_1: 'Catálogo Digital Personalizado',
            db_p1_2: 'Gestión de Pedidos Ilimitada',
            db_p1_3: 'Soporte Básico',
            db_p1_btn: 'Consultar',

            db_p2_h: 'PROFESIONAL',
            db_p2_s: 'Automatización y Upselling.',
            db_p2_price: 'Cotizar',
            db_p2_1: '<strong>Control de Inventario Automático</strong>',
            db_p2_2: '<strong>Algoritmo de Ventas Sugeridas</strong>',
            db_p2_3: 'Dashboard Analítico',
            db_p2_btn: 'Contactar',

            db_p3_h: 'FRANQUICIAS',
            db_p3_s: 'Múltiples sucursales y alto flujo.',
            db_p3_price: 'Cotizar',
            db_p3_1: '<strong>Gestión de Múltiples Sedes</strong>',
            db_p3_2: 'Integración en Cocina (Impresoras)',
            db_p3_3: 'Reportes Corporativos Avanzados',
            db_p3_btn: 'Agendar Reunión',

            db_cta_h: 'Transforma la gestión de tu <span class="delivery-gradient-text">negocio</span>',
            db_cta_sub: 'Optimiza la logística, recupera el control de tus clientes y aumenta tus márgenes de ganancia.',
            db_cta_btn: 'Inicia tu Transformación',
            db_cta_github: 'Ver Experiencia',

            // GUARDIAN Translations
            guardian_back_btn: 'Volver',
            guardian_badge: 'Infraestructura IA',
            guardian_hero_desc: 'Plataforma de seguridad predictiva vehicular. Fusiona IA Edge para análisis biométrico en tiempo real con LLMs en la nube para proporcionar un copiloto virtual autónomo y proactivo.',
            guardian_arch_title: 'Sinergia de 3 Agentes',
            guardian_arch_desc: 'Una arquitectura distribuida que balancea la carga de procesamiento entre dispositivos edge y servidores cloud para garantizar latencia cero en emergencias.',
            guardian_agent_centinela: 'Agente Centinela',
            guardian_centinela_desc: 'Análisis Edge offline. Monitorea biometría facial a +30FPS evaluando fatiga y niveles de atención a través de redes neuronales, garantizando privacidad total.',
            guardian_agent_oraculo: 'Agente Oráculo',
            guardian_oraculo_desc: 'Procesador de riesgos Cloud. Contextualiza eventos en tiempo real con datos de ruta y clima para emitir alertas preventivas críticas al conductor y la central.',
            guardian_agent_copiloto: 'Agente Copiloto',
            guardian_copiloto_desc: 'Asistente de voz conversacional integrado. Mantiene alerta al conductor mediante interacciones empáticas y provee asistencia en ruta generada por IA.',
            guardian_demo_title: 'Prueba en Vivo: GUARDIAN Lite',
            guardian_demo_desc: 'Experimenta las capacidades del <b>Agente Centinela</b> privadamente desde tu navegador. Observa cómo el sistema responde a eventos en la ruta sin comprometer tu privacidad.',
            guardian_demo_placeholder_title: 'Inicia la Experiencia',
            guardian_demo_placeholder_desc: 'Presiona \'Play\' para activar la simulación',
            guardian_cta_title: 'Eleva la seguridad de tu flota',
            guardian_cta_desc: 'Contacta con nosotros para discutir integraciones a gran escala, tableros de control y analítica empresarial de GUARDIAN.',
            
            guardian_impact_title: 'Capacidades & Impacto Operativo',
            guardian_impact_desc: 'GUARDIAN no es solo una dashcam, es un ecosistema IoT completo diseñado para flotas de transporte pesado, logística y transporte de pasajeros.',
            guardian_cap_1_title: 'Prevención Proactiva',
            guardian_cap_1_desc: 'A diferencia de los sistemas reactivos, GUARDIAN detecta los microsueños antes de que los ojos se cierren por completo (analizando patrones de parpadeo y bostezos mediante EAR/MAR), permitiendo alertar al conductor con segundos de anticipación vitales.',
            guardian_cap_2_title: 'IoT & Telemetría Segura',
            guardian_cap_2_desc: 'Integración mediante protocolos MQTT y WebSockets encriptados. Si el vehículo pierde conexión en carretera, el Agente Centinela (Edge) sigue operando 100% offline y sincroniza los eventos de riesgo cuando recupera la señal.',
            guardian_cap_3_title: 'Dashboard para Flotas',
            guardian_cap_3_desc: 'Los administradores visualizan en tiempo real el nivel de fatiga de todos los conductores, reciben alertas críticas y pueden comunicarse bidireccionalmente gracias al módulo de administración centralizado.',
            guardian_perf_title: 'Aviso de Rendimiento',
            guardian_perf_desc: 'Esta demo interactiva ejecuta modelos de Visión Computacional complejos en tiempo real. Para evitar calentamiento en tu dispositivo y tener una experiencia fluida, te recomendamos abrirla en un computador de escritorio.',
            guardian_perf_cancel: 'Cancelar',
            guardian_perf_force: 'Ejecutar igual',
            launcher_title: 'Simulador Interactivo de IA',
            launcher_desc: 'Esta demo cargará modelos de TensorFlow.js en tu navegador para procesar tu cámara web en tiempo real. No se enviarán imágenes a ningún servidor.',
            launcher_btn: 'Ejecutar Demo GUARDIAN',
            guardian_loading_title: 'Inicializando GUARDIAN...',
            guardian_loading_desc: 'Cargando motor de inferencia',
            guardian_status_waiting: 'ESPERANDO CAMARA',
            guardian_alert_title: '¡ALERTA DE FATIGA!',
            guardian_alert_desc: 'Microsueño detectado. Por favor oríllese y descanse inmediatamente.',
            guardian_alert_btn: 'RECONOCER Y DESCARTAR',
            btn_github: 'Ver Repositorio',
            btn_whatsapp: 'Contactar por WhatsApp'
        },
        en: {
            nav_about: 'Vision',
            nav_projects: 'Experience',
            nav_skills: 'Expertise',
            nav_timeline: 'Journey',
            nav_contact: 'Contact',

            hero_title: '<span class="word-break" data-word="DIGITAL">DIGITAL</span><span class="word-break" data-word="CRAFTSMAN">CRAFTSMAN</span>',
            hero_subtitle: '> Premium Digital Solutions, Architecture & Intelligent Automation (Lua / Node.js / Python)',
            hero_btn_projects: 'EXPLORE WORK',
            hero_btn_contact: 'START A PROJECT',

            about_label_sub: '02 // THE VISION',
            about_label_title: 'ABOUT<br>ME',
            about_badge_role: 'Consultant & Software Engineer',
            about_p1: 'I am <strong>Andrés Felipe Guerra</strong>, a software engineer focused on crafting <strong>premium digital solutions</strong>. My goal is to transform technological complexity into seamless, efficient experiences, building everything from asynchronous engines to high-performance web platforms.',
            about_p2: 'Blending engineering with strategic design under agile methodologies, I have developed resilient infrastructures for startups and enterprises, including conversational AI bots, computer vision security systems, and robust backend engines in <strong>Lua & Node.js</strong>. Every project is tailor-made to scale and drive real impact.',
            about_p3: 'I collaborate with visionary brands and organizations to optimize their workflows, reduce operational friction, and materialize exceptional digital products that stand out in the global market.',

            stat_auto_title: 'Intelligent Automation',
            stat_auto_desc: 'Autonomous workflows and AI-driven enterprise bots.',
            stat_fullstack_title: 'Bespoke Engineering',
            stat_fullstack_desc: 'Solid architectures in Node.js, Python, and React. Built to scale.',
            stat_agile_title: 'Strategic Execution',
            stat_agile_desc: 'Iterative development and continuous delivery for effective solutions.',

            projects_label: '03 // PORTFOLIO',
            projects_title: 'Success Cases',
            project_btn_view: 'View Case ↗',
            proj_1_unified_title: 'AI Enterprise Suite',
            proj_1_unified_desc: 'Comprehensive automation ecosystem combining a <strong>WhatsApp Conversational Assistant (AI)</strong> and a <strong>WhatsApp Order Terminal (DeliveryBot)</strong>. Serverless cloud architecture processing over 500 interactions monthly in real-time.',
            project_btn_view_unified: 'Explore Ecosystem ↗',

            proj_1_title: 'DeliveryBot',
            proj_2_title: 'WhatsApp AI Bot',
            proj_3_title: 'GUARDIAN',
            proj_4_title: 'ACME Bank',
            proj_5_title: 'Luau Async Engine',

            proj_delivery_desc: 'Automated ordering platform integrating WhatsApp. Created to optimize restaurant logistics with real-time processing.',
            proj_whatsapp_desc: 'Premium conversational assistant with memory and a sales personality, powered by Serverless architectures and advanced LLMs.',
            proj_guardian_desc: 'Predictive security system for fleets. Integrates Edge Computer Vision and Cloud AI assistants to prevent risks.',
            proj_banco_desc: 'Simulated financial platform featuring high-resilience database architecture and transactional security.',
            proj_luau_desc: 'Asynchronous engine for concurrency management in Luau. Immutable data structures and strict typing for maximum performance.',

            skills_label: '04 // EXPERTISE',
            skills_title: 'Core Capabilities',
            cat_scripting: '// Scripting & Languages',
            cat_backend: '// Backend Architecture',
            cat_frameworks: '// Ecosystem & UI',
            cat_frontend: '// Visual Experiences',
            cat_automation: '// Operations & AI',
            skill_auto_n8n: 'n8n & Workflows',
            skill_auto_ai: 'LLM Integration',

            core_comp_title: 'Differential Value',
            comp_flow_title: 'Process Engineering',
            comp_flow_desc: 'I transform manual operations into autonomous digital ecosystems. Each solution is designed to maximize your team\'s profitability and time.',
            comp_vision_title: 'Holistic Vision',
            comp_vision_desc: 'I understand the full product cycle, from database optimization to crafting aesthetically impeccable interfaces.',
            comp_sec_title: 'Solid Foundations',
            comp_sec_desc: 'I build software meant for the long term. Implementing resilient and secure architectures ready for constant growth.',

            timeline_label: '05 // EVOLUTION',
            timeline_title: 'Journey',
            timeline_date_present: 'PRESENT',
            timeline_badge_progress: 'IN_PROGRESS',
            item1_title: 'Fundación Colegio UIS',
            item1_desc: 'Early development of analytical skills and structured thinking, laying the foundation for algorithmic problem-solving.',
            item2_title: 'Campuslands — Engineering & Software',
            item2_desc: 'Deep dive into corporate software development and agile methodologies, creating functional solutions up to international standards.',
            item3_title: 'Cybersecurity Specialization',
            item3_desc: 'Advanced training by Google, focused on defensive architecture design and systems auditing.',

            tech_label: '06 // DATA STACK',

            contact_label: '07 // CONTACT',
            contact_heading: 'LET\'S TALK<br><span>BUSINESS</span>',
            contact_sub: 'Available for consulting, bespoke projects, and strategic alliances.<br>Elevate the standard of your digital presence.',
            contact_name_ph: 'Your name or company',
            contact_email_ph: 'Corporate email',
            contact_msg_ph: 'Project details or requirements...',
            contact_btn_send: 'REQUEST CONSULTATION',

            footer_rights: '© 2026 Andrés Felipe Guerra — Crafted with pure code.',

            modal_title: 'Select Language / Selecciona tu idioma',
            modal_sub: 'Choose your preferred language to explore the portfolio.',
            modal_es: '🇪🇸 Español',
            modal_en: '🇺🇸 English',

            // WhatsApp Bot Landing Translations
            wa_nav_back: 'Back to Portfolio',
            wa_hero_title: 'Artificial Intelligence for <br><span class="gradient-text">24/7 Sales & Support</span>',
            wa_hero_sub: 'Automate scheduling and customer conversion on WhatsApp. A smart assistant that transcribes audio and integrates with your sales team.',
            wa_btn_demo: 'Schedule Private Demo',
            wa_btn_plans: 'View Solutions',
            wa_m1_label: 'Automated Scheduling',
            wa_m2_label: 'Increased Conversion',
            wa_m3_label: 'Continuous Support',
            wa_demo_tag: 'Interactive Demonstration',
            wa_demo_title: 'Conversational Experience',
            wa_demo_sub: 'Watch the natural fluency with which our AI handles and converts leads in real time.',
            wa_demo_btn: 'View Demonstration',
            wa_demo_desc: 'The conversational flow is optimized to retain the customer and close the sale.',
            wa_case_tag: 'Business Case',
            wa_case_title: 'Solving Commercial Friction',
            wa_case_sub: 'From lost messages to an automated sales funnel.',
            wa_prob_tag: 'The Challenge',
            wa_sol_tag: 'Our Solution',
            wa_zoom: 'Explore',
            wa_arch_tag: 'Underlying Technology',
            wa_arch_title: 'Enterprise Architecture',
            wa_arch_sub: 'Systems engineered for high availability, data privacy, and autonomous contingency.',
            wa_feat1_t: 'AI Voice Analysis',
            wa_feat1_d: 'Instantly transcribes voice notes, allowing negotiations to flow uninterrupted.',
            wa_feat2_t: 'Human Escalation',
            wa_feat2_d: 'The bot seamlessly hands over control to a human advisor when specialized closing is required.',
            wa_feat3_t: 'Privacy Isolation',
            wa_feat3_d: 'Multi-tenant architecture in NoSQL databases, guaranteeing absolute confidentiality per user.',
            wa_feat4_t: 'Real-Time Insights',
            wa_feat4_d: 'Dashboard integrated within WhatsApp to check metrics and daily appointments via secret commands.',
            wa_feat5_t: 'Interference Filters',
            wa_feat5_d: 'Built-in anti-spam systems that ignore excessive emojis and bursts to keep the context clean.',
            wa_feat6_t: 'Session Resilience',
            wa_feat6_d: 'Millisecond connection recovery to ensure the sales channel is never interrupted.',
            wa_pricing_h: 'BESPOKE AUTOMATION',
            wa_pricing_s: 'We design the perfect plan based on your business volume.',
            wa_badge_offer: 'CONSULTING',
            wa_period: 'Custom',

            wa_s_1: 'WhatsApp Web Integration',
            wa_s_2: 'Guided Navigation Flows',
            wa_s_3: 'Smart FAQ Support',
            wa_s_4: 'Isolated Storage',
            wa_s_5: 'Technical Support',
            wa_s_6: 'Basic Audio Transcription',
            wa_s_7: 'Calendar Scheduling',
            wa_s_8: 'Human Advisor Pause',
            wa_s_9: 'Daily Lead Reports',
            wa_starter_btn: 'Schedule Consultation',

            wa_p_tag: 'CORPORATE',
            wa_p_desc: 'Full automation powered by Advanced Large Language Models.',
            wa_p_1: 'WhatsApp Web Integration',
            wa_p_2: '<strong>Automated Sales Closing</strong>',
            wa_p_3: '<strong>Advanced Audio Processing</strong>',
            wa_p_4: '<strong>Real-Time Notifications</strong>',
            wa_p_5: '<strong>Operational Dashboard</strong>',
            wa_p_6: 'LLM Engine (OpenAI / Meta)',
            wa_p_7: 'Database Synchronization',
            wa_p_8: 'Advanced Anti-Spam Protection',
            wa_p_9: 'Priority Support',
            wa_p_10: 'Official Meta Cloud API',
            wa_p_11: 'Native WhatsApp Buttons & UI',
            wa_p_12: 'Custom CRM Integration',
            wa_p_13: 'Multi-Agent Routing',
            wa_p_14: 'Training with Company Data',
            wa_p_15: 'Retargeting Campaigns',
            wa_p_16: 'In-Chat Payment Gateway',
            wa_pro_btn: 'Quote Pro Solution',

            wa_e_desc: 'Enterprise infrastructure for high volumes and official Meta API.',
            wa_e_1: '<strong>Meta Cloud API Integration</strong>',
            wa_e_2: '<strong>Official Risk-Free Operation</strong>',
            wa_e_3: 'Interactive Buttons and Lists',
            wa_e_4: 'Full CRM Synchronization',
            wa_e_5: 'Webhooks & Custom Events',
            wa_e_6: 'Multimodal AI Capability',
            wa_e_7: 'Multi-Department Routing',
            wa_e_8: 'Service Level Agreement (SLA)',
            wa_e_9: '<strong>Fine-Tuning with Private Data</strong>',
            wa_e_10: '<strong>Marketing Automation</strong>',
            wa_e_11: '<strong>Direct In-Chat Billing</strong>',
            wa_ent_btn: 'Request Enterprise Quote',

            wa_cta_h: 'Boost your sales intelligently',
            wa_cta_sub: 'We discuss your business challenges and design the solution.',
            wa_cta_btn: 'Request Consultation',
            wa_footer_rights: '© 2026 Andrés Felipe Guerra | Automation Solutions.',
            wa_footer_main: 'Back to Main',

            tab_servicios: 'Conversational Bot',
            tab_productos: 'Delivery System',

            // DeliveryBot Translations
            db_badge: 'Logistics Solution',
            db_hero_title_1: 'DeliveryBot',
            db_hero_title_2: 'Premium',
            db_hero_sub: 'Centralize and automate order reception. A robust platform designed to eradicate errors, speed up operations, and elevate customer experience.',
            db_btn_contact: 'Schedule Demo',
            db_btn_github: 'View Options',
            
            db_m1: 'Delivery Accuracy',
            db_m2: 'Customer Retention',
            db_m3: 'Cost Reduction',
            db_m4: 'Operational Control',
            db_m4_val: 'Total',

            db_feat_tag: 'Competitive Advantage',
            db_feat_title: 'Revolutionize your <span class="delivery-gradient-text">Operations</span>',
            db_feat_sub: 'Precise tools designed to maximize your revenue and minimize kitchen friction.',
            db_f1_t: 'Frictionless Checkout',
            db_f1_d: 'A smooth shopping experience with interactive menus guiding the customer to the final payment.',
            db_f2_t: 'Stock Synchronization',
            db_f2_d: 'The system automatically removes out-of-stock products, preventing cancellations and customer frustration.',
            db_f3_t: 'Upselling Algorithm',
            db_f3_d: 'Increase average ticket size by suggesting perfect add-ons based on the current selection.',
            db_f4_t: 'Dynamic Prep Times',
            db_f4_d: 'Informs the customer of the exact delivery time by analyzing the volume of active orders.',
            db_f5_t: 'Business Analytics',
            db_f5_d: 'Access detailed reports on demand, star products, and sales projections.',
            db_f6_t: 'Continuous Support',
            db_f6_d: 'Automated intervention for exceptions. Your customers always receive timely assistance.',

            db_pill_admin: 'Admin Panel',
            db_pill_reports: 'Auto Reports',
            db_timeline_tag: 'Automation Process',
            db_timeline_title: 'How <span class="delivery-gradient-text">DeliveryBot</span> Works',
            db_timeline_sub: 'A perfectly geared flow from the moment the customer texts until the order reaches the kitchen.',
            db_s1_step: 'Step 1',
            db_s1_title: 'Instant Reception',
            db_s1_desc: 'The customer starts the chat on WhatsApp. The bot responds in milliseconds with an interactive digital menu, saving waiting time.',
            db_s2_step: 'Step 2',
            db_s2_title: 'Smart Cart',
            db_s2_desc: 'FSM Router processes the order, checks stock in real time, and offers cross-selling (Upselling) before checkout.',
            db_s3_step: 'Step 3',
            db_s3_title: 'Cloud Sync',
            db_s3_desc: 'The order is automatically injected into Google Sheets and your MongoDB database. Zero manual errors.',
            db_s4_step: 'Step 4',
            db_s4_title: 'Kitchen & Delivery',
            db_s4_desc: 'Your team receives a clean order ticket on a screen or printer. The customer is notified with a Dynamic ETA.',
            db_s_final: '<br>Flow<br>Complete!',

            db_pricing_tag: 'Scalable Solutions',
            db_pricing_title: 'Tailored to your <span class="delivery-gradient-text">Scale</span>',
            db_pricing_sub: 'Break free from high third-party commissions. A proprietary system that grows with you.',
            
            db_p1_h: 'STANDARD',
            db_p1_s: 'For emerging establishments.',
            db_p1_price: 'Quote',
            db_p1_1: 'Custom Digital Catalog',
            db_p1_2: 'Unlimited Order Management',
            db_p1_3: 'Basic Support',
            db_p1_btn: 'Consult',

            db_p2_h: 'PROFESSIONAL',
            db_p2_s: 'Automation and Upselling.',
            db_p2_price: 'Quote',
            db_p2_1: '<strong>Automatic Inventory Control</strong>',
            db_p2_2: '<strong>Suggested Sales Algorithm</strong>',
            db_p2_3: 'Analytical Dashboard',
            db_p2_btn: 'Contact',

            db_p3_h: 'FRANCHISES',
            db_p3_s: 'Multiple branches & high flow.',
            db_p3_price: 'Quote',
            db_p3_1: '<strong>Multi-Branch Management</strong>',
            db_p3_2: 'Kitchen Integration (Printers)',
            db_p3_3: 'Advanced Corporate Reports',
            db_p3_btn: 'Schedule Meeting',

            db_cta_h: 'Transform your <span class="delivery-gradient-text">business</span> management',
            db_cta_sub: 'Optimize logistics, regain control of your customers, and increase your profit margins.',
            db_cta_btn: 'Start Your Transformation',
            db_cta_github: 'View Experience',

            // GUARDIAN Translations
            guardian_back_btn: 'Go Back',
            guardian_badge: 'AI Infrastructure',
            guardian_hero_desc: 'Vehicular predictive security platform. Fuses Edge AI for real-time biometric analysis with Cloud LLMs to provide an autonomous and proactive virtual copilot.',
            guardian_arch_title: '3-Agent Synergy',
            guardian_arch_desc: 'A distributed architecture that balances processing load between edge devices and cloud servers to ensure zero latency in emergencies.',
            guardian_agent_centinela: 'Sentinel Agent',
            guardian_centinela_desc: 'Offline Edge Analysis. Monitors facial biometrics at +30FPS assessing fatigue and attention levels through neural networks, ensuring total privacy.',
            guardian_agent_oraculo: 'Oracle Agent',
            guardian_oraculo_desc: 'Cloud Risk Processor. Contextualizes real-time events with route and weather data to issue critical preventive alerts to the driver and central command.',
            guardian_agent_copiloto: 'Copilot Agent',
            guardian_copiloto_desc: 'Integrated conversational voice assistant. Keeps the driver alert through empathetic interactions and provides AI-generated route assistance.',
            guardian_demo_title: 'Live Demo: GUARDIAN Lite',
            guardian_demo_desc: 'Experience the <b>Sentinel Agent</b> capabilities privately from your browser. Watch how the system responds to route events without compromising your privacy.',
            guardian_demo_placeholder_title: 'Start Experience',
            guardian_demo_placeholder_desc: 'Press \'Play\' to activate the simulation',
            guardian_cta_title: 'Elevate your fleet\'s security',
            guardian_cta_desc: 'Contact us to discuss large-scale integrations, control dashboards, and GUARDIAN enterprise analytics.',

            guardian_impact_title: 'Capabilities & Operational Impact',
            guardian_impact_desc: 'GUARDIAN is not just a dashcam; it is a complete IoT ecosystem designed for heavy transport fleets, logistics, and passenger transport.',
            guardian_cap_1_title: 'Proactive Prevention',
            guardian_cap_1_desc: 'Unlike reactive systems, GUARDIAN detects microsleeps before eyes close completely (analyzing blink patterns and yawns via EAR/MAR), allowing drivers to be alerted with vital seconds of anticipation.',
            guardian_cap_2_title: 'Secure IoT & Telemetry',
            guardian_cap_2_desc: 'Integration via MQTT and encrypted WebSockets. If the vehicle loses connection on the road, the Sentinel Agent (Edge) continues to operate 100% offline and synchronizes risk events upon regaining signal.',
            guardian_cap_3_title: 'Fleet Dashboard',
            guardian_cap_3_desc: 'Administrators visualize the fatigue level of all drivers in real-time, receive critical alerts, and can communicate bidirectionally thanks to the centralized administration module.',
            guardian_perf_title: 'Performance Warning',
            guardian_perf_desc: 'This interactive demo runs complex Computer Vision models in real-time. To prevent overheating on your device and ensure a smooth experience, we recommend opening it on a desktop computer.',
            guardian_perf_cancel: 'Cancel',
            guardian_perf_force: 'Run Anyway',
            launcher_title: 'Interactive AI Simulator',
            launcher_desc: 'This demo will load TensorFlow.js models in your browser to process your webcam in real-time. No images will be sent to any server.',
            launcher_btn: 'Run GUARDIAN Demo',
            guardian_loading_title: 'Initializing GUARDIAN...',
            guardian_loading_desc: 'Loading inference engine',
            guardian_status_waiting: 'WAITING FOR CAMERA',
            guardian_alert_title: 'FATIGUE ALERT!',
            guardian_alert_desc: 'Microsleep detected. Please pull over and rest immediately.',
            guardian_alert_btn: 'ACKNOWLEDGE & DISMISS',
            btn_github: 'View Repository',
            btn_whatsapp: 'Contact via WhatsApp'
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

        // The price toggling logic is no longer used since we use "Quote/Cotizar" text, 
        // but we keep it here to avoid breaking existing pages if they have standard prices.
        const priceAmounts = document.querySelectorAll('.price-amount');
        const priceOriginals = document.querySelectorAll('.price-original');
        if (priceAmounts.length > 0) {
            priceAmounts.forEach(el => {
                const cop = el.getAttribute('data-cop');
                const usd = el.getAttribute('data-usd');
                // Instead of using numeric tags, try fetching from dictionary if they match the UI elements.
                // However, since we rewrote the translations to 'Cotizar/Quote', this block just acts as a fallback.
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
