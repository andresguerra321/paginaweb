document.addEventListener('DOMContentLoaded', () => {
  // ===== CURRENCY TOGGLE (COP / USD) =====
  const currencyToggle = document.getElementById('currencyToggle')
  const priceAmounts = document.querySelectorAll('.price-amount')
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

      priceAmounts.forEach(el => {
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
  const revealElements = document.querySelectorAll('.glass-card, .section-header, .pricing-card, .showcase-card')
  
  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll')
  })

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
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
})
