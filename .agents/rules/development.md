---
trigger: always_on
description: Reglas y estándares de desarrollo para agentes en el proyecto.
---

# Reglas de Desarrollo del Proyecto

## 1. Integración con Graphify
- Antes de realizar cambios estructurales o responder preguntas sobre la arquitectura del código, verifica si existe el grafo en `graphify-out/`.
- Utiliza `graphify query "<pregunta>"` para obtener subgrafos contextuales en vez de escanear archivos innecesariamente.
- Tras realizar cambios significativos en el código, ejecuta `graphify update .` para mantener el grafo sincronizado (ejecución AST local rápida).

## 2. Estándares Web y Frontend
- **Estructura y Tecnologías**: HTML semántico, JavaScript moderno y Vanilla CSS modular.
- **Diseño & UX**: Priorizar estética premium, coherencia visual, tipografía moderna, paletas cromáticas armoniosas y microinteracciones fluidas.
- **Accesibilidad**: Mantener ratios de contraste adecuados, etiquetas descriptivas para accesibilidad y navegación por teclado.
- **Rendimiento**: Optimizar imágenes (formatos modernos como WebP) y evitar Cumulative Layout Shift (CLS).
