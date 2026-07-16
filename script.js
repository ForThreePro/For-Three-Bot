const MI_NUMERO = "51TU_NUMERO";

document.getElementById('btnMain').href = `https://wa.me/${MI_NUMERO}`;

document.querySelectorAll('.comprar').forEach(boton => {
  boton.addEventListener('click', () => {
    const plan = boton.getAttribute('data-plan');
    const mensaje = `Hola! Quiero comprar el plan: ${plan}`;
    window.open(`https://wa.me/${MI_NUMERO}?text=${encodeURIComponent(mensaje)}`, '_blank');
  });
});

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