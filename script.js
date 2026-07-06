const btnTema = document.getElementById('btnTema');
const body = document.body;

window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('tema') === 'light'){
        body.classList.add('light-mode');
        if(btnTema) btnTema.innerText = '🌙';
    } else {
        if(btnTema) btnTema.innerText = '☀️';
    }
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