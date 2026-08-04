import sys

file_path = 'c:/Users/andre/OneDrive/Escritorio/portafolio/proyecto-bot-whatsapp/index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# First fix my mistake with the titles
content = content.replace('<h3>Agendamiento Inteligente</h3>\n            <p>Garantía de privacidad', '<h3>Aislamiento por Cliente</h3>\n            <p>Garantía de privacidad')
content = content.replace('<h3>Filtros Anti-Spam</h3>\n            <p>Protección contra', '<h3>Filtro Anti-Spam & Emojis</h3>\n            <p>Protección contra')

# Fix lock icon which got replaced by indigo chat icon due to matching error
content = content.replace('<div class="feature-icon indigo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>\n            <h3>Aislamiento por Cliente</h3>', '<div class="feature-icon purple"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>\n            <h3>Aislamiento por Cliente</h3>')

# Now remaining emojis
tag_icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>'
clock_icon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>'
check_icon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><polyline points="20 6 9 17 4 12"></polyline></svg>'
cross_icon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
star_icon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'
zap_icon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>'

content = content.replace('🔥 OFERTA DE LANZAMIENTO', f'{tag_icon} OFERTA DE LANZAMIENTO')
content = content.replace('⏱️ Oferta por tiempo limitado', f'{clock_icon} Oferta por tiempo limitado')

content = content.replace('✔️', check_icon)
content = content.replace('✖️', cross_icon)
content = content.replace('❌', cross_icon) # Ensure no ❌ are left

content = content.replace('⭐ MÁS POPULAR', f'{star_icon} MÁS POPULAR')
content = content.replace('⚡ Despliegue listo en menos de 24 horas', f'{zap_icon} Despliegue listo en menos de 24 horas')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
