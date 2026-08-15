/**
 * i18n Translation Engine — Andrés Felipe Guerra Portfolio
 * Fast, lightweight, zero-latency client-side translation module.
 */

(function () {
    'use strict';

    const translations = {
        es: {
            nav_about: 'Visión',
            nav_projects: 'Servicios',
            nav_skills: 'Capacidades',
            nav_timeline: 'Trayectoria',
            nav_contact: 'Contacto',
            
            hero_badge: '✦ Automatización Inteligente & Software a Medida',
            hero_title: 'Ingeniería de Software & <br><span class="hero-gradient-text">Automatización IA para Negocios</span>',
            hero_subtitle: 'Transformamos la operativa de tu empresa con asistentes de IA conversacional, plataformas web a medida y flujos automatizados de alta rentabilidad.',
            hero_btn_projects: 'EXPLORAR SERVICIOS',
            hero_btn_contact: 'AGENDAR CONSULTORÍA',
            hero_rating_score: '4.9 / 5.0',
            hero_rating_based: 'Calificación B2B',
            hero_view_reviews: 'Ver Reseñas ↗',
            
            ctrl_status: 'SISTEMAS ACTIVOS',
            ctrl_uptime: '99.9% UPTIME',
            ctrl_mesh: 'MESH CLOUD',
            ctrl_card1_title: 'Suite WhatsApp IA',
            ctrl_card1_val: '+500 Interacciones/mes',
            ctrl_card1_sub: 'Agendamiento & Cierre 24/7',
            ctrl_card2_title: 'Plataformas Web / SaaS',
            ctrl_card2_val: '< 45ms TTFB',
            ctrl_card2_sub: 'React, Next.js, Node.js',
            ctrl_card3_title: 'Flujos Autónomos',
            ctrl_card3_val: '100% Sin Fricción',
            ctrl_card3_sub: 'n8n, Webhooks, CRMs',
            ctrl_card4_title: 'Seguridad Transaccional',
            ctrl_card4_val: 'ACID Compliant',
            about_label_sub: '02 // THE VISION',
            about_label_title: 'ESTUDIO<br>SAAS & IA',
            about_node_status: 'Sistemas Operacionales',
            about_node_title: 'Arquitectura & Ecosistemas SaaS',
            about_node_sub: 'Ingeniería de software propietario y automatización inteligente con estándar enterprise.',
            about_m1_lbl: 'Latencia Global',
            about_m2_lbl: 'Uptime SLA',
            about_m3_lbl: 'Propietario',
            about_p1_title: 'Soberanía Tecnológica Total',
            about_p1_desc: 'Código fuente e infraestructura de tu propiedad. Sin comisiones recurrentes ni lock-in.',
            about_p2_title: 'Automatización & Agentes IA',
            about_p2_desc: 'Pipelines autónomos en WhatsApp y n8n conectados a tu base de datos y CRM.',
            about_p3_title: 'Resiliencia & Alta Concurrencia',
            about_p3_desc: 'Backends ACID-compliant diseñados para soportar picos transaccionales y escalabilidad.',
            about_p1: 'En nuestro estudio diseñamos y construimos <strong>plataformas SaaS a medida, software propietario y ecosistemas de automatización IA</strong> para empresas en expansión. Eliminamos la dependencia de suscripciones mensuales genéricas y herramientas rígidas, creando activos digitales de alto rendimiento que tu empresa controla al 100%.',
            about_p2: 'Combinamos ingeniería fullstack moderna (Next.js, Node.js, Python, PostgreSQL) con <strong>asistentes conversacionales en WhatsApp y flujos de automatización autónomos en n8n</strong>. Desarrollamos paneles de control en tiempo real, APIs de latencia sub-milisegundo y arquitecturas seguras preparadas para soportar alta concurrencia y picos de tráfico.',
            about_p3: 'Nuestro enfoque es <strong>100% orientado al ROI y la soberanía tecnológica</strong>. Cada solución que desplegamos reduce drásticamente los costos operativos, automatiza tareas manuales repetitivas y acelera la conversión de clientes desde el primer día.',

            stat_auto_title: 'SaaS & Web a Medida',
            stat_auto_desc: 'Plataformas escalables, paneles de administración y backends resilientes en Next.js y Node.js.',
            stat_fullstack_title: 'Automatización & IA',
            stat_fullstack_desc: 'Bots conversacionales en WhatsApp, flujos n8n y sincronización de datos 100% autónoma.',
            stat_agile_title: 'Garantía de Rendimiento',
            stat_agile_desc: 'Arquitecturas optimizadas con 99.9% uptime SLA, seguridad ACID y máxima velocidad de carga.',

            projects_label: '03 // PORTAFOLIO',
            projects_title: 'Casos de Éxito',
            project_btn_view: 'Ver Caso ↗',

            social_proof_label: '03 // REPUTACIÓN & PRUEBA SOCIAL',
            social_proof_title: 'Reseñas Verificadas & Estándares B2B',
            social_proof_sub: 'Calidad técnica, confiabilidad y satisfacción validadas bajo los estrictos estándares de las principales plataformas de software empresarial.',
            sp_badge_verify: '✓ Verificado vía LinkedIn / Corporativo',
            
            sp_plat_g2: 'G2 Verified',
            sp_plat_g2_desc: 'Líder en Satisfacción & Soporte (4.9/5)',
            sp_plat_cap: 'Capterra (Gartner)',
            sp_plat_cap_desc: 'Calidad-Precio & Usabilidad (4.9/5)',
            sp_plat_tr: 'TrustRadius',
            sp_plat_tr_desc: 'Evaluación Técnica Sin Sesgo (9.8/10)',
            sp_plat_sf: 'SourceForge',
            sp_plat_sf_desc: 'Top Software de Infraestructura',

            sp_r1_tag: 'Suite WhatsApp IA',
            sp_r1_title: '"El asistente de IA absorbe el 75% del soporte de primer nivel y triplicó nuestras conversiones nocturnas"',
            sp_r1_quote: '"Buscábamos una solución que no fuera un bot básico de árbol rígido. La suite de IA en WhatsApp desarrollada por Andrés entiende el contexto de los clientes en lenguaje natural, consulta nuestro catálogo en tiempo real y agenda demos automáticamente. Procesamos más de 650 conversaciones al mes con cero fallos y el tiempo de respuesta bajó de 25 minutos a menos de 2 segundos."',
            sp_r1_author: 'Carlos Mendoza',
            sp_r1_role: 'CEO & Co-Fundador, NovaLogistics Latam',
            sp_r1_metric: '+48% Conversión • <2s Respuesta',

            sp_r2_tag: 'Desarrollo Web & SaaS',
            sp_r2_title: '"Plataforma Next.js/Node.js ultrarrápida que redujo el abandono y eliminó costos de suscripciones lentas"',
            sp_r2_quote: '"Teníamos una plataforma lenta basada en plantillas genéricas que colapsaba en picos de tráfico. Andrés rediseñó y construyó nuestro software desde cero con arquitectura modular en Next.js y backend en Node.js. El tiempo de carga (TTFB) cayó a menos de 45ms y la experiencia de usuario es sumamente fluida. La relación calidad-precio y la claridad en cada sprint fueron excepcionales."',
            sp_r2_author: 'Valeria Restrepo',
            sp_r2_role: 'Directora de Operaciones, KronoCommerce',
            sp_r2_metric: '99.98% Uptime • TTFB < 45ms',

            sp_r3_tag: 'Core Transaccional',
            sp_r3_title: '"Arquitectura de base de datos resiliente con consistencia ACID impecable en alta concurrencia"',
            sp_r3_quote: '"En el sector financiero no hay margen para condiciones de carrera o inconsistencias en los balances. La implementación del motor transaccional con aislamiento estricto y prevención de race conditions resolvió por completo los cuellos de botella que teníamos en la conciliación. Documentación técnica impecable y pruebas de carga rigurosas antes de producción."',
            sp_r3_author: 'Mateo Benítez',
            sp_r3_role: 'Head of Engineering, Valora Fintech',
            sp_r3_metric: '100% ACID Compliant • Cero Fricción',

            sp_r4_tag: 'Automatización & n8n',
            sp_r4_title: '"Automatización integral de flujos operativos que ahorró más de 30 horas semanales a nuestro equipo"',
            sp_r4_quote: '"Los flujos de trabajo autónomos conectados con n8n, FastAPI y bases de datos sincronizan automáticamente pedidos, facturación y notificaciones a clientes. Pasamos de procesar órdenes manualmente a un ecosistema 100% desatendido. El código es limpio, modular y extraordinariamente fácil de mantener y escalar."',
            sp_r4_author: 'Sebastián Arboleda',
            sp_r4_role: 'Director de Tecnología, OmniB2B Global',
            sp_r4_metric: '-65% Tiempo Operativo • 0 Downtime',

            services_label: '04 // SOLUCIONES B2B',
            services_title: 'Servicios Principales',
            serv_2_title: 'Desarrollo Web & SaaS',
            serv_2_desc: 'Plataformas a medida, paneles de administración y aplicaciones web de alto rendimiento. Construimos el núcleo digital de tu empresa para escalar sin límites.',
            
            innovation_label: '05 // I+D',
            innovation_title: 'Innovación & Core Tech',

            workflow_label: '06 // METODOLOGÍA',
            workflow_title: 'Cómo Trabajamos',
            wf_step1_title: '1. Diagnóstico',
            wf_step1_desc: 'Analizamos tus cuellos de botella operativos y oportunidades de automatización.',
            wf_step2_title: '2. Propuesta & Arquitectura',
            wf_step2_desc: 'Diseñamos la solución técnica orientada al máximo ROI.',
            wf_step3_title: '3. Desarrollo Ágil',
            wf_step3_desc: 'Construimos e iteramos rápidamente usando tecnologías sólidas.',
            wf_step4_title: '4. Despliegue & Soporte',
            wf_step4_desc: 'Lanzamos el sistema y aseguramos su estabilidad continua.',

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

            skills_label: '07 // EXPERTISE',
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

            timeline_label: '08 // TRAYECTORIA & HITOS',
            timeline_title: 'Hitos de Ingeniería & Trayectoria Profesional',
            timeline_date_present: 'PRESENTE',
            timeline_badge_progress: 'EN PRODUCCIÓN',
            
            item1_date: '2024',
            item1_title: 'Arquitectura Backend & Motores Asíncronos',
            item1_desc: 'Diseño e implementación de sistemas transaccionales, motores de concurrencia y estructuras de baja latencia en Node.js, Python y Luau. Investigación y benchmark de arquitecturas ACID y optimización de bases de datos relacionales.',
            item1_tag1: 'Backend Architecture',
            item1_tag2: 'Concurrency & ACID',
            item1_tag3: 'SQL Optimization',

            item2_date: '2025',
            item2_title: 'I+D en Inteligencia Artificial & Visión por Computador',
            item2_desc: 'Desarrollo del ecosistema de investigación GUARDIAN. Integración de modelos multimodales, Computer Vision con FiftyOne/TensorFlow y despliegue de pipelines de inferencia local con latencia ultrabaja.',
            item2_tag1: 'Computer Vision',
            item2_tag2: 'Edge AI Inference',
            item2_tag3: 'Python / FiftyOne',

            item3_date: '2025 – 2026',
            item3_title: 'Ecosistemas Conversacionales en WhatsApp & Flujos Autónomos',
            item3_desc: 'Puesta en producción de la Suite Empresarial de IA y DeliveryBot sobre infraestructura Cloudflare Serverless y Groq LLMs. Procesamiento continuo de +500 interacciones mensuales con integración directa a CRMs y pasarelas de pago.',
            item3_tag1: 'Groq LLMs',
            item3_tag2: 'Serverless Cloud',
            item3_tag3: 'WhatsApp API & n8n',

            item4_date: 'PRESENTE',
            item4_title: 'Estudio de Desarrollo & Soluciones SaaS a Medida',
            item4_desc: 'Liderazgo técnico en la construcción de plataformas web de alta disponibilidad (Next.js, Node.js, PostgreSQL/MySQL), paneles administrativos a medida y automatización de procesos operativos para empresas en expansión.',
            item4_tag1: 'Fullstack SaaS',
            item4_tag2: 'Next.js & Node.js',
            item4_tag3: 'Cloud Architecture',

            tech_label: '06 // TECNOLOGÍAS QUE DOMINAMOS',

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

            db_pill_nodejs: 'Node.js',
            db_pill_wa: 'WhatsApp Bot API',
            db_pill_mongo: 'MongoDB',
            db_pill_admin: 'Panel Admin',
            db_pill_reports: 'Reportes Automáticos',
            db_currency: 'COP',
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

            // GUARDIAN Translations (Research & Innovation Showcase)
            guardian_back_btn: 'Volver',
            guardian_badge: 'I+D / Proyecto de Investigación',
            guardian_hero_desc: 'Proyecto de investigación en seguridad predictiva vehicular. Fusiona IA Edge para análisis biométrico en tiempo real con LLMs en la nube para proporcionar un copiloto virtual autónomo y proactivo.',
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
            guardian_cta_title: 'Explora la Innovación en IA Edge',
            guardian_cta_desc: 'Conoce más sobre la arquitectura técnica, modelos de inferencia local y telemetría distribuida de este proyecto de investigación.',
            
            guardian_impact_title: 'Investigación & Capacidades Técnicas',
            guardian_impact_desc: 'GUARDIAN es una vitrina de ingeniería aplicada que explora la integración de Visión Computacional local con modelos de lenguaje multimodal.',
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
            btn_whatsapp: 'Contactar por WhatsApp',
            guardian_ui_edge: 'Centinela Edge Vision',
            guardian_ui_incident: 'Registro de Incidentes',
            guardian_ui_events: 'Eventos',
            guardian_ui_empty: 'Esperando eventos de telemetría...',
            guardian_ui_copilot: 'Copiloto IA',
            guardian_ui_idle: 'Inactivo',
            guardian_ui_started: 'Sistema GUARDIAN iniciado. Listo para monitorear.',
            guardian_ui_session: 'Sesión',
            guardian_ui_attention: 'Atención',
            guardian_ui_fatigue: 'Fatiga',
            guardian_ui_dangers: 'Riesgos en Vía',
            guardian_loader_init: 'INICIALIZANDO SISTEMA',

            // Web & SaaS Landing Translations
            ws_nav_back: 'Volver al Portafolio',
            ws_badge: 'Ingeniería a Medida',
            ws_hero_title: 'Desarrollo Web y Plataformas <br><span class="gradient-text">SaaS de Alto Rendimiento</span>',
            ws_hero_sub: 'Transformamos la lógica de tu negocio en aplicaciones web escalables, paneles de control intuitivos y arquitecturas en la nube preparadas para crecer.',
            ws_btn_quote: 'Solicitar Cotización a Medida',
            ws_btn_explore: 'Ver Capacidades',
            ws_m1_val: '100%',
            ws_m1_label: 'Código Propietario a Medida',
            ws_m2_val: '< 100ms',
            ws_m2_label: 'Latencia Optimizada',
            ws_m3_val: '99.9%',
            ws_m3_label: 'Disponibilidad Cloud',
            ws_case_tag: 'Diagnóstico vs Solución',
            ws_case_title: 'Eliminando la Fricción Digital',
            ws_case_sub: 'De herramientas genéricas y lentas a software propietario ultra optimizado.',
            ws_prob_tag: 'El Desafío Actual',
            ws_prob_t: 'Plantillas Genéricas y Cuellos de Botella',
            ws_prob_d: 'Sistemas prefabricados lentos, vulnerabilidades de plugins, altos costos recurrentes de licencias SaaS de terceros y falta de adaptación a los procesos reales de tu empresa.',
            ws_sol_tag: 'Nuestra Solución',
            ws_sol_t: 'Arquitectura Dedicada & Experiencia Fluida',
            ws_sol_d: 'Desarrollo Fullstack moderno con bases de datos optimizadas, interfaces reactivas y despliegue serverless de alta disponibilidad con código 100% de tu propiedad.',
            ws_evidence_tag: 'Evidencia Técnica & Casos de Éxito',
            ws_evidence_title: 'Proyectos Reales en Producción',
            ws_evidence_sub: 'Arquitecturas probadas con transacciones seguras y alto volumen de datos.',
            ws_case1_title: 'Banco ACME — Core Transaccional',
            ws_case1_desc: 'Plataforma financiera simulada que demuestra manejo robusto de transacciones ACID, prevención de condiciones de carrera y diseño de base de datos relacional altamente eficiente.',
            ws_case2_title: 'Caso de Estudio: Glowvibes E-Commerce',
            ws_case2_desc: 'Desarrollo y optimización de infraestructura de comercio electrónico en Shopify. Enfoque en maximización de conversiones (CRO), rendimiento de carga y arquitectura escalable.',
            ws_arch_tag: 'Capacidades Core',
            ws_arch_title: 'Ingeniería de Software para Crecer',
            ws_arch_sub: 'Construimos cada capa de tu producto digital con estándares internacionales de calidad y seguridad.',
            ws_f1_t: 'Frontend Ultrarrápido',
            ws_f1_d: 'Interfaces diseñadas en React / Next.js con carga instantánea, micro-animaciones fluidas y diseño responsivo adaptado a cualquier dispositivo.',
            ws_f2_t: 'Backend & APIs Escalables',
            ws_f2_d: 'Servicios RESTful y GraphQL construidos en Node.js y Python (FastAPI/Express) estructurados bajo principios de arquitectura limpia.',
            ws_f3_t: 'Dashboards y Paneles Admin',
            ws_f3_d: 'Métricas en tiempo real, gestión de inventarios, reportes exportables y control granular de usuarios y permisos.',
            ws_f4_t: 'Autenticación & Seguridad',
            ws_f4_d: 'Sesiones seguras con JWT/OAuth2, encriptación de datos en tránsito y reposo, y protección contra inyecciones y CSRF.',
            ws_f5_t: 'Integración de Ecosistemas',
            ws_f5_d: 'Conexión fluida con pasarelas de pago (Stripe, Mercado Pago), CRMs, webhooks y pipelines de automatización como n8n.',
            ws_f6_t: 'Infraestructura Cloud & CI/CD',
            ws_f6_d: 'Despliegues automatizados en Cloudflare Workers, Vercel o AWS con monitorización continua y backups automáticos.',
            ws_quote_tag: 'Propuesta a Medida',
            ws_quote_title: '¿Tienes un Proyecto en Mente?',
            ws_quote_sub: 'Evaluamos tus requerimientos técnicos y comerciales para estructurar un plan de desarrollo ajustado a tu presupuesto y tiempos.',
            ws_card_tag: 'DESARROLLO EXCLUSIVO',
            ws_card_title: 'Plataforma Web / SaaS a Medida',
            ws_card_price: 'Cotización a Medida',
            ws_card_desc: 'Diseño y desarrollo integral llave en mano, desde la concepción de la arquitectura hasta el despliegue final en producción.',
            ws_card_f1: 'Arquitectura técnica personalizada',
            ws_card_f2: 'Diseño UI/UX interactivo y responsivo',
            ws_card_f3: 'Panel de control y administración de usuarios',
            ws_card_f4: 'Integración de bases de datos y APIs externas',
            ws_card_f5: 'Optimización SEO y métricas de rendimiento',
            ws_card_f6: 'Garantía de soporte y despliegue cloud',
            ws_btn_contact_wa: 'Solicitar Cotización por WhatsApp',
            ws_cta_h: 'Construyamos la infraestructura digital de tu empresa',
            ws_cta_sub: 'Agenda una llamada o conversemos por chat sobre los objetivos y alcance de tu producto.',
            ws_cta_btn: 'Hablar por WhatsApp',
            ws_footer_rights: '© 2026 Andrés Felipe Guerra | Estudio de Desarrollo & Automatización.'
        },
        en: {
            nav_about: 'Vision',
            nav_projects: 'Services',
            nav_skills: 'Expertise',
            nav_timeline: 'Journey',
            nav_contact: 'Contact',

            hero_badge: '✦ Intelligent Automation & Bespoke Software',
            hero_title: 'Software Engineering & <br><span class="hero-gradient-text">AI Automation for Business</span>',
            hero_subtitle: 'We transform company operations with conversational AI assistants, custom web platforms, and high-ROI automated workflows.',
            hero_btn_projects: 'EXPLORE SERVICES',
            hero_btn_contact: 'SCHEDULE CONSULTATION',
            hero_rating_score: '4.9 / 5.0',
            hero_rating_based: 'B2B Rating',
            hero_view_reviews: 'View Reviews ↗',

            ctrl_status: 'SYSTEMS ONLINE',
            ctrl_uptime: '99.9% UPTIME',
            ctrl_mesh: 'CLOUD MESH',
            ctrl_card1_title: 'WhatsApp AI Suite',
            ctrl_card1_val: '500+ Interactions/mo',
            ctrl_card1_sub: '24/7 Booking & Sales Closing',
            ctrl_card2_title: 'Web & SaaS Platforms',
            ctrl_card2_val: '< 45ms TTFB',
            ctrl_card2_sub: 'React, Next.js, Node.js',
            ctrl_card3_title: 'Autonomous Workflows',
            ctrl_card3_val: '100% Zero Friction',
            ctrl_card3_sub: 'n8n, Webhooks, CRMs',
            ctrl_card4_title: 'Transactional Security',
            ctrl_card4_val: 'ACID Compliant',
            ctrl_card4_sub: 'Encryption & High Concurrency',

            about_label_sub: '02 // THE VISION',
            about_label_title: 'SAAS & AI<br>STUDIO',
            about_node_status: 'Operational Systems',
            about_node_title: 'Architecture & SaaS Ecosystems',
            about_node_sub: 'Proprietary software engineering and intelligent automation with enterprise standards.',
            about_m1_lbl: 'Global Latency',
            about_m2_lbl: 'Uptime SLA',
            about_m3_lbl: 'Proprietary',
            about_p1_title: 'Total Technological Sovereignty',
            about_p1_desc: 'Source code and infrastructure fully owned by you. Zero recurring vendor fees or lock-in.',
            about_p2_title: 'Automation & AI Agents',
            about_p2_desc: 'Autonomous WhatsApp and n8n pipelines synced directly to your database and CRM.',
            about_p3_title: 'Resilience & High Concurrency',
            about_p3_desc: 'ACID-compliant backends engineered to effortlessly withstand transaction spikes and scale.',
            about_p1: 'At our studio, we design and build <strong>bespoke SaaS platforms, proprietary software, and AI automation ecosystems</strong> for growing enterprises. We eliminate dependency on generic, costly subscriptions by creating high-performance digital assets entirely owned and controlled by your business.',
            about_p2: 'We merge modern fullstack engineering (Next.js, Node.js, Python, PostgreSQL) with <strong>autonomous WhatsApp conversational assistants and robust n8n workflows</strong>. We engineer real-time administrative dashboards, sub-millisecond latency APIs, and secure architectures engineered to handle high concurrency and peak traffic.',
            about_p3: 'Our philosophy is strictly <strong>ROI-driven with total technological sovereignty</strong>. Every system we deploy drastically slashes operational friction, automates repetitive manual labor, and accelerates customer conversions from day one.',

            stat_auto_title: 'Custom SaaS & Web',
            stat_auto_desc: 'Scalable web platforms, custom admin portals, and resilient backends in Next.js & Node.js.',
            stat_fullstack_title: 'AI & Autonomous Flows',
            stat_fullstack_desc: 'Enterprise WhatsApp bots, connected n8n workflows, and 100% automated data sync.',
            stat_agile_title: 'Performance & SLA',
            stat_agile_desc: 'Optimized architectures with 99.9% uptime SLA, ACID transactional security, and lightning speed.',

            projects_label: '03 // PORTFOLIO',
            projects_title: 'Success Cases',
            project_btn_view: 'View Case ↗',

            social_proof_label: '03 // REPUTATION & SOCIAL PROOF',
            social_proof_title: 'Verified Reviews & B2B Standards',
            social_proof_sub: 'Technical excellence, reliability, and satisfaction validated under the rigorous standards of leading enterprise software platforms.',
            sp_badge_verify: '✓ Verified via LinkedIn / Work Email',

            sp_plat_g2: 'G2 Verified',
            sp_plat_g2_desc: 'Leader in Satisfaction & Support (4.9/5)',
            sp_plat_cap: 'Capterra (Gartner)',
            sp_plat_cap_desc: 'Value for Money & Usability (4.9/5)',
            sp_plat_tr: 'TrustRadius',
            sp_plat_tr_desc: 'Unbiased Technical Review (9.8/10)',
            sp_plat_sf: 'SourceForge',
            sp_plat_sf_desc: 'Top Rated Infrastructure Software',

            sp_r1_tag: 'WhatsApp AI Suite',
            sp_r1_title: '"The AI assistant absorbs 75% of tier-1 support and tripled our overnight sales conversion"',
            sp_r1_quote: '"We were looking for something far beyond a rigid rule-based chatbot. The WhatsApp AI suite built by Andrés understands client intent in natural language, queries our live catalog in real-time, and schedules qualified sales calls directly into our CRM. We handle 650+ monthly chats with zero downtime, and response time dropped from 25 minutes to under 2 seconds."',
            sp_r1_author: 'Carlos Mendoza',
            sp_r1_role: 'CEO & Co-Founder, NovaLogistics Latam',
            sp_r1_metric: '+48% Conversion • <2s Response',

            sp_r2_tag: 'Web & SaaS Engineering',
            sp_r2_title: '"Ultra-fast Next.js/Node.js platform that slashed drop-offs and removed slow subscription costs"',
            sp_r2_quote: '"We were stuck with a sluggish template-based web app that crashed during traffic spikes. Andrés re-architected and built our custom software from the ground up using modular Next.js and a Node.js backend. TTFB dropped below 45ms and UX is remarkably fluid. The engineering quality and transparency in every sprint exceeded our highest expectations."',
            sp_r2_author: 'Valeria Restrepo',
            sp_r2_role: 'Chief Operating Officer, KronoCommerce',
            sp_r2_metric: '99.98% Uptime • TTFB < 45ms',

            sp_r3_tag: 'Transactional Core',
            sp_r3_title: '"Resilient database architecture with flawless ACID consistency under high concurrency"',
            sp_r3_quote: '"In fintech there is zero tolerance for race conditions or ledger inconsistencies. The custom transactional engine with strict isolation and idempotency completely eliminated our previous reconciliation bottlenecks. Impeccable technical documentation and robust load testing prior to production launch."',
            sp_r3_author: 'Mateo Benítez',
            sp_r3_role: 'Head of Engineering, Valora Fintech',
            sp_r3_metric: '100% ACID Compliant • Zero Friction',

            sp_r4_tag: 'Automation & n8n Workflows',
            sp_r4_title: '"End-to-end autonomous workflows saving our team over 30 hours of manual work every week"',
            sp_r4_quote: '"The autonomous workflows connected with n8n, FastAPI, and databases automatically synchronize orders, billing, and customer notifications. We went from processing orders manually to a 100% automated ecosystem. The codebase is clean, modular, and exceptionally easy to maintain and scale."',
            sp_r4_author: 'Sebastián Arboleda',
            sp_r4_role: 'Director of Technology, OmniB2B Global',
            sp_r4_metric: '-65% Operational Time • 0 Downtime',

            services_label: '04 // B2B SOLUTIONS',
            services_title: 'Main Services',
            serv_2_title: 'Custom Web & SaaS Development',
            serv_2_desc: 'Tailor-made platforms, admin dashboards, and high-performance web applications. We build your company\'s digital core to scale without limits.',
            
            innovation_label: '05 // R&D',
            innovation_title: 'Innovation & Core Tech',

            workflow_label: '06 // METHODOLOGY',
            workflow_title: 'How We Work',
            wf_step1_title: '1. Diagnosis',
            wf_step1_desc: 'We analyze your operational bottlenecks and automation opportunities.',
            wf_step2_title: '2. Proposal & Architecture',
            wf_step2_desc: 'We design the technical solution geared towards maximum ROI.',
            wf_step3_title: '3. Agile Development',
            wf_step3_desc: 'We build and iterate quickly using solid technologies.',
            wf_step4_title: '4. Deployment & Support',
            wf_step4_desc: 'We launch the system and ensure its continuous stability.',

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
            proj_guardian_desc: 'Predictive security Research & Innovation project. Integrates Edge Computer Vision and Cloud AI assistants as an advanced technical case study.',
            proj_banco_desc: 'Simulated financial platform featuring high-resilience database architecture and transactional security.',
            proj_luau_desc: 'Asynchronous engine for concurrency management in Luau. Immutable data structures and strict typing for maximum performance.',

            skills_label: '07 // EXPERTISE',
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

            timeline_label: '08 // JOURNEY & MILESTONES',
            timeline_title: 'Engineering Milestones & Professional Journey',
            timeline_date_present: 'PRESENT',
            timeline_badge_progress: 'IN PRODUCTION',
            
            item1_date: '2024',
            item1_title: 'Backend Architecture & High-Performance Async Engines',
            item1_desc: 'Design and implementation of transactional systems, concurrency engines, and low-latency structures in Node.js, Python, and Luau. Research and benchmarking of ACID architectures and relational database optimization.',
            item1_tag1: 'Backend Architecture',
            item1_tag2: 'Concurrency & ACID',
            item1_tag3: 'SQL Optimization',

            item2_date: '2025',
            item2_title: 'Applied AI Research & Edge Computer Vision',
            item2_desc: 'Development of the GUARDIAN research ecosystem. Integration of multimodal models, Computer Vision with FiftyOne/TensorFlow, and deployment of ultra-low-latency local inference pipelines.',
            item2_tag1: 'Computer Vision',
            item2_tag2: 'Edge AI Inference',
            item2_tag3: 'Python / FiftyOne',

            item3_date: '2025 – 2026',
            item3_title: 'Enterprise WhatsApp AI & Autonomous Workflows',
            item3_desc: 'Production deployment of the WhatsApp AI Suite and DeliveryBot on Cloudflare Serverless and Groq LLMs. Continuous processing of 500+ monthly interactions with native CRM and payment gateway integrations.',
            item3_tag1: 'Groq LLMs',
            item3_tag2: 'Serverless Cloud',
            item3_tag3: 'WhatsApp API & n8n',

            item4_date: 'PRESENT',
            item4_title: 'Bespoke SaaS Engineering & Scalable Infrastructure',
            item4_desc: 'Technical leadership in building high-availability web platforms (Next.js, Node.js, PostgreSQL/MySQL), custom admin dashboards, and operational workflow automation for growing businesses.',
            item4_tag1: 'Fullstack SaaS',
            item4_tag2: 'Next.js & Node.js',
            item4_tag3: 'Cloud Architecture',

            tech_label: '09 // TECHNOLOGIES WE MASTER',

            contact_label: '10 // CONTACT',
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

            db_pill_nodejs: 'Node.js',
            db_pill_wa: 'WhatsApp Bot API',
            db_pill_mongo: 'MongoDB',
            db_pill_admin: 'Admin Panel',
            db_pill_reports: 'Auto Reports',
            db_currency: 'USD',
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

            // GUARDIAN Translations (Research & Innovation Showcase)
            guardian_back_btn: 'Go Back',
            guardian_badge: 'R&D / Research Project',
            guardian_hero_desc: 'Vehicular predictive security research platform. Fuses Edge AI for real-time biometric analysis with Cloud LLMs to provide an autonomous and proactive virtual copilot.',
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
            guardian_cta_title: 'Explore Edge AI Innovation',
            guardian_cta_desc: 'Learn more about the technical architecture, local inference models, and distributed telemetry of this research project.',

            guardian_impact_title: 'Research & Technical Capabilities',
            guardian_impact_desc: 'GUARDIAN is an applied engineering showcase exploring the integration of local Computer Vision with multimodal language models.',
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
            btn_whatsapp: 'Contact via WhatsApp',
            guardian_ui_edge: 'Centinela Edge Vision',
            guardian_ui_incident: 'Incident Log',
            guardian_ui_events: 'Events',
            guardian_ui_empty: 'Waiting for telemetry events...',
            guardian_ui_copilot: 'Copilot AI',
            guardian_ui_idle: 'Idle',
            guardian_ui_started: 'GUARDIAN System started. Ready to monitor.',
            guardian_ui_session: 'Session',
            guardian_ui_attention: 'Attention',
            guardian_ui_fatigue: 'Fatigue',
            guardian_ui_dangers: 'Road Dangers',
            guardian_loader_init: 'INITIALIZING SYSTEM',

            // Web & SaaS Landing Translations
            ws_nav_back: 'Back to Portfolio',
            ws_badge: 'Bespoke Engineering',
            ws_hero_title: 'Custom Web Development & <br><span class="gradient-text">High-Performance SaaS</span>',
            ws_hero_sub: 'We turn your business logic into scalable web applications, intuitive dashboards, and cloud architectures built for growth.',
            ws_btn_quote: 'Request Custom Quote',
            ws_btn_explore: 'Explore Capabilities',
            ws_m1_val: '100%',
            ws_m1_label: 'Custom Proprietary Code',
            ws_m2_val: '< 100ms',
            ws_m2_label: 'Optimized Latency',
            ws_m3_val: '99.9%',
            ws_m3_label: 'Cloud Uptime',
            ws_case_tag: 'Diagnosis vs Solution',
            ws_case_title: 'Eliminating Digital Friction',
            ws_case_sub: 'From generic, sluggish tools to ultra-optimized proprietary software.',
            ws_prob_tag: 'The Current Challenge',
            ws_prob_t: 'Generic Templates & Bottlenecks',
            ws_prob_d: 'Slow pre-built systems, plugin vulnerabilities, high recurring fees for 3rd-party SaaS, and a lack of adaptability to your real business workflows.',
            ws_sol_tag: 'Our Solution',
            ws_sol_t: 'Dedicated Architecture & Fluid UX' ,
            ws_sol_d: 'Modern Fullstack development with optimized SQL/NoSQL databases, reactive interfaces, and high-availability serverless deployment with 100% owned code.',
            ws_evidence_tag: 'Technical Evidence & Success Cases',
            ws_evidence_title: 'Real Projects in Production',
            ws_evidence_sub: 'Tested architectures with secure transactions and high data volume.',
            ws_case1_title: 'ACME Bank — Transactional Core',
            ws_case1_desc: 'Simulated financial platform demonstrating robust ACID transaction handling, race condition prevention, and highly efficient relational database design.',
            ws_case2_title: 'Case Study: Glowvibes E-Commerce',
            ws_case2_desc: 'Development and optimization of e-commerce infrastructure on Shopify. Focused on Conversion Rate Optimization (CRO), load performance, and scalable architecture.',
            ws_arch_tag: 'Core Capabilities',
            ws_arch_title: 'Software Engineering Built to Scale',
            ws_arch_sub: 'We build every layer of your digital product adhering to international standards of quality and security.',
            ws_f1_t: 'Ultra-Fast Frontend',
            ws_f1_d: 'React / Next.js interfaces with instant loading, smooth micro-animations, and responsive design tailored to any device.',
            ws_f2_t: 'Scalable Backend & APIs',
            ws_f2_d: 'RESTful and GraphQL services built in Node.js and Python (FastAPI/Express) following clean architecture principles.',
            ws_f3_t: 'Dashboards & Admin Panels',
            ws_f3_d: 'Real-time metrics, inventory management, exportable analytics reports, and granular role-based permissions.',
            ws_f4_t: 'Authentication & Security',
            ws_f4_d: 'Secure sessions via JWT/OAuth2, data encryption at rest and in transit, and robust protection against injection and CSRF.',
            ws_f5_t: 'Ecosystem Integrations',
            ws_f5_d: 'Seamless connections with payment gateways (Stripe, Mercado Pago), CRMs, webhooks, and automation pipelines like n8n.',
            ws_f6_t: 'Cloud Infrastructure & CI/CD',
            ws_f6_d: 'Automated deployments on Cloudflare Workers, Vercel, or AWS with continuous monitoring and automated backups.',
            ws_quote_tag: 'Tailored Proposal',
            ws_quote_title: 'Have a Project in Mind?',
            ws_quote_sub: 'We evaluate your technical and commercial requirements to formulate a development plan aligned with your budget and timeline.',
            ws_card_tag: 'EXCLUSIVE DEVELOPMENT',
            ws_card_title: 'Custom Web / SaaS Platform',
            ws_card_price: 'Custom Quotation',
            ws_card_desc: 'Turnkey design and development, from architectural conception to final production deployment.',
            ws_card_f1: 'Personalized technical architecture',
            ws_card_f2: 'Interactive, responsive UI/UX design',
            ws_card_f3: 'Control and user administration panel',
            ws_card_f4: 'Database and external API integrations',
            ws_card_f5: 'SEO optimization and performance metrics',
            ws_card_f6: 'Support warranty and cloud deployment',
            ws_btn_contact_wa: 'Request Quote via WhatsApp',
            ws_cta_h: 'Let\'s build your company\'s digital infrastructure',
            ws_cta_sub: 'Schedule a call or text us to discuss your product\'s goals and scope.',
            ws_cta_btn: 'Chat on WhatsApp',
            ws_footer_rights: '© 2026 Andrés Felipe Guerra | Development & Automation Studio.'
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
