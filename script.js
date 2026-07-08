let pais='PEN',precioBase=0,metodoSel='';

function abrirSelectorPais(){document.getElementById('pais').focus()}
function abrirPago(n,p){
  precioBase=p;document.getElementById('popup').style.display='flex';
  document.getElementById('nomPlan').innerText=n;cambiarPais()
}
function cambiarPais(){
  pais=document.getElementById('pais').value;let s='$',pf=precioBase;
  if(pais=='PEN'){s='S/';pf=precioBase*3.8}
  if(pais=='MXN'){s='$';pf=precioBase*18}
  if(pais=='CLP'){s='$';pf=precioBase*950}
  if(pais=='COP'){s='$';pf=precioBase*4000}
  document.getElementById('btnPais').innerText='🌎 '+pais;
  document.getElementById('precio').innerText=s+Math.round(pf).toLocaleString();
  document.getElementById('yapeMetodo').style.display=pais=='PEN'?'flex':'none';
}
function cerrarPago(){document.getElementById('popup').style.display='none'}
function seleccionar(el){
  document.querySelectorAll('.metodo').forEach(m=>m.classList.remove('seleccionado'));
  el.classList.add('seleccionado');
  metodoSel=el.querySelector('small').innerText;
}
function irWhatsapp(){
  if(!metodoSel){alert('Selecciona un método de pago');return}
  let msg=`Hola Yallico, pagué el plan ${document.getElementById('nomPlan').innerText} por ${metodoSel}. Te envío captura.`;
  window.open(`https://wa.me/51936994155?text=${encodeURIComponent(msg)}`,'_blank');
}
const m=document.getElementById('musica');m.volume=0.15;let ini=false;
document.body.onclick=()=>{if(!ini){m.play();ini=true}};
function toggleMusica(){const b=document.getElementById('btnMusica');if(m.paused){m.play();b.innerText='🔊'}else{m.pause();b.innerText='🔇'}}