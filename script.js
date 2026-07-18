function toggleMenu(){ document.querySelector('.menu').classList.toggle('active'); }
let planActual = {}; const MI_NUMERO = "51936994155";
const popup = document.getElementById('popupPago'); const cerrar = document.querySelector('.cerrar');
const planInfo = document.querySelector('.plan-info'); const datosPago = document.getElementById('datosPago'); const camposExtra = document.getElementById('camposExtra');

document.querySelectorAll('.comprar').forEach(boton => {
  boton.addEventListener('click', () => {
    const plan = boton.closest('.plan');
    planActual = { nombre: plan.dataset.plan, precio: plan.dataset.precio, comision: plan.dataset.comision, link: plan.dataset.link, total: (parseFloat(plan.dataset.precio) + parseFloat(plan.dataset.comision)).toFixed(2) };
    planInfo.innerHTML = `${planActual.nombre} <br> Precio: S/${planActual.precio}`;
    generarCamposExtra(planActual.nombre); mostrarDatosPago('tarjeta'); popup.style.display = 'block'; document.body.style.overflow = 'hidden';
  });
});
cerrar.onclick = () => { popup.style.display = 'none'; document.body.style.overflow = 'auto'; }
window.onclick = (e) => { if(e.target == popup){ popup.style.display = 'none'; document.body.style.overflow = 'auto'; } }

function generarCamposExtra(nombrePlan){
  camposExtra.innerHTML = "";
  if(nombrePlan.includes("Bot Para Grupo")){
    camposExtra.innerHTML = `<h3 style="color:var(--neon);margin-bottom:12px">1. Datos del Grupo</h3><input type="text" id="nombreCliente" placeholder="Tu Nombre *" required><input type="text" id="linkGrupo" placeholder="Link del Grupo *" required>`;
  }
}

document.querySelectorAll('input[name="metodo"]').forEach(radio => { radio.addEventListener('change', (e) => { mostrarDatosPago(e.target.value); }); });

function mostrarDatosPago(metodo){
  if(metodo === 'tarjeta'){
    datosPago.innerHTML = `<h4>💳 Pago con Tarjeta</h4><p><strong>Total:</strong> S/${planActual.total}</p><p><strong>Comisión:</strong> S/${planActual.comision}</p><a href="${planActual.link}" target="_blank" class="btn" style="width:100%;text-align:center">PAGAR CON TARJETA</a>`;
  }
  if(metodo === 'yape'){
    datosPago.innerHTML = `<h4>📱 Pago con Yape</h4><p><strong>Total:</strong> S/${planActual.precio}</p><p><strong>Número:</strong> 936 994 155 <button class="copiar-btn" onclick="copiar('936994155')">Copiar</button></p><p><strong>Nombre:</strong> Cristhofer Rojas Huarcaya</p><img src="https://files.evogb.win/kc99Pp.jpg" alt="QR Yape"><p style="font-size:12px;color:#c9a0ff">Envía el comprobante por WhatsApp</p>`;
  }
  if(metodo === 'prex'){
    datosPago.innerHTML = `<h4>🏦 Pago con Prex</h4><p><strong>Total:</strong> S/${planActual.precio}</p><p><strong>Número:</strong> 12249975 <button class="copiar-btn" onclick="copiar('12249975')">Copiar</button></p><p><strong>Nombre:</strong> Cristhofer Rojas Huarcaya</p><p style="font-size:12px;color:#c9a0ff">Envía el comprobante por WhatsApp</p>`;
  }
}

function copiar(texto){ navigator.clipboard.writeText(texto); alert("✅ Número copiado: " + texto); }

document.getElementById('formPedido').addEventListener('submit', (e) => {
  e.preventDefault(); const metodo = document.querySelector('input[name="metodo"]:checked').value;
  let mensaje = `*NUEVO PEDIDO CYBER BOT*\n\n*Plan:* ${planActual.nombre}\n*Precio:* S/${planActual.precio}\n`;
  if(planActual.nombre.includes("Bot Para Grupo")){
    const nombre = document.getElementById('nombreCliente').value; const link = document.getElementById('linkGrupo').value;
    if(!nombre || !link){ alert("⚠️ Completa Nombre y Link del Grupo"); return; }
    mensaje += `*Nombre:* ${nombre}\n*Link Grupo:* ${link}\n`;
  }
  mensaje += `*Método:* ${metodo.toUpperCase()}\n\nMe interesa este plan`;
  window.open(`https://wa.me/${MI_NUMERO}?text=${encodeURIComponent(mensaje)}`, '_blank');
  popup.style.display = 'none'; document.body.style.overflow = 'auto'; e.target.reset();
});

let contador = 3; setInterval(() => { if(contador > 1) contador--; document.getElementById('contador').textContent = contador; }, 10000);
document.querySelectorAll('a[href^="#"]').forEach(anchor => { anchor.addEventListener('click', function (e) { e.preventDefault(); document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' }); }); });