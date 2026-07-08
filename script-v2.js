let cupos = 12;
let precioBase = 0;
let nombrePlanActual = '';
let paisSeleccionado = 'PEN'; // Por defecto Perú

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

// PRECIOS FIJOS
const precios = {
 7: { // Bot Basic
    PEN: {sim: 'S/', precio: '7.00'},
    MXN: {sim: '$', precio: '37.00'},
    CLP: {sim: '$', precio: '2,000'},
    COP: {sim: '$', precio: '7,200'},
    USD: {sim: 'US$', precio: '2.50'},
    ARS: {sim: '$', precio: '3,200'},
    PYG: {sim: '₲', precio: '13,200'},
    BOB: {sim: 'Bs', precio: '22.00'}
  },
 30: { // Bot Prem y Web Pro
    PEN: {sim: 'S/', precio: '30.00'},
    MXN: {sim: '$', precio: '160.50'},
    CLP: {sim: '$', precio: '8,500'},
    COP: {sim: '$', precio: '31,500'},
    USD: {sim: 'US$', precio: '9.00'},
    ARS: {sim: '$', precio: '14,141.28'},
    PYG: {sim: '₲', precio: '54,544.60'},
    BOB: {sim: 'Bs', precio: '90.43'}
  }
};

// NUEVA FUNCION PARA CAMBIAR DESDE ARRIBA
function cambiarPaisInicio(){
  paisSeleccionado = document.getElementById('selectorPaisInicio').value;
  actualizarPreciosTarjetas();
}

function actualizarPreciosTarjetas(){
  const data7 = precios; // <-- ARREGLADO
  const data30 = precios; // <-- ARREGLADO

  document.querySelectorAll('.precio')[0].innerText = `${data7.sim}${data7.precio}`;
  document.querySelectorAll('.precio')[1].innerText = `${data30.sim}${data30.precio}`;
  document.querySelectorAll('.precio')[2].innerText = `${data30.sim}${data30.precio}`;
}

function abrirPago(nombre, precio){
  precioBase = parseInt(precio); // <-- CAMBIO: parseInt en vez de parseFloat
  nombrePlanActual = nombre;
  document.getElementById('popupPago').style.display = 'flex';
  document.getElementById('nombrePlan').innerText = nombre;

  document.getElementById('selectorPais').value = paisSeleccionado;
  cambiarPais();
}

function cambiarPais(){
  const pais = document.getElementById('selectorPais').value;
  paisSeleccionado = pais;
  document.getElementById('selectorPaisInicio').value = pais;

  const data = precios; // <-- ARREGLADO
  const paisData = data; // <-- ARREGLADO

  document.getElementById('precioConvertido').innerText = `${paisData.sim}${paisData.precio} ${pais}`;

  let mensaje = `Hola Yallico, ya pagué ${nombrePlanActual} de ${paisData.sim}${paisData.precio} ${pais}. Aquí mi captura:`;
  document.getElementById('btnWhats').href = `https://wa.me/51936994155?text=${encodeURIComponent(mensaje)}`;
}

function cerrarPago(){ document.getElementById('popupPago').style.display = 'none'; }
function copiar(texto){ navigator.clipboard.writeText(texto); alert("✅ Copiado: " + texto); }
window.onclick = function(event) { if (event.target == document.getElementById('popupPago')) { cerrarPago(); } }

// MÚSICA
const musica = document.getElementById('musicaFondo');
musica.volume = 0.3;
let musicaIniciada = false;

document.body.addEventListener('click', () => {
  if(!musicaIniciada){
    musica.play().catch(err => console.log("Musica bloqueada:", err));
    musicaIniciada = true;
  }
});

function toggleMusica(){
  const btn = document.getElementById('btnMusica');
  if(musica.paused){ musica.play(); btn.innerText = '🔊'; }
  else { musica.pause(); btn.innerText = '🔇'; }
}

// Carga inicial
window.addEventListener('load', actualizarPreciosTarjetas);