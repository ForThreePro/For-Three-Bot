// CONTADOR DE CUPOS QUE BAJA
let cupos = 12;
setInterval(()=>{
  if(cupos > 3){
    cupos -= 1;
    document.getElementById('cupos').innerText = cupos;
  }
}, 7200000);

// TYPING EFFECT
const texto = "by Yayico | Automatización que vende 24/7 sin caídas";
let i = 0;
function type(){ if(i < texto.length){ document.getElementById('typing').innerHTML += texto.charAt(i); i++; setTimeout(type, 50); } }
type();

// ANIMACION SCROLL
const observer = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show') }) });
document.querySelectorAll('.anim').forEach(el=>observer.observe(el));

// NOTIFICACION FALSA DE COMPRA
const nombres = ["Carlos", "Ana", "Luis", "María", "Diego"];
const productos = ["Rayo Basic", "Rayo Prem", "Rayo Web Pro"];
setInterval(()=>{
  const noti = document.getElementById('noti');
  noti.innerText = `🔥 ${nombres[Math.floor(Math.random()*5)]} acaba de comprar ${productos[Math.floor(Math.random()*3)]}`;
  noti.classList.add('show');
  setTimeout(()=>noti.classList.remove('show'), 4000);
}, 20000);

// CONTADOR REAL
const namespace = "botrayo"; const key = "visitas";
async function actualizarContador() {
  try { const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`); const data = await res.json(); document.getElementById('visitas').innerText = data.value; } catch(e) {}
}
actualizarContador();

// MÚSICA DE FONDO VOLUMEN 5
const musica = document.getElementById('musica'); 
musica.volume = 0.5;

// Solo reproduce música si el usuario toca algo - regla de celulares
document.addEventListener('click', ()=>{
  musica.play().catch(() => {}) 
}, {once: true});

function activarMusica(){ 
  musica.play(); 
  document.getElementById('btnSonido').style.display = 'none'; 
}

// FUNCIONES PARA EL POPUP DE PAGO
function abrirPago(nombre, precio){
  document.getElementById('popupPago').style.display = 'flex';
  document.getElementById('nombrePlan').innerText = nombre;
  document.getElementById('precioPlan').innerText = precio;
  document.getElementById('btnWhats').href = `https://wa.me/51936994155?text=Hola%20Yayico,%20ya%20pagué%20${nombre}%20de%20S/${precio}.%20Aquí%20mi%20captura:`;
}

function cerrarPago(){
  document.getElementById('popupPago').style.display = 'none';
}

function copiar(texto){
  navigator.clipboard.writeText(texto);
  alert("✅ Copiado: " + texto);
}

window.onclick = function(event) {
  if (event.target == document.getElementById('popupPago')) {
    cerrarPago();
  }
}