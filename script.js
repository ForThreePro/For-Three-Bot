let pais='PEN',precioBase=0;

function abrirSelectorPais(){document.getElementById('pais').focus()}

function abrirPago(nombre, precio){
  precioBase = precio;
  document.getElementById('popup').style.display = 'flex';
  document.getElementById('nomPlan').innerText = nombre;
  cambiarPais();
}

function cambiarPais(){
  pais = document.getElementById('pais').value;
  let simbolo = 'S/';
  let precioFinal = precioBase;
  
  if(pais === 'MXN'){ simbolo = '$'; precioFinal = precioBase * 5.5; }
  if(pais === 'CLP'){ simbolo = '$'; precioFinal = precioBase * 1000; }
  if(pais === 'COP'){ simbolo = '$'; precioFinal = precioBase * 1300; }
  
  document.getElementById('btnPais').innerText = 'PAÍS: ' + pais;
  document.getElementById('precio').innerText = simbolo + Math.round(precioFinal).toLocaleString();
  
  // Ocultar Yape si no es Perú
  document.getElementById('yapeCard').style.display = pais === 'PEN' ? 'block' : 'none';
}

function cerrarPago(){ document.getElementById('popup').style.display = 'none'; }

function copiar(id){
  let texto = document.getElementById(id).innerText;
  navigator.clipboard.writeText(texto);
  alert("✅ Copiado: " + texto);
}

// Música
const musica = document.getElementById('musica'); 
musica.volume = 0.2;
let musicaIniciada = false;
document.body.addEventListener('click', () => { 
  if(!musicaIniciada){ musica.play().catch(()=>{}); musicaIniciada = true; } 
});
function toggleMusica(){ 
  const btn = document.getElementById('btnMusica'); 
  if(musica.paused){ musica.play(); btn.innerText = '🔊'; } 
  else { musica.pause(); btn.innerText = '🔇'; } 
}