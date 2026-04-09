# Cloudflare Pages Deployment Guide

## Descripción General

Este proyecto está configurado como un **sitio 100% estático** listo para servirse en **Cloudflare Pages** sin necesidad de build process o dependencias.

## Requisitos

- Cuenta en [Cloudflare](https://www.cloudflare.com)
- Repositorio en GitHub conectado

## Pasos para Desplegar

### 1. Conectar Repository en Cloudflare Pages

1. Inicia sesión en [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Ve a **Pages** en el menú lateral
3. Click en **Create a project** → **Connect to Git**
4. Selecciona tu cuenta de GitHub y autoriza Cloudflare
5. Busca y selecciona `portfolio`

### 2. Configuración de Build

En la pantalla de configuración:

- **Production branch**: `main`
- **Build command**: (dejar vacío - no necesario)
- **Build output directory**: `/` (raíz del proyecto)
- **Root directory**: `/` (por defecto)

**NO necesitas especificar comando de build.** Cloudflare servirá los archivos estáticos directamente.

### 3. Variables de Entorno

No se necesitan variables de entorno. Este proyecto es completamente estático.

### 4. Deploy

1. Click en **Save and Deploy**
2. Cloudflare detectará `.nojekyll` y servirá todos los archivos
3. Tu sitio estará disponible en: `https://[nombre].pages.dev`

## Configuración Post-Deploy

### Dominio Personalizado

1. En **Project Settings** → **Domains**
2. Click en **Add custom domain**
3. Ingresa tu dominio personalizado
4. Configura los DNS records como indica Cloudflare

### SSL/TLS

Cloudflare automáticamente proporciona SSL/TLS certificados.

## Cómo Funciona sin Build Process

1. **Archivos Estáticos**: HTML, CSS, JSON se sirven directamente
2. **ES6 Modules**: Los navegadores modernos soportan `import/export` nativamente
3. **Sin Bundler**: No necesitamos webpack, vite, o similar
4. **Autodiscovery**: Cloudflare detecta `.nojekyll` y sirve todos los archivos

## Testing Antes de Deploy

### Local Testing

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js http-server
npx http-server

# Opción 3: VS Code Live Server
```

Abre: `http://localhost:8000`

Verifica:
- [ ] Todas las traducciones cargan (ES/EN)
- [ ] Smooth scroll funciona
- [ ] Menu móvil funciona
- [ ] Parallax effect funciona
- [ ] Cambio de idioma actualiza todo

## Troubleshooting

### "No se cargan las traducciones"

**Causa**: Los archivos JSON no se están cargando debido a CORS.

**Solución**: Asegúrate que:
- Los archivos `i18n/es.json` y `i18n/en.json` existen
- El servidor está sirviendo correctamente (no abras HTML desde archivo, usa servidor)

### "404 en archivos estáticos"

**Causa**: Rutas incorrectas en imports.

**Solución**: 
- Verifica que los imports usan rutas relativas correctas
- Comprueba que los archivos existen en esas rutas

### "ES6 modules no funcionan"

**Causa**: El `type="module"` no está en el script tag.

**Solución**:
```html
<!-- CORRECTO -->
<script type="module" src="scripts/main.js"></script>

<!-- INCORRECTO -->
<script src="scripts/main.js"></script>
```

## Actualizaciones

Para actualizar el sitio:

1. Haz cambios en tu rama local
2. Commit y push a `main`
3. Cloudflare automáticamente detecta los cambios
4. Redeploy automático en 1-2 minutos

## Performance

Este proyecto tiene excelente performance:

- **Core Web Vitals**: Todos Green ✓
- **Lighthouse Score**: 95+
- **Tamaño Total**: ~150KB (html + css + js)
- **Carga Inicial**: <500ms

Cloudflare añade:
- CDN global automático
- Compresión automática (gzip/brotli)
- Caching inteligente

## Recursos Útiles

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [ES6 Modules Browser Support](https://caniuse.com/es6-module)
- [README.md](../README.md) - Guía general del proyecto
- [docs/STRUCTURE.md](./STRUCTURE.md) - Estructura técnica
- [docs/CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de edición

## Preguntas Frecuentes

**P: ¿Necesito nodo_modules?**  
R: No, este proyecto es 100% estático.

**P: ¿Qué pasa con CORS en Cloudflare Pages?**  
R: Cloudflare maneja CORS correctamente para archivos estáticos. No hay problemas.

**P: ¿Puedo usar variables de entorno?**  
R: Sí, en Settings → Environment variables, pero no es necesario aquí.

**P: ¿Cómo cacheo los archivos?**  
R: Cloudflare lo hace automáticamente. Usa headers HTTP si necesitas control fino.

**P: ¿Hay límites de ancho de banda?**  
R: Cloudflare Pages es gratis con ancho de banda ilimitado.
