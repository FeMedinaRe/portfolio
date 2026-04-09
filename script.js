document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const sections = document.querySelectorAll('.section');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const skipLink = document.querySelector('.skip-link');
    const langToggle = document.getElementById('langToggle');

    // Initialize language system
    const DEFAULT_LANGUAGE = 'es';
    let currentLanguage = localStorage.getItem('preferredLanguage') || navigator.language.split('-')[0] || DEFAULT_LANGUAGE;
    if (currentLanguage !== 'es' && currentLanguage !== 'en') {
        currentLanguage = DEFAULT_LANGUAGE;
    }

    // Apply initial language
    changeLanguage(currentLanguage);

    // Language toggle button event listener
    langToggle.addEventListener('click', function() {
        const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
        changeLanguage(newLanguage);
    });

    // Change language function
    function changeLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update all data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update all data-i18n-aria attributes
        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            if (translations[lang] && translations[lang][key]) {
                element.setAttribute('aria-label', translations[lang][key]);
            }
        });

        // Update meta tags
        const titleElement = document.querySelector('title');
        if (titleElement && translations[lang]) {
            titleElement.textContent = translations[lang]['meta-title'];
        }

        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta && translations[lang]) {
            descriptionMeta.setAttribute('content', translations[lang]['meta-description']);
        }

        const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
        if (ogDescriptionMeta && translations[lang]) {
            ogDescriptionMeta.setAttribute('content', translations[lang]['meta-description']);
        }

        const ogTitleMeta = document.querySelector('meta[property="og:title"]');
        if (ogTitleMeta && translations[lang]) {
            ogTitleMeta.setAttribute('content', translations[lang]['meta-title']);
        }

        // Update language toggle button visual state
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

    // Throttle helper function to limit scroll event calls
    function throttle(func, wait) {
        let timeout;
        let previous = 0;
        return function executedFunction(...args) {
            const now = Date.now();
            const remaining = wait - (now - previous);

            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(this, args);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(this, args);
                }, remaining);
            }
        };
    }

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        const isExpanded = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        let isValid = true;

        [name, email, message].forEach(field => {
            field.classList.remove('error');
        });

        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        }

        if (!email.value.trim() || !isValidEmail(email.value)) {
            email.classList.add('error');
            isValid = false;
        }

        if (!message.value.trim()) {
            message.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            formMessage.textContent = translations[currentLanguage]['contact-form-success'];
            formMessage.className = 'form-message success show';
            contactForm.reset();
        } else {
            formMessage.textContent = translations[currentLanguage]['contact-form-error'];
            formMessage.className = 'form-message error show';
        }

        setTimeout(() => {
            formMessage.className = formMessage.className.replace('show', 'hide');
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 300);
        }, 5000);
    });

    function isValidEmail(email) {
        // More robust email validation regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Update scroll progress bar with throttling
    function updateScrollProgress() {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / windowHeight) * 100;
        if (scrollProgressBar) {
            // Show bar only if user has scrolled
            if (windowScroll > 0) {
                scrollProgressBar.style.opacity = '1';
                scrollProgressBar.style.width = scrolled + '%';
            } else {
                scrollProgressBar.style.opacity = '0';
                scrollProgressBar.style.width = '0%';
            }
        }
        
        // Parallax effect for hero image
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const scrollPosition = windowScroll;
            heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    }

    // Throttle scroll event to improve performance (update every 16ms ~60fps)
    const throttledScroll = throttle(updateScrollProgress, 16);

    // Add scroll progress event listener with throttling
    window.addEventListener('scroll', throttledScroll);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Enhanced skip link handling
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
            // Move focus to main content after scrolling
            setTimeout(() => {
                document.getElementById('main-content').setAttribute('tabindex', '-1');
                document.getElementById('main-content').focus();
            }, 0);
        });
    }
});
