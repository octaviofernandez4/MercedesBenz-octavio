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

if (sliderWrapper && btnNext) {
  let currentView = 0;
  const totalViews = 3; // Tenemos 3 vistas (2 tarjetas por vista)

  btnNext.addEventListener('click', () => {
    currentView++;
    
    // Si superamos la última vista, volvemos a empezar en la primera
    if (currentView >= totalViews) {
      currentView = 0;
    }
    
    // Calculamos el tamaño de las tarjetas y el gap en píxeles
    const card = document.querySelector('.slider__card');
    const cardWidth = card.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(sliderWrapper).gap) || 0;
    
    // Agrupamos (ancho de tarjeta + gap) y lo multiplicamos por las 2 tarjetas que queremos mover
    const moveAmount = (cardWidth + gap) * 2 * currentView;
    sliderWrapper.style.transform = `translateX(-${moveAmount}px)`;
    
    // Actualizamos qué puntito está marcado de negro
    dots.forEach((dot, index) => {
      if (index === currentView) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  });
}