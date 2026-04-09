/**
 * Internationalization (i18n) Module
 * Handles language switching and translation management
 */

const DEFAULT_LANGUAGE = 'es';

export class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('preferredLanguage') || 
                              navigator.language.split('-')[0] || 
                              DEFAULT_LANGUAGE;
        
        // Validate language
        if (this.currentLanguage !== 'es' && this.currentLanguage !== 'en') {
            this.currentLanguage = DEFAULT_LANGUAGE;
        }
        
        this.translations = {};
    }

    /**
     * Load translations from JSON files or object
     * @param {Object} translationsData - Translation data
     */
    setTranslations(translationsData) {
        this.translations = translationsData;
    }

    /**
     * Change the current language and update DOM
     * @param {string} lang - Language code ('es' or 'en')
     */
    changeLanguage(lang) {
        if (!['es', 'en'].includes(lang)) {
            console.warn(`Language "${lang}" not supported. Using "${DEFAULT_LANGUAGE}"`);
            return;
        }

        this.currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update all data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[lang] && this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });

        // Update all data-i18n-aria attributes
        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            if (this.translations[lang] && this.translations[lang][key]) {
                element.setAttribute('aria-label', this.translations[lang][key]);
            }
        });

        // Update all data-i18n-alt attributes
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            if (this.translations[lang] && this.translations[lang][key]) {
                element.setAttribute('alt', this.translations[lang][key]);
            }
        });

        // Update meta tags
        this.updateMetaTags(lang);

        // Update language toggle button visual state
        this.updateLanguageToggleButton(lang);
    }

    /**
     * Update meta tags based on language
     * @private
     */
    updateMetaTags(lang) {
        const titleElement = document.querySelector('title');
        if (titleElement && this.translations[lang]) {
            titleElement.textContent = this.translations[lang]['meta-title'];
        }

        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta && this.translations[lang]) {
            descriptionMeta.setAttribute('content', this.translations[lang]['meta-description']);
        }

        const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
        if (ogDescriptionMeta && this.translations[lang]) {
            ogDescriptionMeta.setAttribute('content', this.translations[lang]['meta-description']);
        }

        const ogTitleMeta = document.querySelector('meta[property="og:title"]');
        if (ogTitleMeta && this.translations[lang]) {
            ogTitleMeta.setAttribute('content', this.translations[lang]['meta-title']);
        }
    }

    /**
     * Update language toggle button visual state
     * @private
     */
    updateLanguageToggleButton(lang) {
        const langEs = document.querySelector('.lang-es');
        const langEn = document.querySelector('.lang-en');
        
        if (langEs && langEn) {
            if (lang === 'es') {
                langEs.classList.add('active');
                langEn.classList.remove('active');
            } else {
                langEs.classList.remove('active');
                langEn.classList.add('active');
            }
        }
    }

    /**
     * Get current language
     * @returns {string} Current language code
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get translation for a key
     * @param {string} key - Translation key
     * @returns {string} Translated text or key if not found
     */
    translate(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }
}

/**
 * Initialize i18n module
 * @param {Object} translationsData - Translation data
 * @returns {I18n} i18n instance
 */
export function initI18n(translationsData) {
    const i18n = new I18n();
    i18n.setTranslations(translationsData);
    i18n.changeLanguage(i18n.getCurrentLanguage());

    // Setup language toggle button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const newLanguage = i18n.getCurrentLanguage() === 'es' ? 'en' : 'es';
            i18n.changeLanguage(newLanguage);
        });
    }

    return i18n;
}
