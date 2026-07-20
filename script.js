function actualizarFechaHora() {
    const ahora = new Date();
    const opcionesFecha = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const fecha = ahora.toLocaleDateString('es-ES', opcionesFecha).toUpperCase();
    const hora = ahora.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'});
    
    if(document.getElementById('fecha')) {
        document.getElementById('fecha').innerText = fecha;
    }
    if(document.getElementById('hora')) {
        document.getElementById('hora').innerText = hora;
    }
}
setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();

// Efecto copiar comando al tocar
document.querySelectorAll('.cmd-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        navigator.clipboard.writeText(pill.textContent);
        pill.style.background = '#4ade80';
        pill.style.color = '#000';
        setTimeout(() => {
            pill.style.background = 'rgba(168,85,247,0.15)';
            pill.style.color = '#f0e6ff';
        }, 500);
    });
});