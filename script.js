// BUSCADOR
document.getElementById('commandSearch').addEventListener('input', e=>{
  let s = e.target.value.toLowerCase();
  document.querySelectorAll('.cmd-container span').forEach(c=>{
    c.style.display = c.innerText.toLowerCase().includes(s) ? 'inline-block' : 'none'
  });
});

let productoActual = "";
let precioActual = "";

// POPUP
function openPopup(product, price) {
  productoActual = product;
  precioActual = price;
  document.getElementById('popupProduct').innerText = product;
  document.getElementById('popupPrice').innerText = price;
  
  let mensaje = `Hola! Quiero comprar:%0A*Producto:* ${product}%0A*Precio:* ${price}%0A%0A*Ya realicé el pago*%0AAdjunto captura`;
  document.getElementById('btnConfirmar').href = `https://wa.me/51936994155?text=${mensaje}`;
  
  document.getElementById('paymentPopup').classList.add('active');
  document.body.style.overflow = 'hidden';
  showTab('yape');
}
function closePopup() {
  document.getElementById('paymentPopup').classList.remove('active');
  document.body.style.overflow = 'auto';
}
document.getElementById('paymentPopup').addEventListener('click', e=>{
  if(e.target.id === 'paymentPopup') closePopup()
})

// TABS
function showTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn=>btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content=>content.classList.remove('active'));
  
  document.querySelector(`.tab-btn:nth-child(${tab==='yape'?1:2})`).classList.add('active');
  document.getElementById(`tab-${tab}`).classList.add('active');
}

// COPIAR
function copyText(text) {
  navigator.clipboard.writeText(text);
  alert('✅ Copiado: ' + text);
}

// MUSICA
let audio = document.getElementById('bgMusic');
let playBtn = document.getElementById('playBtn');
function toggleMusic() {
  if(audio.paused){audio.play();playBtn.innerText = '⏸'} 
  else {audio.pause();playBtn.innerText = '▶'}
}
audio.volume = 0.2;