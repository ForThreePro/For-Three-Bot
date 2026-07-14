// ANIMACIÓN SCROLL
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('show')}
  })
},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

// POPUP DE PAGO
function openPopup(product, price) {
  document.getElementById('popupProduct').innerText = product;
  document.getElementById('popupPrice').innerText = price;
  let mensaje = `Hola%20Whois%20quiero%20comprar:%20${encodeURIComponent(product)}%20-${encodeURIComponent(price)}`;
  document.getElementById('btnYape').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Yape`;
  document.getElementById('btnPrex').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Prex`;
  document.getElementById('btnGlobal').href = `https://wa.me/51936994155?text=${mensaje}%20Pago%20con:%20Global66`;
  document.getElementById('paymentPopup').classList.add('active');
  document.body.style.overflow = 'hidden'; // Bloquea scroll en móvil
}
function closePopup() {
  document.getElementById('paymentPopup').classList.remove('active');
  document.body.style.overflow = 'auto'; // Reactiva scroll
}
document.getElementById('paymentPopup').addEventListener('click', function(e) {
  if(e.target === this) closePopup();
});

// TICKETS A WHATSAPP
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

// FAQ ACORDEÓN
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Cierra todos
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Abre solo el que clickeaste
    if(!isActive){
      faqItem.classList.add('active');
    }
  });
});

// CHATBOT
function toggleChat(){
  document.getElementById('chatBox').classList.toggle('active');
  document.getElementById('chatInput').focus(); // Abre teclado en móvil
}

function sendChat(){
  let input = document.getElementById('chatInput');
  let msg = input.value.toLowerCase().trim();
  if(msg === '') return;
  
  addMsg(msg, 'user');
  input.value = '';
  
  setTimeout(()=>{
    let reply = getBotReply(msg);
    addMsg(reply, 'bot');
  }, 600);
}

function addMsg(text, type){
  let div = document.createElement('div');
  div.className = type + '-msg';
  div.innerText = text;
  document.getElementById('chatMessages').appendChild(div);
  document.getElementById('chatMessages').scrollTop = 9999;
}

function getBotReply(msg){
  if(msg.includes('precio') || msg.includes('cuanto')){
    return 'Estos son los precios ⚡\n\nBot: S/7 - S/30\nWeb: S/35\nHosting: S/10/mes\n\nEscribe "comprar" para ver los links';
  }
  if(msg.includes('bot')){
    return 'Tenemos 3 tipos de Bot:\n\n1. Grupo S/7\n2. Básico S/20\n3. Premium S/30\n¿Quieres que te pase el de S/20?';
  }
  if(msg.includes('hosting')){
    return 'Hosting 24/7 ⚡\n\nMensual: S/10\nTrimestral: S/30\n6 Meses: S/60\n\nIncluye soporte VIP y 99.9% uptime';
  }
  if(msg.includes('web')){
    return 'Páginas Web por S/35 ⚡\n\nResponsive + Entrega 48h + Diseño pro\n¿Quieres ver ejemplos?';
  }
  if(msg.includes('comprar') || msg.includes('pagar')){
    return 'Dale click a "COMPRAR AHORA" en cualquier producto y te mando a WhatsApp para pagar con Yape, Prex o Global66 💜';
  }
  if(msg.includes('soporte') || msg.includes('problema')){
    return 'Baja a la sección SOPORTE y llena el ticket. Te respondo en menos de 2 horas ⚡';
  }
  if(msg.includes('faq') || msg.includes('pregunta')){
    return 'Baja a la sección FAQ y ahí están todas las respuestas 👇';
  }
  return 'No te entendí bro 😅 Escribe: precio, bot, hosting, web, faq o soporte';
}

// ESTADO SERVIDOR ACTUALIZABLE
setInterval(()=>{
  let hora = new Date().toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'});
  document.getElementById('botStatus').innerText = 'Online ' + hora;
}, 30000);

// REPRODUCTOR SPOTIFY
let audio = document.getElementById('bgMusic');
let playBtn = document.getElementById('playBtn');
let progressBar = document.getElementById('progressBar');
let volumeBar = document.getElementById('volumeBar');
let currentTimeEl = document.getElementById('currentTime');
let durationEl = document.getElementById('duration');

function toggleMusic() {
  if(audio.paused){
    audio.play();
    playBtn.innerText = '⏸';
  } else {
    audio.pause();
    playBtn.innerText = '▶';
  }
}

// PROGRESO Y TIEMPO
audio.addEventListener('timeupdate', () => {
  if(!isNaN(audio.duration)){
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTimeEl.innerText = formatTime(audio.currentTime);
  }
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.innerText = formatTime(audio.duration);
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value / 100;
});

function formatTime(seconds) {
  if(isNaN(seconds)) return "0:00"; 
  let min = Math.floor(seconds / 60); 
  let sec = Math.floor(seconds % 60); 
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audio.volume = 0.3;

// Cerrar chatbot al tocar fuera en móvil
document.addEventListener('click', function(e) {
  let chatBox = document.getElementById('chatBox');
  let chatBtn = document.querySelector('.chatbot-btn');
  if(chatBox.classList.contains('active') && !chatBox.contains(e.target) && !chatBtn.contains(e.target)){
    if(window.innerWidth < 769){
      chatBox.classList.remove('active');
    }
  }
});