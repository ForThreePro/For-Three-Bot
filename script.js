const MI_NUMERO = "51936994155";
let planSeleccionado = "";
let linkPago = "";

document.getElementById('btnMain').href = `https://wa.me/${MI_NUMERO}`;

const popup = document.getElementById('popupCompra');
const cerrar = document.querySelector('.cerrar');
const planTexto = document.querySelector('.plan-seleccionado');
const camposDinamicos = document.getElementById('camposDinamicos');

document.querySelectorAll('.comprar').forEach(boton => {
  boton.addEventListener('click', () => {
    planSeleccionado = boton.getAttribute('data-plan');
    linkPago = boton.getAttribute('data-link');
    planTexto.innerHTML = `Plan: ${planSeleccionado} <br><a href="${linkPago}" target="_blank" style="color:#00f5ff;text-decoration:underline">💳 Pagar con Tarjeta Aquí</a>`;
    generarCampos(planSeleccionado);
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

document.getElementById('formCompra').addEventListener('submit', (e) => {
  e.preventDefault();

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
*Link de Pago MP:* ${linkPago}
${datosExtras}
*Nombre:* ${document.getElementById('nombre').value}
*WhatsApp:* ${document.getElementById('whatsapp').value}
*Nota:* ${document.getElementById('nota').value || 'Ninguna'}

Método de Pago: Tarjeta MP / Yape / Global66 / Prex`;

  window.open(`https://wa.me/${MI_NUMERO}?text=${encodeURIComponent(mensaje)}`, '_blank');
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.getElementById('formCompra').reset();
});

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