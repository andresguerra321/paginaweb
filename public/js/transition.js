(function() {
    'use strict';

    function createLoaderHTML() {
        if (document.getElementById('page-transition-overlay')) return;
        const loaderDiv = document.createElement('div');
        loaderDiv.id = 'page-transition-overlay';
        loaderDiv.className = 'page-transition-overlay';
        loaderDiv.innerHTML = `
            <div class="minimal-progress-bar" id="minimal-bar"></div>
            <div class="minimal-loader-content" id="minimal-content">
                <div class="minimal-loader-logo">AG<span>.</span></div>
            </div>
        `;
        document.body.prepend(loaderDiv);
    }

    function revealMainContent() {
        const hiddenElements = document.querySelectorAll('.perf-hidden, main.perf-hidden, #mainContent.perf-hidden, #main-content.perf-hidden');
        hiddenElements.forEach(function(el) {
            el.classList.remove('perf-hidden');
            el.classList.add('perf-reveal');
            el.style.opacity = '1';
            el.style.pointerEvents = 'auto';
        });
    }

    let isFinished = false;

    function forceDismiss() {
        isFinished = true;
        revealMainContent();

        const overlay = document.getElementById('page-transition-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            overlay.classList.remove('active');
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            overlay.style.pointerEvents = 'none';
            overlay.style.display = 'none';
        }
    }

    function runEntranceAnimation() {
        let isTransitioning = false;
        try {
            isTransitioning = sessionStorage.getItem('ag_transition_active') === 'true';
            sessionStorage.removeItem('ag_transition_active');
        } catch (e) {}

        if (!isTransitioning) {
            // Direct load / page refresh: Do NOT create or flash any overlay!
            forceDismiss();
            return;
        }

        createLoaderHTML();
        const overlay = document.getElementById('page-transition-overlay');
        const bar = document.getElementById('minimal-bar');
        const content = document.getElementById('minimal-content');

        if (!overlay) {
            forceDismiss();
            return;
        }

        // Make overlay immediately visible for incoming transition
        overlay.style.display = 'flex';
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';
        overlay.classList.add('active');

        // If tab was opened in the background or is currently hidden, dismiss immediately
        if (document.hidden || document.visibilityState === 'hidden') {
            forceDismiss();
            return;
        }

        function finishLoading() {
            if (isFinished) return;
            isFinished = true;

            if (bar) bar.style.width = '100%';
            revealMainContent();

            setTimeout(function() {
                if (typeof anime !== 'undefined' && overlay) {
                    try {
                        anime({
                            targets: overlay,
                            opacity: [1, 0],
                            duration: 250,
                            easing: 'easeOutQuad',
                            complete: function() {
                                forceDismiss();
                            }
                        });
                    } catch (e) {
                        forceDismiss();
                    }
                } else if (overlay) {
                    overlay.style.opacity = '0';
                    setTimeout(forceDismiss, 250);
                } else {
                    forceDismiss();
                }

                // Guaranteed safety timer to avoid any frozen animation
                setTimeout(forceDismiss, 350);
            }, 100);
        }

        // Logo micro-animation
        if (typeof anime !== 'undefined' && content) {
            try {
                anime({
                    targets: content,
                    opacity: [0.8, 1],
                    scale: [0.98, 1],
                    duration: 250,
                    easing: 'easeOutQuad'
                });
            } catch (e) {}
        }

        // Strict incoming transition timer: max 300ms
        setTimeout(finishLoading, 300);
        window.addEventListener('load', finishLoading, { once: true });
    }

    function runExitAnimation(targetUrl) {
        const overlay = document.getElementById('page-transition-overlay');
        const bar = document.getElementById('minimal-bar');

        if (!overlay) {
            window.location.href = targetUrl;
            return;
        }

        if (bar) bar.style.width = '0%';
        overlay.style.display = 'flex';
        overlay.style.visibility = 'visible';
        overlay.classList.remove('hidden');
        overlay.classList.add('active');

        let navigated = false;
        function doNavigate() {
            if (!navigated) {
                navigated = true;
                window.location.href = targetUrl;
            }
        }

        if (typeof anime !== 'undefined') {
            try {
                anime({
                    targets: overlay,
                    opacity: [0, 1],
                    duration: 200,
                    easing: 'easeOutQuad',
                    complete: doNavigate
                });
            } catch (e) {
                doNavigate();
            }
        } else {
            overlay.style.opacity = '1';
            setTimeout(doNavigate, 200);
        }

        // Failsafe: if navigation was cancelled, slow, or tab changed, dismiss after 1s
        setTimeout(function() {
            if (!document.hidden) {
                forceDismiss();
            }
        }, 1000);
    }

    function setupLinkInterception() {
        document.addEventListener('click', function(e) {
            // Ignore if default prevented or modified click (Ctrl, Cmd, Shift, Alt, middle click)
            if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
                return;
            }

            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            const target = link.getAttribute('target');

            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || href.startsWith('https://wa.me') || target === '_blank') {
                return;
            }

            if (href.endsWith('.html') || href.includes('.html?') || href === './' || href === '../' || href === 'index.html') {
                e.preventDefault();
                try {
                    sessionStorage.setItem('ag_transition_active', 'true');
                } catch (err) {}
                runExitAnimation(href);
            }
        });
    }

    // ══════════════════════════════════════════════════════════════════
    // LIFECYCLE & BROWSER RESILIENCE HANDLERS (BFCache, Tab Wake, Focus)
    // ══════════════════════════════════════════════════════════════════

    // BFCache restore (Back/Forward navigation)
    window.addEventListener('pageshow', function(event) {
        forceDismiss();
    });

    // Page hide / unload reset
    window.addEventListener('pagehide', function() {
        forceDismiss();
    });

    // Tab visibility change (switching tabs or waking from sleep/repose)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            forceDismiss();
        }
    });

    // Window focus recovery
    window.addEventListener('focus', function() {
        forceDismiss();
    });

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            runEntranceAnimation();
            setupLinkInterception();
        });
    } else {
        runEntranceAnimation();
        setupLinkInterception();
    }
})();
