window.cambiarImagen = function(idImagen, arrayImagenes) {
    const imagenElement = document.getElementById(idImagen);
    
    // Verificamos que exista la imagen
    if (!imagenElement) return; 
    
    // Obtenemos el índice actual y calculamos el siguiente
    let indiceActual = parseInt(imagenElement.getAttribute('data-index')) || 0;
    let proximoIndice = (indiceActual + 1) % arrayImagenes.length;
    
    // Actualizamos el src de la imagen y guardamos el nuevo índice
    imagenElement.src = arrayImagenes[proximoIndice];
    imagenElement.setAttribute('data-index', proximoIndice);
};