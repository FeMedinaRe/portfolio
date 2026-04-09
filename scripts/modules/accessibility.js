/**
 * Accessibility Module
 * Handles skip links, focus management, and ARIA attributes
 */

export function initAccessibility() {
    const skipLink = document.querySelector('.skip-link');
    
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth' });
                // Move focus to main content after scrolling
                setTimeout(() => {
                    mainContent.setAttribute('tabindex', '-1');
                    mainContent.focus();
                }, 0);
            }
        });
    }
}
