/**
 * GUARDIAN Lite — Alert Notification Manager
 * ==========================================
 * Manages floating notifications, alert feed,
 * and audio alerts using Web Audio API.
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
     * Play a beep sound using Web Audio API.
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

            // Different sounds per severity
            switch (severity) {
                case 'info':
                    oscillator.frequency.value = 440;
                    oscillator.type = 'sine';
                    gainNode.gain.value = 0.1;
                    oscillator.start();
                    oscillator.stop(ctx.currentTime + 0.15);
                    break;

                case 'warning':
                    oscillator.frequency.value = 600;
                    oscillator.type = 'triangle';
                    gainNode.gain.value = 0.15;
                    oscillator.start();
                    // Two beeps
                    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
                    gainNode.gain.setValueAtTime(0, ctx.currentTime + 0.12);
                    gainNode.gain.setValueAtTime(0.15, ctx.currentTime + 0.2);
                    gainNode.gain.setValueAtTime(0, ctx.currentTime + 0.32);
                    oscillator.stop(ctx.currentTime + 0.35);
                    break;

                case 'danger':
                    oscillator.frequency.value = 1000;
                    oscillator.type = 'square';
                    gainNode.gain.value = 0.15;
                    oscillator.start();
                    // PI PI PI
                    for (let i = 0; i < 3; i++) {
                        gainNode.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.2);
                        gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.2 + 0.1);
                    }
                    oscillator.stop(ctx.currentTime + 0.6);
                    break;

                case 'emergency':
                    // Faster, higher pitched PI PI PI PI PI
                    oscillator.type = 'square';
                    oscillator.frequency.value = 1200;
                    gainNode.gain.value = 0.2;
                    oscillator.start();
                    for (let i = 0; i < 5; i++) {
                        gainNode.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.15);
                        gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.15 + 0.08);
                    }
                    oscillator.stop(ctx.currentTime + 0.75);
                    break;
            }
        } catch (e) {
            console.warn('Audio alert failed:', e);
        }
    }


    // ═══════════════════════════════════════
    // Floating Notifications
    // ═══════════════════════════════════════
    let notificationCount = 0;
    const MAX_NOTIFICATIONS = 4;

    /**
     * Show a floating notification.
     * @param {Object} alert - { severity, icon, title, description, type }
     */
    function showNotification(alert) {
        const container = document.getElementById('notification-container');
        if (!container) return;

        // Limit visible notifications
        const existing = container.querySelectorAll('.notification');
        if (existing.length >= MAX_NOTIFICATIONS) {
            // Remove oldest
            existing[0].classList.add('removing');
            setTimeout(() => existing[0].remove(), 300);
        }

        const severity = alert.severity || 'info';
        const el = document.createElement('div');
        el.className = `notification severity-${severity}`;
        el.innerHTML = `
            <span class="notification-icon">${alert.icon || '🔔'}</span>
            <div class="notification-body">
                <div class="notification-title">${escapeHtml(alert.title || 'Alert')}</div>
                <div class="notification-desc">${escapeHtml(alert.description || '')}</div>
                <div class="notification-timer">
                    <div class="notification-timer-bar"></div>
                </div>
            </div>
        `;

        // Click to dismiss
        el.addEventListener('click', () => {
            el.classList.add('removing');
            setTimeout(() => el.remove(), 300);
        });

        container.appendChild(el);

        // Play sound
        playAlertSound(severity);

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            if (el.parentNode) {
                el.classList.add('removing');
                setTimeout(() => el.remove(), 300);
            }
        }, 8000);

        notificationCount++;
    }


    // ═══════════════════════════════════════
    // Alert Feed (in-panel list)
    // ═══════════════════════════════════════
    let feedCount = 0;
    const MAX_FEED_ITEMS = 50;

    /**
     * Add an alert to the in-panel feed.
     * @param {Object} alert - { severity, icon, title, description, timestamp }
     */
    function addToFeed(alert) {
        const feed = document.getElementById('alert-feed');
        const empty = document.getElementById('alert-empty');
        if (!feed) return;

        // Hide empty state
        if (empty) empty.style.display = 'none';

        const severity = alert.severity || 'info';
        const time = alert.timestamp
            ? new Date(alert.timestamp).toLocaleTimeString()
            : new Date().toLocaleTimeString();

        const card = document.createElement('div');
        card.className = `alert-card-feed severity-${severity}`;
        card.innerHTML = `
            <span class="alert-card-icon">${alert.icon || '🔔'}</span>
            <div class="alert-card-body">
                <div class="alert-card-title">${escapeHtml(alert.title || 'Alert')}</div>
                <div class="alert-card-desc">${escapeHtml(alert.description || '')}</div>
                <div class="alert-card-time">${time}</div>
            </div>
        `;

        // Insert at top
        feed.insertBefore(card, feed.firstChild);

        // Limit feed items
        const items = feed.querySelectorAll('.alert-card-feed');
        if (items.length > MAX_FEED_ITEMS) {
            items[items.length - 1].remove();
        }

        feedCount++;
        updateAlertCounter();
    }


    // ═══════════════════════════════════════
    // Combined: Show + Feed
    // ═══════════════════════════════════════

    /**
     * Process an incoming alert: show notification + add to feed.
     */
    function processAlert(alert) {
        showNotification(alert);
        addToFeed(alert);

        // Update stats
        if (alert.type === 'drowsiness') {
            incrementStat('stat-drowsy-events');
        } else if (alert.type === 'road_danger') {
            incrementStat('stat-road-alerts');
        }
    }


    // ═══════════════════════════════════════
    // Helpers
    // ═══════════════════════════════════════
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
        showNotification,
        addToFeed,
        playAlertSound,
    };
})();
