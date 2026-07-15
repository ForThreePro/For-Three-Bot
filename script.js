// BUSCADOR
document.getElementById('commandSearch').addEventListener('input', e=>{
  let s = e.target.value.toLowerCase();
  document.querySelectorAll('.cmd-item').forEach(c=>{
    c.style.display = c.innerText.toLowerCase().includes(s) ? 'block' : 'none'
  });
});

// POPUP CON TUS DATOS
let productoActual = "";
let precioActual = "";

function openPopup(product, price) {
  productoActual = product;
  precioActual = price;
  document.getElementById('popupProduct').innerText = product;
  document.getElementById('popupPrice').innerText = price;
  
  let mensaje = `Hola! Quiero comprar:%0A*Producto:* ${product}%0A*Precio:* ${price}%0A%0A*Ya realicé el pago*%0AAdjunto captura`;
  document.getElementById('btnConfirmar').href = `https://wa.me/51936994155?text=${mensaje}`;
  
  document.getElementById('paymentPopup').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closePopup() {
  document.getElementById('paymentPopup').classList.remove('active');
  document.body.style.overflow = 'auto';
}
document.getElementById('paymentPopup').addEventListener('click', e=>{
  if(e.target.id === 'paymentPopup') closePopup()
})

// MUSICA
let audio = document.getElementById('bgMusic');
let playBtn = document.getElementById('playBtn');
function toggleMusic() {
  if(audio.paused){audio.play();playBtn.innerText = '⏸'} 
  else {audio.pause();playBtn.innerText = '▶'}
}
audio.volume = 0.45;