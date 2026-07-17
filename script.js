const MI_NUMERO = "51936994155";
let planSeleccionado = "";
let datosPagoActual = {};

document.getElementById('btnMain').href = `https://wa.me/${MI_NUMERO}`;

const popup = document.getElementById('popupCompra');
const cerrar = document.querySelector('.cerrar');
const planTexto = document.querySelector('.plan-seleccionado');
const camposDinamicos = document.getElementById('camposDinamicos');

// CARGAR DATOS AL INICIO
document.addEventListener('DOMContentLoaded', () => {
  actualizarBotonesPago();
});

// ABRIR POPUP AL DAR CLICK EN COMPRAR
document.querySelectorAll('.comprar').forEach(boton => {
  boton.addEventListener('click', () => {
    planSeleccionado = boton.getAttribute('data-plan');
    datosPagoActual = obtenerDatosPago(planSeleccionado);
    planTexto.innerHTML = `Plan: ${planSeleccionado} <br> <span style="color:#00f5ff">Total con Tarjeta: S/${datosPagoActual.total}</span>`;
    generarCampos(planSeleccionado);
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

// CERRAR POPUP
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

// GENERAR CAMPOS SEGÚN EL PLAN
function generarCampos(plan){
  camposDinamicos.innerHTML = "";

  if(plan.includes("Bot Para Grupo")){
    camposDinamicos.innerHTML = `
      <input type="text" id="nombreGrupo" placeholder="Nombre del Grupo *" required>
      <input type="text" id="linkGrupo" placeholder="Link del Grupo *" required>
    `;
  }

  if(plan.includes("Bot Personalizado")){
    camposDinamicos.innerHTML = `
      <input type="text" id="nombreBot" placeholder="Nombre del Bot *" required>
      <select id="vinculacion" class="campo-select" required>
        <option value="">Vinculación: Termux / Servidor *</option>
        <option value="Termux">Termux</option>
        <option value="Servidor +S/10">Servidor +S/10 - Primer mes GRATIS</option>
      </select>
    `;
  }

  if(plan === "Pagina Web"){
    camposDinamicos.innerHTML = `
      <input type="text" id="nombreWeb" placeholder="Nombre de la Página *" required>
      <input type="text" id="disenoWeb" placeholder="Tipo de Diseño: Tienda, Portafolio, etc *" required>
    `;
  }

  if(plan === "Hosting"){
    camposDinamicos.innerHTML = `
      <p style="color:#00f5ff;text-align:center;margin-bottom:15px">Escríbenos por WhatsApp para configurar tu hosting</p>
    `;
  }
}

// ENVIAR FORMULARIO
document.getElementById('formCompra').addEventListener('submit', (e) => {
  e.preventDefault();

  const metodoPago = document.querySelector('input[name="metodo"]:checked').value;

  let datosExtras = "";
  if(planSeleccionado.includes("Bot Para Grupo")){
    datosExtras = `*Nombre Grupo:* ${document.getElementById('nombreGrupo').value}
*Link:* ${document.getElementById('linkGrupo').value}`;
  }
  if(planSeleccionado.includes("Bot Personalizado")){
    datosExtras = `*Nombre Bot:* ${document.getElementById('nombreBot').value}
*Vinculación:* ${document.getElementById('vinculacion').value}`;
  }
  if(planSeleccionado === "Pagina Web"){
    datosExtras = `*Nombre Web:* ${document.getElementById('nombreWeb').value}
*Diseño:* ${document.getElementById('disenoWeb').value}`;
  }

  const mensaje = `*NUEVO PEDIDO CYBER BOT*

*Plan:* ${planSeleccionado}
*Precio:* S/${datosPagoActual.precio}
*Comisión Tarjeta:* S/${datosPagoActual.comision}
*Total:* S/${datosPagoActual.total}
*Link de Pago MP:* ${datosPagoActual.link}
${datosExtras}
*Nombre:* ${document.getElementById('nombre').value}
*WhatsApp:* ${document.getElementById('whatsapp').value}
*Nota:* ${document.getElementById('nota').value || 'Ninguna'}
*Método de Pago:* ${metodoPago.toUpperCase()}`;

  // FLUJO 1: Si eligió TARJETA -> Abre MP + Te avisa por WA
  if(metodoPago === 'tarjeta'){
    window.open(datosPagoActual.link, '_blank');
    setTimeout(() => {
      window.open(`https://wa.me/${MI_NUMERO}?text=${encodeURIComponent(mensaje)}`, '_blank');
    }, 800);
  }

  // FLUJO 2: Si eligió YAPE/GLOBAL/PREX -> Solo WhatsApp
  else {
    window.open(`https://wa.me/${MI_NUMERO}?text=${encodeURIComponent(mensaje)}`, '_blank');
  }

  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.getElementById('formCompra').reset();
});

// ANIMACIÓN AL HACER SCROLL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

document.querySelectorAll('.card, .plan, .categoria, .testi, .faq-item').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = '0.6s';
  observer.observe(el);
});