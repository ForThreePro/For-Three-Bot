// Reloj en vivo
function actualizarHora() {
    const ahora = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = ahora.toLocaleDateString('es-ES', opciones);
    const hora = ahora.toLocaleTimeString('es-ES');
    document.getElementById('fecha-hora').innerHTML = `📅 ${fecha} | 🕐 ${hora} | 📡 Ping: ${Math.floor(Math.random() * 50 + 30)}ms`;
}
setInterval(actualizarHora, 1000);
actualizarHora();

// Buscador de comandos
document.getElementById('buscador').addEventListener('keyup', function() {
    let filtro = this.value.toLowerCase();
    let comandos = document.querySelectorAll('.command');
    
    comandos.forEach(cmd => {
        if (cmd.textContent.toLowerCase().includes(filtro)) {
            cmd.style.display = '';
        } else {
            cmd.style.display = 'none';
        }
    });
});

// Copiar comando al click
document.querySelectorAll('.command').forEach(cmd => {
    cmd.addEventListener('click', () => {
        navigator.clipboard.writeText(cmd.textContent);
        cmd.style.background = '#9333ea';
        setTimeout(() => cmd.style.background = 'rgba(26, 26, 46, 0.9)', 300);
    });
});

// Efecto tipeo en título
const titulo = document.getElementById('titulo');
const texto = titulo.textContent;
titulo.textContent = '';
let i = 0;
function typeWriter() {
    if (i < texto.length) {
        titulo.textContent += texto.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}
typeWriter();