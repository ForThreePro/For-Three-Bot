function toggleMenu(){
  document.querySelector('.menu').classList.toggle('active');
}

let planActual = {};

const popup = document.getElementById('popupPago');
const cerrar = document.querySelector('.cerrar');
const planInfo = document.querySelector('.plan-info');
const datosPago = document.getElementById('datosPago');

// ABRIR POPUP
document.querySelectorAll('.comprar').forEach(boton => {
  boton.addEventListener('click', () => {
    const plan = boton.closest('.plan');
    planActual = {
      nombre: plan.dataset.plan,
      precio: plan.dataset.precio,
      comision: plan.dataset.comision,
      link: plan.dataset.link,
      total: (parseFloat(plan.dataset.precio) + parseFloat(plan.dataset.comision)).toFixed(2)
    };
    planInfo.innerHTML = `${planActual.nombre} <br> Precio: S/${planActual.precio}`;
    mostrarDatosPago('tarjeta');
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

cerrar.onclick = () => { popup.style.display = 'none'; document.body.style.overflow = 'auto'; }

// CAMBIAR MÉTODO DE PAGO
document.querySelectorAll('input[name="metodo"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    mostrarDatosPago(e.target.value);
  });
});

function mostrarDatosPago(metodo){
  if(metodo === 'tarjeta'){
    datosPago.innerHTML = `
      <h4>💳 Pago con Tarjeta</h4>
      <p><strong>Total:</strong> S/${planActual.total}</p>
      <p><strong>Comisión:</strong> S/${planActual.comision}</p>
      <a href="${planActual.link}" target="_blank" class="btn">PAGAR CON TARJETA</a>
    `;
  }
  if(metodo === 'yape'){
    datosPago.innerHTML = `
      <h4>📱 Pago con Yape</h4>
      <p><strong>Total:</strong> S/${planActual.precio}</p>
      <p><strong>Número:</strong> 936 994 155</p>
      <p><strong>Nombre:</strong> Cristhofer Rojas Huarcaya</p>
      <img src="https://files.evogb.win/kc99Pp.jpg" alt="QR Yape">
      <p style="font-size:12px;color:#c9a0ff">Envía el comprobante por WhatsApp</p>
    `;
  }
  if(metodo === 'prex'){
    datosPago.innerHTML = `
      <h4>🏦 Pago con Prex</h4>
      <p><strong>Total:</strong> S/${planActual.precio}</p>
      <p><strong>Número:</strong> 12249975</p>
      <p><strong>Nombre:</strong> Cristhofer Rojas Huarcaya</p>
      <p style="font-size:12px;color:#c9a0ff">Envía el comprobante por WhatsApp</p>
    `;
  }
}

// CONFIRMAR PEDIDO
document.getElementById('btnConfirmar').addEventListener('click', () => {
  const metodo = document.querySelector('input[name="metodo"]:checked').value;
  const mensaje = `*NUEVO PEDIDO CYBER BOT*
  
*Plan:* ${planActual.nombre}
*Precio:* S/${planActual.precio}
*Método:* ${metodo.toUpperCase()}

Escríbeme para coordinar`;
  window.open(`https://wa.me/51936994155?text=${encodeURIComponent(mensaje)}`, '_blank');
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Contador y scroll
let contador = 3;
setInterval(() => { if(contador > 1) contador--; document.getElementById('contador').textContent = contador; }, 10000);