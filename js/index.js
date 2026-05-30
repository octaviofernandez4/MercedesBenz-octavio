// ==========================================
// CONTROL DEL VIDEO (HERO)
// ==========================================
(function () {
  const btn   = document.getElementById('videoToggle');
  const video = document.getElementById('heroVideo');
  if (!btn || !video) return;

  const iconPause = btn.querySelector('.icon-pause');
  const iconPlay  = btn.querySelector('.icon-play');

  btn.addEventListener('click', function () {
    if (video.paused) {
      video.play();
      iconPause.style.display = '';
      iconPlay.style.display  = 'none';
      btn.setAttribute('aria-label', 'Pausar video');
    } else {
      video.pause();
      iconPause.style.display = 'none';
      iconPlay.style.display  = '';
      btn.setAttribute('aria-label', 'Reproducir video');
    }
  });
})();

// ==========================================
// SLIDER DE SERVICIOS AL CLIENTE
// ==========================================
const sliderWrapper = document.getElementById('sliderWrapper');
const btnNext = document.getElementById('btnNext');
const dots = document.querySelectorAll('.dot');

if (sliderWrapper) {
  let currentView = 0;
  let startX = 0;
  let endX = 0;

  function updateSlider() {
    // Detectamos si estamos en celular (pantalla menor a 768px)
    const isMobile = window.innerWidth <= 768;
    
    // En celular hay 6 vistas de 1 tarjeta. En PC hay 3 vistas de 2 tarjetas.
    const maxViews = isMobile ? 6 : 3; 

    // Si nos pasamos del límite, volvemos al principio (o al final)
    if (currentView >= maxViews) currentView = 0;
    if (currentView < 0) currentView = maxViews - 1;

    // Calculamos medidas
    const card = document.querySelector('.slider__card');
    const cardWidth = card.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(sliderWrapper).gap) || 0;

    // Si es mobile multiplicamos por 1, si es PC multiplicamos por 2
    const moveAmount = (cardWidth + gap) * (isMobile ? currentView : currentView * 2);
    sliderWrapper.style.transform = `translateX(-${moveAmount}px)`;

    // Actualizamos los 3 puntitos. En celular, cada punto dura 2 tarjetas.
    dots.forEach((dot, index) => {
      let dotIndex = isMobile ? Math.floor(currentView / 2) : currentView;
      if (index === dotIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // EVENTO 1: Clic en la flecha (Solo para PC)
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      currentView++;
      updateSlider();
    });
  }

  // EVENTO 2: Tocar la pantalla (Mobile)
  sliderWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Guardamos dónde apoyó el dedo
  }, {passive: true});

  // EVENTO 3: Soltar la pantalla (Mobile)
  sliderWrapper.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX; // Guardamos dónde soltó el dedo
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50; // Mínimo de distancia para considerarlo un "deslizamiento"
    const swipeDistance = startX - endX;

    if (swipeDistance > threshold) {
      // Deslizó hacia la izquierda (Siguiente foto)
      currentView++;
      updateSlider();
    } else if (swipeDistance < -threshold) {
      // Deslizó hacia la derecha (Foto anterior)
      currentView--;
      updateSlider();
    }
  }
  
  // Recalcular si el usuario gira el celular o achica la ventana
  window.addEventListener('resize', () => {
    currentView = 0; // Reseteamos a la primera vista por precaución
    updateSlider();
  });
}