/**
 * AG Private Engineering — Interactive Architecture & Motion
 * Crafted with Anime.js, IntersectionObserver & high-end haptics
 */

(function () {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

    function initApp() {
        const hasAnime = typeof anime !== 'undefined';

        /* ------------------------------------------------------------
           1. FLOATING ISLAND NAVBAR — Scroll Elevation & Active Tracking
           ------------------------------------------------------------ */
        const nav = document.getElementById('mainNav');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        const sections = document.querySelectorAll('header#hero, section[id]');

        let isTicking = false;
        window.addEventListener('scroll', function () {
            if (!isTicking) {
                window.requestAnimationFrame(function () {
                    if (window.scrollY > 40) {
                        nav.classList.add('scrolled');
                    } else {
                        nav.classList.remove('scrolled');
                    }
                    isTicking = false;
                });
                isTicking = true;
            }
        }, { passive: true });

        /* ------------------------------------------------------------
           2. SPA TAB BEHAVIOR — Display only the active module/tab
           ------------------------------------------------------------ */
        const allSections = document.querySelectorAll('header#hero, section[id]');
        const allNavAnchors = document.querySelectorAll('.nav-link, .mobile-nav-link');

        function getTabForId(targetId) {
            if (!targetId || targetId === '#page-top' || targetId === '#hero' || targetId === '#about' || targetId === '#social-proof' || targetId === '#') {
                return '#about';
            }
            if (targetId === '#services' || targetId === '#innovation' || targetId === '#workflow') {
                return '#services';
            }
            if (targetId === '#skills' || targetId === '#tech') {
                return '#skills';
            }
            if (targetId === '#timeline') {
                return '#timeline';
            }
            if (targetId === '#contact') {
                return '#contact';
            }
            return targetId;
        }

        function activateSection(targetId, scrollToSection) {
            const tabId = getTabForId(targetId);

            allSections.forEach(section => {
                const sectionId = '#' + section.getAttribute('id');
                let shouldShow = false;

                if (tabId === '#about') {
                    if (sectionId === '#hero' || sectionId === '#about' || sectionId === '#social-proof') {
                        shouldShow = true;
                    }
                } else if (tabId === '#services') {
                    if (sectionId === '#services' || sectionId === '#innovation' || sectionId === '#workflow') {
                        shouldShow = true;
                    }
                } else if (tabId === '#skills') {
                    if (sectionId === '#skills' || sectionId === '#tech') {
                        shouldShow = true;
                    }
                } else if (tabId === '#timeline') {
                    if (sectionId === '#timeline') {
                        shouldShow = true;
                    }
                } else if (tabId === '#contact') {
                    if (sectionId === '#contact') {
                        shouldShow = true;
                    }
                } else if (tabId === sectionId) {
                    shouldShow = true;
                }

                if (shouldShow) {
                    section.style.display = 'block';
                    const reveals = section.querySelectorAll('.reveal');
                    reveals.forEach(el => {
                        el.classList.add('visible');
                        el.style.opacity = '1';
                        el.style.transform = 'none';
                    });
                } else {
                    section.style.display = 'none';
                }
            });

            // Update active state in navbar
            allNavAnchors.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === tabId) {
                    a.classList.add('active');
                }
            });

            // Smooth scroll or reposition to top
            if (scrollToSection && scrollToSection !== tabId && scrollToSection !== '#about' && scrollToSection !== '#hero') {
                const targetEl = document.querySelector(scrollToSection);
                if (targetEl) {
                    setTimeout(() => {
                        const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - 70;
                        window.scrollTo({ top: topPos, behavior: 'smooth' });
                    }, 50);
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Update URL hash smoothly without jumps
            if (window.history.pushState) {
                window.history.pushState(null, null, tabId === '#about' ? ' ' : tabId);
            }
        }

        /* ------------------------------------------------------------
           3. MOBILE FULLSCREEN OVERLAY & HAMBURGER MORPH
           ------------------------------------------------------------ */
        const navToggle = document.getElementById('navToggle');
        const mobileOverlay = document.getElementById('mobileNavOverlay');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');

        function toggleMobileNav(open) {
            const isOpen = typeof open === 'boolean' ? open : !navToggle.classList.contains('open');
            if (isOpen) {
                navToggle.classList.add('open');
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';

                if (hasAnime) {
                    anime({
                        targets: '.mobile-nav-link',
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: anime.stagger(60, { start: 100 }),
                        duration: 400,
                        easing: 'easeOutCubic'
                    });
                }
            } else {
                navToggle.classList.remove('open');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        if (navToggle) {
            navToggle.addEventListener('click', () => toggleMobileNav());
        }

        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', (e) => {
                if (e.target === mobileOverlay) toggleMobileNav(false);
            });
        }

        // Bind clicks on all internal hashtag links (nav, hero buttons, footer, etc.)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    activateSection(href, href);
                    toggleMobileNav(false);
                }
            });
        });

        // Initialize with URL hash or default to #about
        const initialHash = window.location.hash || '#about';
        activateSection(initialHash, initialHash);

        /* ------------------------------------------------------------
           4. STAGGERED SCROLL REVEALS (GPU-Accelerated)
           ------------------------------------------------------------ */
        const revealElements = document.querySelectorAll('.reveal');

        const revealObserver = new IntersectionObserver((entries) => {
            const visibleTargets = [];
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
                    entry.target.classList.add('revealed');
                    visibleTargets.push(entry.target);
                    revealObserver.unobserve(entry.target);
                }
            });

            if (visibleTargets.length > 0 && hasAnime) {
                anime({
                    targets: visibleTargets,
                    opacity: [0, 1],
                    translateY: [24, 0],
                    duration: 700,
                    delay: anime.stagger(80),
                    easing: 'cubicBezier(0.32, 0.72, 0, 1)'
                });
            } else {
                visibleTargets.forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            }
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));

        /* ------------------------------------------------------------
           5. HERO ENTRANCE CHOREOGRAPHY
           ------------------------------------------------------------ */
        if (hasAnime) {
            anime.timeline({
                easing: 'cubicBezier(0.32, 0.72, 0, 1)',
                delay: 150
            })
            .add({
                targets: '#heroTitle',
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 700
            })
            .add({
                targets: '#heroSubtitle',
                opacity: [0, 1],
                translateY: [16, 0],
                duration: 600
            }, '-=450')
            .add({
                targets: '#heroCta',
                opacity: [0, 1],
                translateY: [16, 0],
                duration: 500
            }, '-=400')
            .add({
                targets: '#heroVisual',
                opacity: [0, 1],
                scale: [0.96, 1],
                translateY: [20, 0],
                duration: 800
            }, '-=600')
            .add({
                targets: '.hero-trust-strip',
                opacity: [0, 1],
                translateY: [12, 0],
                duration: 500
            }, '-=400');
        }
    }
})();
