let slideActual = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function mostrarSlide(n){
  slides.forEach(s=>s.classList.remove('active'));
  dots.forEach(d=>d.classList.remove('active'));
  slides[n].classList.add('active');
  dots[n].classList.add('active');
  document.querySelector('.slides').style.transform = `translateX(-${n * 100}%)`;
}

function irSlide(n){slideActual = n; mostrarSlide(slideActual)}
function autoSlide(){slideActual = (slideActual + 1) % slides.length; mostrarSlide(slideActual)}
setInterval(autoSlide, 3000);

function pedir(producto, precio){
  let msg=`Hola! Quiero pedir: ${producto} - S/${precio}. ¿Hacen delivery?`;
  window.open(`https://wa.me/51936994155?text=${encodeURIComponent(msg)}`,'_blank');
}