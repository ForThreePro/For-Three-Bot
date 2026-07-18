let pedidos = JSON.parse(localStorage.getItem('pedidosCyber')) || [];
const MI_WHATSAPP = '51936994155';
let productoActual = '';
let linkTarjetaActual = '';

function abrirPopup(producto, linkTarjeta) {
  productoActual = producto;
  linkTarjetaActual = linkTarjeta;

  document.getElementById('popup-titulo').innerText = producto;
  document.getElementById('popup-precio').innerText = 'S/ ' + producto.split('S/')[1];
  document.getElementById('btn-tarjeta').href = linkTarjeta;
  document.getElementById('popup-pago').style.display = 'block';
}

function cerrarPopup() {
  document.getElementById('popup-pago').style.display = 'none';
  document.getElementById('form-comprobante').reset();
}

// Cerrar al click fuera
window.onclick = function(event) {
  if (event.target == document.getElementById('popup-pago')) {
    cerrarPopup();
  }
}

function copiar(texto) {
  navigator.clipboard.writeText(texto);
  alert('✓ Copiado: ' + texto);
}

// ENVIAR FORMULARIO
document.getElementById('form-comprobante').addEventListener('submit', function(e){
  e.preventDefault();
  const nombre = document.getElementById('nombre-cliente').value.trim();
  const wp = document.getElementById('wp-cliente').value.trim();
  const file = document.getElementById('captura-cliente').files[0];

  if(!nombre ||!wp ||!file) return alert('⚠️ Completa todos los campos');

  const reader = new FileReader();
  reader.onload = function(e) {
    const nuevoPedido = { id: Date.now(), producto: productoActual, nombre, wp, captura: e.target.result, fecha: new Date().toLocaleString('es-PE') };
    pedidos.push(nuevoPedido);
    localStorage.setItem('pedidosCyber', JSON.stringify(pedidos));

    // AVISO A TI POR WHATSAPP
    const mensajeParaTi = `🚨 NUEVO PEDIDO CYBER BOT 🚨%0A%0A*Producto:* ${productoActual}%0A*Cliente:* ${nombre}%0A*WhatsApp:* ${wp}%0A*Fecha:* ${nuevoPedido.fecha}`;
    window.open(`https://wa.me/${MI_WHATSAPP}?text=${mensajeParaTi}`, '_blank');

    alert('✅ Comprobante enviado! Te contactaremos pronto.');
    cerrarPopup();
  }
  reader.readAsDataURL(file);
});

// SOLO PARA ADMIN
if(window.location.pathname.includes('admin.html')){
  window.onload = cargarPedidos;
}

function cargarPedidos() {
  const lista = document.getElementById('listaPedidos');
  if(!lista) return;
  if(pedidos.length === 0) return lista.innerHTML = '<p style="text-align:center; color:#777;">No hay pedidos pendientes</p>';
  lista.innerHTML = pedidos.reverse().map(p => `
    <div class="pedido">
      <b>Producto:</b> ${p.producto}<br>
      <b>Cliente:</b> ${p.nombre}<br>
      <b>WhatsApp:</b> <a href="https://wa.me/51${p.wp}" target="_blank" style="color:var(--neon)">${p.wp}</a><br>
      <b>Fecha:</b> ${p.fecha}<br>
      <img src="${p.captura}">
      <button onclick="borrarPedido(${p.id})" class="btn" style="background:#ef4444; margin-top:15px;">Marcar como atendido</button>
    </div>
  `).join('');
}

function borrarPedido(id) {
  if(confirm('¿Marcar como atendido?')){
    pedidos = pedidos.filter(p => p.id!== id);
    localStorage.setItem('pedidosCyber', JSON.stringify(pedidos));
    cargarPedidos();
  }
}