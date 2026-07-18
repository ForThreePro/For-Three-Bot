let pedidos = JSON.parse(localStorage.getItem('pedidosCyber')) || [];
const MI_WHATSAPP = '51936994155'; // TU NUMERO

function mostrarForm(id) {
  document.querySelectorAll('.form-pago').forEach(f => f.style.display = 'none');
  document.getElementById('form-'+id).style.display = 'block';
  document.getElementById('form-'+id).scrollIntoView({behavior: 'smooth'});
}

function copiar(texto, id) {
  navigator.clipboard.writeText(texto);
  const btn = document.getElementById(id).nextElementSibling;
  const txtOriginal = btn.innerText;
  btn.innerText = 'Copiado!';
  setTimeout(() => btn.innerText = txtOriginal, 1500);
}

function enviarPedido(producto, id) {
  const nombre = document.getElementById('nombre-'+id).value.trim();
  const wp = document.getElementById('wp-'+id).value.trim();
  const file = document.getElementById('captura-'+id).files[0];

  if(!nombre ||!wp ||!file) return alert('⚠️ Completa nombre, WhatsApp y sube la captura');

  const reader = new FileReader();
  reader.onload = function(e) {
    const nuevoPedido = { id: Date.now(), producto, nombre, wp, captura: e.target.result, fecha: new Date().toLocaleString('es-PE') };
    pedidos.push(nuevoPedido);
    localStorage.setItem('pedidosCyber', JSON.stringify(pedidos));

    // 1. AVISO A TI
    const mensajeParaTi = `🚨 NUEVO PEDIDO CYBER BOT 🚨%0A%0A*Producto:* ${producto}%0A*Cliente:* ${nombre}%0A*WhatsApp:* ${wp}%0A*Fecha:* ${nuevoPedido.fecha}%0A%0ARevisa el panel admin para ver la captura.`;
    window.open(`https://wa.me/${MI_WHATSAPP}?text=${mensajeParaTi}`, '_blank');

    // 2. AVISO AL CLIENTE - NUEVO
    const mensajeCliente = `Hola ${nombre}! 👋%0A%0ARecibimos tu pedido de *${producto}* en *Cyber Bot*.%0A%0AYa estamos revisando tu comprobante. Te escribiremos en máximo 30 min.%0A%0AGracias por tu compra! 🐱`;
    setTimeout(() => {
      window.open(`https://wa.me/51${wp}?text=${mensajeCliente}`, '_blank');
    }, 1000); // 1 seg después para que no se trabe

    alert('✅ Pedido enviado! Revisa tu WhatsApp para confirmar.');
    document.getElementById('form-'+id).style.display = 'none';
  }
  reader.readAsDataURL(file);
}

if(window.location.pathname.includes('admin.html')){ window.onload = cargarPedidos; }

function cargarPedidos() {
  const lista = document.getElementById('listaPedidos');
  if(!lista) return;
  if(pedidos.length === 0) return lista.innerHTML = '<p style="text-align:center;">No hay pedidos aún</p>';
  lista.innerHTML = pedidos.reverse().map(p => `<div class="pedido"><b>Producto:</b> ${p.producto}<br><b>Cliente:</b> ${p.nombre}<br><b>WhatsApp:</b> <a href="https://wa.me/51${p.wp}" target="_blank" style="color:var(--neon)">${p.wp}</a><br><b>Fecha:</b> ${p.fecha}<br><img src="${p.captura}"><button onclick="borrarPedido(${p.id})" class="btn" style="background:#ef4444; margin-top:10px;">Marcar como atendido</button></div>`).join('');
}

function borrarPedido(id) {
  if(confirm('¿Marcar como atendido?')){
    pedidos = pedidos.filter(p => p.id!== id);
    localStorage.setItem('pedidosCyber', JSON.stringify(pedidos));
    cargarPedidos();
  }
}