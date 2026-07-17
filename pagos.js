// =========================================
// CONFIGURACIÓN DE PAGOS - CYBER BOT
// =========================================

const PAGOS = {
  "Bot Para Grupo Mensual": { precio: 5, comision: 1.56, total: 6.56, link: "https://mpago.la/2UBqiPc" },
  "Bot Para Grupo Permanente": { precio: 7, comision: 2.53, total: 9.53, link: "https://mpago.la/2p3QEsk" },
  "Bot Personalizado Basic": { precio: 20, comision: 2.09, total: 22.09, link: "https://mpago.la/26UCJzP" },
  "Bot Personalizado Premium": { precio: 30, comision: 3.52, total: 33.52, link: "https://mpago.la/2rBoK8k" },
  "Hosting": { precio: 10, comision: 1.66, total: 11.66, link: "https://mpago.la/1W7Nbi6" },
  "Pagina Web": { precio: 35, comision: 2.73, total: 37.73, link: "https://mpago.la/16MBw3m" }
};

function obtenerDatosPago(nombrePlan) {
  return PAGOS[nombrePlan] || null;
}

function actualizarBotonesPago() {
  document.querySelectorAll('.comprar').forEach(boton => {
    const plan = boton.getAttribute('data-plan');
    const datos = obtenerDatosPago(plan);
    if(datos){
      boton.setAttribute('data-link', datos.link);
    }
  });

  // Actualizar textos "Total con Tarjeta"
  document.getElementById('total-grupo-mensual').textContent = `Total con Tarjeta: S/${PAGOS["Bot Para Grupo Mensual"].total}`;
  document.getElementById('total-grupo-permanente').textContent = `Total con Tarjeta: S/${PAGOS["Bot Para Grupo Permanente"].total}`;
  document.getElementById('total-bot-basic').textContent = `Total con Tarjeta: S/${PAGOS["Bot Personalizado Basic"].total}`;
  document.getElementById('total-bot-premium').textContent = `Total con Tarjeta: S/${PAGOS["Bot Personalizado Premium"].total}`;
  document.getElementById('total-web').textContent = `Total con Tarjeta: S/${PAGOS["Pagina Web"].total}`;
  document.getElementById('total-hosting').textContent = `Total con Tarjeta: S/${PAGOS["Hosting"].total}`;
}