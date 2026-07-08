let pais='PEN',precioBase=0,metodoSel='';

const pagosData = {
  PEN: [{nombre:'Yape', num:'936994155'}], // SOLO YAPE
  MXN: [{nombre:'Prex', num:'12249975'},{nombre:'Global66', num:'@CRIROJ1855'}], // DEMAS
  CLP: [{nombre:'Prex', num:'12249975'},{nombre:'Global66', num:'@CRIROJ1855'}],
  COP: [{nombre:'Prex', num:'12249975'},{nombre:'Global66', num:'@CRIROJ1855'}]
};

function abrirPago(n,p){
  precioBase=p;document.getElementById('popup').style.display='flex';
  document.getElementById('nomPlan').innerText=n;cambiarPais()
}

function cambiarPais(){
  pais=document.getElementById('pais').value;
  document.getElementById('btnPais').innerText= pais=='PEN'?'🇵🇪 PERÚ':'🌎 '+pais;

  // Cambiar precio
  document.querySelectorAll('.price').forEach(el=>{
    el.innerText = el.getAttribute(`data-${pais.toLowerCase()}`);
  });
  document.getElementById('precio').innerText = document.querySelector('.card.pro.price').getAttribute(`data-${pais.toLowerCase()}`);

  // Renderizar pagos según regla
  let html='';
  pagosData[pais].forEach(p=>{
    html+=`<div class="metodo" onclick="seleccionar(this,'${p.num}')"><b>${p.nombre}</b><small>${p.num}</small></div>`;
  });
  document.getElementById('metodosPago').innerHTML=html;
  document.getElementById('numTarjeta').innerText = pagosData[pais][0].num;
}

function seleccionar(el,num){
  document.querySelectorAll('.metodo').forEach(m=>m.classList.remove('sel'));
  el.classList.add('sel');metodoSel=num;
  document.getElementById('numTarjeta').innerText = num;
}

function enviarWsp(){
  if(!metodoSel){alert('Elige un método de pago');return}
  let msg=`Hola, pagué el plan ${document.getElementById('nomPlan').innerText} por ${metodoSel}. Envío captura.`;
  window.open(`https://wa.me/51936994155?text=${encodeURIComponent(msg)}`,'_blank');
}
function cerrarPago(){document.getElementById('popup').style.display='none'}

// MÚSICA
const m=document.getElementById('musica');m.volume=0.1;let ini=false;
document.body.onclick=()=>{if(!ini){m.play().catch(()=>{});ini=true}};
function toggleMusica(){const b=document.getElementById('btnMusica');if(m.paused){m.play();b.innerText='🔊'}else{m.pause();b.innerText='🔇'}}