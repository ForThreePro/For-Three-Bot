let currentSong = 0;
const audio = document.getElementById('audioPlayer');

function buildPlaylist() {
  const container = document.getElementById('playlist');
  container.innerHTML = '';
  playlist.forEach((song, i) => {
    container.innerHTML += `
      <div class="song-item" onclick="playSong(${i})">
        <span>${i+1}</span>
        <div>
          <b>${song.title}</b>
          <p>${song.artist}</p>
        </div>
      </div>
    `;
  });
}

function loadSong(index) {
  currentSong = index;
  const song = playlist[index];

  document.getElementById('songTitle').innerText = song.title;
  document.getElementById('songArtist').innerText = song.artist;
  document.getElementById('cover').src = song.cover;
  document.getElementById('lyrics').innerText = song.lyrics;
  audio.src = song.src;

  document.querySelectorAll('.song-item').forEach((item, i)=>{
    item.classList.toggle('active', i === index);
  });
}

function playSong(index) {
  loadSong(index);
  audio.play();
  document.getElementById('playBtnPro').innerText = '⏸';
}

function toggleMusicPro() {
  if(audio.paused){
    audio.play();
    document.getElementById('playBtnPro').innerText = '⏸';
  } else {
    audio.pause();
    document.getElementById('playBtnPro').innerText = '▶';
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % playlist.length;
  playSong(currentSong);
}

function prevSong() {
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  playSong(currentSong);
}

audio.addEventListener('ended', nextSong);

// MODAL PAGO
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

buildPlaylist();
loadSong(0);