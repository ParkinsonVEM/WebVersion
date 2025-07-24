// Script para actualizar automáticamente todos los archivos HTML con el nuevo código de inicialización de tema

const fs = require('fs');
const path = require('path');

// Directorio raíz del proyecto
const rootDir = __dirname;

// Nuevo script para inicializar el tema
const newScript = `<script>
  document.addEventListener('DOMContentLoaded', function() {
    // No necesitamos buscar el botón de temas en esta página
  });
  
  // Inicializar el tema actual
  const currentTema = localStorage.getItem('tema') || 'oscuro';
  console.log(\`Current tema en HTML: \${currentTema}\`);
  updateStylesheets(currentTema);
</script>`;

// Patrones de scripts antiguos a reemplazar
const scriptPatterns = [
  /<script>\s*document\.addEventListener\('DOMContentLoaded', function\(\) \{\s*const temaButton = document\.getElementById\('temas'\);\s*\}\);\s*const currentTema = localStorage\.getItem\('tema'\);\s*console\.log\(`Current tema en HTML: \${currentTema}`\);\s*updateStylesheets\(currentTema\);\s*<\/script>/g,
  /<script>\s*document\.addEventListener\('DOMContentLoaded', function \(\) \{\s*const temaButton = document\.getElementById\('temas'\);\s*\}\);\s*const currentTema = localStorage\.getItem\('tema'\);\s*console\.log\(`Current tema en HTML: \${currentTema}`\);\s*updateStylesheets\(currentTema\);\s*<\/script>/g
];

// Función para actualizar un archivo HTML
function updateHtmlFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Comprobar si el archivo ya tiene el nuevo script
    if (content.includes('const currentTema = localStorage.getItem(\'tema\') || \'oscuro\'')) {
      console.log(`El archivo ${filePath} ya está actualizado.`);
      return;
    }
    
    // Reemplazar los patrones de scripts antiguos
    for (const pattern of scriptPatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, newScript);
        updated = true;
      }
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Actualizado: ${filePath}`);
    } else {
      console.log(`No se encontró un patrón coincidente en: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error al procesar ${filePath}:`, error);
  }
}

// Función para recorrer recursivamente un directorio
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
      // Procesar subdirectorios, excepto node_modules y .git
      processDirectory(filePath);
    } else if (stat.isFile() && path.extname(file).toLowerCase() === '.html') {
      // Procesar archivos HTML
      updateHtmlFile(filePath);
    }
  }
}

// Iniciar el procesamiento desde el directorio raíz
console.log('Iniciando actualización de scripts en archivos HTML...');
processDirectory(rootDir);
console.log('Proceso completado.');