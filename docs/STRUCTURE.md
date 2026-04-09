# Estructura del Proyecto - Portafolio Felipe Medina

## Vista General

Este es un proyecto **100% estático** sin dependencias, diseñado para ser servido en **Cloudflare Pages**. Ha sido reestructurado para mayor mantenibilidad, escalabilidad y modularidad. Se separaron los concerns (CSS, JavaScript, Traducciones) en módulos independientes usando ES6 modules nativos.

```
portfolio/
├── index.html                          # HTML semántico (entry point)
├── styles/
│   ├── main.css                        # Reset y base
│   ├── animations.css                  # Keyframes centralizadas
│   ├── components.css                  # Componentes reutilizables
│   ├── sections.css                    # Estilos por sección
│   └── responsive.css                  # Media queries por breakpoint
├── config/
│   └── theme.css                       # Variables CSS (fácil para reteming)
├── scripts/
│   ├── main.js                         # Entry point, inicializa módulos
│   ├── modules/
│   │   ├── navigation.js               # Menú y scroll smooth
│   │   ├── i18n.js                     # Sistema de traducción
│   │   ├── scroll.js                   # Parallax y observers
│   │   └── accessibility.js            # Skip link y a11y
│   └── utils/
│       └── throttle.js                 # Utilidades
├── i18n/
│   ├── es.json                         # Traducciones español
│   ├── en.json                         # Traducciones inglés
│   └── index.js                        # Loader dinámico
├── images/
│   ├── profile/avatar.jpg
│   └── projects/
│       ├── project-1.jpg
│       ├── project-2.jpg
│       └── project-3.jpg
├── docs/
│   ├── STRUCTURE.md                    # Esta documentación
│   └── CONTRIBUTING.md                 # Guía de edición
├── .nojekyll                           # Archivo para Cloudflare Pages
├── .gitignore
├── README.md
└── AGENTS.md
```

## Módulos de JavaScript

### `scripts/main.js` - Entry Point
El archivo principal que carga e inicializa todos los módulos en orden.

```javascript
// Carga traducciones, inicializa todos los módulos
initApp() → [loadTranslations, initAccessibility, initNavigation, initScroll, initI18n]
```

### `scripts/modules/accessibility.js`
Maneja características de accesibilidad:
- Skip link para saltar al contenido principal
- Focus management
- ARIA attributes

### `scripts/modules/navigation.js`
Gestiona la navegación:
- Toggle del menú móvil
- Smooth scroll para anclas
- Highlight de nav links según scroll

### `scripts/modules/scroll.js`
Efectos relacionados con scroll:
- Barra de progreso de scroll en tiempo real
- Parallax effect del hero image
- Intersection Observer para fade-in de secciones

### `scripts/modules/i18n.js`
Sistema de internacionalización:
- Cambio de idioma (ES/EN)
- Actualización dinámica del DOM
- Almacenamiento en localStorage
- Actualización de meta tags

### `scripts/utils/throttle.js`
Utilidades reutilizables:
- Throttle: limita llamadas a funciones durante scroll

## Archivos CSS

### `config/theme.css`
Solo variables CSS que definen el tema visual. Cambiar estas variables permite reteming rápido:
- Colores primarios/secundarios
- Colores neutrales
- Variables de componentes

### `styles/main.css`
Reset y estilos base:
- Reset universal
- Estilos de body, html
- Skip link
- Scroll progress bar
- Container y section base

### `styles/animations.css`
Todas las keyframes centralizadas:
- `fadeInUp`: animación de entrada
- `fadeIn`: fade simple
- `pulse`: efecto pulsante
- `shine`: efecto de brillo
- `slideInUp/slideOutDown`: animaciones de mensaje

### `styles/components.css`
Componentes reutilizables:
- **Navbar**: navegación, logo, menu toggle
- **Buttons**: primary, secondary, full-width
- **Avatar**: container con animaciones
- **Cards**: experience, certification, project
- **Forms**: inputs, textareas, validation
- **Footer**: links y copyright

### `styles/sections.css`
Estilos específicos de cada sección:
- Hero
- About
- Experience
- Skills
- Projects
- Certifications
- Contact

### `styles/responsive.css`
Todos los media queries organizados por breakpoint:
- `@media (max-width: 1024px)`: tabletas
- `@media (max-width: 768px)`: móvil
- Touch targets mínimos 44px

## Traducciones

### `i18n/es.json` y `i18n/en.json`
Archivos JSON limpios con pares clave-valor:
- Fácil de editar
- Compatible con herramientas de traducción
- Cargados dinámicamente

### `i18n/index.js`
Loader que fetch los archivos JSON y los combina.

## Flujo de Inicialización

```
DOMContentLoaded
    ↓
scripts/main.js (módulo ES6)
    ↓
1. loadTranslations() → fetch i18n/es.json, i18n/en.json
2. initAccessibility() → skip link listener
3. initNavigation() → menu toggle, smooth scroll
4. initScroll() → progress bar, parallax, observers
5. initI18n(translations) → setup language toggle
    ↓
App ready ✓
```

## Ventajas de la Reestructuración

| Aspecto | Beneficio |
|--------|----------|
| **Modularidad** | Módulos independientes fáciles de testear |
| **Mantenibilidad** | CSS separado por concepto (components, sections, etc) |
| **Escalabilidad** | Fácil agregar nuevos módulos/componentes |
| **Performance** | CSS puede ser lazy-loaded por módulo |
| **Localizaciones** | JSON limpio para traducciones |
| **Debuggeo** | Código organizado, fácil de navegar |
| **Testabilidad** | Funciones puras que pueden ser unitarias |
| **Cacheability** | Archivos pueden ser cacheados separadamente |

## Notas Técnicas

- `animations.css` se importa DESPUÉS de `main.css` para que las keyframes estén disponibles
- `config/theme.css` se importa desde `main.css` para las variables CSS
- `responsive.css` es el último para que los media queries tengan precedencia
- Los módulos JS usan ES6 modules (`import/export`) - requieren `type="module"` en el script tag
- **Sin bundler**: Los navegadores modernos soportan nativamente ES6 modules

## Despliegue en Cloudflare Pages

Este proyecto está listo para servirse en Cloudflare Pages:

1. Conectar repositorio de GitHub
2. Seleccionar rama `main`
3. Cloudflare automáticamente servirá los archivos estáticos
4. El archivo `.nojekyll` asegura que se sirvan todos los archivos

No requiere build process ni dependencias.
