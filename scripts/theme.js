const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const movingBar = document.querySelector('.moving-bar');
const sliderPoint = document.querySelector('.slider-point');
const body = document.body;
const toggleBar = document.getElementById('toggle-bar');

// Establecemos las posiciones para el sol y la luna
const sunPosition = 2.5; // Posición del sol
const moonPosition = 14; // Posición de la luna

// Establece el punto deslizante al principio en la luna (dark mode)
sliderPoint.style.left = `${moonPosition}px`;
body.classList.add('dark-mode'); // Inicia en dark mode

// Función para cambiar el tema (modo claro/oscuro)
const toggleTheme = () => {
  body.classList.toggle('dark-mode'); // Cambia entre dark-mode y light-mode
  body.classList.toggle('light-mode');
};

// Función para mover el punto deslizante y cambiar el tema
const moveSlider = (position) => {
  sliderPoint.style.left = `${position}px`; // Mueve el punto
  if (position === sunPosition) {
    // Modo claro
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  } else {
    // Modo oscuro
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  }
};

// Función para cambiar el estado de la barra al hacer clic
toggleBar.addEventListener('click', () => {
  if (sliderPoint.style.left === `${moonPosition}px`) {
    moveSlider(sunPosition); // Mueve el punto al sol
  } else {
    moveSlider(moonPosition); // Mueve el punto a la luna
  }
});

// Hacer que los iconos también cambien el estado al hacer clic
sunIcon.addEventListener('click', () => {
  moveSlider(sunPosition); // Mueve el punto al sol
});

moonIcon.addEventListener('click', () => {
  moveSlider(moonPosition); // Mueve el punto a la luna
});