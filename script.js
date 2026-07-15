let producto = "";
let precio = "";

function openModal(prod, prec) {
  producto = prod;
  precio = prec;
  document.getElementById('modalProduct').innerText = prod;
  document.getElementById('modalPrice').innerText = prec;
  
  let msg = `Hola! Quiero comprar:%0A*${prod}* - *${prec}*%0A%0AYa realicé el pago. Adjunto captura.`;
  document.getElementById('btnWhatsapp').href = `https://wa.me/51936994155?text=${msg}`;
  
  document.getElementById('paymentModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('paymentModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

document.getElementById('paymentModal').addEventListener('click', e=>{
  if(e.target.id === 'paymentModal') closeModal()
})

function selectMethod(method) {
  document.querySelectorAll('.method-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.payment-info').forEach(i=>i.style.display='none');
  
  event.target.closest('.method-btn').classList.add('active');
  document.getElementById(`info-${method}`).style.display = 'block';
}

function copy(text) {
  navigator.clipboard.writeText(text);
  alert('✅ Copiado');
}

let audio = document.getElementById('bgMusic');
let playBtn = document.getElementById('playBtn');
function toggleMusic() {
  if(audio.paused){audio.play();playBtn.innerText = '⏸'} 
  else {audio.pause();playBtn.innerText = '▶'}
}
audio.volume = 0.15;