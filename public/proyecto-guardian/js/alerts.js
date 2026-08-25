/**
 * GUARDIAN Lite — Alert Notification Manager (Scandinavian UI)
 * ============================================================
 * Manages floating notifications, alert feed,
 * and audio alerts using Web Audio API with clean SVG icons.
 */

const AlertManager = (() => {
    // ═══════════════════════════════════════
    // Audio Engine (Web Audio API)
    // ═══════════════════════════════════════
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    /**
     * Play a calibrated beep sound using Web Audio API.
     * @param {'info'|'warning'|'danger'|'emergency'} severity
     */
    function playAlertSound(severity) {
        try {
            const ctx = getAudioContext();
            if (ctx.state === 'suspended') ctx.resume();

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            switch (severity) {
                case 'info':
                    oscillator.frequency.value = 440;
                    oscillator.type = 'sine';
                    gainNode.gain.value = 0.08;
                    oscillator.start();
                    oscillator.stop(ctx.currentTime + 0.12);
                    break;

                case 'warning':
                    oscillator.frequency.value = 580;
                    oscillator.type = 'triangle';
                    gainNode.gain.value = 0.12;
                    oscillator.start();
                    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
                    gainNode.gain.setValueAtTime(0, ctx.currentTime + 0.1);
                    gainNode.gain.setValueAtTime(0.12, ctx.currentTime + 0.18);
                    gainNode.gain.setValueAtTime(0, ctx.currentTime + 0.28);
                    oscillator.stop(ctx.currentTime + 0.3);
                    break;

                case 'danger':
                case 'emergency':
                    oscillator.frequency.value = 880;
                    oscillator.type = 'square';
                    gainNode.gain.value = 0.12;
                    oscillator.start();
                    for (let i = 0; i < 3; i++) {
                        gainNode.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.18);
                        gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.18 + 0.09);
                    }
                    oscillator.stop(ctx.currentTime + 0.55);
                    break;
            }
        } catch (e) {
            console.warn('Audio alert skipped:', e);
        }
    }

    function getAlertSvg(type, severity) {
        if (type === 'distraction') {
            return `<svg class="alert-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`;
        }
        if (type === 'drowsiness') {
            return `<svg class="alert-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
        }
        if (severity === 'danger' || severity === 'emergency') {
            return `<svg class="alert-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
        }
        if (severity === 'warning') {
            return `<svg class="alert-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
        }
        return `<svg class="alert-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    // ═══════════════════════════════════════
    // Alert Feed (in-panel list)
    // ═══════════════════════════════════════
    let feedCount = 0;
    const MAX_FEED_ITEMS = 30;

    function addToFeed(alert) {
        const feed = document.getElementById('alert-feed');
        const empty = document.getElementById('alert-empty');
        if (!feed) return;

        if (empty) empty.style.display = 'none';

        const severity = alert.severity || 'info';
        const time = alert.timestamp
            ? new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        const iconSvg = alert.svg || getAlertSvg(alert.type, severity);

        const card = document.createElement('div');
        card.className = `alert-item ${severity}`;
        card.innerHTML = `
            ${iconSvg}
            <div class="alert-item-content">
                <div class="alert-item-title">${escapeHtml(alert.title || 'Alerta')}</div>
                <div class="alert-item-desc">${escapeHtml(alert.description || '')}</div>
            </div>
            <div class="alert-item-time">${time}</div>
        `;

        feed.insertBefore(card, feed.firstChild);

        const items = feed.querySelectorAll('.alert-item');
        if (items.length > MAX_FEED_ITEMS) {
            items[items.length - 1].remove();
        }

        feedCount++;
        updateAlertCounter();
    }

    /**
     * Process an incoming alert: show notification + add to feed.
     */
    function processAlert(alert) {
        addToFeed(alert);
        playAlertSound(alert.severity || 'info');

        // Update session stats
        if (alert.type === 'drowsiness') {
            incrementStat('stat-drowsy-events');
        } else if (alert.type === 'road_danger') {
            incrementStat('stat-road-alerts');
        }
    }

    function updateAlertCounter() {
        const counter = document.getElementById('alert-count');
        if (counter) counter.textContent = feedCount;
    }

    function incrementStat(id) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = parseInt(el.textContent || '0') + 1;
        }
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    return {
        processAlert,
        addToFeed,
        playAlertSound,
    };
})();
