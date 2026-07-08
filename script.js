let pais = 'PEN';
function abrirSelectorPais(){ document.getElementById('selectorPais').click(); }
function abrirPago(nombre, precio){ 
  document.getElementById('popupPago').style.display = 'flex';
  document.getElementById('nombrePlan').innerText = nombre;
  cambiarPais();
}
function cambiarPais(){
  pais = document.getElementById('selectorPais').value;
  document.getElementById('btnPais').innerText = '⚡ País: ' + pais;
  // Aquí van los precios por país
}
function cerrarPago(){ document.getElementById('popupPago').style.display = 'none'; }
const musica = document.getElementById('musicaFondo'); musica.volume = 0.3;
function toggleMusica(){ const btn = document.getElementById('btnMusica'); if(musica.paused){ musica.play(); btn.innerText = '🔊'; } else { musica.pause(); btn.innerText = '🔇'; } }
document.body.addEventListener('click', () => { if(musica.paused){ musica.play(); } });