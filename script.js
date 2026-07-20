function actualizarFechaHora() {
    const ahora = new Date();
    const opcionesFecha = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const fecha = ahora.toLocaleDateString('es-ES', opcionesFecha);
    const hora = ahora.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'});

    if(document.getElementById('fecha')) document.getElementById('fecha').innerText = fecha;
    if(document.getElementById('hora')) document.getElementById('hora').innerText = hora;
}
setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();

// Copiar comando al click
document.querySelectorAll('.cmd-item').forEach(item => {
    item.addEventListener('click', () => {
        navigator.clipboard.writeText(item.textContent);
        let original = item.style.background;
        item.style.background = 'rgba(168,85,247,0.2)';
        setTimeout(() => { item.style.background = original; }, 300);
    });
});

// Buscador
if(document.getElementById('searchCmd')){
    document.getElementById('searchCmd').addEventListener('keyup', function() {
        let filtro = this.value.toLowerCase();
        document.querySelectorAll('.cmd-item').forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(filtro)? 'block' : 'none';
        });
    });
}