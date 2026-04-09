/**
 * Scroll Module
 * Handles scroll progress bar, parallax effect, and section visibility
 */

import { throttle } from '../utils/throttle.js';

export function initScroll() {
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const sections = document.querySelectorAll('.section');

    // Update scroll progress bar
    function updateScrollProgress() {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / windowHeight) * 100;
        
        if (scrollProgressBar) {
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
    window.addEventListener('scroll', throttledScroll);

    // Intersection Observer for fade-in on scroll
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
}
