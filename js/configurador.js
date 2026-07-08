document.addEventListener('DOMContentLoaded', () => {

  const BASE_PRICE = 45900;
  const MODELO = 'CLA 200 Progressive';

  const OPCIONES = {
    color: [
      { id: 'blanco-polar', nombre: 'Blanco Polar', precio: 0, swatch: '#f5f5f0' },
      { id: 'negro-cosmos', nombre: 'Negro Cosmos', precio: 0, swatch: '#101010' },
      { id: 'plata-iridio', nombre: 'Plata Iridio', precio: 900, swatch: '#c8ccd0' },
      { id: 'azul-cavansite', nombre: 'Azul Cavansite', precio: 1200, swatch: '#1f3a63' },
      { id: 'rojo-patagonia', nombre: 'Rojo Patagonia', precio: 1500, swatch: '#7a1620' },
    ],
    rines: [
      { id: 'r17', nombre: 'Llantas 17" de 5 radios', precio: 0 },
      { id: 'r18', nombre: 'Llantas 18" AMG multirradios', precio: 1800 },
      { id: 'r19', nombre: 'Llantas 19" AMG turbina', precio: 2600 },
    ],
    interior: [
      { id: 'tela-negro', nombre: 'Tela microcorte negro', precio: 0 },
      { id: 'artico-negro', nombre: 'ARTICO cuero sintético negro', precio: 1100 },
      { id: 'nappa-marron', nombre: 'Cuero Nappa marrón', precio: 2400 },
    ],
  };

  const state = {
    color: OPCIONES.color[0].id,
    rines: OPCIONES.rines[0].id,
    interior: OPCIONES.interior[0].id,
  };

  const grupoColor = document.getElementById('grupoColor');
  const grupoRines = document.getElementById('grupoRines');
  const grupoInterior = document.getElementById('grupoInterior');
  const visorColorLabel = document.getElementById('visorColorLabel');
  const resumenLista = document.getElementById('resumenLista');
  const resumenTotal = document.getElementById('resumenTotal');
  const resumenFeedback = document.getElementById('resumenFeedback');
  const btnCopiarResumen = document.getElementById('btnCopiarResumen');
  const btnReset = document.getElementById('btnReset');

  const formatoPrecio = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  function buscarOpcion(grupo, id) {
    return OPCIONES[grupo].find(o => o.id === id);
  }

  function renderGrupo(contenedor, grupo) {
    contenedor.innerHTML = '';
    OPCIONES[grupo].forEach(opcion => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'config-opcion';
      btn.dataset.grupo = grupo;
      btn.dataset.id = opcion.id;

      if (opcion.swatch) {
        const swatch = document.createElement('span');
        swatch.className = 'config-opcion__swatch';
        swatch.style.backgroundColor = opcion.swatch;
        btn.appendChild(swatch);
      }

      const texto = document.createElement('span');
      texto.innerHTML = `${opcion.nombre}<span class="config-opcion__precio">${opcion.precio > 0 ? '+' + formatoPrecio.format(opcion.precio) : 'Incluido'}</span>`;
      btn.appendChild(texto);

      btn.addEventListener('click', () => {
        state[grupo] = opcion.id;
        render();
      });

      contenedor.appendChild(btn);
    });
  }

  function calcularTotal() {
    const color = buscarOpcion('color', state.color);
    const rines = buscarOpcion('rines', state.rines);
    const interior = buscarOpcion('interior', state.interior);
    return {
      color, rines, interior,
      total: BASE_PRICE + color.precio + rines.precio + interior.precio,
    };
  }

  function render() {
    ['color', 'rines', 'interior'].forEach(grupo => {
      document.querySelectorAll(`.config-opcion[data-grupo="${grupo}"]`).forEach(btn => {
        btn.classList.toggle('activa', btn.dataset.id === state[grupo]);
      });
    });

    const { color, rines, interior, total } = calcularTotal();
    visorColorLabel.textContent = color.nombre;

    resumenLista.innerHTML = `
      <li><span>Modelo base</span><span>${formatoPrecio.format(BASE_PRICE)}</span></li>
      <li><span>${color.nombre}</span><span>${color.precio > 0 ? '+' + formatoPrecio.format(color.precio) : 'Incluido'}</span></li>
      <li><span>${rines.nombre}</span><span>${rines.precio > 0 ? '+' + formatoPrecio.format(rines.precio) : 'Incluido'}</span></li>
      <li><span>${interior.nombre}</span><span>${interior.precio > 0 ? '+' + formatoPrecio.format(interior.precio) : 'Incluido'}</span></li>
    `;
    resumenTotal.textContent = formatoPrecio.format(total);
  }

  function construirResumenTexto() {
    const { color, rines, interior, total } = calcularTotal();
    return `${MODELO}\nColor: ${color.nombre}\nLlantas: ${rines.nombre}\nInterior: ${interior.nombre}\nPrecio total: ${formatoPrecio.format(total)}`;
  }

  btnCopiarResumen.addEventListener('click', async () => {
    const texto = construirResumenTexto();
    try {
      await navigator.clipboard.writeText(texto);
      resumenFeedback.textContent = 'Resumen copiado al portapapeles.';
    } catch {
      resumenFeedback.textContent = 'No se pudo copiar. Copiá el resumen manualmente.';
    }
    setTimeout(() => { resumenFeedback.textContent = ''; }, 3000);
  });

  btnReset.addEventListener('click', () => {
    state.color = OPCIONES.color[0].id;
    state.rines = OPCIONES.rines[0].id;
    state.interior = OPCIONES.interior[0].id;
    render();
    resumenFeedback.textContent = 'Configuración restablecida.';
    setTimeout(() => { resumenFeedback.textContent = ''; }, 2000);
  });

  renderGrupo(grupoColor, 'color');
  renderGrupo(grupoRines, 'rines');
  renderGrupo(grupoInterior, 'interior');
  render();
});
