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
            if (targetId === '#skills' || targetId === '#tech' || targetId === '#timeline') {
                return '#skills';
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
                    if (sectionId === '#skills' || sectionId === '#tech' || sectionId === '#timeline') {
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
                    reveals.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('revealed');
                        }, index * 40);
                    });
                } else {
                    section.style.display = 'none';
                }
            });

            // Explicitly sync hero trust strip display with the home/about tab
            const trustStrip = document.getElementById('heroTrustStrip') || document.querySelector('.hero-trust-strip');
            if (trustStrip) {
                trustStrip.style.display = (tabId === '#about') ? 'block' : 'none';
            }

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
           4. HARDWARE-ACCELERATED SCROLL REVEALS
           ------------------------------------------------------------ */
        const revealElements = document.querySelectorAll('.reveal');

        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.08,
                rootMargin: '0px 0px -30px 0px'
            });

            revealElements.forEach(el => revealObserver.observe(el));
        } else {
            revealElements.forEach(el => el.classList.add('revealed'));
        }

        /* ------------------------------------------------------------
           5. HERO ENTRANCE CHOREOGRAPHY (Silky Apple/Stripe Curve)
           ------------------------------------------------------------ */
        function playHeroEntrance() {
            const status = document.getElementById('heroStatus');
            const title = document.getElementById('heroTitle');
            const subtitle = document.getElementById('heroSubtitle');
            const cta = document.getElementById('heroCta');
            const mobileVisual = document.getElementById('heroMobileVisual');
            const trustStrip = document.querySelector('.hero-trust-strip');

            if (typeof anime !== 'undefined') {
                anime.timeline({
                    easing: 'cubicBezier(0.16, 1, 0.3, 1)'
                })
                .add({
                    targets: status,
                    opacity: [0, 1],
                    translateY: [12, 0],
                    duration: 450,
                    delay: 50
                })
                .add({
                    targets: title,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600
                }, '-=300')
                .add({
                    targets: subtitle,
                    opacity: [0, 1],
                    translateY: [16, 0],
                    duration: 500
                }, '-=350')
                .add({
                    targets: cta,
                    opacity: [0, 1],
                    translateY: [14, 0],
                    duration: 450
                }, '-=350')
                .add({
                    targets: [mobileVisual, trustStrip].filter(Boolean),
                    opacity: [0, 1],
                    translateY: [12, 0],
                    duration: 500
                }, '-=300');
            } else {
                [status, title, subtitle, cta, mobileVisual, trustStrip].forEach(el => {
                    if (el) {
                        el.style.opacity = '1';
                        el.style.transform = 'none';
                    }
                });
            }
        }

        /* ------------------------------------------------------------
           8. ARCHITECTURE & VAULT LIGHTBOX MODAL
           ------------------------------------------------------------ */
        const diagramTrigger = document.getElementById('conceptDiagramTrigger');
        const vaultTrigger = document.getElementById('sovereigntyVaultTrigger');
        const diagramLightbox = document.getElementById('diagramLightbox');
        const closeDiagramBtn = document.getElementById('closeDiagramLightbox');
        const lightboxImg = document.getElementById('diagramLightboxImg');
        const lightboxChip = document.getElementById('diagramLightboxChip');
        const lightboxBadge = document.getElementById('diagramLightboxBadge');
        const lightboxTitle = document.getElementById('diagramLightboxTitle');
        const lightboxDesc = document.getElementById('diagramLightboxDesc');

        const lightboxPresets = {
            schematic: {
                src: 'img/about/soberania-schematic.webp',
                alt: 'Diagrama Conceptual de Soberanía Tecnológica e Infraestructura Propietaria',
                chipKey: 'about_arch_chip',
                badgeKey: 'about_arch_badge',
                titleKey: 'about_arch_title',
                descKey: 'about_arch_desc'
            },
            vault: {
                src: 'img/about/soberania-vault.webp',
                alt: 'Ilustración Conceptual de Bóveda Digital Soberana, 100% Propiedad del Código y 0% Lock-in',
                chipKey: 'about_p1_chip',
                badgeKey: 'about_p1_badge',
                titleKey: 'about_p1_title',
                descKey: 'about_p1_desc'
            }
        };

        function setLightboxData(presetKey) {
            const preset = lightboxPresets[presetKey];
            if (!preset) return;
            if (lightboxImg) {
                lightboxImg.src = preset.src;
                lightboxImg.alt = preset.alt;
            }
            if (lightboxChip) lightboxChip.setAttribute('data-i18n', preset.chipKey);
            if (lightboxBadge) lightboxBadge.setAttribute('data-i18n', preset.badgeKey);
            if (lightboxTitle) lightboxTitle.setAttribute('data-i18n', preset.titleKey);
            if (lightboxDesc) lightboxDesc.setAttribute('data-i18n', preset.descKey);

            if (window.i18nEngine && typeof window.i18nEngine.setLanguage === 'function') {
                window.i18nEngine.setLanguage(window.i18nEngine.getLanguage());
            }
        }

        function openLightbox(presetKey = 'schematic') {
            if (!diagramLightbox) return;
            setLightboxData(presetKey);
            diagramLightbox.classList.add('active');
            diagramLightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            if (!diagramLightbox) return;
            diagramLightbox.classList.remove('active');
            diagramLightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        if (diagramTrigger && diagramLightbox) {
            diagramTrigger.addEventListener('click', () => openLightbox('schematic'));
            diagramTrigger.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox('schematic');
                }
            });
        }

        if (vaultTrigger && diagramLightbox) {
            vaultTrigger.addEventListener('click', () => openLightbox('vault'));
            vaultTrigger.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox('vault');
                }
            });
        }

        if (closeDiagramBtn && diagramLightbox) {
            closeDiagramBtn.addEventListener('click', closeLightbox);
        }

        if (diagramLightbox) {
            diagramLightbox.addEventListener('click', function (e) {
                if (e.target === diagramLightbox) {
                    closeLightbox();
                }
            });
            window.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && diagramLightbox.classList.contains('active')) {
                    closeLightbox();
                }
            });
        }

        playHeroEntrance();
    }
})();
