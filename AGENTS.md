# AGENTS.md

## Repository Structure

Static HTML portfolio site. Three files only:
- `index.html` – Single-page HTML with semantic structure, Spanish content
- `script.js` – Client-side interactivity (menu toggle, form validation, scroll tracking, smooth navigation)
- `styles.css` – Single stylesheet with CSS variables, responsive design, no preprocessor

No build process, bundler, or package manager.

## Key Implementation Details

### Form Validation (script.js:61–104)
Contact form does **client-side validation only** (no backend). Submit shows success/error message in DOM, does not persist or send anywhere. Resets after 5 seconds.

### Responsive Breakpoints (styles.css)
- `@media (max-width: 1024px)` – Switch multi-column grids to 2 columns
- `@media (max-width: 768px)` – Mobile: flex columns, hamburger menu toggle, 44px minimum touch targets

### Menu Toggle (script.js:11–23)
Mobile menu uses `.active` class to show/hide `.nav-links`. Click nav link to dismiss menu automatically.

### Scroll Indicators
- Scroll progress bar updates in real-time (script.js:112–126)
- Hero image parallax effect tied to scroll
- Intersection Observer triggers fade-in on section visibility

### CSS Variables (styles.css:7–23)
Color theme defined via CSS custom properties (e.g., `--primary`, `--dark`, `--gray`). Update root vars to retheme.

### Accessibility
- Skip link to main content (styles.css:45–58)
- Focus outlines on all interactive elements (styles.css:26–42)
- Semantic HTML5 with aria-labels and role attributes
- Minimum 44px touch targets on mobile

## Frequent Edits

**Content updates**: Edit sections in `index.html` (experience cards, projects, certifications, skills).

**Styling tweaks**: CSS variables at top of `styles.css` control colors. Component styles follow semantic order (hero, sections, cards, footer).

**Behavior changes**: All interactivity in `script.js`. Event listeners set up on `DOMContentLoaded`.

## Common Pitfalls

- **Form doesn't send**: Intentional. Currently client-side only—no backend or email integration.
- **Mobile menu not working**: Check `.menu-toggle.active` selector and `.nav-links.active` display toggle in styles.css.
- **Styles duplicated**: Some selectors defined twice in CSS (e.g., `.avatar-container`, `.btn`). Consolidate if refactoring.
- **Spanish hardcoded**: Content is entirely in Spanish. Change in HTML—no internationalization layer.
