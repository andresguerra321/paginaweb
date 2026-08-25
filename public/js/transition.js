(function() {
    'use strict';

    function createLoaderHTML() {
        // If overlay already exists in the page (pre-rendered in HTML for performance),
        // reuse it instead of creating a new one.
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
        var mainEl = document.querySelector('main.perf-hidden');
        if (mainEl) {
            mainEl.classList.remove('perf-hidden');
            mainEl.classList.add('perf-reveal');
        }
    }

    function runEntranceAnimation() {
        createLoaderHTML();
        const overlay = document.getElementById('page-transition-overlay');
        const bar = document.getElementById('minimal-bar');
        const content = document.getElementById('minimal-content');

        if (!overlay) {
            revealMainContent();
            return;
        }

        // Ensure overlay is visible
        overlay.classList.remove('hidden');
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        if (bar) bar.style.width = '0%';

        let isFinished = false;

        function finishLoading() {
            if (isFinished) return;
            isFinished = true;
            
            if (bar) bar.style.width = '100%';
            
            setTimeout(function() {
                revealMainContent();
                
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: overlay,
                        opacity: [1, 0],
                        duration: 350,
                        easing: 'easeOutQuad',
                        complete: function() {
                            overlay.classList.add('hidden');
                        }
                    });
                } else {
                    overlay.style.opacity = '0';
                    setTimeout(function() {
                        overlay.classList.add('hidden');
                    }, 350);
                }
            }, 300); // Pequeño retraso para que se vea el 100% de la barra
        }

        // Animación inicial del logo
        if (typeof anime !== 'undefined' && content) {
            anime({
                targets: content,
                opacity: [0.3, 1],
                scale: [0.95, 1],
                duration: 400,
                easing: 'easeOutQuad'
            });
        }

        // Tracking de assets (imágenes y videos activos)
        const assets = Array.from(document.querySelectorAll('img, video')).filter(function(asset) {
            if (asset.tagName.toLowerCase() === 'img') {
                return asset.src && asset.src !== '' && !asset.src.endsWith('#');
            }
            if (asset.tagName.toLowerCase() === 'video') {
                const hasSource = asset.src || asset.currentSrc || asset.querySelector('source[src]');
                const isPreloadNone = asset.getAttribute('preload') === 'none';
                return Boolean(hasSource) && !isPreloadNone;
            }
            return false;
        });

        let totalAssets = assets.length;
        let loadedCount = 0;

        function updateProgress() {
            loadedCount++;
            if (bar) {
                const percentage = Math.min((loadedCount / totalAssets) * 100, 100);
                bar.style.width = percentage + '%';
            }
            if (loadedCount >= totalAssets) {
                finishLoading();
            }
        }

        if (totalAssets === 0) {
            finishLoading();
        } else {
            assets.forEach(function(asset) {
                if (asset.tagName.toLowerCase() === 'img') {
                    if (asset.complete) {
                        updateProgress();
                    } else {
                        asset.addEventListener('load', updateProgress, { once: true });
                        asset.addEventListener('error', updateProgress, { once: true });
                    }
                } else if (asset.tagName.toLowerCase() === 'video') {
                    if (asset.readyState >= 3) {
                        updateProgress();
                    } else {
                        asset.addEventListener('canplay', updateProgress, { once: true });
                        asset.addEventListener('error', updateProgress, { once: true });
                    }
                }
            });
        }

        // Seguros de tiempo y carga completa
        setTimeout(finishLoading, 8000); // 8 segundos de tiempo máximo
        
        if (document.readyState === 'complete') {
            finishLoading();
        } else {
            window.addEventListener('load', finishLoading, { once: true });
        }
    }

    function runExitAnimation(targetUrl) {
        const overlay = document.getElementById('page-transition-overlay');
        const bar = document.getElementById('minimal-bar');

        if (!overlay) {
            window.location.href = targetUrl;
            return;
        }

        if (bar) bar.style.width = '0%';
        overlay.classList.remove('hidden');
        overlay.style.visibility = 'visible';

        if (typeof anime !== 'undefined') {
            anime({
                targets: overlay,
                opacity: [0, 1],
                duration: 250,
                easing: 'easeOutQuad',
                complete: function() {
                    window.location.href = targetUrl;
                }
            });
        } else {
            overlay.style.opacity = '1';
            setTimeout(function() {
                window.location.href = targetUrl;
            }, 250);
        }
    }

    function setupLinkInterception() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            const target = link.getAttribute('target');

            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('https://wa.me') || target === '_blank') {
                return;
            }

            if (href.endsWith('.html') || href.includes('.html?') || href === './' || href === '../' || href === 'index.html') {
                e.preventDefault();
                runExitAnimation(href);
            }
        });
    }

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
