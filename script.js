let pedidos = JSON.parse(localStorage.getItem('pedidosCyber')) || [];

function mostrarForm(id) {
  document.getElementById('form-'+id).style.display = 'block';
}

function enviarPedido(producto, id) {
  const nombre = document.getElementById('nombre-'+id).value;
  const wp = document.getElementById('wp-'+id).value;
  const file = document.getElementById('captura-'+id).files[0];

  if(!nombre ||!wp ||!file) return alert('Completa todos los campos');

  const reader = new FileReader();
  reader.onload = function(e) {
    const nuevoPedido = {
      id: Date.now(),
      producto, nombre, wp,
      captura: e.target.result,
      fecha: new Date().toLocaleString()
    };
    pedidos.push(nuevoPedido);
    localStorage.setItem('pedidosCyber', JSON.stringify(pedidos));
    alert('Pedido enviado! Te contactaremos pronto 🐱');
    location.reload();
  }
  reader.readAsDataURL(file);
}

// SOLO FUNCIONA EN admin.html
if(window.location.pathname.includes('admin.html')){
  cargarPedidos();
}

function cargarPedidos() {
  const lista = document.getElementById('listaPedidos');
  if(!lista) return;
  if(pedidos.length === 0) return lista.innerHTML = '<p>No hay pedidos aún</p>';

  lista.innerHTML = pedidos.map(p => `
    <div class="pedido">
      <b>Producto:</b> ${p.producto}<br>
      <b>Cliente:</b> ${p.nombre}<br>
      <b>WhatsApp:</b> ${p.wp}<br>
      <b>Fecha:</b> ${p.fecha}<br>
      <img src="${p.captura}">
      <button onclick="borrarPedido(${p.id})" class="btn" style="background:red; width:auto; margin-top:10px;">Marcar como atendido</button>
    </div>
  `).join('');
}

function borrarPedido(id) {
  pedidos = pedidos.filter(p => p.id!== id);
  localStorage.setItem('pedidosCyber', JSON.stringify(pedidos));
  cargarPedidos();
}