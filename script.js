// Reloj en vivo
function actualizarHora() {
    const ahora = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = ahora.toLocaleDateString('es-ES', opciones);
    const hora = ahora.toLocaleTimeString('es-ES');
    if(document.getElementById('fecha-hora')) {
        document.getElementById('fecha-hora').innerHTML = `📅 ${fecha} | 🕐 ${hora} | 📡 Ping: ${Math.floor(Math.random() * 50 + 30)}ms`;
    }
}
setInterval(actualizarHora, 1000);
actualizarHora();

// Buscador
if(document.getElementById('buscador')) {
    document.getElementById('buscador').addEventListener('keyup', function() {
        let filtro = this.value.toLowerCase();
        document.querySelectorAll('.command').forEach(cmd => {
            cmd.style.display = cmd.textContent.toLowerCase().includes(filtro) ? '' : 'none';
        });
    });
}

// Descripción de comandos
document.querySelectorAll('.command').forEach(cmd => {
    cmd.addEventListener('click', () => {
        if(document.getElementById('descripcion')) {
            const desc = cmd.getAttribute('data-desc');
            document.getElementById('descripcion').innerHTML = `📌 <b>${cmd.textContent}</b><br>${desc}`;
        }
        navigator.clipboard.writeText(cmd.textContent);
        cmd.style.background = '#9333ea';
        setTimeout(() => cmd.style.background = 'rgba(26, 26, 46, 0.9)', 300);
    });
});