let pedidos = JSON.parse(localStorage.getItem('pedidosCyber')) || [];

function mostrarForm(id) {
  // Cierra otros formularios antes de abrir uno
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
    const nuevoPedido = {
      id: Date.now(),
      producto, nombre, wp,
      captura: e.target.result,
      fecha: new Date().toLocaleString('es-PE')
    };
    pedidos.push(nuevoPedido);
    localStorage.setItem('pedidosCyber', JSON.stringify(pedidos));
    alert('✅ Pedido enviado! Te contactaremos pronto al '+wp);
    document.getElementById('form-'+id).style.display = 'none';
  }
  reader.readAsDataURL(file);
}

// SOLO PARA ADMIN
if(window.location.pathname.includes('admin.html')){
  window.onload = cargarPedidos;
}

function cargarPedidos() {
  const lista = document.getElementById('listaPedidos');
  if(!lista) return;
  if(pedidos.length === 0) return lista.innerHTML = '<p style="text-align:center;">No hay pedidos aún</p>';

  lista.innerHTML = pedidos.reverse().map(p => `
    <div class="pedido">
      <b>Producto:</b> ${p.producto}<br>
      <b>Cliente:</b> ${p.nombre}<br>
      <b>WhatsApp:</b> <a href="https://wa.me/51${p.wp}" style="color:var(--neon)">${p.wp}</a><br>
      <b>Fecha:</b> ${p.fecha}<br>
      <img src="${p.captura}">
      <button onclick="borrarPedido(${p.id})" class="btn" style="background:#ef4444; margin-top:10px;">Marcar como atendido</button>
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