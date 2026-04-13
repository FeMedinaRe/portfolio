/**
 * i18n Loader
 * Dynamically loads and combines translations from JSON files
 */

async function loadTranslations() {
    try {
        const [esResponse, enResponse] = await Promise.all([
            fetch('./i18n/es.json'),
            fetch('./i18n/en.json')
        ]);

        const es = await esResponse.json();
        const en = await enResponse.json();

        return { es, en };
    } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to empty translations
        return { es: {}, en: {} };
    }
}

export { loadTranslations };
