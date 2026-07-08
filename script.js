let pais='PEN',precio=0;
function abrirSelectorPais(){document.getElementById('pais').focus()}
function abrirPago(n,p){precio=p;document.getElementById('popup').style.display='flex';document.getElementById('nomPlan').innerText=n;cambiarPais()}
function cambiarPais(){
  pais=document.getElementById('pais').value;let s='S/',pf=precio;
  if(pais=='MXN'){s='$';pf=precio*5.5}if(pais=='CLP'){s='$';pf=precio*1000}if(pais=='COP'){s='$';pf=precio*1300}
  document.getElementById('btnPais').innerText='PAÍS: '+pais;
  document.getElementById('precio').innerText=s+Math.round(pf).toLocaleString();
  document.getElementById('yapeItem').style.display=pais=='PEN'?'flex':'none';
}
function cerrarPago(){document.getElementById('popup').style.display='none'}
function copiar(id){navigator.clipboard.writeText(document.getElementById(id).innerText);alert('✅ Copiado')}
const m=document.getElementById('musica');m.volume=0.2;let ini=false;
document.body.onclick=()=>{if(!ini){m.play();ini=true}};
function toggleMusica(){const b=document.getElementById('btnMusica');if(m.paused){m.play();b.innerText='🔊'}else{m.pause();b.innerText='🔇'}}