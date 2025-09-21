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
})();

// Configuración principal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎨 Theme system initializing...');

  // Variables globales
  const body = document.body;
  const themeToggleContainer = document.querySelector('.theme-toggle-container');
  const sliderPoint = document.querySelector('.slider-point');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  
  // Configuración de posiciones del slider
  const sunPosition = 2.5;  // Posición para modo claro
  const moonPosition = 17;  // Posición para modo oscuro
  
  // Usa ruta absoluta para media en GitHub Pages y local
  // Detecta si está en GitHub Pages
  const repoName = 'JoseNav'; // Cambia si tu repo tiene otro nombre
  let mediaPath;
  if (window.location.hostname.endsWith('github.io')) {
    mediaPath = `/${repoName}/media/`;
  } else {
    mediaPath = '../media/';
  }
  
  console.log('🔍 Path Detection:');
  console.log(`   URL: ${window.location.pathname}`);
  console.log(`   Media path: ${mediaPath}`);
  console.log(`   Is in subfolder: ${isInSubfolder}`);

  // Assets paths
  const assets = {
    logo: {
      dark: mediaPath + 'logo-url-dark.png',
      light: mediaPath + 'logo-url-light.png'
    },
    favicon: {
      dark: mediaPath + 'logo-url-dark.png',
      light: mediaPath + 'logo-url-light.png'
    },
    homelogo: {
      dark: mediaPath + 'logo-dark.png',
      light: mediaPath + 'logo-light.png'
    },
    homelogoshadow: {
      dark: mediaPath + 'logo-shadow-dark.png',
      light: mediaPath + 'logo-shadow-light.png'
    }
  };

  // Función para calcular posición en rem
  const calculatePositionInRem = (positionPx) => {
    const baseWidth = 1920;
    return (positionPx / baseWidth) * 100;
  };

  // Función para actualizar todos los assets del tema
  const updateThemeAssets = () => {
    const isDarkMode = body.classList.contains('dark-mode');
    console.log('🔄 Updating theme assets, dark mode:', isDarkMode);
    
    // Actualizar logo principal
    const logo = document.querySelector('.logo');
    if (logo) {
      logo.src = isDarkMode ? assets.logo.dark : assets.logo.light;
      console.log('✅ Logo updated to:', logo.src);
    }

    // Actualizar favicon
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = isDarkMode ? assets.favicon.dark : assets.favicon.light;
      console.log('✅ Favicon updated to:', favicon.href);
    }

    // Actualizar home-logo (solo si existe)
    const homelogo = document.querySelector('.home-logo');
    if (homelogo) {
      homelogo.src = isDarkMode ? assets.homelogo.dark : assets.homelogo.light;
      console.log('✅ Home logo updated to:', homelogo.src);
    }
    
    // Actualizar home-logo-shadow (solo si existe)
    const homelogoshadow = document.querySelector('.home-logo-shadow');
    if (homelogoshadow) {
      homelogoshadow.src = isDarkMode ? assets.homelogoshadow.dark : assets.homelogoshadow.light;
      console.log('✅ Home logo shadow updated to:', homelogoshadow.src);
    }

    // Actualizar posición del slider
    if (sliderPoint) {
      if (isDarkMode) {
        sliderPoint.style.left = `${calculatePositionInRem(moonPosition)}rem`;
      } else {
        sliderPoint.style.left = `${calculatePositionInRem(sunPosition)}rem`;
      }
      console.log('✅ Slider position updated to:', sliderPoint.style.left);
    }
  };

  // Función para cambiar tema
  const switchTheme = (toMode) => {
    console.log('🔄 Switching theme to:', toMode);
    
    if (toMode === 'light') {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme-mode', 'light');
      
      if (sliderPoint) {
        sliderPoint.style.left = `${calculatePositionInRem(sunPosition)}rem`;
      }
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme-mode', 'dark');
      
      if (sliderPoint) {
        sliderPoint.style.left = `${calculatePositionInRem(moonPosition)}rem`;
      }
    }
    
    // Actualizar todos los assets
    updateThemeAssets();
    console.log('✅ Theme switched to:', toMode);
  };

  // Función para toggle del tema
  const toggleTheme = () => {
    const isDarkMode = body.classList.contains('dark-mode');
    switchTheme(isDarkMode ? 'light' : 'dark');
  };

  // Event Listeners
  if (themeToggleContainer) {
    themeToggleContainer.addEventListener('click', (e) => {
      console.log('🖱️ Theme toggle clicked');
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    });
    console.log('✅ Theme toggle container listener added');
  } else {
    console.warn('⚠️ Theme toggle container not found');
  }

  if (sunIcon) {
    sunIcon.addEventListener('click', (e) => {
      console.log('☀️ Sun icon clicked');
      e.preventDefault();
      e.stopPropagation();
      switchTheme('light');
    });
    console.log('✅ Sun icon listener added');
  }

  if (moonIcon) {
    moonIcon.addEventListener('click', (e) => {
      console.log('🌙 Moon icon clicked');
      e.preventDefault();
      e.stopPropagation();
      switchTheme('dark');
    });
    console.log('✅ Moon icon listener added');
  }

  // Inicialización: cargar tema y actualizar assets
  console.log('🚀 Initializing theme system...');
  const currentMode = localStorage.getItem('theme-mode') || 'dark';
  console.log('💾 Saved theme mode:', currentMode);
  
  // Asegurar que el tema esté aplicado correctamente
  switchTheme(currentMode);
  
  // Aplicar assets después de un pequeño delay para asegurar que el DOM esté completamente listo
  setTimeout(() => {
    updateThemeAssets();
    console.log('✅ Theme system fully initialized');
  }, 100);

  console.log('🎨 Theme system setup complete');
});
