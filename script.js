let cupos = 12;
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

function abrirPago(nombre, precio){
  document.getElementById('popupPago').style.display = 'flex';
  document.getElementById('nombrePlan').innerText = nombre;
  document.getElementById('precioPlan').innerText = precio;
  
  let mensaje = `Hola Yallico, ya pagué ${nombre} de S/${precio}. Aquí mi captura:`;
  document.getElementById('btnWhats').href = `https://wa.me/51936994155?text=${encodeURIComponent(mensaje)}`;
}

function cerrarPago(){ document.getElementById('popupPago').style.display = 'none'; }
function copiar(texto){ navigator.clipboard.writeText(texto); alert("✅ Copiado: " + texto); }
window.onclick = function(event) { if (event.target == document.getElementById('popupPago')) { cerrarPago(); } }