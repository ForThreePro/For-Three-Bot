// EFECTO BOTONES
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('mouseover',()=>{btn.style.boxShadow='0 0 35px #FFD700'})
  btn.addEventListener('mouseout',()=>{btn.style.boxShadow='0 0 25px #FFD700'})
})

// CONTADOR REAL ONLINE
const namespace = "botrayo";
const key = "visitas";

async function actualizarContador() {
  try {
    const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
    const data = await res.json();
    document.getElementById('visitas').innerText = data.value;
  } catch(e) {
    console.log("Error con el contador");
  }
}

actualizarContador();

// TRUENO
const audio = document.getElementById('trueno');
audio.volume = 0.3;
window.addEventListener('load', () => { 
  audio.play().catch(() => {}) 
});
function activarSonido(){ 
  audio.play(); 
  document.getElementById('btnSonido').style.display = 'none'; 
}