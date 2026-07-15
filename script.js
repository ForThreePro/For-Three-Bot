let currentSong = 0;
const audio = document.getElementById('audioPlayer');

function buildPlaylist() {
  const container = document.getElementById('playlist');
  container.innerHTML = '';
  playlist.forEach((song, i) => {
    container.innerHTML += `
      <div class="song" onclick="playSong(${i})">
        <img src="${song.cover}" alt="">
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
  audio.src = song.src;

  document.querySelectorAll('.song').forEach((item, i)=>{
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

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
  document.getElementById('currentTime').innerText = formatTime(audio.currentTime);
  document.getElementById('duration').innerText = formatTime(audio.duration);
});

function seekMusic(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

function formatTime(s) {
  if(isNaN(s)) return "0:00";
  return `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`;
}

audio.addEventListener('ended', nextSong);

// MODAL
function openModal(prod, prec) {
  document.getElementById('modalProduct').innerText = prod;
  document.getElementById('modalPrice').innerText = prec;
  let msg = `Hola! Quiero comprar:%0A*${prod}* - *${prec}*%0AAdjunto captura.`;
  document.getElementById('btnWhatsapp').href = `https://wa.me/51936994155?text=${msg}`;
  document.getElementById('paymentModal').classList.add('active');
}

function closeModal() {
  document.getElementById('paymentModal').classList.remove('active');
}

function selectMethod(m) {
  document.querySelectorAll('.pay-btn').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('info-yape').style.display = m==='yape'?'block':'none';
  document.getElementById('info-prex').style.display = m==='prex'?'block':'none';
}

function copy(t) {
  navigator.clipboard.writeText(t);
  alert('✅ Copiado');
}

buildPlaylist();
loadSong(0);