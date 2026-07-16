const MI_NUMERO = "51936994155";
let planSeleccionado = "";

// Conectar botones de WhatsApp
document.getElementById('btnMain').href = `https://wa.me/${MI_NUMERO}`;

// POPUP
const popup = document.getElementById('popupCompra');
const cerrar = document.querySelector('.cerrar');
const planTexto = document.querySelector('.plan-seleccionado');

document.querySelectorAll('.comprar').forEach(boton => {
  boton.addEventListener('click', () => {
    planSeleccionado = boton.getAttribute('data-plan');
    planTexto.textContent = `Plan: ${planSeleccionado}`;
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

cerrar.onclick = () => {
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
}

window.onclick = (e) => {
  if(e.target == popup){
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// ENVIAR FORMULARIO A WHATSAPP
document.getElementById('formCompra').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const usuario = document.getElementById('usuario').value;
  const nota = document.getElementById('nota').value;
  
  const mensaje = `*NUEVO PEDIDO CYBER BOT*
  
*Plan:* ${planSeleccionado}
*Nombre:* ${nombre}
*WhatsApp:* ${whatsapp}
*Usuario:* ${usuario || 'No especificó'}
*Nota:* ${nota || 'Ninguna'}

Ya realicé el pago por: [Yape/Global66/Prex]`;
  
  window.open(`https://wa.me/${MI_NUMERO}?text=${encodeURIComponent(mensaje)}`, '_blank');
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.getElementById('formCompra').reset();
});

// Animación scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

document.querySelectorAll('.card, .plan, .categoria').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = '0.6s';
  observer.observe(el);
});