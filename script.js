let pedidos = JSON.parse(localStorage.getItem('pedidosCyber')) || [];
const MI_WHATSAPP = '51936994155';
let productoActual = '';

// MODO OSCURO/CLARO
function toggleTheme() {
  const body = document.body;
  const btn = document.querySelector('.btn-theme');
  if(body.getAttribute('data-theme') === 'light') {
    body.removeAttribute('data-theme');
    btn.innerText = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    body.setAttribute('data-theme', 'light');
    btn.innerText = '☀️';
    localStorage.setItem('theme', 'light');
  }
}
if(localStorage.getItem('theme') === 'light' && document.querySelector('.btn-theme')) {
  document.body.setAttribute('data-theme', 'light');
  document.querySelector('.btn-theme').innerText = '☀️';
}

// CONTADOR DE VENTAS
let ventas = parseInt(localStorage.getItem('ventasCyber')) || 347;
if(document.getElementById('contador-ventas')) document.getElementById('contador-ventas').innerText = ventas;
setInterval(() => {
  if(Math.random() > 0.7 && document.getElementById('contador-ventas')) {
    ventas++;
    localStorage.setItem('ventasCyber', ventas);
    document.getElementById('contador-ventas').innerText = ventas;
  }
}, 10000);

// POPUP OFERTA
window.addEventListener('load', () => {
  if(!localStorage.getItem('ofertaVista') && document.getElementById('popup-oferta')) {
    setTimeout(() => {
      document.getElementById('popup-oferta').style.display = 'block';
      localStorage.setItem('ofertaVista', 'si');
    }, 5000);
  }
  if(document.getElementById('countdown')) iniciarContador();
});

function cerrarOferta() {
  if(document.getElementById('popup-oferta')) document.getElementById('popup-oferta').style.display = 'none';
}

// CONTADOR REGRESIVO 24H
function iniciarContador() {
  let tiempo = 24 * 60 * 60;
  setInterval(() => {
    let horas = Math.floor(tiempo / 3600);
    let minutos = Math.floor((tiempo % 3600) / 60);
    let segundos = tiempo % 60;
    document.getElementById('countdown').innerText = 
      `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
    if(tiempo > 0) tiempo--;
    else tiempo = 24 * 60 * 60;
  }, 1000);
}

// CODIGO DE PAGO
function abrirPopup(producto, linkTarjeta) {
  productoActual = producto;
  document.getElementById('popup-titulo').innerText = producto;
  document.getElementById('popup-precio').innerText = 'S/ ' + producto.split('S/')[1];
  document.getElementById('btn-tarjeta').href = linkTarjeta;
  document.getElementById('popup-pago').style.display = 'block';
  // Resetear a tab tarjeta
  cambiarTab('tarjeta');
}
function cerrarPopup() {
  document.getElementById('popup-pago').style.display = 'none';
  document.getElementById('form-comprobante').reset();
}

function cambiarTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
}

window.onclick = function(event) { 
  if (event.target == document.getElementById('popup-pago')) cerrarPopup();
  if (event.target == document.getElementById('popup-oferta')) cerrarOferta();
}
function copiar(texto) { navigator.clipboard.writeText(texto); alert('✓ Copiado: ' + texto); }

if(document.getElementById('form-comprobante')){
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
    
    ventas++;
    localStorage.setItem('ventasCyber', ventas);
    if(document.getElementById('contador-ventas')) document.getElementById('contador-ventas').innerText = ventas;

    const mensajeParaTi = `🚨 NUEVO PEDIDO CYBER BOT 🚨%0A%0A*Producto:* ${productoActual}%0A*Cliente:* ${nombre}%0A*WhatsApp:* ${wp}`;
    window.open(`https://wa.me/${MI_WHATSAPP}?text=${mensajeParaTi}`, '_blank');
    alert('✅ Comprobante enviado! Te contactaremos pronto.');
    cerrarPopup();
  }
  reader.readAsDataURL(file);
});}

function cargarPedidos() {
  const lista = document.getElementById('listaPedidos');
  if(!lista) return;
  pedidos = JSON.parse(localStorage.getItem('pedidosCyber')) || [];
  if(pedidos.length === 0) return lista.innerHTML = '<p style="text-align:center; color:#777;">No hay pedidos pendientes</p>';
  lista.innerHTML = pedidos.reverse().map(p => `<div class="pedido"><b>Producto:</b> ${p.producto}<br><b>Cliente:</b> ${p.nombre}<br><b>WhatsApp:</b> <a href="https://wa.me/51${p.wp}" target="_blank" style="color:var(--neon)">${p.wp}</a><br><b>Fecha:</b> ${p.fecha}<br><img src="${p.captura}"><button onclick="borrarPedido(${p.id})" class="btn" style="background:#ef4444; margin-top:15px;">Marcar como atendido</button></div>`).join('');
}
function borrarPedido(id) {
  if(confirm('¿Marcar como atendido?')){
    pedidos = pedidos.filter(p => p.id!== id);
    localStorage.setItem('pedidosCyber', JSON.stringify(pedidos));
    cargarPedidos();
  }
}
if(window.location.pathname.includes('admin.html')){ window.onload = cargarPedidos; }