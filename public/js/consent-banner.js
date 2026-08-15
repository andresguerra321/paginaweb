/**
 * Google Consent Mode v2 & Cookie Consent Banner
 * AG Private Engineering — Andrés Felipe Guerra
 */
(function() {
  'use strict';

  function initConsentBanner() {
    var consent = localStorage.getItem('cookie_consent');
    if (consent) {
      // User has already made their decision
      return;
    }

    var isEN = (window.i18nEngine && window.i18nEngine.getLanguage() === 'en') || 
               localStorage.getItem('portfolio_lang') === 'en';

    var text = {
      title: isEN ? 'Privacy & Consent Settings' : 'Configuración de Privacidad',
      desc: isEN 
        ? 'We use analytical cookies to measure traffic and optimize technical performance in compliance with European GDPR & Google Consent Mode v2.' 
        : 'Utilizamos cookies analíticas para medir el tráfico y optimizar el rendimiento técnico en conformidad con el RGPD europeo y Google Consent Mode v2.',
      accept: isEN ? 'Aceptar Todas' : 'Aceptar Todas',
      acceptEN: 'Accept All',
      decline: isEN ? 'Solo Esenciales' : 'Solo Esenciales',
      declineEN: 'Essential Only'
    };

    if (!document.getElementById('cookie-consent-styles')) {
      var style = document.createElement('style');
      style.id = 'cookie-consent-styles';
      style.textContent = `
        .cookie-consent-banner {
          position: fixed;
          bottom: 24px;
          right: 24px;
          max-width: 420px;
          width: calc(100% - 48px);
          background: rgba(10, 15, 29, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(59, 130, 246, 0.25);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(59, 130, 246, 0.15);
          border-radius: 14px;
          padding: 20px;
          z-index: 99999;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #f8fafc;
          animation: slideUpConsent 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideUpConsent {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cookie-consent-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .cookie-consent-icon {
          font-size: 1.2rem;
          color: #38bdf8;
        }
        .cookie-consent-title {
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #ffffff;
        }
        .cookie-consent-desc {
          font-size: 0.82rem;
          line-height: 1.5;
          color: #94a3b8;
          margin-bottom: 16px;
        }
        .cookie-consent-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        .cookie-btn {
          padding: 8px 16px;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-family: inherit;
        }
        .cookie-btn-decline {
          background: rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .cookie-btn-decline:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }
        .cookie-btn-accept {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
        }
        .cookie-btn-accept:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        @media (max-width: 480px) {
          .cookie-consent-banner {
            bottom: 16px;
            right: 16px;
            left: 16px;
            width: auto;
          }
          .cookie-consent-actions {
            flex-direction: column;
          }
          .cookie-btn {
            width: 100%;
            text-align: center;
          }
        }
      `;
      document.head.appendChild(style);
    }

    var banner = document.createElement('div');
    banner.id = 'cookieConsentBanner';
    banner.className = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-header">
        <span class="cookie-consent-icon">🛡️</span>
        <span class="cookie-consent-title" data-i18n="cookie_title">${isEN ? 'Privacy & Consent Settings' : text.title}</span>
      </div>
      <p class="cookie-consent-desc" data-i18n="cookie_desc">${isEN ? text.desc : text.desc}</p>
      <div class="cookie-consent-actions">
        <button type="button" class="cookie-btn cookie-btn-decline" id="btnDeclineCookies" data-i18n="cookie_btn_decline">${isEN ? text.declineEN : text.decline}</button>
        <button type="button" class="cookie-btn cookie-btn-accept" id="btnAcceptCookies" data-i18n="cookie_btn_accept">${isEN ? text.acceptEN : text.accept}</button>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('btnAcceptCookies').addEventListener('click', function() {
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted'
        });
      }
      localStorage.setItem('cookie_consent', 'granted');
      banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(function() { banner.remove(); }, 300);
    });

    document.getElementById('btnDeclineCookies').addEventListener('click', function() {
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
        });
      }
      localStorage.setItem('cookie_consent', 'denied');
      banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(function() { banner.remove(); }, 300);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsentBanner);
  } else {
    initConsentBanner();
  }
})();
