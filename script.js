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

// MOSTRAR DESCRIPCIÓN AL DAR CLICK - YA NO COPIA
document.querySelectorAll('.command').forEach(cmd => {
    cmd.addEventListener('click', () => {
        const titulo = cmd.getAttribute('data-titulo');
        const desc = cmd.getAttribute('data-desc');
        
        document.getElementById('info-comando').innerHTML = `
            <h3>📌 ${titulo}</h3>
            <p>${desc}</p>
        `;
        
        // Efecto de selección
        document.querySelectorAll('.command').forEach(c => c.classList.remove('activo'));
        cmd.classList.add('activo');
        
        // Scroll hacia arriba para ver la info
        document.getElementById('info-comando').scrollIntoView({ behavior: 'smooth' });
    });
});