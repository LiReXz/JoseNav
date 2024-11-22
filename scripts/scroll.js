// Seleccionar el header
const header = document.querySelector("header");
// Define la cantidad de píxeles después de la cual el header cambia el padding y el fondo
const scrollThreshold = 20;

// Agregar evento de scroll
window.addEventListener("scroll", () => {
  if (window.scrollY >= scrollThreshold) {
    header.classList.add("scrolled"); // Agrega la clase 'scrolled' cuando el scroll supera el umbral
    body.classList.add("scrolled"); // Agrega la clase 'scrolled' al body
  } else {
    header.classList.remove("scrolled"); // Elimina la clase 'scrolled' cuando el scroll es menor al umbral
    body.classList.remove("scrolled"); // Elimina la clase 'scrolled' del body
  }
});