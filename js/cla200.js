document.addEventListener('DOMContentLoaded', () => {
  // 1. Base de datos con la info de cada hotspot
const featuresData = {
    frontal: {
      title: "Diseño frontal llamativo",
      description: "La nueva parte delantera impresiona con su llamativa parrilla y faros rediseñados que le otorgan un aspecto más deportivo.",
      image: "../../assets/img/JSCLA200 2.avif" // <-- Así queda la ruta correcta
    },
    techo: {
      title: "Techo corredizo panorámico",
      description: "Tanto abierto como cerrado, el techo corredizo panorámico te permite experimentar una maravillosa sensación de libertad y disfrutar de un ambiente agradable en el interior del vehículo. Visto desde el exterior, ejerce también un efecto singular.",
      image: "../../assets/img/JSCLA200 3.avif"
    },
    trasera: {
      title: "Zaga elegante",
      description: "La parte trasera fluye en una línea elegante típica de la silueta coupé, mejorando la aerodinámica y la estética general.",
      image: "../../assets/img/JSCLA200 4.avif"
    },
    baul: {
      title: "Amplio espacio",
      description: "A pesar de su diseño deportivo, el maletero ofrece un volumen generoso, ideal para tus viajes y uso diario.",
      image: "../../assets/img/JSCLA200 5.avif"
    }
  };

  // 2. Seleccionar los elementos del DOM
  const hotspots = document.querySelectorAll('.hotspot');
  const panel = document.getElementById('detail-panel');
  const overlay = document.getElementById('car-overlay');
  const closeBtn = document.getElementById('close-panel');
  
  const panelTitle = document.getElementById('detail-title');
  const panelText = document.getElementById('detail-text');
  const panelImg = document.getElementById('detail-img');

  // 3. Función para abrir el panel
  function openPanel(id) {
    const data = featuresData[id];
    if (!data) return;

    // Actualizar contenido
    panelTitle.textContent = data.title;
    panelText.textContent = data.description;
    panelImg.src = data.image;

    // Manejar clases visuales
    hotspots.forEach(h => h.classList.remove('active')); // Limpia todos los puntos
    document.querySelector(`.hotspot[data-id="${id}"]`).classList.add('active'); // Activa el clickeado
    
    panel.classList.add('open');
    overlay.classList.add('active');
  }

  // 4. Función para cerrar el panel
  function closePanel() {
    panel.classList.remove('open');
    overlay.classList.remove('active');
    hotspots.forEach(h => h.classList.remove('active'));
  }

  // 5. Asignar eventos a los clicks
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      openPanel(id);
    });
  });

  // Cerrar al tocar la X o hacer clic afuera (en el overlay oscuro)
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
});


document.addEventListener('DOMContentLoaded', () => {
  // 1. Base de datos con la info EXCLUSIVA del interior
  const interiorData = {
    volante: {
      title: "Volante deportivo multifunción",
      description: "El volante deportivo multifunción en napa combina materiales nobles con un innovador confort de manejo.",
      image: "../../assets/img/JSCLA200 7.webp" // Aplicá el truquito de VS Code acá
    },
    pantalla: {
      title: "Visualizador de medios",
      description: "El visualizador de medios de alta resolución te conecta en red con el coche en gran formato (10,25\"). Reacciona al tacto.",
      image: "../../assets/img/JSCLA200 8.avif"
    },
    asientos: {
      title: "Asientos deportivos",
      description: "Los asientos deportivos te ofrecen un confort excepcional gracias a su ergonomía y la posición de asiento baja.",
      image: "../../assets/img/JSCLA200 9.avif"
    }
  };

  // 2. Seleccionar los elementos específicos del INTERIOR
  const hotspotsInterior = document.querySelectorAll('.hotspot-interior');
  const panelInterior = document.getElementById('detail-panel-interior');
  const overlayInterior = document.getElementById('car-overlay-interior');
  const closeBtnInterior = document.getElementById('close-panel-interior');
  
  const titleInterior = document.getElementById('detail-title-interior');
  const textInterior = document.getElementById('detail-text-interior');
  const imgInterior = document.getElementById('detail-img-interior');

  // 3. Función para abrir el panel del interior
  function openPanelInterior(id) {
    const data = interiorData[id];
    if (!data) return;

    // Inyectar datos
    titleInterior.textContent = data.title;
    textInterior.textContent = data.description;
    imgInterior.src = data.image;

    // Manejar clases de los puntos
    hotspotsInterior.forEach(h => h.classList.remove('active'));
    document.querySelector(`.hotspot-interior[data-id="${id}"]`).classList.add('active');
    
    // Abrir panel
    panelInterior.classList.add('open');
    overlayInterior.classList.add('active');
  }

  // 4. Función para cerrar
  function closePanelInterior() {
    panelInterior.classList.remove('open');
    overlayInterior.classList.remove('active');
    hotspotsInterior.forEach(h => h.classList.remove('active'));
  }

  // 5. Asignar eventos
  hotspotsInterior.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      openPanelInterior(id);
    });
  });

  closeBtnInterior.addEventListener('click', closePanelInterior);
  overlayInterior.addEventListener('click', closePanelInterior);
});