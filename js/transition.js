(function() {
    'use strict';

    function createLoaderHTML() {
        if (document.getElementById('page-transition-overlay')) return;
        const loaderDiv = document.createElement('div');
        loaderDiv.id = 'page-transition-overlay';
        loaderDiv.className = 'page-transition-overlay hidden';
        loaderDiv.innerHTML = `
            <div class="minimal-progress-bar" id="minimal-bar"></div>
            <div class="minimal-loader-content" id="minimal-content">
                <div class="minimal-loader-logo">AG<span>.</span></div>
            </div>
        `;
        document.body.prepend(loaderDiv);
    }

    function runEntranceAnimation() {
        createLoaderHTML();
        const overlay = document.getElementById('page-transition-overlay');
        const bar = document.getElementById('minimal-bar');
        const content = document.getElementById('minimal-content');

        if (!overlay) return;

        overlay.classList.remove('hidden');
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        if (bar) bar.style.width = '0%';

        if (typeof anime !== 'undefined') {
            const tl = anime.timeline({
                complete: function() {
                    anime({
                        targets: overlay,
                        opacity: [1, 0],
                        duration: 350,
                        easing: 'easeOutQuad',
                        complete: function() {
                            overlay.classList.add('hidden');
                        }
                    });
                }
            });

            tl.add({
                targets: content,
                opacity: [0.3, 1],
                scale: [0.95, 1],
                duration: 400,
                easing: 'easeOutQuad'
            }).add({
                targets: bar,
                width: ['0%', '100%'],
                duration: 650,
                easing: 'easeInOutCubic'
            }, '-=300');

        } else {
            if (bar) bar.style.width = '100%';
            setTimeout(function() {
                overlay.style.opacity = '0';
                setTimeout(function() {
                    overlay.classList.add('hidden');
                }, 350);
            }, 700);
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
