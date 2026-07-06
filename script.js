// TEMA CLARO/OSCURO
const btnTema = document.getElementById('btnTema');
const body = document.body;

window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('tema') === 'light'){
        body.classList.add('light-mode');
        if(btnTema) btnTema.innerText = '🌙';
    } else {
        if(btnTema) btnTema.innerText = '☀️';
    }
    animarCards();
});

if(btnTema){
    btnTema.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if(body.classList.contains('light-mode')){
            localStorage.setItem('tema', 'light');
            btnTema.innerText = '🌙'; 
        } else {
            localStorage.setItem('tema', 'dark');
            btnTema.innerText = '☀️';
        }
    });
}

// ANIMACION AL HACER SCROLL
function animarCards(){
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach((card, i) => {
        card.style.transition = `0.6s ease ${i * 0.1}s`;
        observer.observe(card);
    });
}