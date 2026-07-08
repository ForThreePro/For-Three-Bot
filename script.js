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
  let simbolo = pais === 'PEN' ? 'S/' : pais === 'MXN' ? '$' : pais === 'CLP' ? '$' : '$';
  document.getElementById('btnPais').innerText = '⚡ País: ' + pais;
  document.getElementById('precioConvertido').innerText = simbolo + precioBase;
}
function cerrarPago(){ document.getElementById('popupPago').style.display = 'none'; }
const musica = document.getElementById('musicaFondo'); musica.volume = 0.3;
let musicaIniciada = false;
document.body.addEventListener('click', () => { if(!musicaIniciada){ musica.play().catch(err => {}); musicaIniciada = true; } });
function toggleMusica(){ const btn = document.getElementById('btnMusica'); if(musica.paused){ musica.play(); btn.innerText = '🔊'; } else { musica.pause(); btn.innerText = '🔇'; } }