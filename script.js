// ANIMACIÓN SCROLL
const observer = new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show')}})},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

// CONTADOR 24H
function updateCountdown() {
  let now = new Date();
  let end = new Date(now.getTime() + 24*60*60*1000);
  function tick(){
    let diff = end - new Date();
    if(diff <= 0){diff = 0}
    let h = Math.floor(diff/1000/60/60);
    let m = Math.floor(diff/1000/60)%60;
    let s = Math.floor(diff/1000)%60;
    document.getElementById('countdown').innerText = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }
  tick(); setInterval(tick, 1000);
}
updateCountdown();

// ÚLTIMAS VENTAS FALSAS
const sales = ["Juan de Lima compró Bot Premium", "Maria de Arequipa compró Hosting", "Luis de Trujillo compró Web"];
let saleIndex = 0;
setInterval(()=>{
  document.getElementById('liveSales').innerText = `🔥 ${sales[saleIndex]} hace ${Math.floor(Math.random()*5)+1} min`;
  saleIndex = (saleIndex + 1) % sales.length;
}, 8000);

// BUSCADOR COMANDOS
document.getElementById('commandSearch').addEventListener('input', function(e){
  let search = e.target.value.toLowerCase();
  document.querySelectorAll('.command-card').forEach(card=>{
    let text = card.innerText.toLowerCase();
    card.style.display = text.includes(search) ? 'block' : 'none';
  });
});

// POPUP SALIDA
let exitShown = false;
document.addEventListener('mouseleave', function(e){
  if(e.clientY < 0 && !exitShown && window.innerWidth > 768){
    document.getElementById('exitPopup').classList.add('active');
    exitShown = true;
  }
});
function closeExit(){document.getElementById('exitPopup').classList.remove('active');}

// CURSOR RAYO
const trail = document.getElementById('cursorTrail');
document.addEventListener('mousemove', e=>{
  trail.style.left = e.clientX - 10 + 'px';
  trail.style.top = e.clientY - 10 + 'px';
});

// PARTICULAS
for(let i=0; i<30; i++){
  let p = document.createElement('div');
  p.style.cssText = `position:absolute;width:2px;height:2px;background:#00D5FF;box-shadow:0 0 10px #00D5FF;animation:fall ${5+Math.random()*5}s linear infinite;left:${Math.random()*100}%;top:-10px`;
  document.getElementById('particles').appendChild(p);
}

// EL RESTO IGUAL: POPUP, TICKET, FAQ, ESTADO, MUSICA
function openPopup(product, price) {
  document.getElementById('popupProduct').innerText = product;
  document.getElementById('popupPrice').innerText = price;
  let mensaje = `Hola%20Whois%20quiero%20comprar:%20${encodeURIComponent(product)}%20-${encodeURIComponent(price)}`;
  document.getElementById('btnYape').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Yape`;
  document.getElementById('btnPrex').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Prex`;
  document.getElementById('btnGlobal').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Global66`;
  document.getElementById('paymentPopup').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closePopup() {
  document.getElementById('paymentPopup').classList.remove('active');
  document.body.style.overflow = 'auto';
}
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

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => {item.classList.remove('active');});
    if(!isActive){faqItem.classList.add('active');}
  });
});

setInterval(()=>{
  let hora = new Date().toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'});
  document.getElementById('botStatus').innerText = 'Online ' + hora;
}, 30000);

let audio = document.getElementById('bgMusic');
let playBtn = document.getElementById('playBtn');
let progressBar = document.getElementById('progressBar');
let volumeBar = document.getElementById('volumeBar');
let currentTimeEl = document.getElementById('currentTime');
let durationEl = document.getElementById('duration');

function toggleMusic() {
  if(audio.paused){audio.play();playBtn.innerText = '⏸';} else {audio.pause();playBtn.innerText = '▶';}
audio.addEventListener('timeupdate', () => {
  if(!isNaN(audio.duration)){
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTimeEl.innerText = formatTime(audio.currentTime);
  }
});
audio.addEventListener('loadedmetadata', () => {durationEl.innerText = formatTime(audio.duration);});
progressBar.addEventListener('input', () => {audio.currentTime = (progressBar.value / 100) * audio.duration;});
volumeBar.addEventListener('input', () => {audio.volume = volumeBar.value / 100;});
function formatTime(seconds) {if(isNaN(seconds)) return "0:00"; let min = Math.floor(seconds / 60); let sec = Math.floor(seconds % 60); return `${min}:${sec < 10 ? '0' : ''}${sec}`;}
audio.volume = 0.3;