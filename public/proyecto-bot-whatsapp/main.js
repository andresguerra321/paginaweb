document.addEventListener('DOMContentLoaded', () => {
  // ===== CURRENCY TOGGLE (COP / USD) =====
  // Removed dead code since pricing toggle no longer exists in UI

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
  // Collect all revealable elements that might not have the class in HTML
  const autoReveal = document.querySelectorAll('.glass-card, .section-header, .pricing-card, .showcase-card, .promo-banner, .timeline-panel, .portfolio-item');
  
  autoReveal.forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  // Apply staggered delays to grouped elements
  function applyStaggeredDelays(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      const delayClass = `reveal-delay-${Math.min(index + 1, 6)}`;
      el.classList.add(delayClass);
    });
  }

  applyStaggeredDelays('.feature-card');
  applyStaggeredDelays('.pricing-card');
  applyStaggeredDelays('.portfolio-item');
  applyStaggeredDelays('.delivery-portfolio-grid > div');
  applyStaggeredDelays('.timeline > li');

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  };

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe ALL elements with .reveal-on-scroll (both auto-added and in HTML markup)
    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));
  } else {
    // Graceful fallback for older environments
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
  }

  // ===== HIDE VIDEO FALLBACK IF VIDEO LOADS =====
  // Removed dead code since heroVideo and videoFallback no longer exist

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

  let videoBlobLoaded = false;
  let isFetchingVideo = false;

  function loadAndPlayDemoVideo() {
    if (!modalHeroVideo) return;
    
    if (modalHeroVideo.src && videoBlobLoaded) {
      modalHeroVideo.currentTime = 0;
      modalHeroVideo.muted = false;
      modalHeroVideo.play().catch(e => {
        modalHeroVideo.muted = true;
        modalHeroVideo.play();
      });
      return;
    }

    if (isFetchingVideo) return;
    isFetchingVideo = true;

    const videoUrl = '../video/0811(1).mp4';
    fetch(videoUrl)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        modalHeroVideo.src = blobUrl;
        videoBlobLoaded = true;
        isFetchingVideo = false;
        modalHeroVideo.currentTime = 0;
        modalHeroVideo.muted = false;
        modalHeroVideo.play().catch(e => {
          modalHeroVideo.muted = true;
          modalHeroVideo.play();
        });
      })
      .catch(err => {
        console.warn("Could not load video blob", err);
        // Fallback
        modalHeroVideo.src = videoUrl;
        videoBlobLoaded = true;
        isFetchingVideo = false;
        modalHeroVideo.play().catch(() => {});
      });
  }

  if (openDemoBtn && demoVideoModal && modalHeroVideo) {
    openDemoBtn.addEventListener('click', () => {
      demoVideoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      loadAndPlayDemoVideo();
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

})
