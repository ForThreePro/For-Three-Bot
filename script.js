let pais='PEN', precioBase=0;
function abrirSelectorPais(){document.getElementById('selectorPais').focus()}
function abrirPago(n,p){precioBase=p;document.getElementById('popupPago').style.display='flex';document.getElementById('nombrePlan').innerText=n;cambiarPais()}
function cambiarPais(){
  pais=document.getElementById('selectorPais').value;
  let s='S/', pf=precioBase;
  if(pais=='MXN'){s='$';pf=precioBase*5.5}
  if(pais=='CLP'){s='$';pf=precioBase*1000}
  if(pais=='COP'){s='$';pf=precioBase*1300}
  document.getElementById('btnPais').innerText='PAÍS: '+pais;
  document.getElementById('precioConvertido').innerText=s+Math.round(pf).toLocaleString();
  document.getElementById('pago-yape').style.display=pais=='PEN'?'flex':'none';
}
function cerrarPago(){document.getElementById('popupPago').style.display='none'}
function copiar(id){navigator.clipboard.writeText(document.getElementById(id).innerText);alert('Copiado')}
const musica=document.getElementById('musicaFondo');musica.volume=0.2;let ini=false;
document.body.addEventListener('click',()=>{if(!ini){musica.play().catch(()=>{});ini=true}});
function toggleMusica(){const b=document.getElementById('btnMusica');if(musica.paused){musica.play();b.innerText='🔊'}else{musica.pause();b.innerText='🔇'}}