// CONTADOR DE CUPOS QUE BAJA
let cupos = 12;
setInterval(()=>{
  if(cupos > 3){
    cupos -= 1;
    document.getElementById('cupos').innerText = cupos;
  }
}, 7200000); // baja 1 cada 2 horas

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

// TRUENO
const audio = document.getElementById('trueno'); audio.volume = 0.3;
window.addEventListener('load', () => { audio.play().catch(() => {}) });
function activarSonido(){ audio.play(); document.getElementById('btnSonido').style.display = 'none'; }

// EFECTO BOTONES
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('mouseover',()=>{btn.style.boxShadow='0 0 35px #FFD700'})
  btn.addEventListener('mouseout',()=>{btn.style.boxShadow='0 0 25px #FFD700'})
})