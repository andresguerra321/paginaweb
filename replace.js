const fs = require('fs');
const file = 'c:/Users/andre/OneDrive/Escritorio/portafolio/proyecto-bot-whatsapp/index.html';
let content = fs.readFileSync(file, 'utf8');

// Icons
const checkIcon = <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:-2px\"><polyline points=\"20 6 9 17 4 12\"></polyline></svg>;
const crossIcon = <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:-2px\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>;
const playIcon = <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>;
const micIcon = <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\"></path><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"></path><line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"22\"></line></svg>;
const userVoiceIcon = <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"></path><circle cx=\"12\" cy=\"7\" r=\"4\"></circle></svg>;
const lockIcon = <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path></svg>;
const zapIcon = <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"></polygon></svg>;
const shieldIcon = <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path></svg>;
const refreshIcon = <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 2l4 4-4 4\"></path><path d=\"M3 11v-1a4 4 0 0 1 4-4h14\"></path><path d=\"M7 22l-4-4 4-4\"></path><path d=\"M21 13v1a4 4 0 0 1-4 4H3\"></path></svg>;
const tagIcon = <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:-3px\"><path d=\"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z\"></path><line x1=\"7\" y1=\"7\" x2=\"7.01\" y2=\"7\"></line></svg>;
const clockIcon = <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:-2px\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 6 12 12 16 14\"></polyline></svg>;
const starIcon = <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:-1px\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon></svg>;
const zapSmallIcon = <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"vertical-align:-2px\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"></polygon></svg>;

content = content.replace('?', playIcon);
content = content.replace('? El Problema', crossIcon + ' El Problema');
content = content.replace('? La Solución', checkIcon + ' La Solución');

content = content.replace('<div class=\"feature-icon emerald\">???</div>', '<div class=\"feature-icon emerald\">' + micIcon + '</div>');
content = content.replace('<div class=\"feature-icon indigo\">???</div>', '<div class=\"feature-icon indigo\">' + userVoiceIcon + '</div>');
content = content.replace('<div class=\"feature-icon purple\">??</div>', '<div class=\"feature-icon purple\">' + lockIcon + '</div>');
content = content.replace('<div class=\"feature-icon cyan\">?</div>', '<div class=\"feature-icon cyan\">' + zapIcon + '</div>');
content = content.replace('<div class=\"feature-icon amber\">???</div>', '<div class=\"feature-icon amber\">' + shieldIcon + '</div>');
content = content.replace('<div class=\"feature-icon rose\">??</div>', '<div class=\"feature-icon rose\">' + refreshIcon + '</div>');

content = content.replace('?? OFERTA DE LANZAMIENTO', tagIcon + ' OFERTA DE LANZAMIENTO');
content = content.replace('?? Oferta por tiempo limitado', clockIcon + ' Oferta por tiempo limitado');

content = content.replace(/??/g, checkIcon);
content = content.replace(/??/g, crossIcon);

content = content.replace('? MÁS POPULAR', starIcon + ' MÁS POPULAR');
content = content.replace('? Despliegue listo en menos de 24 horas', zapSmallIcon + ' Despliegue listo en menos de 24 horas');

fs.writeFileSync(file, content, 'utf8');
console.log('Replaced all emojis with SVG icons in whatsapp-bot');
