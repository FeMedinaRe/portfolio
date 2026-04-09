# Guía de Contribución - Portafolio

## Edición de Contenido

### Actualizar Texto en Español o Inglés

1. Editar el archivo correspondiente en `i18n/`:
   - `i18n/es.json` → Contenido en español
   - `i18n/en.json` → Contenido en inglés

2. Encontrar la clave correspondiente:
   ```json
   "hero-title": "Felipe Medina"
   "about-p1": "Con 1+ año de experiencia..."
   ```

3. Cambiar el valor y guardar
4. El cambio se reflejará automáticamente cuando se recargue la página

### Agregar Nueva Sección

1. Agregar HTML en `index.html`:
   ```html
   <section id="nueva-seccion" class="section">
       <div class="container">
           <h2 class="section-title" data-i18n="nueva-seccion-title">Nueva Sección</h2>
           <!-- contenido -->
       </div>
   </section>
   ```

2. Agregar estilos en `styles/sections.css`:
   ```css
   /* Nueva Sección */
   .nueva-seccion-class {
       /* estilos */
   }
   ```

3. Agregar claves de traducción en `i18n/es.json` y `i18n/en.json`:
   ```json
   "nueva-seccion-title": "Nueva Sección"
   ```

## Cambios de Estilo

### Editar Colores

Los colores están centralizados en `config/theme.css`. Cambiar estos valores actualiza todo el sitio:

```css
:root {
    --primary: #2563eb;        /* Color principal (azul) */
    --primary-dark: #1d4ed8;   /* Variante oscura */
    --secondary: #64748b;      /* Color secundario */
    --success: #10b981;        /* Verde (éxito) */
    --error: #ef4444;          /* Rojo (error) */
    --dark: #0a0a0a;           /* Fondo oscuro */
    --gray: #94a3b8;           /* Gris */
}
```

### Editar Componentes

Los componentes reutilizables están en `styles/components.css`:

```css
/* Buttons */
.btn {
    padding: 14px 28px;
    border-radius: 8px;
    /* ... */
}

.btn-primary {
    background: var(--primary);
}
```

### Editar Secciones

Estilos específicos por sección en `styles/sections.css`:

```css
/* Hero Section */
.hero {
    min-height: 100vh;
    /* ... */
}

.hero-title {
    font-size: 56px;
    /* ... */
}
```

### Editar Responsive

Todos los media queries en `styles/responsive.css`:

```css
@media (max-width: 768px) {
    .hero-title {
        font-size: 40px;
    }
    /* ... */
}
```

## Cambios de Funcionalidad

### Agregar Nueva Funcionalidad

1. Crear nuevo módulo en `scripts/modules/`:
   ```javascript
   // scripts/modules/mi-modulo.js
   export function initMiModulo() {
       // Código aquí
   }
   ```

2. Importar en `scripts/main.js`:
   ```javascript
   import { initMiModulo } from './modules/mi-modulo.js';
   
   async function initApp() {
       // ...
       initMiModulo();
   }
   ```

### Cambiar Comportamiento de Navegación

Editar `scripts/modules/navigation.js`:
```javascript
// Menu toggle, smooth scroll, nav link highlighting
```

### Cambiar Efectos de Scroll

Editar `scripts/modules/scroll.js`:
```javascript
// Parallax, progress bar, observers
```

### Cambiar Sistema de Idiomas

Editar `scripts/modules/i18n.js`:
```javascript
// Lógica de traducción, cambio de idioma
```

## Estructura de Archivos a Respetar

```
✓ DO:
- Agregar CSS específico en el archivo correcto (components.css, sections.css, etc)
- Usar variables CSS para colores y tamaños
- Mantener JavaScript modular en scripts/modules/
- Agregar traducciones en i18n/es.json y i18n/en.json

✗ DON'T:
- Agregar CSS inline en HTML
- Importar librerías externas sin justificación
- Mezclar lógica de diferentes módulos
- Cambiar variables globales sin necesidad
```

## Edición de Imágenes

Las imágenes están organizadas en `images/`:

```
images/
├── profile/avatar.jpg          # Foto de perfil
├── projects/
│   ├── project-1.jpg           # Proyecto 1
│   ├── project-2.jpg           # Proyecto 2
│   └── project-3.jpg           # Proyecto 3
```

Para cambiar una imagen:
1. Reemplazar el archivo en `images/` con mismo nombre
2. Opcional: Optimizar imagen (reducir tamaño)

## Testing Local

Para ver cambios:

1. **Cambios CSS**: Refrescar página (Ctrl+Shift+R para cache limpio)
2. **Cambios JSON**: Refrescar página (requiere fetch nuevo)
3. **Cambios JS**: Refrescar página

## Buenas Prácticas

### CSS
- Usar variables CSS para colores/tamaños
- Mantener especificidad baja
- Usar mobile-first (empezar con móvil, luego breakpoints)
- Comentar secciones principales

### JavaScript
- Funciones pequeñas y enfocadas
- Usar nombres descriptivos
- Evitar estado global
- Comentar lógica compleja

### Traducciones
- Mantener consistencia en clave/valor
- No traducir términos técnicos a menos que sea necesario
- Revisar ortografía y espacios

## Archivos a NO Editar

- `.git/` → Control de versiones
- `node_modules/` → Dependencias (si existe)
- `build/` o `dist/` → Output generado

## Común: Actualizar Perfil

1. Cambiar foto: Reemplazar `images/profile/avatar.jpg`
2. Cambiar título: Editar `i18n/es.json` y `i18n/en.json` → `hero-tagline`
3. Cambiar descripción: Editar `i18n/es.json` y `i18n/en.json` → `about-p1`, `about-p2`, `about-p3`
4. Cambiar experiencia: Editar en `index.html` sección Experience y `i18n/*.json`
5. Cambiar proyectos: Editar en `index.html` sección Projects y `i18n/*.json`

## Preguntas/Problemas

Revisar `docs/STRUCTURE.md` para entender mejor la organización del proyecto.
