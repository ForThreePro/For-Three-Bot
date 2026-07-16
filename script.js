const MI_NUMERO = "51936994155";
document.getElementById('btnMain').href = `https://wa.me/${MI_NUMERO}`;

document.querySelectorAll('.comprar').forEach(boton => {
  boton.addEventListener('click', () => {
    const plan = boton.getAttribute('data-plan');
    const mensaje = `Hola! Quiero comprar el plan: ${plan}`;
    window.open(`https://wa.me/${MI_NUMERO}?text=${encodeURIComponent(mensaje)}`, '_blank');
  });
});