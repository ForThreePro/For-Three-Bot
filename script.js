let pais='PEN',precioBase=0,metodoSel='';

// REGLA DE PAGOS NUEVA
const pagosData = {
  PEN: [ // SOLO YAPE PARA PERU
    {nombre:'Yape', num:'936994155', icon:'💛'}
  ],
  MXN: [ // OTROS PAISES = PREX + GLOBAL
    {nombre:'Prex', num:'12249975', icon:'💳'},
    {nombre:'Global66', num:'@CRIROJ1855', icon:'🌎'}
  ],
  CLP: [
    {nombre:'Prex', num:'12249975', icon:'💳'},
    {nombre:'Global66', num:'@CRIROJ1855', icon:'🌎'}
  ],
  COP: [
    {nombre:'Prex', num:'12249975', icon:'💳'},
    {nombre:'Global66', num:'@CRIROJ1855', icon:'🌎'}
  ]
};

function abrirPago(n,p){
  precioBase=p;
  document.getElementById('popup').style.display='flex';
  document.getElementById('nomPlan').innerText=n;
  cambiarPais()
}

function cambiarPais(){
  pais=document.getElementById('pais').value;
  document.getElementById('btnPais').innerText='🌎 '+pais;

  // Cambiar precios
  document.querySelectorAll('.price').forEach(el=>{
    el.innerText = '$' + el.getAttribute(`data-${pais.toLowerCase()}`);
  });

  // Renderizar métodos según país
  let html='';
  pagosData[pais].forEach(p=>{
    html+=`<div class="metodo" onclick="seleccionar(this,'${p.num}')"><b>${p.icon} ${p.nombre}</b><small>${p.num}</small></div>`;
  });
  document.getElementById('metodosPago').innerHTML=html;
  document.getElementById('qrBox').style.display='none'; // reset
}

function seleccionar(el,num){
  document.querySelectorAll('.metodo').forEach(m=>m.classList.remove('seleccionado'));
  el.classList.add('seleccionado');
  metodoSel=num;
  document.getElementById('qrBox').style.display='block';
}

function copiarDatos(){navigator.clipboard.writeText(metodoSel);alert('✅ Datos copiados: '+metodoSel)}

function enviarWsp(){
  if(!metodoSel){alert('Selecciona un método de pago');return}
  let msg=`Hola Yallico 👋 Quiero el plan ${document.getElementById('nomPlan').innerText}. Ya pagué por ${metodoSel}. Te envío la captura.`;
  window.open(`https://wa.me/51936994155?text=${encodeURIComponent(msg)}`,'_blank');
}

function cerrarPago(){document.getElementById('popup').style.display='none'}

// CONTADOR
function timer(){let h=23,m=59,s=59;setInterval(()=>{s--;if(s<0){s=59;m--}if(m<0){m=59;h--}document.getElementById('timer').innerText=`${h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}`},1000)}timer();

// MÚSICA
const m=document.getElementById('musica');m.volume=0.1;let ini=false;
document.body.onclick=()=>{if(!ini){m.play().catch(()=>{});ini=true}};
function toggleMusica(){const b=document.getElementById('btnMusica');if(m.paused){m.play();b.innerText='🔊'}else{m.pause();b.innerText='🔇'}}

// PARTÍCULAS
const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
let particles=[];for(let i=0;i<100;i++){particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2,dx:(Math.random()-0.5)*0.5,dy:(Math.random()-0.5)*0.5})}
function animar(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='rgba(0,245,255,0.6)';
particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>canvas.width)p.dx*=-1;if(p.y<0||p.y>canvas.height)p.dy*=-1})}
setInterval(animar,30);