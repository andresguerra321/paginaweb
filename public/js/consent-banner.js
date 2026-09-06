/**
 * Legal Center & Cookie Consent — AG Private Engineering
 * Google Consent Mode v2 · Ley 1480/2011 · Ley 2439/2024
 * 
 * 4-tab modal: Privacidad | Términos | Garantía | Ventas
 * Context-aware content based on current page pathname.
 */
(function () {
  'use strict';

  /* ──────────────── HELPERS ──────────────── */
  function isEN() {
    return (window.i18nEngine && window.i18nEngine.getLanguage() === 'en') ||
      localStorage.getItem('portfolio_lang') === 'en';
  }

  function getPageContext() {
    var p = window.location.pathname.toLowerCase();
    if (p.indexOf('proyecto-bot-whatsapp/deliverybot') !== -1) return 'deliverybot';
    if (p.indexOf('proyecto-bot-whatsapp') !== -1) return 'whatsappbot';
    if (p.indexOf('proyecto-web-saas') !== -1) return 'websaas';
    if (p.indexOf('proyecto-guardian') !== -1) return 'guardian';
    if (p.indexOf('proyecto-formula1') !== -1) return 'f1sim';
    if (p.indexOf('proyecto.html') !== -1) return 'catalog';
    return 'general';
  }

  function getConsentStatus() {
    return localStorage.getItem('cookie_consent') || 'pending';
  }

  /* ──────────────── LEGAL CONTENT ──────────────── */
  function getLegalContent(tab, lang) {
    var ctx = getPageContext();
    var en = lang === 'en';
    var consent = getConsentStatus();

    var content = {};

    // ─── TAB 1: PRIVACY & COOKIES ───
    content.privacy = {
      title: en ? 'Privacy & Cookie Policy' : 'Política de Privacidad y Cookies',
      body: (en ? [
        '<h4>Data Controller</h4>',
        '<p>Andrés Felipe Guerra — AG Private Engineering, Bogotá D.C., Colombia.<br>Contact: WhatsApp <a href="https://wa.me/573185602203" target="_blank" rel="noopener">+57 318 560 2203</a></p>',
        '<h4>Data Collected</h4>',
        '<p>We collect anonymous browsing data through Google Analytics 4 (Measurement ID: <code>G-XG8HJTJMQY</code>): anonymized IP, device type, session duration, pages visited, and Core Web Vitals performance metrics.</p>',
        '<h4>Purpose</h4>',
        '<p>Measure technical performance (load times, rendering latency), analyze aggregate traffic, and optimize user experience. No personal data is sold or shared with third parties for advertising purposes.</p>',
        '<h4>Legal Basis</h4>',
        '<p>User consent (Art. 6, Law 1581/2012 — Personal Data Protection, Colombia). Google Consent Mode v2 ensures analytics only activate upon explicit consent.</p>',
        '<h4>Google Consent Mode v2</h4>',
        '<p>This site implements Google Consent Mode v2 with the following signals:</p>',
        '<ul><li><code>analytics_storage</code> — Controls Google Analytics cookies</li>',
        '<li><code>ad_storage</code> — Controls advertising cookies (none used)</li>',
        '<li><code>ad_user_data</code> — User data for advertising (none used)</li>',
        '<li><code>ad_personalization</code> — Personalized ads (none used)</li></ul>',
        '<h4>Cookies Used</h4>',
        '<table class="legal-table"><thead><tr><th>Cookie</th><th>Type</th><th>Duration</th><th>Purpose</th></tr></thead><tbody>',
        '<tr><td><code>_ga</code></td><td>Analytical</td><td>2 years</td><td>Google Analytics visitor ID</td></tr>',
        '<tr><td><code>_ga_*</code></td><td>Analytical</td><td>2 years</td><td>GA4 session state</td></tr>',
        '<tr><td><code>cookie_consent</code></td><td>Essential</td><td>Persistent</td><td>Stores your consent preference</td></tr>',
        '<tr><td><code>portfolio_lang</code></td><td>Essential</td><td>Persistent</td><td>Selected language (ES/EN)</td></tr>',
        '</tbody></table>',
        '<h4>Your Rights</h4>',
        '<p>You may access, rectify, delete, or revoke your consent at any time using the controls below or by contacting us via WhatsApp.</p>'
      ] : [
        '<h4>Responsable del Tratamiento</h4>',
        '<p>Andrés Felipe Guerra — AG Private Engineering, Bogotá D.C., Colombia.<br>Contacto: WhatsApp <a href="https://wa.me/573185602203" target="_blank" rel="noopener">+57 318 560 2203</a></p>',
        '<h4>Datos Recopilados</h4>',
        '<p>Recopilamos datos de navegación anónimos mediante Google Analytics 4 (ID: <code>G-XG8HJTJMQY</code>): IP anonimizada, tipo de dispositivo, duración de sesión, páginas visitadas y métricas de rendimiento (Core Web Vitals).</p>',
        '<h4>Finalidad</h4>',
        '<p>Medir rendimiento técnico (tiempos de carga, latencia de renderizado), analizar tráfico agregado y optimizar la experiencia del usuario. No se venden ni comparten datos personales con terceros para fines publicitarios.</p>',
        '<h4>Base Legal</h4>',
        '<p>Consentimiento del titular (Art. 6, Ley 1581 de 2012 — Protección de Datos Personales, Colombia). Google Consent Mode v2 garantiza que las analíticas solo se activan con consentimiento explícito.</p>',
        '<h4>Google Consent Mode v2</h4>',
        '<p>Este sitio implementa Google Consent Mode v2 con las siguientes señales:</p>',
        '<ul><li><code>analytics_storage</code> — Controla cookies de Google Analytics</li>',
        '<li><code>ad_storage</code> — Controla cookies publicitarias (no utilizadas)</li>',
        '<li><code>ad_user_data</code> — Datos de usuario para publicidad (no utilizados)</li>',
        '<li><code>ad_personalization</code> — Anuncios personalizados (no utilizados)</li></ul>',
        '<h4>Cookies Utilizadas</h4>',
        '<table class="legal-table"><thead><tr><th>Cookie</th><th>Tipo</th><th>Duración</th><th>Finalidad</th></tr></thead><tbody>',
        '<tr><td><code>_ga</code></td><td>Analítica</td><td>2 años</td><td>ID de visitante Google Analytics</td></tr>',
        '<tr><td><code>_ga_*</code></td><td>Analítica</td><td>2 años</td><td>Estado de sesión GA4</td></tr>',
        '<tr><td><code>cookie_consent</code></td><td>Esencial</td><td>Persistente</td><td>Almacena tu preferencia de consentimiento</td></tr>',
        '<tr><td><code>portfolio_lang</code></td><td>Esencial</td><td>Persistente</td><td>Idioma seleccionado (ES/EN)</td></tr>',
        '</tbody></table>',
        '<h4>Derechos del Titular</h4>',
        '<p>Puedes acceder, rectificar, eliminar o revocar tu consentimiento en cualquier momento usando los controles a continuación o contactándonos vía WhatsApp.</p>'
      ]).join(''),
      consent: {
        status: consent === 'granted'
          ? (en ? '🟢 Google Analytics Enabled' : '🟢 Analíticas de Google Habilitadas')
          : consent === 'denied'
            ? (en ? '⚪ Essential Cookies Only' : '⚪ Solo Cookies Esenciales')
            : (en ? '⏳ Pending — Choose below' : '⏳ Pendiente — Elige a continuación'),
        btnAccept: en ? 'Accept All' : 'Aceptar Todas',
        btnDecline: en ? 'Essential Only' : 'Solo Esenciales'
      }
    };

    // ─── TAB 2: TERMS & CONDITIONS ───
    var commonTerms = en ? [
      '<h4>Service Provider</h4>',
      '<p>Andrés Felipe Guerra — AG Private Engineering, Bogotá D.C., Colombia.<br>Contact: WhatsApp <a href="https://wa.me/573185602203" target="_blank" rel="noopener">+57 318 560 2203</a></p>',
      '<h4>Contract Object</h4>',
      '<p>Provision of software engineering services as defined in the scope agreed upon in writing (approved quote via WhatsApp or formal document).</p>',
      '<h4>Intellectual Property & Source Code Ownership</h4>',
      '<p>Source code ownership and exploitation rights depend strictly on the type of product or service contracted:</p>',
      '<ul>',
      '<li><strong>WhatsApp Bots & Automation (SaaS):</strong> The user <strong>is NOT the owner of the source code</strong>. A monthly software-as-a-service license is granted while the subscription is active. Infrastructure, backend, and source code remain exclusive property of AG Private Engineering.</li>',
      '<li><strong>Custom Web & SaaS Development:</strong> The client <strong>IS the full owner of the source code</strong> developed specifically for them upon 100% payment completion, receiving full Git repository transfer and production credentials.</li>',
      '<li><strong>Software Simulators:</strong> The buyer <strong>IS the owner of the delivered source code or build package</strong> according to the acquisition contract.</li>',
      '<li><strong>Assistance AI Systems (GUARDIAN):</strong> Commercialized under a technological assistance software license; core vision models and algorithmic architecture remain provider IP.</li>',
      '</ul>',
      '<p>Third-party open-source libraries (MIT, Apache) and external APIs retain their respective licenses.</p>',
      '<h4>Confidentiality</h4>',
      '<p>The provider commits to not disclosing client commercial or technical data. The client authorizes the use of generic interface captures (without sensitive data) as portfolio case studies.</p>',
      '<h4>Limitation of Liability</h4>',
      '<p>The provider shall not be liable for indirect damages, lost profits, or data loss caused by client infrastructure, third-party attacks, or misuse of delivered software.</p>',
      '<h4>Force Majeure</h4>',
      '<p>Unforeseeable events (interruption of third-party services such as WhatsApp, Google, Cloudflare) temporarily exempt liability.</p>',
      '<h4>Dispute Resolution</h4>',
      '<p>Governed by the laws of the Republic of Colombia, jurisdiction in Bogotá D.C., Colombia. Extrajudicial conciliation will be favored before any legal action.</p>'
    ] : [
      '<h4>Identificación del Proveedor</h4>',
      '<p>Andrés Felipe Guerra — AG Private Engineering, Bogotá D.C., Colombia.<br>Contacto: WhatsApp <a href="https://wa.me/573185602203" target="_blank" rel="noopener">+57 318 560 2203</a></p>',
      '<h4>Objeto del Contrato</h4>',
      '<p>Prestación del servicio de ingeniería de software según el alcance acordado por escrito (cotización aprobada vía WhatsApp o documento formal).</p>',
      '<h4>Propiedad Intelectual y Titularidad del Código</h4>',
      '<p>La titularidad del código fuente y los derechos patrimoniales dependen estrictamente del producto o servicio contratado:</p>',
      '<ul>',
      '<li><strong>Bots de WhatsApp y Automatización (SaaS):</strong> El usuario <strong>NO es dueño del código fuente</strong>. Se otorga una licencia de uso de software como servicio durante la vigencia de la suscripción mensual. La infraestructura, el backend y el código fuente propietario permanecen bajo titularidad exclusiva de AG Private Engineering.</li>',
      '<li><strong>Desarrollo Web & SaaS a Medida:</strong> El cliente <strong>SÍ es dueño del código fuente</strong> desarrollado a su medida una vez liquidado el 100% del pago acordado, recibiendo transferencia del repositorio Git con historial completo y accesos de producción.</li>',
      '<li><strong>Simuladores de Software:</strong> El adquirente <strong>SÍ es dueño del código fuente o build ejecutable</strong> conforme a los términos de adquisición para su libre uso y adaptación.</li>',
      '<li><strong>Sistemas de Asistencia con IA (GUARDIAN):</strong> Se licencian como herramienta tecnológica de asistencia preventiva; el núcleo algorítmico y modelos de visión pertenecen al desarrollador, otorgando licencia de uso operativo para hardware compatible.</li>',
      '</ul>',
      '<p>Las librerías open-source de terceros (MIT, Apache, etc.) y APIs de proveedores externos retienen sus licencias de origen.</p>',
      '<h4>Confidencialidad</h4>',
      '<p>El proveedor se compromete a no divulgar datos comerciales ni técnicos del cliente. El cliente autoriza el uso de capturas genéricas de la interfaz (sin datos sensibles) como caso de estudio en el portafolio.</p>',
      '<h4>Limitación de Responsabilidad</h4>',
      '<p>El proveedor no será responsable por daños indirectos, lucro cesante ni pérdida de datos causada por infraestructura del cliente, ataques de terceros o uso indebido del software entregado.</p>',
      '<h4>Fuerza Mayor</h4>',
      '<p>Eventos imprevisibles (interrupción de servicios de terceros como WhatsApp, Google, Cloudflare) eximen de responsabilidad temporal.</p>',
      '<h4>Resolución de Conflictos</h4>',
      '<p>Conforme a las leyes de la República de Colombia, con jurisdicción en Bogotá D.C., Colombia. Se favorecerá la conciliación extrajudicial antes de cualquier acción legal.</p>'
    ];

    var specificTerms = {
      whatsappbot: en ? [
        '<h4>WhatsApp Bot — Specific Terms</h4>',
        '<p>Conversational automation service deployed on provider infrastructure (Node.js + MongoDB). Monthly subscription model with recurring billing.</p>',
        '<p><strong>Source Code Ownership:</strong> As a monthly SaaS product with managed hosting and continuous maintenance on provider infrastructure, the client acquires usage rights to the conversational bot, but <strong>does NOT acquire ownership of the source code or backend infrastructure</strong>.</p>',
        '<p>Baileys-based connection (Starter & Professional plans) operates through reverse engineering of WhatsApp Web; the client accepts the inherent risk of account blocking by Meta policies. The Enterprise plan uses Meta\'s Official Cloud API and is free from blocking risk.</p>',
        '<p>Technical support is provided according to the contracted plan: 5/7 (Starter), 7/7 (Professional), 24/7 with guaranteed SLA (Enterprise).</p>',
        '<p>AI training with client documents (Enterprise) involves data processing on provider servers; documents are deleted after training upon request.</p>'
      ] : [
        '<h4>WhatsApp Bot — Términos Específicos</h4>',
        '<p>Servicio de automatización conversacional desplegado sobre infraestructura del proveedor (Node.js + MongoDB). Modelo de suscripción mensual con facturación recurrente.</p>',
        '<p><strong>Titularidad del Código:</strong> Al tratarse de un producto mensual de software como servicio (SaaS) con infraestructura gestionada, el cliente <strong>NO adquiere la propiedad del código fuente ni del backend</strong>, sino una licencia de uso temporal sobre el bot mientras la suscripción mensual permanezca activa.</p>',
        '<p>La conexión Baileys (planes Starter y Profesional) opera sobre ingeniería inversa de WhatsApp Web; el cliente acepta el riesgo inherente de bloqueo de cuenta por políticas de Meta. El plan Enterprise utiliza la API Oficial de Meta Cloud API y está libre de riesgo de bloqueo.</p>',
        '<p>Soporte técnico según plan contratado: 5/7 (Starter), 7/7 (Profesional), 24/7 con SLA garantizado (Enterprise).</p>',
        '<p>El entrenamiento de IA con documentos del cliente (Enterprise) implica procesamiento de datos en servidores del proveedor; los documentos se eliminan tras el entrenamiento bajo solicitud.</p>'
      ],
      deliverybot: en ? [
        '<h4>DeliveryBot — Specific Terms</h4>',
        '<p>Restaurant automation system with database persistence. Monthly subscription model with recurring billing for hosting and support.</p>',
        '<p><strong>Source Code Ownership:</strong> Managed monthly restaurant software service. The client holds an active usage license, but <strong>does NOT own the source code</strong>, which remains AG Private Engineering property.</p>',
        '<p>Payment integrations (Stripe/Wompi) are subject to the terms and conditions of the respective payment gateways.</p>',
        '<p>The provider is not responsible for inventory errors caused by incorrect data entered by restaurant staff.</p>'
      ] : [
        '<h4>DeliveryBot — Términos Específicos</h4>',
        '<p>Sistema de automatización gastronómica con persistencia en base de datos. Modelo de suscripción mensual con facturación recurrente por alojamiento y soporte.</p>',
        '<p><strong>Titularidad del Código:</strong> Servicio mensual de software gastronómico gestionado. El cliente <strong>NO es dueño del código fuente</strong>; adquiere derecho de uso operativo y soporte continuo mientras mantenga la suscripción activa.</p>',
        '<p>Las integraciones de pago (Stripe/Wompi) están sujetas a los términos y condiciones de las pasarelas correspondientes.</p>',
        '<p>El proveedor no es responsable por errores de inventario causados por datos incorrectos ingresados por el personal del restaurante.</p>'
      ],
      websaas: en ? [
        '<h4>Web Development & SaaS — Specific Terms</h4>',
        '<p>Project quoted by technical scope defined in specification document. Milestone-based deliveries with intermediate reviews.</p>',
        '<p><strong>Source Code Ownership:</strong> In custom web development, the client <strong>IS the full owner of the source code</strong> upon 100% payment completion, receiving complete Git repository history and credentials for independent deployment.</p>',
        '<p><strong>Hosting & Infrastructure:</strong> The provider offers managed hosting and cloud infrastructure for the client. The client can choose whether the provider hosts and manages the platform (including SSL, domain configuration, and continuous uptime), or if the client prefers to self-host on their own external servers.</p>'
      ] : [
        '<h4>Desarrollo Web & SaaS — Términos Específicos</h4>',
        '<p>Proyecto cotizado por alcance técnico definido en documento de especificación. Entregas por hitos (milestones) con revisiones intermedias.</p>',
        '<p><strong>Titularidad del Código:</strong> En desarrollo web a medida, el cliente <strong>SÍ es dueño del código fuente</strong> al completar el pago total del 100%, entregándose repositorio Git con historial íntegro para su libre administración y despliegue.</p>',
        '<p><strong>Hosting e Infraestructura:</strong> El proveedor ofrece el servicio de hosting e infraestructura gestionada para el cliente. El cliente tiene la libertad de elegir si el proveedor se encarga del hosting administrado (incluyendo SSL, dominio y alta disponibilidad), o si prefiere alojarlo por su cuenta en sus propios servidores.</p>'
      ],
      guardian: en ? [
        '<h4>GUARDIAN — Specific Terms</h4>',
        '<p>Vehicular fatigue monitoring system based on computer vision and AI models.</p>',
        '<p><strong>Critical Safety Disclaimer:</strong> GUARDIAN is strictly a preventive technological assistance and monitoring tool. Detection metrics (EAR/MAR) have documented precision rates but <strong>do NOT constitute a certified medical device</strong>. GUARDIAN <strong>under no circumstances guarantees saving lives or preventing vehicular accidents</strong>. The driver and operating fleet retain full, legal, and exclusive responsibility for driving and vehicular safety at all times.</p>',
        '<p><strong>Licensing & Code:</strong> Licensed as proprietary assistance software. The client acquires an operational usage and calibration license for their units, without transfer of underlying computer vision patents or baseline models.</p>',
        '<p>The web demo on this site is a reduced version for demonstration purposes; the full system operates on embedded hardware.</p>'
      ] : [
        '<h4>GUARDIAN — Términos Específicos</h4>',
        '<p>Sistema de monitoreo de fatiga vehicular basado en visión artificial y modelos de IA.</p>',
        '<p><strong>Aviso Crítico de Seguridad y Responsabilidad:</strong> GUARDIAN es estrictamente una herramienta de asistencia tecnológica preventiva y monitoreo. Las métricas de detección (EAR/MAR) tienen una tasa de precisión documentada pero <strong>no constituyen un dispositivo médico certificado</strong>. GUARDIAN <strong>bajo ninguna circunstancia garantiza salvar vidas ni prevenir accidentes de tránsito de forma infalible</strong>. El conductor y la empresa operadora conservan en todo momento la responsabilidad total, legal y exclusiva de la conducción y seguridad del automotor.</p>',
        '<p><strong>Licenciamiento y Código:</strong> Se comercializa bajo licencia de software de asistencia preventiva. El cliente adquiere licencia de uso y calibración en sus unidades operativas, sin cesión de patentes ni algoritmos centrales del modelo de visión artificial.</p>',
        '<p>La demo web en este sitio es una versión reducida con fines demostrativos; el sistema completo opera en hardware embebido.</p>'
      ],
      f1sim: en ? [
        '<h4>F1 Sim Pro 2026 — Specific Terms</h4>',
        '<p>Demonstration and educational project; <strong>this is not a commercial product</strong>.</p>',
        '<p><strong>Simulators & Source Code:</strong> In commercial or bespoke simulator projects, the buyer <strong>IS the owner of the source code or build package</strong> contracted. This particular web simulator is displayed as a technical and educational showcase without direct commercial sale.</p>',
        '<p>Team data, drivers, and circuits are simulated for technical demonstration purposes and do not represent official information from the FIA, FOM, or their licensees.</p>'
      ] : [
        '<h4>F1 Sim Pro 2026 — Términos Específicos</h4>',
        '<p>Proyecto demostrativo y educativo; <strong>no constituye un producto comercial</strong>.</p>',
        '<p><strong>Simuladores y Código Fuente:</strong> En desarrollos de simuladores comerciales o bajo pedido, el adquirente <strong>SÍ es dueño del código fuente o build</strong> pactado. La presente demo web opera con fines educativos y de muestra técnica sin venta comercial directa.</p>',
        '<p>Los datos de equipos, pilotos y circuitos son simulados con fines de demostración técnica y no representan información oficial de la FIA, FOM o sus licenciatarios.</p>'
      ],
      general: [],
      catalog: []
    };

    content.terms = {
      title: en ? 'Terms & Conditions' : 'Términos y Condiciones',
      body: commonTerms.concat(specificTerms[ctx] || []).join('')
    };

    // ─── TAB 3: WARRANTY ───
    var warrantySpecific = {
      whatsappbot: en
        ? '<p><strong>WhatsApp Bot:</strong> 90-day bug fix warranty on conversational logic and scheduling flows from the activation date of the service.</p>'
        : '<p><strong>WhatsApp Bot:</strong> Garantía de corrección de bugs de 90 días en la lógica conversacional y flujos de agendamiento desde la fecha de activación del servicio.</p>',
      deliverybot: en
        ? '<p><strong>DeliveryBot:</strong> 90-day bug fix warranty on order flows and inventory management from the activation date.</p>'
        : '<p><strong>DeliveryBot:</strong> Garantía de corrección de errores de 90 días en flujos de pedido y gestión de inventario desde la fecha de activación.</p>',
      websaas: en
        ? '<p><strong>Web & SaaS:</strong> 90-day functional bug fix warranty against the signed technical specifications, starting from production deployment.</p>'
        : '<p><strong>Web & SaaS:</strong> Garantía de corrección de bugs funcionales de 90 días sobre las especificaciones técnicas firmadas, contados desde el despliegue a producción.</p>',
      guardian: en
        ? '<p><strong>GUARDIAN:</strong> 90-day warranty for detection threshold adjustment and correction of false positives in alert logic.</p>'
        : '<p><strong>GUARDIAN:</strong> Garantía de 90 días para ajuste de umbrales de detección y corrección de falsos positivos en la lógica de alertas.</p>',
      f1sim: en
        ? '<p><strong>F1 Sim Pro:</strong> Demonstration project without commercial warranty. Provided "as-is" for educational and technical showcase purposes.</p>'
        : '<p><strong>F1 Sim Pro:</strong> Proyecto demostrativo sin garantía comercial. Se entrega "tal cual" con fines educativos y de muestra técnica.</p>',
      general: '',
      catalog: ''
    };

    content.warranty = {
      title: en ? 'Warranty Policy' : 'Política de Garantía',
      body: (en ? [
        '<h4>Legal Framework</h4>',
        '<p>Law 1480 of 2011 (Consumer Statute, Arts. 7-17) | Law 2439 of 2024 (e-commerce amendments).</p>',
        '<h4>Software Legal Warranty</h4>',
        '<p>All delivered software includes a warranty of <strong>ninety (90) calendar days</strong> from formal delivery (production deployment or repository handoff). The warranty exclusively covers functional defects (bugs) relative to documented specifications.</p>',
        '<h4>Warranty Scope</h4>',
        '<ul>',
        '<li>Correction of functional errors reported by the client.</li>',
        '<li>Re-deployment in case of failure attributable to the delivered code.</li>',
        '<li><strong>Not included:</strong> new features, scope changes, or errors caused by third-party modifications to the source code.</li>',
        '<li><strong>Infrastructure & Hosting:</strong> The provider offers managed cloud hosting across all products. If managed hosting is contracted with the provider, server availability, SSL certificates, and cloud infrastructure are fully maintained and guaranteed. If the client chooses to self-host or manage their own external servers/DNS, failures stemming from their own external infrastructure are excluded from the software code warranty.</li>',
        '</ul>',
        '<h4>Claims Procedure</h4>',
        '<p>Report via WhatsApp (<a href="https://wa.me/573185602203" target="_blank" rel="noopener">+57 318 560 2203</a>) with error description, screenshots, and steps to reproduce. The provider will respond within a maximum of <strong>48 business hours</strong>.</p>',
        '<h4>Right of Withdrawal</h4>',
        '<p>Per Art. 47 of Law 1480 (amended by Law 2439/2024), the client may exercise the right of withdrawal within <strong>five (5) business days</strong> following contract execution. Refund will be processed within <strong>fifteen (15) calendar days</strong> to the original payment method. <strong>Exception:</strong> If service execution has begun with express client consent (e.g., configured bot access, deployed website), withdrawal does not apply to work already performed.</p>',
        '<h4>Product-Specific Warranty</h4>'
      ] : [
        '<h4>Marco Legal</h4>',
        '<p>Ley 1480 de 2011 (Estatuto del Consumidor, Arts. 7-17) | Ley 2439 de 2024 (modificaciones comercio electrónico).</p>',
        '<h4>Garantía Legal de Software</h4>',
        '<p>Todo software entregado cuenta con una garantía de <strong>noventa (90) días calendario</strong> contados desde la entrega formal (deploy a producción o entrega de repositorio). La garantía cubre exclusivamente defectos de funcionamiento (bugs) respecto a las especificaciones documentadas.</p>',
        '<h4>Alcance de la Garantía</h4>',
        '<ul>',
        '<li>Corrección de errores funcionales reportados por el cliente.</li>',
        '<li>Re-despliegue en caso de fallo atribuible al código entregado.</li>',
        '<li><strong>No incluye:</strong> nuevas funcionalidades, cambios de alcance no pactados ni errores causados por modificaciones de terceros al código fuente.</li>',
        '<li><strong>Infraestructura y Hosting:</strong> El proveedor ofrece el servicio de hosting e infraestructura gestionada para los distintos productos. Si el cliente contrata el hosting con el proveedor, la disponibilidad del servidor, certificados SSL y soporte de infraestructura están garantizados bajo dicho servicio. Si el cliente decide auto-gestionar su propio hosting, servidores o DNS de forma independiente, los fallos derivados de dicha infraestructura externa quedan excluidos de la garantía del software.</li>',
        '</ul>',
        '<h4>Procedimiento de Reclamación</h4>',
        '<p>Reportar al WhatsApp (<a href="https://wa.me/573185602203" target="_blank" rel="noopener">+57 318 560 2203</a>) con descripción del error, capturas de pantalla y pasos para reproducir. El proveedor responderá en un máximo de <strong>48 horas hábiles</strong>.</p>',
        '<h4>Derecho de Retracto</h4>',
        '<p>Conforme al Art. 47 de la Ley 1480 (modificado por Ley 2439 de 2024), el cliente puede ejercer el derecho de retracto en los <strong>cinco (5) días hábiles</strong> siguientes a la celebración del contrato. La devolución se realizará en un máximo de <strong>quince (15) días calendario</strong> al medio de pago original. <strong>Excepción:</strong> Si la ejecución del servicio ha comenzado con consentimiento expreso del cliente (ej. acceso al bot ya configurado, deploy del sitio web), el retracto no procederá sobre el trabajo ya ejecutado.</p>',
        '<h4>Garantía Específica del Producto</h4>'
      ]).join('') + (warrantySpecific[ctx] || '')
    };

    // ─── TAB 4: SALES & LICENSING ───
    var salesSpecific = {
      whatsappbot: en ? [
        '<h4>WhatsApp Bot — Sales Model & Terms</h4>',
        '<p><strong>Model:</strong> Monthly subscription with recurring billing (SaaS). The conversational bot operates on managed provider infrastructure while the subscription remains active.</p>',
        '<p><strong>Source Code Ownership:</strong> The user <strong>is NOT the owner of the source code</strong>. Access is granted under a monthly software-as-a-service usage license. Infrastructure and backend code remain exclusive property of AG Private Engineering.</p>',
        '<p><strong>Plans:</strong> Starter, Professional, and Enterprise — each with defined scope, server capacity, and support level.</p>',
        '<p><strong>Cancellation & Data Portability:</strong> Communicate with 15 days advance notice; no lock-in or permanence fees. Because the client does not own the bot source code, service termination suspends infrastructure access; the client may request an export of customer contact records within 30 days before permanent deletion.</p>'
      ] : [
        '<h4>WhatsApp Bot — Modelo de Venta y Términos</h4>',
        '<p><strong>Modelo:</strong> Suscripción mensual con facturación recurrente (SaaS). El bot conversacional opera sobre infraestructura gestionada por el proveedor mientras la suscripción esté activa.</p>',
        '<p><strong>Titularidad del Código:</strong> El usuario <strong>NO es dueño del código fuente</strong>. El servicio se presta bajo licencia de uso de software como servicio (SaaS). El código fuente, la lógica backend y la infraestructura son propiedad exclusiva de AG Private Engineering.</p>',
        '<p><strong>Planes:</strong> Starter, Profesional y Enterprise — cada uno con alcance, capacidad y nivel de soporte definidos.</p>',
        '<p><strong>Cancelación y Portabilidad:</strong> Comunicar con 15 días de anticipación; sin cláusulas de permanencia mínima. Dado que el cliente no es propietario del código fuente del bot, la cancelación da de baja el servicio en la infraestructura; el cliente puede solicitar la exportación de sus datos de contactos dentro de los 30 días posteriores antes de su borrado definitivo.</p>'
      ],
      deliverybot: en ? [
        '<h4>DeliveryBot — Sales Model</h4>',
        '<p><strong>Model:</strong> Monthly subscription with recurring billing for hosting, maintenance, and restaurant order automation.</p>',
        '<p><strong>Source Code Ownership:</strong> The client <strong>does NOT own the source code</strong> (monthly managed SaaS). Active subscription grants operational software use.</p>',
        '<p><strong>Cancellation:</strong> Communicate with 15 days advance notice; no permanence fees. Menu and order history export is provided upon service conclusion.</p>',
        '<p><strong>Integrations:</strong> Payment gateway connections (Stripe/Wompi) may require additional setup fees depending on restaurant requirements.</p>'
      ] : [
        '<h4>DeliveryBot — Modelo de Venta</h4>',
        '<p><strong>Modelo:</strong> Suscripción mensual con facturación recurrente por alojamiento, mantenimiento y automatización de pedidos para restaurantes.</p>',
        '<p><strong>Titularidad del Código:</strong> El cliente <strong>NO es dueño del código fuente</strong> (modelo SaaS mensual gestionado). La suscripción activa otorga derecho de uso operativo sobre la plataforma.</p>',
        '<p><strong>Cancelación:</strong> Comunicar con 15 días de anticipación; sin permanencia mínima. Se facilita la exportación de menús e historial de pedidos ante la baja del servicio.</p>',
        '<p><strong>Integraciones:</strong> Las conexiones con pasarelas de pago (Stripe/Wompi) pueden requerir tarifas de configuración adicionales según los requerimientos del restaurante.</p>'
      ],
      websaas: en ? [
        '<h4>Web & SaaS — Sales Model</h4>',
        '<p><strong>Model:</strong> Turnkey project quoted by scope. <strong>Perpetual license and full ownership</strong> — after 100% payment, the client <strong>IS the full owner</strong> of all usage, modification, and distribution rights to the delivered custom source code.</p>',
        '<p><strong>Deliverables:</strong> Full Git repository with commit history, documentation, production credentials, and electronically signed delivery certificate.</p>',
        '<p><strong>Payment Structure:</strong> 50% initial milestone to commence architecture and development; remaining 50% upon delivery, testing, and approval.</p>',
        '<p><strong>Cancellation:</strong> If the client cancels prior to final deployment, the percentage of work executed to date will be invoiced.</p>'
      ] : [
        '<h4>Desarrollo Web & SaaS — Modelo de Venta</h4>',
        '<p><strong>Modelo:</strong> Proyecto llave en mano cotizado por alcance técnico. <strong>Titularidad completa y perpetua</strong> — tras liquidar el 100% del pago, el cliente <strong>SÍ es dueño absoluto</strong> de todos los derechos de uso, modificación y explotación del código fuente desarrollado a su medida.</p>',
        '<p><strong>Entregables:</strong> Repositorio Git completo con historial de commits, documentación técnica, accesos de producción y acta de entrega formal.</p>',
        '<p><strong>Estructura de Pago:</strong> Anticipo del 50% para inicio de arquitectura y desarrollo; 50% final contra entrega, validación y despliegue.</p>',
        '<p><strong>Cancelación:</strong> Si el cliente cancela antes de la entrega final, se facturará y liquidará el porcentaje de avance técnico ejecutado hasta la fecha.</p>'
      ],
      guardian: en ? [
        '<h4>GUARDIAN — Sales Model & Licensing</h4>',
        '<p><strong>Model:</strong> Proprietary vehicular safety system with customized quote based on fleet volume. Operational software license upon delivery.</p>',
        '<p><strong>Scope:</strong> Includes edge AI software, vehicle telemetry integration, and personalized threshold calibration for the client\'s operational fleet.</p>',
        '<p><strong>Safety Disclaimer:</strong> GUARDIAN is strictly an assistance and monitoring tool. <strong>It under no circumstances guarantees saving lives or preventing vehicular accidents</strong>. The buyer and driver assume full legal responsibility for driving decisions and vehicular operation.</p>'
      ] : [
        '<h4>GUARDIAN — Modelo de Venta y Licenciamiento</h4>',
        '<p><strong>Modelo:</strong> Sistema propietario de seguridad vehicular con cotización personalizada según tamaño de flota. Licencia de uso operativo de software tras entrega.</p>',
        '<p><strong>Alcance:</strong> Incluye software de IA edge, integración de telemetría vehicular y calibración personalizada de umbrales biométricos para la flota del cliente.</p>',
        '<p><strong>Aviso de Seguridad:</strong> GUARDIAN es estrictamente una herramienta de asistencia tecnológica y monitoreo preventivo. <strong>Bajo ninguna circunstancia garantiza salvar vidas ni prevenir accidentes viales de forma infalible</strong>. El adquirente y el conductor asumen en todo momento la responsabilidad total sobre las decisiones de conducción y seguridad vehicular.</p>'
      ],
      f1sim: en ? [
        '<h4>F1 Sim Pro — Disclaimer & Licensing</h4>',
        '<p>This is a <strong>demonstration and educational project</strong>. It is not available for commercial sale. All content is for technical showcase purposes only.</p>',
        '<p><strong>Simulators in General:</strong> In bespoke software simulator developments contracted with clients, full source code or compiled build ownership is transferred to the client upon full payment.</p>'
      ] : [
        '<h4>F1 Sim Pro — Aviso y Licenciamiento</h4>',
        '<p>Este es un <strong>proyecto demostrativo y educativo</strong>. No se encuentra disponible para venta comercial directa. Todo el contenido es exclusivamente para fines de muestra técnica.</p>',
        '<p><strong>Simuladores en General:</strong> En desarrollos de simuladores de software contratados bajo encargo, la propiedad íntegra del código fuente o build ejecutable se transfiere al cliente tras el pago total convenido.</p>'
      ],
      general: [],
      catalog: []
    };

    content.sales = {
      title: en ? 'Sales & Licensing Policy' : 'Política de Venta y Licenciamiento',
      body: (en ? [
        '<h4>Legal Framework</h4>',
        '<p>Law 1480 of 2011 (Consumer Statute) | Law 603 of 2000 (Software Licensing) | SIC Guidelines.</p>',
        '<h4>Purchase Process</h4>',
        '<ol>',
        '<li>Quote request and technical consultation directly via WhatsApp (<a href="https://wa.me/573185602203" target="_blank" rel="noopener">+57 318 560 2203</a>).</li>',
        '<li>Provider issues formal proposal document with scope, deliverables, timeline, and pricing.</li>',
        '<li>Express acceptance (via WhatsApp confirmation, email, or digital signature) executes the contract.</li>',
        '</ol>',
        '<h4>Official Contact Channel</h4>',
        '<p>All quotes, project inquiries, and client communication are conducted through WhatsApp at <a href="https://wa.me/573185602203" target="_blank" rel="noopener">+57 318 560 2203</a>.</p>',
        '<h4>Payment Methods</h4>',
        '<p>Bancolombia bank transfer, Nequi, Daviplata, PayPal, or Stripe (international credit cards).</p>',
        '<h4>Prices & Taxes</h4>',
        '<p>All listed prices and quotes <strong>include IVA (VAT)</strong> as applicable under Colombian tax legislation.</p>',
        '<h4>Source Code Ownership & Rights</h4>',
        '<p>Source code ownership depends on product category: for <strong>custom web developments and software simulators</strong>, the client acquires 100% full ownership of the source code upon complete payment; for <strong>WhatsApp bots and monthly automation services</strong>, the service operates under a monthly SaaS model and source code/infrastructure remains exclusive property of the developer. The provider retains across all projects the right to showcase the work in their professional portfolio (without exposing sensitive or confidential client data).</p>'
      ] : [
        '<h4>Marco Legal</h4>',
        '<p>Ley 1480 de 2011 (Estatuto del Consumidor) | Ley 603 de 2000 (Licenciamiento de Software) | Directrices SIC.</p>',
        '<h4>Proceso de Compra</h4>',
        '<ol>',
        '<li>Solicitud de cotización y asesoría técnica directa vía WhatsApp (<a href="https://wa.me/573185602203" target="_blank" rel="noopener">+57 318 560 2203</a>).</li>',
        '<li>El proveedor emite propuesta formal con alcance, entregables, cronograma y precio.</li>',
        '<li>La aceptación expresa (por mensaje de WhatsApp, correo o firma digital) perfecciona el contrato.</li>',
        '</ol>',
        '<h4>Canal Oficial de Contacto</h4>',
        '<p>Toda cotización, consulta comercial y soporte técnico se gestiona de forma directa a través de WhatsApp en el <a href="https://wa.me/573185602203" target="_blank" rel="noopener">+57 318 560 2203</a>.</p>',
        '<h4>Medios de Pago</h4>',
        '<p>Transferencia bancaria (Bancolombia), Nequi, Daviplata, PayPal o Stripe (tarjetas internacionales).</p>',
        '<h4>Precios e Impuestos</h4>',
        '<p>Todos los precios publicados y cotizaciones <strong>incluyen IVA</strong> (Impuesto al Valor Agregado) según la legislación tributaria colombiana vigente.</p>',
        '<h4>Titularidad del Código y Derechos del Proveedor</h4>',
        '<p>La titularidad del código depende del producto: en <strong>desarrollos web a medida y simuladores</strong>, el cliente adquiere la propiedad íntegra del 100% del código fuente tras el pago total; en <strong>bots de WhatsApp y automatizaciones mensuales</strong>, se trata de un servicio SaaS por suscripción mensual donde el usuario <strong>no es dueño del código fuente</strong>, manteniendo el proveedor su titularidad exclusiva. El desarrollador retiene en todos los casos el derecho de exhibición técnica en su portafolio profesional (sin exponer datos sensibles ni confidenciales del cliente).</p>'
      ]).join('') + (salesSpecific[ctx] || (salesSpecific[ctx] || []).join ? (salesSpecific[ctx] || []).join('') : '')
    };

    return content[tab] || content.privacy;
  }

  /* ──────────────── STYLES ──────────────── */
  function injectStyles() {
    if (document.getElementById('legal-center-styles')) return;
    var s = document.createElement('style');
    s.id = 'legal-center-styles';
    s.textContent = '\
.legal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:100000;opacity:0;transition:opacity .3s ease;display:flex;align-items:center;justify-content:center;padding:24px}\
.legal-backdrop.open{opacity:1}\
.legal-modal{background:rgba(14,17,24,0.96);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);border-radius:20px;width:100%;max-width:680px;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 32px 80px rgba(0,0,0,0.8),0 0 0 1px rgba(255,255,255,0.05);font-family:"Inter",system-ui,-apple-system,sans-serif;color:#e2e8f0;transform:translateY(16px) scale(0.98);transition:transform .35s cubic-bezier(.16,1,.3,1),opacity .3s ease;opacity:0}\
.legal-backdrop.open .legal-modal{transform:translateY(0) scale(1);opacity:1}\
.legal-modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px 0;flex-shrink:0}\
.legal-modal-brand{font-size:.82rem;font-weight:700;color:#94a3b8;letter-spacing:.06em;text-transform:uppercase}\
.legal-modal-close{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;transition:all .2s ease;flex-shrink:0}\
.legal-modal-close:hover{background:rgba(255,255,255,0.12);color:#fff}\
.legal-tabs{display:flex;gap:2px;padding:16px 24px 0;flex-shrink:0;overflow-x:auto;-webkit-overflow-scrolling:touch}\
.legal-tab{background:transparent;border:none;color:#64748b;font-family:inherit;font-size:.78rem;font-weight:600;padding:8px 14px;border-radius:10px;cursor:pointer;transition:all .2s ease;white-space:nowrap}\
.legal-tab:hover{color:#cbd5e1;background:rgba(255,255,255,0.04)}\
.legal-tab.active{color:#fff;background:rgba(59,130,246,0.2);box-shadow:inset 0 0 0 1px rgba(59,130,246,0.3)}\
.legal-body{flex:1;overflow-y:auto;padding:20px 24px 24px;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.12) transparent}\
.legal-body::-webkit-scrollbar{width:6px}\
.legal-body::-webkit-scrollbar-track{background:transparent}\
.legal-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px}\
.legal-body h4{font-size:.88rem;font-weight:700;color:#f1f5f9;margin:20px 0 8px;letter-spacing:-0.01em}\
.legal-body h4:first-child{margin-top:0}\
.legal-body p{font-size:.82rem;line-height:1.65;color:#94a3b8;margin:0 0 12px}\
.legal-body ul,.legal-body ol{font-size:.82rem;line-height:1.65;color:#94a3b8;margin:0 0 12px;padding-left:20px}\
.legal-body li{margin-bottom:4px}\
.legal-body a{color:#60a5fa;text-decoration:none}\
.legal-body a:hover{text-decoration:underline}\
.legal-body code{background:rgba(59,130,246,0.12);color:#93c5fd;padding:1px 5px;border-radius:4px;font-size:.78rem;font-family:"JetBrains Mono",monospace}\
.legal-body strong{color:#e2e8f0}\
.legal-table{width:100%;border-collapse:collapse;font-size:.78rem;margin:8px 0 16px}\
.legal-table th{text-align:left;color:#94a3b8;font-weight:600;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em}\
.legal-table td{padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.04);color:#cbd5e1}\
.legal-consent-box{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;margin-top:20px}\
.legal-consent-status{font-size:.82rem;font-weight:600;color:#e2e8f0;margin-bottom:12px}\
.legal-consent-actions{display:flex;gap:10px}\
.legal-btn{padding:9px 18px;font-size:.8rem;font-weight:600;border-radius:10px;cursor:pointer;transition:all .2s ease;border:none;font-family:inherit}\
.legal-btn-accept{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;box-shadow:0 4px 14px rgba(37,99,235,0.3)}\
.legal-btn-accept:hover{filter:brightness(1.1);transform:translateY(-1px)}\
.legal-btn-decline{background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.1)}\
.legal-btn-decline:hover{background:rgba(255,255,255,0.1);color:#fff}\
.legal-footer{padding:16px 24px;border-top:1px solid rgba(255,255,255,0.06);flex-shrink:0}\
.legal-footer p{font-size:.72rem;color:#475569;margin:0;text-align:center;line-height:1.5}\
.footer-legal{display:flex;align-items:center;justify-content:center;gap:4px;flex-wrap:wrap;margin-top:8px}\
.footer-privacy-link{background:none;border:none;color:inherit;opacity:0.5;font-size:inherit;font-family:inherit;cursor:pointer;padding:2px 4px;transition:opacity .2s ease;text-decoration:none}\
.footer-privacy-link:hover{opacity:0.85;text-decoration:underline}\
.footer-legal-sep{opacity:0.3}\
@media(max-width:640px){\
.legal-modal{max-height:92vh;border-radius:16px}\
.legal-tabs{gap:0;padding:12px 16px 0}\
.legal-tab{font-size:.72rem;padding:7px 10px}\
.legal-body{padding:16px}\
.legal-consent-actions{flex-direction:column}\
.legal-btn{width:100%;text-align:center}\
.footer-legal{flex-direction:column;gap:2px}\
.footer-legal-sep{display:none}\
}';
    document.head.appendChild(s);
  }

  /* ──────────────── MODAL DOM ──────────────── */
  var modalEl = null;
  var backdropEl = null;

  function buildModal() {
    if (backdropEl) return;
    var lang = isEN() ? 'en' : 'es';

    backdropEl = document.createElement('div');
    backdropEl.className = 'legal-backdrop';
    backdropEl.id = 'legalBackdrop';
    backdropEl.setAttribute('role', 'dialog');
    backdropEl.setAttribute('aria-modal', 'true');
    backdropEl.setAttribute('aria-label', lang === 'en' ? 'Legal Center' : 'Centro Legal');

    var tabLabels = lang === 'en'
      ? ['Privacy', 'Terms', 'Warranty', 'Sales']
      : ['Privacidad', 'Términos', 'Garantía', 'Ventas'];
    var tabKeys = ['privacy', 'terms', 'warranty', 'sales'];

    var tabsHtml = tabKeys.map(function (key, i) {
      return '<button type="button" class="legal-tab' + (i === 0 ? ' active' : '') + '" data-legal-tab="' + key + '">' + tabLabels[i] + '</button>';
    }).join('');

    var brandLabel = lang === 'en' ? 'Legal Center' : 'Centro Legal';
    var footerNote = lang === 'en'
      ? 'AG Private Engineering — Andrés Felipe Guerra · Colombia · Last updated: September 2026'
      : 'AG Private Engineering — Andrés Felipe Guerra · Colombia · Última actualización: Septiembre 2026';

    backdropEl.innerHTML = '\
<div class="legal-modal">\
<div class="legal-modal-header">\
<span class="legal-modal-brand">' + brandLabel + '</span>\
<button type="button" class="legal-modal-close" id="legalClose" aria-label="Cerrar">&times;</button>\
</div>\
<div class="legal-tabs" id="legalTabs">' + tabsHtml + '</div>\
<div class="legal-body" id="legalBody"></div>\
<div class="legal-footer"><p>' + footerNote + '</p></div>\
</div>';

    document.body.appendChild(backdropEl);
    modalEl = backdropEl.querySelector('.legal-modal');

    // Events
    backdropEl.querySelector('#legalClose').addEventListener('click', closeLegalModal);
    backdropEl.addEventListener('click', function (e) {
      if (e.target === backdropEl) closeLegalModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdropEl && backdropEl.classList.contains('open')) {
        closeLegalModal();
      }
    });

    // Tab clicks
    backdropEl.querySelector('#legalTabs').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-legal-tab]');
      if (!btn) return;
      setActiveTab(btn.getAttribute('data-legal-tab'));
    });
  }

  function setActiveTab(tabKey) {
    if (!backdropEl) return;
    var lang = isEN() ? 'en' : 'es';
    var data = getLegalContent(tabKey, lang);
    var body = backdropEl.querySelector('#legalBody');

    // Update tab active state
    var tabs = backdropEl.querySelectorAll('[data-legal-tab]');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('active', tabs[i].getAttribute('data-legal-tab') === tabKey);
    }

    // Render content
    var html = '<h3 style="font-size:1.05rem;font-weight:800;color:#f8fafc;margin:0 0 16px;letter-spacing:-0.02em">' + data.title + '</h3>' + data.body;

    // Add consent controls on privacy tab
    if (tabKey === 'privacy' && data.consent) {
      html += '<div class="legal-consent-box">';
      html += '<div class="legal-consent-status">' + data.consent.status + '</div>';
      html += '<div class="legal-consent-actions">';
      html += '<button type="button" class="legal-btn legal-btn-accept" id="legalBtnAccept">' + data.consent.btnAccept + '</button>';
      html += '<button type="button" class="legal-btn legal-btn-decline" id="legalBtnDecline">' + data.consent.btnDecline + '</button>';
      html += '</div></div>';
    }

    body.innerHTML = html;
    body.scrollTop = 0;

    // Bind consent buttons
    if (tabKey === 'privacy') {
      var btnA = body.querySelector('#legalBtnAccept');
      var btnD = body.querySelector('#legalBtnDecline');
      if (btnA) btnA.addEventListener('click', function () { setCookieConsent('granted'); });
      if (btnD) btnD.addEventListener('click', function () { setCookieConsent('denied'); });
    }
  }

  function setCookieConsent(type) {
    if (typeof gtag === 'function') {
      var val = type === 'granted' ? 'granted' : 'denied';
      gtag('consent', 'update', {
        'ad_storage': val,
        'ad_user_data': val,
        'ad_personalization': val,
        'analytics_storage': val
      });
    }
    localStorage.setItem('cookie_consent', type);

    // Update UI status
    var lang = isEN() ? 'en' : 'es';
    var statusEl = backdropEl ? backdropEl.querySelector('.legal-consent-status') : null;
    if (statusEl) {
      statusEl.textContent = type === 'granted'
        ? (lang === 'en' ? '🟢 Google Analytics Enabled' : '🟢 Analíticas de Google Habilitadas')
        : (lang === 'en' ? '⚪ Essential Cookies Only' : '⚪ Solo Cookies Esenciales');
    }

    // Dismiss initial banner if exists
    var banner = document.getElementById('cookieConsentBanner');
    if (banner) {
      banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(function () { banner.remove(); }, 300);
    }
  }

  /* ──────────────── OPEN / CLOSE ──────────────── */
  function openLegalModal(tab) {
    injectStyles();
    buildModal();
    setActiveTab(tab || 'privacy');
    // Force reflow then open
    void backdropEl.offsetWidth;
    backdropEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLegalModal() {
    if (!backdropEl) return;
    backdropEl.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (backdropEl && !backdropEl.classList.contains('open')) {
        backdropEl.remove();
        backdropEl = null;
        modalEl = null;
      }
    }, 350);
  }

  // Global API
  window.openLegalModal = openLegalModal;
  window.closeLegalModal = closeLegalModal;

  /* ──────────────── AUTO-BIND LINKS ──────────────── */
  function bindLegalTriggers() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-open-privacy]');
      if (el) { e.preventDefault(); openLegalModal('privacy'); return; }
      el = e.target.closest('[data-open-terms]');
      if (el) { e.preventDefault(); openLegalModal('terms'); return; }
      el = e.target.closest('[data-open-warranty]');
      if (el) { e.preventDefault(); openLegalModal('warranty'); return; }
      el = e.target.closest('[data-open-sales]');
      if (el) { e.preventDefault(); openLegalModal('sales'); return; }
      el = e.target.closest('.footer-privacy-link');
      if (el) { e.preventDefault(); openLegalModal('privacy'); return; }
    });
  }

  /* ──────────────── INITIAL COOKIE BANNER ──────────────── */
  function showInitialBanner() {
    var consent = localStorage.getItem('cookie_consent');
    if (consent) return;

    var en = isEN();
    var banner = document.createElement('div');
    banner.id = 'cookieConsentBanner';
    banner.className = 'cookie-consent-banner';

    if (!document.getElementById('cookie-consent-styles')) {
      var st = document.createElement('style');
      st.id = 'cookie-consent-styles';
      st.textContent = '\
.cookie-consent-banner{position:fixed;bottom:24px;right:24px;max-width:420px;width:calc(100% - 48px);background:rgba(10,15,29,0.94);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(59,130,246,0.25);box-shadow:0 16px 40px rgba(0,0,0,0.7),0 0 20px rgba(59,130,246,0.15);border-radius:14px;padding:20px;z-index:99999;font-family:"Inter",system-ui,-apple-system,sans-serif;color:#f8fafc;animation:slideUpConsent .4s cubic-bezier(.16,1,.3,1) forwards}\
@keyframes slideUpConsent{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}\
.cookie-consent-header{display:flex;align-items:center;gap:10px;margin-bottom:8px}\
.cookie-consent-icon{font-size:1.2rem;color:#38bdf8}\
.cookie-consent-title{font-size:.95rem;font-weight:700;letter-spacing:-.01em;color:#fff}\
.cookie-consent-desc{font-size:.82rem;line-height:1.5;color:#94a3b8;margin-bottom:12px}\
.cookie-consent-link{font-size:.78rem;color:#60a5fa;cursor:pointer;background:none;border:none;padding:0;font-family:inherit;margin-bottom:16px;display:inline-block}\
.cookie-consent-link:hover{text-decoration:underline}\
.cookie-consent-actions{display:flex;gap:10px;justify-content:flex-end}\
.cookie-btn{padding:8px 16px;font-size:.8rem;font-weight:600;border-radius:8px;cursor:pointer;transition:all .2s ease;border:none;font-family:inherit}\
.cookie-btn-decline{background:rgba(255,255,255,0.06);color:#cbd5e1;border:1px solid rgba(255,255,255,0.12)}\
.cookie-btn-decline:hover{background:rgba(255,255,255,0.12);color:#fff}\
.cookie-btn-accept{background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;box-shadow:0 4px 12px rgba(37,99,235,0.35)}\
.cookie-btn-accept:hover{filter:brightness(1.1);transform:translateY(-1px)}\
@media(max-width:480px){.cookie-consent-banner{bottom:16px;right:16px;left:16px;width:auto}.cookie-consent-actions{flex-direction:column}.cookie-btn{width:100%;text-align:center}}';
      document.head.appendChild(st);
    }

    banner.innerHTML = '\
<div class="cookie-consent-header">\
<span class="cookie-consent-icon">🛡️</span>\
<span class="cookie-consent-title">' + (en ? 'Privacy & Consent' : 'Privacidad y Consentimiento') + '</span>\
</div>\
<p class="cookie-consent-desc">' + (en
      ? 'We use analytical cookies (Google Analytics) to measure traffic and optimize performance in compliance with Google Consent Mode v2.'
      : 'Utilizamos cookies analíticas (Google Analytics) para medir el tráfico y optimizar el rendimiento en conformidad con Google Consent Mode v2.') + '</p>\
<button type="button" class="cookie-consent-link" data-open-privacy>' + (en ? 'Read full Privacy & Legal Policies →' : 'Leer Políticas de Privacidad y Legales completas →') + '</button>\
<div class="cookie-consent-actions">\
<button type="button" class="cookie-btn cookie-btn-decline" id="btnDeclineCookies">' + (en ? 'Essential Only' : 'Solo Esenciales') + '</button>\
<button type="button" class="cookie-btn cookie-btn-accept" id="btnAcceptCookies">' + (en ? 'Accept All' : 'Aceptar Todas') + '</button>\
</div>';

    document.body.appendChild(banner);

    banner.querySelector('#btnAcceptCookies').addEventListener('click', function () {
      setCookieConsent('granted');
    });
    banner.querySelector('#btnDeclineCookies').addEventListener('click', function () {
      setCookieConsent('denied');
    });
  }

  /* ──────────────── INIT ──────────────── */
  function init() {
    injectStyles();
    bindLegalTriggers();
    showInitialBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
