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

  // ===== ROTATING SLIDESHOW (GALLERY) =====
  const gallery = document.querySelector('.horizontal-gallery');
  const slides = document.querySelectorAll('.horizontal-gallery .gallery-item');
  if (slides.length > 0 && gallery) {
    let currentSlideIndex = 0;
    let slideTimeout = null;
    const prevBtn = document.getElementById('galleryPrevBtn');
    const nextBtn = document.getElementById('galleryNextBtn');

    function goToSlide(index) {
      slides[currentSlideIndex].classList.remove('active');
      currentSlideIndex = index;
      
      if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
      } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
      }
      
      slides[currentSlideIndex].classList.add('active');
      gallery.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
      
      handleCurrentSlide();
    }

    function nextSlide() {
      goToSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentSlideIndex - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    function handleCurrentSlide() {
      clearTimeout(slideTimeout);
      // Rotates every 5.5 seconds
      slideTimeout = setTimeout(nextSlide, 5500);
    }

    // Initialize the slideshow
    handleCurrentSlide();
  }

  // ===== DEMO VIDEO MODAL =====
  const openDemoBtn = document.getElementById('openDemoBtn');
  const demoVideoModal = document.getElementById('demoVideoModal');
  const demoVideoClose = document.getElementById('demoVideoClose');
  const modalHeroVideo = document.getElementById('modalHeroVideo');

  if (openDemoBtn && demoVideoModal && modalHeroVideo) {
    openDemoBtn.addEventListener('click', () => {
      demoVideoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      modalHeroVideo.currentTime = 0;
      // Play with sound if possible since it was user-initiated
      modalHeroVideo.muted = false;
      modalHeroVideo.play().catch(e => {
        // Fallback to muted if browser strictly blocks it
        modalHeroVideo.muted = true;
        modalHeroVideo.play();
      });
    });

    const closeVideoModal = () => {
      demoVideoModal.classList.remove('active');
      document.body.style.overflow = '';
      modalHeroVideo.pause();
    };

    demoVideoClose.addEventListener('click', closeVideoModal);
    
    demoVideoModal.addEventListener('click', (e) => {
      if (e.target === demoVideoModal) {
        closeVideoModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && demoVideoModal.classList.contains('active')) {
        closeVideoModal();
      }
    });
  }

  // ===== ANTI-INSPECTION & SECURE VIDEO LOADING =====
  
  // 1. Obfuscate the video URL using a Blob object so it doesn't appear in the HTML
  if (modalHeroVideo) {
    const videoUrl = '../video/0811(1).mp4';
    fetch(videoUrl)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        modalHeroVideo.src = blobUrl;
      })
      .catch(err => console.warn("Could not load secure video blob"));
  }

  // 2. Disable right-click globally
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // 3. Disable common Developer Tools shortcuts
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
    }
    // Ctrl+Shift+I / Cmd+Option+I (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
    }
    // Ctrl+Shift+J / Cmd+Option+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
    }
    // Ctrl+U / Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
    }
  });

})
