// Selección de elementos del DOM
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const movingBar = document.querySelector('.moving-bar');
const sliderPoint = document.querySelector('.slider-point');
const body = document.body;
const toggleBar = document.getElementById('toggle-bar');
const favicon = document.getElementById('favicon'); // Obtener el elemento del favicon

// Configuración de posiciones del slider en rem (1rem = 16px por defecto)
const sunPosition = 2.5;  // 2.5rem (equivalente a 40px si 1rem = 16px)
const moonPosition = 17;  // 14rem (equivalente a 224px si 1rem = 16px)

// Definición de la raíz en base a la resolución de 1920px (1920px / 16 = 120rem)
const baseFontSize = 16; // Asumiendo que el tamaño base en rem es 16px
const baseWidth = 1920;  // Resolución base del contenedor

// Definimos las posiciones en función de la proporción del contenedor
const calculatePositionInRem = (positionPx) => {
  return (positionPx / baseWidth) * 100; // Calculamos el porcentaje de la posición en relación con el contenedor
};

// Centralización de rutas para imágenes y otros recursos
const assets = {
  logo: {
    dark: './media/logo-url-dark.png',
    light: './media/logo-url-light.png'
  },
  favicon: {
    dark: './media/logo-url-dark.png',
    light: './media/logo-url-light.png'
  },
  homelogo: {
    dark: './media/logo-dark.png',
    light: './media/logo-light.png'
  },
  homelogoshadow: {
    dark: './media/logo-shadow-dark.png',
    light: './media/logo-shadow-light.png'
  }
  // FUTURAS IMÁGENES (Agregar más recursos aquí)
  // Por ejemplo:
  // background: {
  //   dark: './media/background-dark.png',
  //   light: './media/background-light.png'
  // }
};

// Forzar modo oscuro al cargar la página
sliderPoint.style.left = `${calculatePositionInRem(moonPosition)}rem`; // Posicionar el punto en la luna
body.classList.add('dark-mode'); // Activar modo oscuro por defecto
localStorage.setItem('mode', 'dark'); // Sobrescribir el modo en localStorage

// Función para actualizar imágenes y favicon según el tema
const updateThemeAssets = () => {
  const isDarkMode = body.classList.contains('dark-mode');
  
  // Actualizar el logo
  const logo = document.querySelector('.logo');
  logo.src = isDarkMode ? assets.logo.dark : assets.logo.light;

  // Actualizar el favicon
  favicon.href = isDarkMode ? assets.favicon.dark : assets.favicon.light;


  // Actualizar el home-logo
  const homelogo = document.querySelector('.home-logo');
  homelogo.src = isDarkMode ? assets.homelogo.dark : assets.homelogo.light;
  // Actualizar el home-logo-shadow
  const homelogoshadow = document.querySelector('.home-logo-shadow');
  homelogoshadow.src = isDarkMode ? assets.homelogoshadow.dark : assets.homelogoshadow.light;
  // FUTURAS ACTUALIZACIONES DE IMÁGENES
  // Aquí puedes actualizar otras imágenes, fondos, iconos, etc.
  // Por ejemplo:
  // const background = document.querySelector('.background');
  // background.src = isDarkMode ? assets.background.dark : assets.background.light;
};

// Función para alternar entre temas (claro/oscuro)
const toggleTheme = () => {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('mode', 'light'); // Guardar el modo claro
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('mode', 'dark'); // Guardar el modo oscuro
  }
  updateThemeAssets(); // Actualizar recursos según el tema
};

// Función para mover el slider y cambiar el tema
const moveSlider = (position) => {
  sliderPoint.style.left = `${calculatePositionInRem(position)}rem`; // Mueve el punto del slider en rem
  if (position === sunPosition) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('mode', 'light');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('mode', 'dark');
  }
  updateThemeAssets(); // Actualizar recursos según el tema
};

// Evento: Cambio de estado al hacer clic en la barra de toggle
toggleBar.addEventListener('click', () => {
  if (body.classList.contains('dark-mode')) {
    moveSlider(sunPosition); // Cambiar a modo claro
  } else {
    moveSlider(moonPosition); // Cambiar a modo oscuro
  }
});

// Eventos: Iconos del sol y la luna también cambian el tema al hacer clic
sunIcon.addEventListener('click', () => {
  moveSlider(sunPosition); // Cambiar a modo claro
});

moonIcon.addEventListener('click', () => {
  moveSlider(moonPosition); // Cambiar a modo oscuro
});

// Inicialización: Configurar imágenes y favicon al cargar la página
updateThemeAssets();
