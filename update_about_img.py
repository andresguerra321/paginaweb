import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

about_label_replacement = '''<div class="about-label reveal">
                    <span>02 // OVERVIEW</span>
                    SOBRE<br>MÍ
                    <div class="about-image-container reveal reveal-delay-1" style="margin-top: 3rem; max-width: 280px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border); box-shadow: 0 10px 30px -10px rgba(0,0,0,0.8);">
                        <img src="img/sobremi.jpg" alt="Andrés Felipe Guerra" style="width: 100%; height: auto; display: block; filter: contrast(1.05);">
                    </div>
                </div>'''

html = re.sub(r'<div class="about-label reveal">\s*<span>02 // OVERVIEW</span>\s*SOBRE<br>MÍ\s*</div>', about_label_replacement, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
