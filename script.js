function actualizarFechaHora() {
    const ahora = new Date();
    
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = ahora.toLocaleDateString('es-ES', opcionesFecha);
    
    const hora = ahora.toLocaleTimeString('es-ES');
    
    document.getElementById('fecha').innerText = fecha;
    document.getElementById('hora').innerText = hora;
}

setInterval(actualizarFechaHora, 1000);
actualizarFechaHora();