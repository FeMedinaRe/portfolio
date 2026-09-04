/**
 * Navigation Module
 * Handles menu toggle, smooth scrolling, and navigation link highlighting
 */

export function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const sections = document.querySelectorAll('.section, .hero');

    // Collect ALL nav links (desktop + mobile)
    const allNavLinks = document.querySelectorAll('.nav-links-desktop a, .nav-links a');

    // Menu toggle (mobile)
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            const isExpanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });

        // Close menu when clicking a nav link (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking on the overlay
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scroll for anchor links
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

    // Highlight active nav link based on scroll position
    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                allNavLinks.forEach(link => {
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
}
