function openPopup(product, price) {
  document.getElementById('popupProduct').innerText = product;
  document.getElementById('popupPrice').innerText = price;
  let m = `Hola quiero comprar: ${product} - ${price}`;
  document.getElementById('btnYape').href = `https://wa.me/51936994155?text=${m} Yape`;
  document.getElementById('btnPrex').href = `https://wa.me/51936994155?text=${m} Prex`;
  document.getElementById('btnGlobal').href = `https://wa.me/51936994155?text=${m} Global66`;
  document.getElementById('paymentPopup').classList.add('active');
}
function closePopup() {document.getElementById('paymentPopup').classList.remove('active')}

let audio = document.getElementById('bgMusic');
let playBtn = document.getElementById('playBtn');
function toggleMusic() {
  if(audio.paused){audio.play();playBtn.innerText = '⏸'} 
  else {audio.pause();playBtn.innerText = '▶'}
}
audio.volume = 0.3;