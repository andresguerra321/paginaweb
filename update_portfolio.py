import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Projects
projects_replacement = '''<div class="projects-grid">
                <!-- Project 1: GUARDIAN -->
                <div class="project-card reveal interactive">
                    <div class="project-image-placeholder" style="padding: 0;">
                        <img src="img/1.jpg" alt="GUARDIAN" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    </div>
                    <div class="project-content">
                        <span class="project-number">001</span>
                        <div class="project-info">
                            <h3>GUARDIAN</h3>
                            <p>Sistema de seguridad predictiva para transporte terrestre con Computer Vision e IA colaborativa. Arquitectura de 3 agentes: Centinela, Oráculo y Copiloto. Hackathon Voxel51 2026.</p>
                            <div style="margin-top: 1rem;"><a href="https://github.com/andresguerra321/GUARDIAN" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size: 0.7rem; padding: 0.3rem 0.8rem;">Ver Repo ?</a></div>
                            <div class="project-tags">
                                <span class="project-tag">Python</span>
                                <span class="project-tag">FiftyOne</span>
                                <span class="project-tag">Gemini AI</span>
                                <span class="project-tag">CV</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project 2: DeliveryBot -->
                <div class="project-card reveal reveal-delay-1 interactive">
                    <div class="project-image-placeholder" style="padding: 0;">
                        <img src="img/2.jpg" alt="DeliveryBot" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    </div>
                    <div class="project-content">
                        <span class="project-number">002</span>
                        <div class="project-info">
                            <h3>DeliveryBot</h3>
                            <p>Terminal de pedidos automatizada con n8n + Telegram para gestión de entregas en tiempo real.</p>
                            <div style="margin-top: 1rem;"><a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size: 0.7rem; padding: 0.3rem 0.8rem;">Ver Proyecto ?</a></div>
                            <div class="project-tags">
                                <span class="project-tag">Node.js</span>
                                <span class="project-tag">n8n</span>
                                <span class="project-tag">Telegram</span>
                                <span class="project-tag">Google Sheets</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project 3: WhatsApp Bot IA -->
                <div class="project-card reveal reveal-delay-2 interactive">
                    <div class="project-image-placeholder" style="padding: 0;">
                        <img src="img/3.jpg" alt="WhatsApp Bot IA" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    </div>
                    <div class="project-content">
                        <span class="project-number">003</span>
                        <div class="project-info">
                            <h3>WhatsApp Bot IA</h3>
                            <p>Asistente conversacional con memoria y personalidad de agente de ventas, desplegado en Hugging Face.</p>
                            <div style="margin-top: 1rem;"><a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size: 0.7rem; padding: 0.3rem 0.8rem;">Ver Proyecto ?</a></div>
                            <div class="project-tags">
                                <span class="project-tag">Baileys</span>
                                <span class="project-tag">Groq AI</span>
                                <span class="project-tag">LLaMA</span>
                                <span class="project-tag">Docker</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project 4: Banco ACME -->
                <div class="project-card reveal interactive">
                    <div class="project-image-placeholder" style="padding: 0;">
                        <img src="img/4.jpg" alt="Banco ACME" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    </div>
                    <div class="project-content">
                        <span class="project-number">004</span>
                        <div class="project-info">
                            <h3>Banco ACME</h3>
                            <p>Plataforma financiera simulada con arquitectura de BD resiliente y sistema de transacciones seguras.</p>
                            <div style="margin-top: 1rem;"><a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size: 0.7rem; padding: 0.3rem 0.8rem;">Ver Repo ?</a></div>
                            <div class="project-tags">
                                <span class="project-tag">Node.js</span>
                                <span class="project-tag">MySQL</span>
                                <span class="project-tag">JavaScript</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>'''

html = re.sub(r'<div class="projects-grid">.*?</div>\s*</div>\s*</section>', projects_replacement + '\n        </div>\n    </section>', html, flags=re.DOTALL)

# 2. Update Timeline
timeline_replacement = '''<div class="timeline-container">
                <div class="timeline-item reveal">
                    <div class="timeline-date">2025</div>
                    <h3>Bachiller Académico</h3>
                    <p>Fundación Colegio UIS. Institución respaldada por la Universidad Industrial de Santander.</p>
                </div>

                <div class="timeline-item reveal reveal-delay-1">
                    <div class="timeline-date">2024 - PRESENTE</div>
                    <h3>Desarrollador Fullstack & Automatización (Freelance)</h3>
                    <p>Desarrollo de bots de WhatsApp con IA (Baileys + Groq + LLaMA), automatización empresarial con n8n, y construcción de APIs REST y Landing pages.</p>
                </div>

                <div class="timeline-item future reveal reveal-delay-2">
                    <div class="timeline-date">Dic. 2025 - PRESENTE</div>
                    <h3>Técnico Laboral en Desarrollo de Software</h3>
                    <p>Campuslands. Formación técnica intensiva con metodologías Scrum/Agile. Proyectos reales en sprints y entrega continua.</p>
                    <span class="timeline-badge">IN_PROGRESS</span>
                </div>
            </div>'''

html = re.sub(r'<div class="timeline-container">.*?</div>\s*</div>\s*</section>', timeline_replacement + '\n        </div>\n    </section>', html, flags=re.DOTALL)


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
