let cupos = 12;
let precioBase = 0;
let nombrePlanActual = '';

setInterval(()=>{ if(cupos > 3){ cupos -= 1; document.getElementById('cupos').innerText = cupos; } }, 7200000);

const texto = "by Yallico | Automatización que vende 24/7 sin caídas";
let i = 0;
function type(){ if(i < texto.length){ document.getElementById('typing').innerHTML += texto.charAt(i); i++; setTimeout(type, 50); } }
type();

const observer = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show') }) });
document.querySelectorAll('.anim').forEach(el=>observer.observe(el));

const nombres = ["Carlos", "Ana", "Luis", "María", "Diego"];
const productos = ["Bot Basic", "Bot Prem", "Web Pro"];
setInterval(()=>{
  const noti = document.getElementById('noti');
  noti.innerText = `🔥 ${nombres[Math.floor(Math.random()*5)]} acaba de comprar ${productos[Math.floor(Math.random()*3)]}`;
  noti.classList.add('show');
  setTimeout(()=>noti.classList.remove('show'), 4000);
}, 20000);

const namespace = "rayoprembot"; const key = "visitas";
async function actualizarContador() {
  try { const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`); const data = await res.json(); document.getElementById('visitas').innerText = data.value; } catch(e) { document.getElementById('visitas').innerText = "100+"; }
}
actualizarContador();

// TASAS EXACTAS SEGÚN TUS PRECIOS
const tasas = {
  PEN: 1,
  MXN: 5.1429,    // 7=37 | 30=160.50
  CLP: 285.71,    // 7=2000 | 30=8500  
  COP: 1028.57,   // 7=7200 | 30=31500
  USD: 0.3333,    // 7=2.50 | 30=9
  ARS: 457.14,    // 7=3200 | 30=14141.28
  PYG: 1885.71,   // 7=13200 | 30=54544.60
  BOB: 3.1429     // 7=22 | 30=90.43
};

const simbolos = {
  PEN: 'S/',
  MXN: '$',
  CLP: '$',
  COP: '$',
  USD: 'US$',
  ARS: '$',
  PYG: '₲',
  BOB: 'Bs'
};

function abrirPago(nombre, precio){
  precioBase = parseFloat(precio);
  nombrePlanActual = nombre;
  document.getElementById('popupPago').style.display = 'flex';
  document.getElementById('nombrePlan').innerText = nombre;
  cambiarPais();
}

function cambiarPais(){
  const pais = document.getElementById('selectorPais').value;
  const precioConvertido = (precioBase * tasas[pais]).toFixed(2);
  const precioFormateado = parseFloat(precioConvertido).toLocaleString('es-PE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  document.getElementById('precioConvertido').innerText = `${simbolos[pais]}${precioFormateado} ${pais}`;
  
  let mensaje = `Hola Yallico, ya pagué ${nombrePlanActual} de ${simbolos[pais]}${precioFormateado} ${pais}. Aquí mi captura:`;
  document.getElementById('btnWhats').href = `https://wa.me/51936994155?text=${encodeURIComponent(mensaje)}`;
}

function cerrarPago(){ document.getElementById('popupPago').style.display = 'none'; }
function copiar(texto){ navigator.clipboard.writeText(texto); alert("✅ Copiado: " + texto); }
window.onclick = function(event) { if (event.target == document.getElementById('popupPago')) { cerrarPago(); } }

// MÚSICA DE FONDO AL 50%
const musica = document.getElementById('musicaFondo');
musica.volume = 0.5;

document.addEventListener('click', function iniciarMusica() {
  musica.play().catch(e => {});
  document.removeEventListener('click', iniciarMusica);
}, { once: true });

function toggleMusica(){
  const btn = document.getElementById('btnMusica');
  if(musica.paused){
    musica.play();
    btn.innerText = '🔊';
  } else {
    musica.pause();
    btn.innerText = '🔇';
  }
}