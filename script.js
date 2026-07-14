const observer = new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show')}})},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

function updateCountdown() {
  let end = new Date().getTime() + 24*60*60*1000;
  setInterval(()=>{
    let diff = end - new Date().getTime();
    let h = Math.floor(diff/1000/60/60);
    let m = Math.floor(diff/1000/60)%60;
    let s = Math.floor(diff/1000)%60;
    document.getElementById('countdown').innerText = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }, 1000);
}
updateCountdown();

const sales = ["Juan de Lima compró Bot Premium", "Maria de Arequipa compró Hosting", "Luis de Trujillo compró Web"];
let i = 0;
setInterval(()=>{document.getElementById('liveSales').innerText = `🔥 ${sales[i]} hace ${Math.floor(Math.random()*5)+1} min`; i = (i+1)%sales.length}, 7000);

document.getElementById('commandSearch').addEventListener('input', e=>{
  let s = e.target.value.toLowerCase();
  document.querySelectorAll('.command-card').forEach(c=>{c.style.display = c.innerText.toLowerCase().includes(s) ? 'block' : 'none'});
});

let exitShown = false;
document.addEventListener('mouseleave', e=>{if(e.clientY < 0 && !exitShown){document.getElementById('exitPopup').classList.add('active'); exitShown = true}});
function closeExit(){document.getElementById('exitPopup').classList.remove('active')}

for(let j=0; j<20; j++){let p = document.createElement('div'); p.style.cssText = `position:fixed;width:2px;height:2px;background:#00D5FF;left:${Math.random()*100}%;top:-10px;animation:fall ${4+Math.random()*4}s linear infinite`; document.getElementById('particles').appendChild(p)}

function openPopup(product, price) {
  document.getElementById('popupProduct').innerText = product;
  document.getElementById('popupPrice').innerText = price;
  let m = `Hola%20quiero%20comprar:%20${encodeURIComponent(product)}%20-${encodeURIComponent(price)}`;
  document.getElementById('btnYape').href = `https://wa.me/51936994155?text=${m}%20Yape`;
  document.getElementById('btnPrex').href = `https://wa.me/51936994155?text=${m}%20Prex`;
  document.getElementById('btnGlobal').href = `https://wa.me/51936994155?text=${m}%20Global66`;
  document.getElementById('paymentPopup').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closePopup() {document.getElementById('paymentPopup').classList.remove('active'); document.body.style.overflow = 'auto'}
document.getElementById('paymentPopup').addEventListener('click', e=>{if(e.target.id === 'paymentPopup') closePopup()})

function sendTicket(e) {
  e.preventDefault();
  let t = `🚨 *TICKET* 🚨%0A*Nombre:* ${ticketName.value}%0A*WhatsApp:* ${ticketWhatsapp.value}%0A*Tipo:* ${ticketType.value}%0A*Mensaje:* ${ticketMessage.value}`;
  window.open(`https://wa.me/51936994155?text=${t}`, '_blank');
  alert('✅ Enviado! Respondo en 2h ⚡');
  e.target.reset();
}

document.querySelectorAll('.faq-question').forEach(b=>{b.onclick = ()=>{b.parentElement.classList.toggle('active')}})

let audio = document.getElementById('bgMusic');
let playBtn = document.getElementById('playBtn');
function toggleMusic() {if(audio.paused){audio.play();playBtn.innerText = '⏸'} else {audio.pause();playBtn.innerText = '▶'}}
audio.addEventListener('timeupdate', ()=>{if(!isNaN(audio.duration)){progressBar.value = (audio.currentTime/audio.duration)*100; currentTime.innerText = format(audio.currentTime)}})
audio.addEventListener('loadedmetadata', ()=>{duration.innerText = format(audio.duration)})
progressBar.oninput = ()=>{audio.currentTime = (progressBar.value/100)*audio.duration}
function format(s){if(isNaN(s)) return "0:00"; let m = Math.floor(s/60); let sec = Math.floor(s%60); return `${m}:${sec<10?'0':''}${sec}`}
audio.volume = 0.3;