// BUSCADOR COMANDOS
document.getElementById('commandSearch').addEventListener('input', e=>{
  let s = e.target.value.toLowerCase();
  document.querySelectorAll('.cmd-tags span').forEach(c=>{
    c.style.display = c.innerText.toLowerCase().includes(s) ? 'inline-block' : 'none'
  });
});

// POPUP COMPRA
function openPopup(product, price) {
  document.getElementById('popupProduct').innerText = product;
  document.getElementById('popupPrice').innerText = price;
  let m = `Hola quiero comprar: ${encodeURIComponent(product)} - ${encodeURIComponent(price)}`;
  document.getElementById('btnYape').href = `https://wa.me/51936994155?text=${m} Yape`;
  document.getElementById('btnPrex').href = `https://wa.me/51936994155?text=${m} Prex`;
  document.getElementById('btnGlobal').href = `https://wa.me/51936994155?text=${m} Global66`;
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

// PLAYER MUSICA
let audio = document.getElementById('bgMusic');
let playBtn = document.getElementById('playBtn');
function toggleMusic() {
  if(audio.paused){
    audio.play();
    playBtn.innerText = '⏸'
  } else {
    audio.pause();
    playBtn.innerText = '▶'
  }
}
audio.volume = 0.3;