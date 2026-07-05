document.getElementById('btnVerServicios')?.addEventListener('click', () => {
    document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.btn-pedir').forEach(btn => {
    btn.addEventListener('click', () => {
        const servicio = btn.getAttribute('data-servicio');
        const mensaje = `Hola Yallico Dev 👋 Quiero pedir: ${servicio}. Ya hice el pago por Yape a Cristhofer Rojas +51 936 994 155 [Adjunto captura]`;
        window.open(`https://wa.me/51936994155?text=${encodeURIComponent(mensaje)}`, '_blank');
    });
});

function animarContador(id, final) {
    let contador = 0;
    const intervalo = setInterval(() => {
        contador += Math.ceil(final / 50);
        if(contador >= final) { contador = final; clearInterval(intervalo); }
        document.getElementById(id).innerText = "+" + contador;
    }, 30);
}
if(document.getElementById('contBots')) {
    animarContador('contBots', 127);
    animarContador('contClientes', 89);
}

const items = document.querySelectorAll('.calc-item');
const totalSpan = document.getElementById('totalPrecio');
items.forEach(item => {
    item.addEventListener('change', () => {
        let total = 0;
        items.forEach(i => { if(i.checked) total += parseInt(i.dataset.precio); });
        totalSpan.innerText = `S/ ${total}`;
    });
});
document.getElementById('btnCotizarWA')?.addEventListener('click', () => {
    let servicios = [];
    items.forEach(i => { if(i.checked) servicios.push(i.parentElement.innerText); });
    const mensaje = `Hola Yallico Dev 👋 Quiero cotizar:\n${servicios.join('\n')}\nTotal: ${totalSpan.innerText}`;
    window.open(`https://wa.me/51936994155?text=${encodeURIComponent(mensaje)}`, '_blank');
});

document.getElementById('btnTema')?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

document.getElementById('formPedido')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const servicio = document.getElementById('servicio').value;
    const presupuesto = document.getElementById('presupuesto').value;
    const mensaje = document.getElementById('mensaje').value;
    const texto = `NUEVO PEDIDO%0A%0ANombre: ${nombre}%0AServicio: ${servicio}%0APresupuesto: S/${presupuesto}%0ADetalles: ${mensaje}`;
    window.open(`https://wa.me/51936994155?text=${texto}`, '_blank');
});

document.getElementById('formSoporte')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombreS').value;
    const id = document.getElementById('idPedido').value;
    const problema = document.getElementById('problema').value;
    const texto = `TICKET DE SOPORTE%0A%0ANombre: ${nombre}%0AID: ${id}%0AProblema: ${problema}`;
    window.open(`https://wa.me/51936994155?text=${texto}`, '_blank');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));