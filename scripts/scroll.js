// Seleccionar el header
const header = document.querySelector("header");
// Define la cantidad de rem después de la cual el header cambia el padding y el fondo
const scrollThreshold = 1.25; // 20px convertido a rem

// Agregar evento de scroll
window.addEventListener("scroll", () => {
  // Cambiar a rem, multiplicando el valor por el tamaño base del contenedor si es necesario
  if (window.scrollY >= scrollThreshold * parseFloat(getComputedStyle(document.documentElement).fontSize)) {
    header.classList.add("scrolled"); // Agrega la clase 'scrolled' cuando el scroll supera el umbral
    body.classList.add("scrolled"); // Agrega la clase 'scrolled' al body
  } else {
    header.classList.remove("scrolled"); // Elimina la clase 'scrolled' cuando el scroll es menor al umbral
    body.classList.remove("scrolled"); // Elimina la clase 'scrolled' del body
  }
});
