let pais='PEN',precioBase=0,metodoSel='',datosPago={};

// DATOS DE PAGO
const pagosData = {
  PEN: [{id:'yape', nombre:'Yape', num:'936994155', icon:'💛'}, {id:'prex', nombre:'Prex', num:'12249975', icon:'💳'}],
  MXN: [{id:'global', nombre:'Global66', num:'@CRIROJ1855', icon:'🌎'}],
  CLP: [{id:'global', nombre:'Global66', num:'@CRIROJ1855', icon:'🌎'}],
  COP: [{id:'global', nombre:'Global66', num:'@CRIROJ1855', icon:'🌎'}]
};

function abrirSelectorPais(){document.getElementById('pais').focus()}
function abrirPago(n,p){
  precioBase=p;document.getElementById('popup').style.display='flex';
  document.getElementById('nomPlan').innerText=n;cambiarPais()
}
function cambiarPais(){
  pais=document.getElementById('pais').value;
  document.getElementById('btnPais').innerText='🌎 '+pais;
  document.getElementById('precio').innerText=document.querySelector(`.pro .price`).getAttribute(`data-${pais.toLowerCase()}`);
  
  // Renderizar métodos de pago
  let html='';
  pagosData[pais].forEach(p=>{
    html+=`<div class="metodo" onclick="seleccionar(this,'${p.num}')"><img src="https://i.imgur.com/4L1tN9g.png"><div><b>${p.icon} ${p.nombre}</b><small>${p.num}</small></div></div>`;
  });
  document.getElementById('metodosPago').innerHTML=html;
}
function cerrarPago(){document.getElementById('popup').style.display='none'}
function seleccionar(el,num){
  document.querySelectorAll('.metodo').forEach(m=>m.classList.remove('seleccionado'));
  el.classList.add('seleccionado');metodoSel=num;
}
function enviarWsp(){
  if(!metodoSel){alert('Selecciona un método de pago');return}
  let msg=`Hola Yallico 👋 Quiero el plan ${document.getElementById('nomPlan').innerText}. Ya transferí a ${metodoSel}. Te mando la captura.`;
  window.open(`https://wa.me/51936994155?text=${encodeURIComponent(msg)}`,'_blank');
}

// MÚSICA
const m=document.getElementById('musica');m.volume=0.1;let ini=false;
document.body.onclick=()=>{if(!ini){m.play().catch(()=>{});ini=true}};
function toggleMusica(){const b=document.getElementById('btnMusica');if(m.paused){m.play();b.innerText='🔊'}else{m.pause();b.innerText='🔇'}}

// PARTÍCULAS DE FONDO
const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
let particles=[];for(let i=0;i<80;i++){particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2,dx:(Math.random()-0.5)*0.5,dy:(Math.random()-0.5)*0.5})}
function animar(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='rgba(0,245,255,0.5)';
particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>canvas.width)p.dx*=-1;if(p.y<0||p.y>canvas.height)p.dy*=-1})}
setInterval(animar,30);