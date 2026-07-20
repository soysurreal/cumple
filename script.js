document.addEventListener('DOMContentLoaded', () => {
  const musica = document.getElementById('musica-fondo');
  const primerSlide = document.querySelector('.first-slide');

  // Ajustamos el volumen si lo sientes muy fuerte (0.0 a 1.0)
  musica.volume = 0.6; 

  // --- REGLA DE ORO DE LOS NAVEGADORES ---
  // Los navegadores bloquean el sonido automático si el usuario no ha tocado la página.
  // Este truco activa la música en cuanto el usuario haga su primer clic o toque la pantalla.
  const activarAudioInicial = () => {
    if (primerSlide.classList.contains('activo') || window.scrollY < window.innerHeight) {
      musica.play().catch(err => console.log("Esperando interacción del usuario..."));
    }
    // Quitamos los escuchadores para que no se ejecuten todo el tiempo
    window.removeEventListener('click', activarAudioInicial);
    window.removeEventListener('touchstart', activarAudioInicial);
  };

  window.addEventListener('click', activarAudioInicial);
  window.addEventListener('touchstart', activarAudioInicial);


  // --- EL VIGILANTE DE SLIDES ---
  // Detecta cuándo el primer slide entra o sale de la pantalla
  const vigilante = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        // ¡El usuario está viendo el primer slide!
        primerSlide.classList.add('activo');
        musica.play().catch(() => {}); 
      } else {
        // ¡El usuario se fue al segundo slide!
        primerSlide.classList.remove('activo');
        musica.pause(); 
        musica.currentTime = 0; // Reinicia la canción para que empiece de cero si regresa
      }
    });
  }, {
    threshold: 0.5 // Se activa cuando el slide ocupa el 50% o más de la pantalla
  });

  // Ponemos al vigilante a observar tu primer slide
  if (primerSlide) {
    vigilante.observe(primerSlide);
  }
});