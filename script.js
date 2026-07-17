// Menu responsive
function toggleMenu(){
  document.querySelector('.menu').classList.toggle('active');
}

// Contador de oferta
let contador = 3;
setInterval(() => {
  if(contador > 1) contador--;
  document.getElementById('contador').textContent = contador;
}, 10000);

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});