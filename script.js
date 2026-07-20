function actualizarFechaHora() {
    const ahora = new Date();
    if(document.getElementById('fecha')) document.getElementById('fecha').innerText = ahora.toLocaleDateString('es-PE');
    if(document.getElementById('hora')) document.getElementById('hora').innerText = ahora.toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'});
}
setInterval(actualizarFechaHora, 1000); 
actualizarFechaHora();

document.querySelectorAll('.cmd').forEach(item => {
    item.addEventListener('click', () => {
        navigator.clipboard.writeText(item.textContent);
        let original = item.style.background;
        item.style.background = '#dbeafe';
        setTimeout(() => { item.style.background = original; }, 300);
    });
});

if(document.getElementById('searchCmd')){
    document.getElementById('searchCmd').addEventListener('keyup', function() {
        let filtro = this.value.toLowerCase();
        document.querySelectorAll('.cmd').forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(filtro)? 'block' : 'none';
        });
    });
}

function abrirModal(titulo, precio, comision, link){
    document.getElementById('modalTitulo').innerText = titulo;
    document.getElementById('modalPrecio').innerText = 'S/ ' + precio;
    document.getElementById('modalComision').innerText = 'S/ ' + comision;
    document.getElementById('linkTarjeta').href = link;
    let mensaje = `Hola, ya realice el pago de ${titulo} por S/ ${precio}%0A%0ANombre:%0AComprobante:`;
    document.getElementById('linkWhatsapp').href = `https://wa.me/51936994155?text=${mensaje}`;
    document.getElementById('modalPago').style.display = 'block';
}
function cerrarModal(){ document.getElementById('modalPago').style.display = 'none'; }
function copiar(texto){ navigator.clipboard.writeText(texto); alert("Copiado: " + texto); }
window.onclick = function(event) { if (event.target == document.getElementById('modalPago')) cerrarModal(); }