let pais='PEN',precioBase=0,metodoSel='',planSel='';

// REGLA DE PAGOS
const pagosData = {
  PEN: [{nombre:'Yape', num:'936994155'}], // SOLO YAPE
  MXN: [{nombre:'Prex', num:'12249975'},{nombre:'Global66', num:'@CRIROJ1855'}],
  CLP: [{nombre:'Prex', num:'12249975'},{nombre:'Global66', num:'@CRIROJ1855'}],
  COP: [{nombre:'Prex', num:'12249975'},{nombre:'Global66', num:'@CRIROJ1855'}]
};

function abrirPago(n,p){
  precioBase=p;planSel=n;
  document.getElementById('popup').style.display='flex';
  document.getElementById('nomPlan').innerText=n;
  document.getElementById('pais').value = pais;
  cambiarPais(); 
}

function cambiarPaisTop(){
  pais=document.getElementById('paisTop').value;
  document.querySelectorAll('.price').forEach(el=>{
    el.innerText = el.getAttribute(`data-${pais.toLowerCase()}`);
  });
}

function cambiarPais(){
  pais=document.getElementById('pais').value;
  document.getElementById('paisTop').value = pais;
  document.getElementById('precio').innerText = document.querySelector(`.pro .price`).getAttribute(`data-${pais.toLowerCase()}`);

  // ARREGLO: Ahora sí agarramos el array del país
  let html='';
  const metodos = pagosData; // <-- ESTA ERA LA LÍNEA MALA
  
  metodos.forEach(p=>{
    html+=`<div class="metodo" onclick="seleccionar(this,'${p.num}')"><b>${p.nombre}</b><br><small>${p.num}</small></div>`;
  });
  document.getElementById('metodosPago').innerHTML=html;
  metodoSel = '';
}

function seleccionar(el,num){
  document.querySelectorAll('.metodo').forEach(m=>m.classList.remove('sel'));
  el.classList.add('sel');metodoSel=num;
}

function enviarWsp(){
  if(!metodoSel){alert('Selecciona un método de pago');return}
  let msg=`Hola, quiero activar AURA AI plan ${planSel}. Realicé el pago a ${metodoSel}. Adjunto comprobante.`;
  window.open(`https://wa.me/51936994155?text=${encodeURIComponent(msg)}`,'_blank');
}
function cerrarPago(){document.getElementById('popup').style.display='none'}

// MÚSICA
const m=document.getElementById('musica');m.volume=0.08;let ini=false;
document.body.onclick=()=>{if(!ini){m.play().catch(()=>{});ini=true}};
function toggleMusica(){const b=document.getElementById('btnMusica');if(m.paused){m.play();b.innerText='🔊'}else{m.pause();b.innerText='🔇'}}