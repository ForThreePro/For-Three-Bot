// MODO CLARO/OSCURO
const btnTema = document.getElementById('btnTema');
const body = document.body;

// Cargar tema guardado al entrar
if(localStorage.getItem('tema') === 'light'){
    body.classList.add('light-mode');
    btnTema.innerText = '🌙'; // Si está claro, muestra luna para volver a oscuro
} else {
    btnTema.innerText = '☀️'; // Si está oscuro, muestra sol para ir a claro
}

// Evento al dar click
btnTema?.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Guardar preferencia y cambiar icono
    if(body.classList.contains('light-mode')){
        localStorage.setItem('tema', 'light');
        btnTema.innerText = '🌙'; 
    } else {
        localStorage.setItem('tema', 'dark');
        btnTema.innerText = '☀️';
    }
});

// SCROLL SUAVE AL DAR CLICK EN EL MENU
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({behavior: 'smooth'});
        }
    });
});

// ANIMACION AL HACER SCROLL
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.card-servicio, .card-info').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = '0.6s';
    observer.observe(card);
});