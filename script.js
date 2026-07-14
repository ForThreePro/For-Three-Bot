const observer = new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show')}})},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

function openPopup(product, price) {
  document.getElementById('popupProduct').innerText = product;
  document.getElementById('popupPrice').innerText = price;
  let mensaje = `Hola%20Whois%20quiero%20comprar:%20${encodeURIComponent(product)}%20-${encodeURIComponent(price)}`;
  document.getElementById('btnYape').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Yape`;
  document.getElementById('btnPrex').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Prex`;
  document.getElementById('btnGlobal').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Global66`;
  document.getElementById('paymentPopup').classList.add('active');
}
function closePopup() {document.getElementById('paymentPopup').classList.remove('active');}
document.getElementById('paymentPopup').addEventListener('click', function(e) {if(e.target === this) closePopup();});

function sendTicket(e) {
  e.preventDefault();
  let name = document.getElementById('ticketName').value;
  let wa = document.getElementById('ticketWhatsapp').value;
  let type = document.getElementById('ticketType').value;
  let id = document.getElementById('ticketId').value || 'No tiene';
  let msg = document.getElementById('ticketMessage').value;
  let fecha = new Date().toLocaleString('es-PE');
  let ticket = `🚨 *NUEVO TICKET* 🚨%0A%0A*Fecha:* ${fecha}%0A*Nombre:* ${name}%0A*WhatsApp:* ${wa}%0A*Tipo:* ${type}%0A*ID:* ${id}%0A%0A*PROBLEMA:*%0A${msg}`;
  window.open(`https://wa.me/51936994155?text=${ticket}`, '_blank');
  alert('✅ Ticket enviado! Te respondo en menos de 2 horas ⚡');
  e.target.reset();
}

let audio = document.getElementById('bgMusic');
let playBtn = document.getElementById('playBtn');
let progressBar = document.getElementById('progressBar');
let volumeBar = document.getElementById('volumeBar');
let currentTimeEl = document.getElementById('currentTime');
let durationEl = document.getElementById('duration');
let bars = document.querySelectorAll('.bar');
let audioContext, analyser, dataArray;

function initAudio() {
  if(!audioContext){
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    let source = audioContext.createMediaElementSource(audio);
    source.connect(analyser); analyser.connect(audioContext.destination);
    analyser.fftSize = 64; dataArray = new Uint8Array(analyser.frequencyBinCount);
  }
}
function toggleMusic() {
  initAudio();
  if(audio.paused){audio.play();playBtn.innerText = '⏸';animateEqualizer();} 
  else {audio.pause();playBtn.innerText = '▶';}
function animateEqualizer() {
  if(audio.paused) return;
  analyser.getByteFrequencyData(dataArray);
  bars.forEach((bar, i) => {let value = dataArray[i * 2]; bar.style.height = `${value / 4}px`;});
  requestAnimationFrame(animateEqualizer);
}
audio.addEventListener('timeupdate', () => {
  let progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  currentTimeEl.innerText = formatTime(audio.currentTime);
});
audio.addEventListener('loadedmetadata', () => {durationEl.innerText = formatTime(audio.duration);});
progressBar.addEventListener('input', () => {audio.currentTime = (progressBar.value / 100) * audio.duration;});
volumeBar.addEventListener('input', () => {audio.volume = volumeBar.value / 100;});
function formatTime(seconds) {if(isNaN(seconds)) return "0:00"; let min = Math.floor(seconds / 60); let sec = Math.floor(seconds % 60); return `${min}:${sec < 10 ? '0' : ''}${sec}`;}
audio.volume = 0.3;