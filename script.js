let pais='PEN',precioBase=0,metodoSel='',planSel='';

// REGLA DE PAGOS
const pagosData = {
  PEN: [{nombre:'YAPE', num:'936994155'}], // SOLO YAPE
  MXN: [{nombre:'PREX', num:'12249975'},{nombre:'GLOBAL66', num:'@CRIROJ1855'}],
  CLP: [{nombre:'PREX', num:'12249975'},{nombre:'GLOBAL66', num:'@CRIROJ1855'}],
  COP: [{nombre:'PREX', num:'12249975'},{nombre:'GLOBAL66', num:'@CRIROJ1855'}]
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
  document.getElementById('precio').innerText = document.querySelector(`.elite .price`).getAttribute(`data-${pais.toLowerCase()}`);

  // Renderizar métodos - CORREGIDO
  let html='';
  pagosData.forEach(p=>{
    html+=`<div class="metodo" onclick="seleccionar(this,'${p.num}')">[ ${p.nombre} ] >> ${p.num}</div>`;
  });
  document.getElementById('metodosPago').innerHTML=html;
  metodoSel = '';
}

function seleccionar(el,num){
  document.querySelectorAll('.metodo').forEach(m=>m.classList.remove('sel'));
  el.classList.add('sel');metodoSel=num;
}

function enviarWsp(){
  if(!metodoSel){alert('SELECCIONA UN METODO');return}
  let msg=`[NEONET] SOLICITUD: Plan ${planSel}. PAGO: ${metodoSel}. ENVIANDO CAPTURA.`;
  window.open(`https://wa.me/51936994155?text=${encodeURIComponent(msg)}`,'_blank');
}
function cerrarPago(){document.getElementById('popup').style.display='none'}

// MÚSICA
const m=document.getElementById('musica');m.volume=0.1;let ini=false;
document.body.onclick=()=>{if(!ini){m.play().catch(()=>{});ini=true}};
function toggleMusica(){const b=document.getElementById('btnMusica');if(m.paused){m.play();b.innerText='🔊'}else{m.pause();b.innerText='🔇'}}