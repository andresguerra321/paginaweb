document.addEventListener('DOMContentLoaded', () => {
  // ===== CURRENCY TOGGLE (COP / USD) =====
  const currencyToggle = document.getElementById('currencyToggle')
  const priceAmounts = document.querySelectorAll('.price-amount')
  const priceOriginals = document.querySelectorAll('.price-original')
  const labelCOP = document.getElementById('labelCOP')
  const labelUSD = document.getElementById('labelUSD')

  if (currencyToggle) {
    currencyToggle.addEventListener('change', () => {
      const isUSD = currencyToggle.checked

      if (isUSD) {
        labelCOP.classList.add('muted')
        labelUSD.classList.remove('muted')
      } else {
        labelCOP.classList.remove('muted')
        labelUSD.classList.add('muted')
      }

      // Update discounted prices
      priceAmounts.forEach(el => {
        const cop = el.getAttribute('data-cop')
        const usd = el.getAttribute('data-usd')
        el.textContent = isUSD ? usd : cop
      })

      // Update original (strikethrough) prices
      priceOriginals.forEach(el => {
        const cop = el.getAttribute('data-cop')
        const usd = el.getAttribute('data-usd')
        el.textContent = isUSD ? usd : cop
      })
    })
  }

  // ===== CUSTOM 60FPS SMOOTH SCROLL ENGINE (requestAnimationFrame) =====
  // Garantiza un desplazamiento suave estilo seda (ease-in-out-cubic) sin importar el navegador o móvil.
  function smoothScrollTo(targetEl, duration = 900) {
    const navHeight = document.getElementById('navbar')?.offsetHeight || 70
    const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 20
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    // Easing function cubic para aceleración y desaceleración progresiva y suave
    function easeInOutCubic(t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t * t + b
      t -= 2
      return c / 2 * (t * t * t + 2) + b
    }

    function step(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const nextY = easeInOutCubic(timeElapsed, startPosition, distance, duration)
      
      window.scrollTo(0, nextY)

      if (timeElapsed < duration) {
        requestAnimationFrame(step)
      } else {
        window.scrollTo(0, targetPosition)
        // Destello neón suave al aterrizar
        targetEl.classList.add('section-glow-effect')
        setTimeout(() => {
          targetEl.classList.remove('section-glow-effect')
        }, 1600)
      }
    }

    requestAnimationFrame(step)
  }

  // Interceptar todos los clics en enlaces ancla (#)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')
      if (!targetId || targetId === '#') return

      const targetEl = document.querySelector(targetId)
      if (targetEl) {
        e.preventDefault()
        smoothScrollTo(targetEl, 900)
      }
    })
  })

  // ===== SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER) =====
  // Collect all revealable elements
  const revealElements = document.querySelectorAll('.glass-card, .section-header, .pricing-card, .showcase-card, .promo-banner')
  
  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll')
  })

  // Apply staggered delays to grouped elements
  function applyStaggeredDelays(selector) {
    const elements = document.querySelectorAll(selector)
    elements.forEach((el, index) => {
      const delayClass = `reveal-delay-${Math.min(index + 1, 6)}`
      el.classList.add(delayClass)
    })
  }

  applyStaggeredDelays('.feature-card')
  applyStaggeredDelays('.pricing-card')

  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  revealElements.forEach(el => revealObserver.observe(el))

  // ===== HIDE VIDEO FALLBACK IF VIDEO LOADS =====
  const heroVideo = document.getElementById('heroVideo')
  const videoFallback = document.getElementById('videoFallback')

  if (heroVideo && videoFallback) {
    heroVideo.addEventListener('loadeddata', () => {
      videoFallback.style.display = 'none'
    })

    // If the video already loaded before the listener was attached
    if (heroVideo.readyState >= 2) {
      videoFallback.style.display = 'none'
    }
  }

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById('lightbox')
  const lightboxImg = document.getElementById('lightboxImg')
  const lightboxClose = document.getElementById('lightboxClose')
  const zoomableImages = document.querySelectorAll('.showcase-img, .plan-card-img')

  if (lightbox && lightboxImg) {
    zoomableImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src
        lightbox.classList.add('active')
        // Prevent background scrolling when lightbox is open
        document.body.style.overflow = 'hidden'
      })
    })

    const closeLightbox = () => {
      lightbox.classList.remove('active')
      document.body.style.overflow = ''
    }

    lightboxClose.addEventListener('click', closeLightbox)

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })

    // Add escape key listener to close lightbox
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox()
      }
    })
  }
})
