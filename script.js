console.log("Rayo Prem Bot v8 Cyber Cargado");
let pais = 'PEN';
let precioBase = 0;

function abrirSelectorPais(){ document.getElementById('selectorPais').focus(); }

function abrirPago(nombre, precio){ 
  precioBase = precio;
  document.getElementById('popupPago').style.display = 'flex';
  document.getElementById('nombrePlan').innerText = nombre;
  cambiarPais();
}

function cambiarPais(){
  pais = document.getElementById('selectorPais').value;
  let simbolo = 'S/';
  let precioFinal = precioBase;
  
  if(pais === 'MXN'){ simbolo = '$'; precioFinal = precioBase * 5.5; }
  if(pais === 'CLP'){ simbolo = '$'; precioFinal = precioBase * 1000; }
  if(pais === 'COP'){ simbolo = '$'; precioFinal = precioBase * 1300; }
  
  document.getElementById('btnPais').innerText = '🌍 PAÍS: ' + pais;
  document.getElementById('precioConvertido').innerText = simbolo + Math.round(precioFinal).toLocaleString();
  
  const yapeDiv = document.getElementById('pago-yape');
  yapeDiv.style.display = pais === 'PEN' ? 'flex' : 'none';
}

function cerrarPago(){ document.getElementById('popupPago').style.display = 'none'; }

function copiar(id){
  let texto = document.getElementById(id).innerText;
  navigator.clipboard.writeText(texto);
  alert("✅ Copiado: " + texto);
}

const musica = document.getElementById('musicaFondo'); 
musica.volume = 0.2;
let musicaIniciada = false;

document.body.addEventListener('click', () => { 
  if(!musicaIniciada){ musica.play().catch(err => {}); musicaIniciada = true; } 
});

function toggleMusica(){ 
  const btn = document.getElementById('btnMusica'); 
  if(musica.paused){ musica.play(); btn.innerText = '🔊'; } 
  else { musica.pause(); btn.innerText = '🔇'; } 
}