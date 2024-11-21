// Obtener la referencia a la imagen
const logo = document.querySelector('.logo');

// Función para actualizar el logo según el modo actual
const updateLogo = () => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  logo.src = isDarkMode ? './media/logo-url-dark.png' : './media/logo-url-light.png';
};

// Verificar si el usuario tiene el modo oscuro activado al cargar la página
updateLogo();

// Escuchar cambios en el modo de color
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  updateLogo();  // Actualiza el logo cuando cambia el modo
});