// ANIMACIÓN SCROLL
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('show')}
  })
},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

// POPUP DE PAGOS
function openPopup(product, price) {
  document.getElementById('popupProduct').innerText = product;
  document.getElementById('popupPrice').innerText = price;
  
  let mensaje = `Hola%20Whois%20quiero%20comprar:%20${encodeURIComponent(product)}%20-${encodeURIComponent(price)}`;
  
  document.getElementById('btnYape').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Yape`;
  document.getElementById('btnPrex').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Prex`;
  document.getElementById('btnGlobal').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Global66`;
  
  document.getElementById('paymentPopup').classList.add('active');
}

function closePopup() {
  document.getElementById('paymentPopup').classList.remove('active');
}

document.getElementById('paymentPopup').addEventListener('click', function(e) {
  if(e.target === this) closePopup();
});

// SISTEMA DE TICKETS A WHATSAPP
function sendTicket(e) {
  e.preventDefault();
  
  let name = document.getElementById('ticketName').value;
  let wa = document.getElementById('ticketWhatsapp').value;
  let type = document.getElementById('ticketType').value;
  let id = document.getElementById('ticketId').value || 'No tiene';
  let msg = document.getElementById('ticketMessage').value;
  let fecha = new Date().toLocaleString('es-PE');
  
  let ticket = `🚨 *NUEVO TICKET DE SOPORTE* 🚨%0A%0A`;
  ticket += `*Fecha:* ${fecha}%0A`;
  ticket += `*Nombre:* ${name}%0A`;
  ticket += `*WhatsApp:* ${wa}%0A`;
  ticket += `*Tipo:* ${type}%0A`;
  ticket += `*ID Compra:* ${id}%0A%0A`;
  ticket += `*PROBLEMA:*%0A${msg}%0A%0A`;
  ticket += `_Responder a este ticket_`;
  
  window.open(`https://wa.me/51936994155?text=${ticket}`, '_blank');
  
  alert('✅ Ticket enviado! Te responderé por WhatsApp en menos de 2 horas ⚡');
  e.target.reset();
}