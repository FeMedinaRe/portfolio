/**
 * Main Entry Point
 * Initializes all modules and app
 */

import { initAccessibility } from './modules/accessibility.js';
import { initNavigation } from './modules/navigation.js';
import { initScroll } from './modules/scroll.js';
import { initI18n } from './modules/i18n.js';
import { loadTranslations } from '../i18n/index.js';

async function initApp() {
    try {
        // Load translations
        const translations = await loadTranslations();

        // Initialize modules
        initAccessibility();
        initNavigation();
        initScroll();
        initI18n(translations);

        console.log('✓ App initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
