# Portafolio - Felipe Medina

Portafolio personal de Felipe Medina, Analista de Sistemas e Ingeniero en Computación. Sitio estático moderno con arquitectura escalable.

## Características

- 🌐 **Bilingüe**: Soporte completo para Español e Inglés
- 📱 **Responsive**: Diseño mobile-first, funciona en todos los dispositivos
- ⚡ **Modular**: Código bien organizado y mantenible
- 🎨 **Temático**: Sistema de variables CSS para fácil customización
- ♿ **Accesible**: WCAG compliant con aria labels y skip links
- 🔄 **Smooth**: Scroll suave, parallax, animaciones fluidas

## Estructura del Proyecto

```
portfolio/
├── index.html                  # Página principal
├── styles/                     # Estilos modularizados
├── scripts/                    # Módulos JavaScript ES6
├── i18n/                       # Traducciones (ES/EN)
├── config/                     # Configuración (variables CSS)
├── images/                     # Imágenes del sitio
├── docs/                       # Documentación
└── README.md
```

## Inicio Rápido

### Requisitos
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Sin dependencias** - Proyecto 100% estático

### Desarrollo Local

```bash
# Opción 1: Python (recomendado)
python -m http.server 8000

# Opción 2: Node.js http-server (si tienes instalado)
npx http-server

# Opción 3: VS Code Live Server extension
```

Luego abre en el navegador: `http://localhost:8000`

## Edición de Contenido

### Cambiar Texto (Español o Inglés)

Editar archivos JSON en `i18n/`:
- `i18n/es.json` → Contenido en español
- `i18n/en.json` → Contenido en inglés

### Cambiar Tema

Editar variables CSS en `config/theme.css`:
```css
:root {
    --primary: #2563eb;        /* Color principal */
    --dark: #0a0a0a;           /* Fondo oscuro */
    /* ... */
}
```

### Agregar Nueva Funcionalidad

1. Crear módulo en `scripts/modules/`
2. Importar en `scripts/main.js`
3. Inicializar en `initApp()`

Ver `docs/CONTRIBUTING.md` para guía completa.

## Stack Tecnológico

- **HTML5** - Semántico y accesible
- **CSS3** - Variables, Grid, Flexbox, Media queries
- **JavaScript** - ES6 modules, vanilla (sin frameworks ni bundler)
- **JSON** - Traducciones limpias
- **Cero Dependencias** - Proyecto 100% estático

## Características Principales

### Secciones
1. **Hero** - Presentación con efecto parallax
2. **Sobre mí** - Descripción personal y estadísticas
3. **Experiencia** - Historial laboral
4. **Habilidades** - Competencias técnicas
5. **Proyectos** - Trabajos destacados
6. **Certificaciones** - Formación y cursos
7. **Footer** - Enlaces a redes sociales

### Funcionalidades
- ✅ Navegación suave entre secciones
- ✅ Menú responsive (hamburger en móvil)
- ✅ Barra de progreso de scroll
- ✅ Cambio de idioma en tiempo real
- ✅ Efecto parallax en hero
- ✅ Animaciones al scroll
- ✅ Tema oscuro (configurable)

## Documentación

- **[STRUCTURE.md](docs/STRUCTURE.md)** - Estructura detallada del proyecto
- **[CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Guía de edición y contribución
- **[AGENTS.md](AGENTS.md)** - Información para agentes de IA

## Desempeño

- ⚡ **<1s** de carga inicial
- 📦 **~50KB** de CSS minificado
- 🔄 **Zero dependencies** - No requiere librerías externas
- 📱 **Mobile optimized** - Touch targets mínimos 44px

## Accesibilidad

- ✅ WCAG 2.1 Level AA
- ✅ Skip link para saltar al contenido
- ✅ Contraste suficiente en colores
- ✅ Aria labels en elementos interactivos
- ✅ Navegación por teclado completa
- ✅ Animaciones respetan `prefers-reduced-motion`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Links

- 🌐 [Sitio Live](https://femedinare.dev)
- 💼 [LinkedIn](https://linkedin.com/in/femedinare)
- 🐙 [GitHub](https://github.com/FeMedinaRe)

## Licencia

MIT - Ver LICENSE para detalles

## Autor

**Felipe Medina**
- Analista de Sistemas
- Estudiante de Ingeniería en Computación
- Especializado en Cloud, Infrastructure y Seguridad
