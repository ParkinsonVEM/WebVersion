const temaButton = document.getElementById('temas');

temaButton.addEventListener('click', toggleTema);

function toggleTema(event) {
  // Prevenir el comportamiento predeterminado del enlace
  if (event) {
    event.preventDefault();
  }
  
  console.log('Toggle tema');
  const currentTema = localStorage.getItem('tema') || 'oscuro';
  console.log(`Current tema: ${currentTema}`);
  let newTema;

  // Cambiar entre los 9 temas de forma cíclica
  switch(currentTema) {
    case 'oscuro':
      newTema = 'claro';
      break;
    case 'claro':
      newTema = 'blanco';
      break;
    case 'blanco':
      newTema = 'negro';
      break;
    case 'negro':
      newTema = 'rojo';
      break;
    case 'rojo':
      newTema = 'verde';
      break;
    case 'verde':
      newTema = 'naranja';
      break;
    case 'naranja':
      newTema = 'morado';
      break;
    case 'morado':
      newTema = 'rosa';
      break;
    case 'rosa':
    default:
      newTema = 'oscuro';
      break;
  }

  console.log(`New tema: ${newTema}`);
  localStorage.setItem('tema', newTema);

  updateStylesheets(newTema);
  
  // Actualizar el texto del tema actual si estamos en la página de configuración
  const temaActualSpan = document.getElementById('temaActual');
  if (temaActualSpan) {
    const nombreTema = newTema.charAt(0).toUpperCase() + newTema.slice(1);
    temaActualSpan.textContent = nombreTema;
  }
}

function updateStylesheets(tema) {
  const links = document.querySelectorAll('link[rel="stylesheet"]');

  links.forEach((link) => {
    const href = link.href;
    if (!href.includes("fonts.googleapis.com") && !href.includes("material-icons")) {
      const filename = href.split('/').pop();
      const baseFilename = filename.replace(/[0-9].css$/, '').replace('.css', '');
      
      switch(tema) {
        case 'oscuro':
          link.href = `Temas/temaOscuro/${baseFilename}.css`;
          console.log(`Cambiando a tema oscuro: ${link.href}`);
          break;
        case 'claro':
          link.href = `Temas/temaClaro/${baseFilename}2.css`;
          console.log(`Cambiando a tema claro: ${link.href}`);
          break;
        case 'blanco':
          link.href = `Temas/temaBlanco/${baseFilename}3.css`;
          console.log(`Cambiando a tema blanco: ${link.href}`);
          break;
        case 'negro':
          link.href = `Temas/temaNegro/${baseFilename}4.css`;
          console.log(`Cambiando a tema negro: ${link.href}`);
          break;
        case 'rojo':
          link.href = `Temas/temaRojo/${baseFilename}5.css`;
          console.log(`Cambiando a tema rojo: ${link.href}`);
          break;
        case 'verde':
          link.href = `Temas/temaVerde/${baseFilename}6.css`;
          console.log(`Cambiando a tema verde: ${link.href}`);
          break;
        case 'naranja':
          link.href = `Temas/temaNaranja/${baseFilename}7.css`;
          console.log(`Cambiando a tema naranja: ${link.href}`);
          break;
        case 'morado':
          link.href = `Temas/temaMorado/${baseFilename}8.css`;
          console.log(`Cambiando a tema morado: ${link.href}`);
          break;
        case 'rosa':
          link.href = `Temas/temaRosa/${baseFilename}9.css`;
          console.log(`Cambiando a tema rosa: ${link.href}`);
          break;
        default:
          link.href = `Temas/temaOscuro/${baseFilename}.css`;
          console.log(`Cambiando a tema oscuro (default): ${link.href}`);
      }
    }
  });
}