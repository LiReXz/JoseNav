// Seleccionar el header
const header = document.querySelector("header");

// Define la cantidad de píxeles después de la cual el header cambia el padding y el fondo
const scrollThreshold = 10;

// Agregar evento de scroll
window.addEventListener("scroll", () => {
  if (window.scrollY >= scrollThreshold) {
    header.classList.add("scrolled"); // Agrega la clase 'scrolled' cuando el scroll supera el umbral
  } else {
    header.classList.remove("scrolled"); // Elimina la clase 'scrolled' cuando el scroll es menor al umbral
  }
});