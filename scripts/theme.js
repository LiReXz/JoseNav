// Aplicar tema inmediatamente al cargar (antes del DOMContentLoaded)
// Esto evita el "flash" de tema incorrecto
(function() {
  const savedMode = localStorage.getItem('theme-mode');
  
  // Aplicar clases CSS inmediatamente
  if (savedMode === 'light') {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  }
  
  // Aplicar assets del tema inmediatamente cuando el DOM esté mínimamente listo
  const applyThemeAssets = () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Assets paths
    const assets = {
      logo: {
        dark: '../media/logo-url-dark.png',
        light: '../media/logo-url-light.png'
      },
      favicon: {
        dark: '../media/logo-url-dark.png',
        light: '../media/logo-url-light.png'
      },
      homelogo: {
        dark: '../media/logo-dark.png',
        light: '../media/logo-light.png'
      },
      homelogoshadow: {
        dark: '../media/logo-shadow-dark.png',
        light: '../media/logo-shadow-light.png'
      }
    };
    
    // Actualizar el logo
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.src = isDarkMode ? assets.logo.dark : assets.logo.light;
    }

    // Actualizar el favicon
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = isDarkMode ? assets.favicon.dark : assets.favicon.light;
    }

    // Actualizar el home-logo
    const homelogo = document.querySelector('.home-logo');
    if (homelogo) {
      homelogo.src = isDarkMode ? assets.homelogo.dark : assets.homelogo.light;
    }
    
    // Actualizar el home-logo-shadow
    const homelogoshadow = document.querySelector('.home-logo-shadow');
    if (homelogoshadow) {
      homelogoshadow.src = isDarkMode ? assets.homelogoshadow.dark : assets.homelogoshadow.light;
    }
    
    // Actualizar posición del slider
    const sliderPoint = document.querySelector('.slider-point');
    if (sliderPoint) {
      const sunPosition = 2.5;
      const moonPosition = 17;
      const baseWidth = 1920;
      const calculatePositionInRem = (positionPx) => {
        return (positionPx / baseWidth) * 100;
      };
      
      if (isDarkMode) {
        sliderPoint.style.left = `${calculatePositionInRem(moonPosition)}rem`;
      } else {
        sliderPoint.style.left = `${calculatePositionInRem(sunPosition)}rem`;
      }
    }
  };
  
  // Si el DOM ya está listo, aplicar inmediatamente
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyThemeAssets);
  } else {
    applyThemeAssets();
  }
})();

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing theme script');
  
  // Selección de elementos del DOM
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  const movingBar = document.querySelector('.moving-bar');
  const sliderPoint = document.querySelector('.slider-point');
  const body = document.body;
  const toggleBar = document.getElementById('toggle-bar');
  const themeToggleContainer = document.querySelector('.theme-toggle-container');
  const favicon = document.getElementById('favicon');

  console.log('Elements found:', {
    sunIcon: !!sunIcon,
    moonIcon: !!moonIcon,
    movingBar: !!movingBar,
    sliderPoint: !!sliderPoint,
    toggleBar: !!toggleBar,
    themeToggleContainer: !!themeToggleContainer,
    favicon: !!favicon
  });

  // Configuración de posiciones del slider en rem
  const sunPosition = 2.5;
  const moonPosition = 17;

  // Definición de la raíz en base a la resolución de 1920px
  const baseFontSize = 16;
  const baseWidth = 1920;

  // Definimos las posiciones en función de la proporción del contenedor
  const calculatePositionInRem = (positionPx) => {
    return (positionPx / baseWidth) * 100;
  };

  // Centralización de rutas para imágenes y otros recursos
  const assets = {
    logo: {
      dark: '../media/logo-url-dark.png',
      light: '../media/logo-url-light.png'
    },
    favicon: {
      dark: '../media/logo-url-dark.png',
      light: '../media/logo-url-light.png'
    },
    homelogo: {
      dark: '../media/logo-dark.png',
      light: '../media/logo-light.png'
    },
    homelogoshadow: {
      dark: '../media/logo-shadow-dark.png',
      light: '../media/logo-shadow-light.png'
    }
  };

  // Función para actualizar imágenes y favicon según el tema
  const updateThemeAssets = () => {
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Actualizar el logo
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.src = isDarkMode ? assets.logo.dark : assets.logo.light;
    }

    // Actualizar el favicon
    if (favicon) {
      favicon.href = isDarkMode ? assets.favicon.dark : assets.favicon.light;
    }

    // Actualizar el home-logo (solo si existe en la página)
    const homelogo = document.querySelector('.home-logo');
    if (homelogo) {
      homelogo.src = isDarkMode ? assets.homelogo.dark : assets.homelogo.light;
    }
    
    // Actualizar el home-logo-shadow (solo si existe en la página)
    const homelogoshadow = document.querySelector('.home-logo-shadow');
    if (homelogoshadow) {
      homelogoshadow.src = isDarkMode ? assets.homelogoshadow.dark : assets.homelogoshadow.light;
    }
    
    // Actualizar posición del slider
    if (sliderPoint) {
      if (isDarkMode) {
        sliderPoint.style.left = `${calculatePositionInRem(moonPosition)}rem`;
      } else {
        sliderPoint.style.left = `${calculatePositionInRem(sunPosition)}rem`;
      }
    }
  };

  // Función para alternar entre temas (claro/oscuro)
  const toggleTheme = () => {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      saveTheme('light');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      saveTheme('dark');
    }
    updateThemeAssets();
  };

  // Función para mover el slider y cambiar el tema
  const moveSlider = (position) => {
    if (sliderPoint) {
      sliderPoint.style.left = `${calculatePositionInRem(position)}rem`;
    }
    if (position === sunPosition) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      saveTheme('light');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      saveTheme('dark');
    }
    updateThemeAssets();
  };

  // Función para cargar el tema desde localStorage (principalmente para inicialización completa)
  const loadSavedTheme = () => {
    const savedMode = localStorage.getItem('theme-mode');
    console.log('Validating saved theme mode:', savedMode);
    
    // El tema ya se aplicó en el IIFE, solo necesitamos asegurar que todo esté sincronizado
    if (savedMode === 'light') {
      // Asegurar que esté en light mode
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      console.log('Confirmed light mode from cache');
    } else {
      // Asegurar que esté en dark mode (por defecto)
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      // Si no hay tema guardado, guardamos dark como default
      if (!savedMode) {
        localStorage.setItem('theme-mode', 'dark');
      }
      console.log('Confirmed dark mode (default or from cache)');
    }
    
    // Actualizar todos los assets para asegurar sincronización completa
    updateThemeAssets();
  };

  // Función para guardar el tema en localStorage
  const saveTheme = (mode) => {
    localStorage.setItem('theme-mode', mode);
    console.log('Theme saved to localStorage:', mode);
  };

  // Cargar tema guardado al inicializar
  loadSavedTheme();

  // Event listeners simplificados
  if (themeToggleContainer) {
    themeToggleContainer.addEventListener('click', (e) => {
      console.log('Theme toggle clicked');
      e.preventDefault();
      e.stopPropagation();
      
      if (body.classList.contains('dark-mode')) {
        console.log('Switching to light mode');
        moveSlider(sunPosition);
      } else {
        console.log('Switching to dark mode');
        moveSlider(moonPosition);
      }
    });
  }

  if (sunIcon) {
    sunIcon.addEventListener('click', (e) => {
      console.log('Sun icon clicked');
      e.preventDefault();
      e.stopPropagation();
      moveSlider(sunPosition);
    });
  }

  if (moonIcon) {
    moonIcon.addEventListener('click', (e) => {
      console.log('Moon icon clicked');
      e.preventDefault();
      e.stopPropagation();
      moveSlider(moonPosition);
    });
  }

  // Inicialización: Configurar imágenes y favicon al cargar la página
  // updateThemeAssets(); // Ya se llama en loadSavedTheme()

  console.log('Theme script initialized successfully');
});
