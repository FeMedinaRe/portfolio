document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const sections = document.querySelectorAll('.section');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const skipLink = document.querySelector('.skip-link');

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
            formMessage.textContent = '¡Gracias por tu mensaje! Te contactaré pronto.';
            formMessage.className = 'form-message success show';
            contactForm.reset();
        } else {
            formMessage.textContent = 'Por favor, completa todos los campos correctamente.';
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Update scroll progress bar
    function updateScrollProgress() {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / windowHeight) * 100;
        if (scrollProgressBar) {
            scrollProgressBar.style.width = scrolled + '%';
        }
        
        // Parallax effect for hero image
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const scrollPosition = windowScroll;
            heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    }

    // Add scroll progress event listener
    window.addEventListener('scroll', updateScrollProgress);
    // Also update on load for cases where page starts scrolled
    updateScrollProgress();

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
