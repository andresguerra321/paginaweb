# Configuración y Protocolo de Agentes Antigravity

Este archivo define las directrices, roles y flujos de trabajo para los agentes de Inteligencia Artificial (Antigravity) que operan en este proyecto.

---

## 1. Arquitectura de Customizaciones (`.agents/`)

El espacio de trabajo cuenta con una estructura modular en `.agents/`:

```text
.agents/
├── rules/
│   ├── graphify.md          # Reglas para consultar y actualizar el grafo de conocimiento
│   └── development.md       # Estándares de calidad de código y diseño web
├── workflows/
│   └── graphify.md          # Pipeline para generar y navegar grafos de conocimiento
└── skills/
    ├── graphify-expert/     # Análisis profundo de dependencias y arquitectura
    ├── frontend-design/     # Dirección estética y diseño visual intencional
    └── ui-ux-pro-max/       # Inteligencia y buenas prácticas de UI/UX
```

---

## 2. Integración con Graphify

**Graphify** está configurado como la herramienta principal de exploración arquitectónica y mapeo de dependencias del repositorio.

### Protocolo de Uso:
1. **Consulta Previa**: Antes de responder dudas arquitectónicas o planificar refactorizaciones mayores, consulta el grafo si existe `graphify-out/graph.json`:
   ```bash
   graphify query "<pregunta o componente>"
   ```
2. **Exploración de Relaciones**:
   - `graphify path "<Origen>" "<Destino>"` para analizar caminos entre módulos.
   - `graphify explain "<concepto>"` para obtener detalles puntuales.
   - `graphify god-nodes` para identificar componentes centrales y críticos.
3. **Mantenimiento**: Tras modificar o refactorizar archivos de código en la sesión, corre:
   ```bash
   graphify update .
   ```
   *(Operación local AST rápida, sin coste de tokens de API).*

---

## 3. Principios de Desarrollo y Diseño Frontend

- **Estética & Experiencia**: Aplicar las pautas de [frontend-design](file:///.agents/skills/frontend-design/SKILL.md) y [ui-ux-pro-max](file:///.agents/skills/ui-ux-pro-max/SKILL.md). Cada interfaz debe sentirse refinada, responsiva y con una identidad visual intencional.
- **Tecnologías**: Estructura en HTML5 semántico, lógica en JavaScript y diseño flexible con Vanilla CSS moderno.
- **Rendimiento y Accesibilidad**: Contrastes legibles (mínimo 4.5:1), soporte para navegación por teclado, imágenes optimizadas y diseño fluido mobile-first.

---

## 4. Flujo de Trabajo del Agente

1. **Investigar**: Entender el contexto existente y dependencias usando Graphify y herramientas de búsqueda.
2. **Planificar**: Plantear cambios estructurados y validar decisiones de diseño antes de ejecutar.
3. **Ejecutar**: Realizar cambios limpios y mantenibles.
4. **Sincronizar**: Mantener el grafo de dependencias actualizado con `graphify update .`.
