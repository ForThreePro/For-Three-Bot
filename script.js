// CONTROL MUSICA SPOTIFY
let audio = document.getElementById('bgMusic');
let playBtn = document.getElementById('playBtn');
let progressBar = document.getElementById('progressBar');
let currentTime = document.getElementById('currentTime');
let duration = document.getElementById('duration');

function toggleMusic() {
  if(audio.paused){
    audio.play();
    playBtn.innerText = '⏸'
  } else {
    audio.pause();
    playBtn.innerText = '▶'
  }
}

audio.addEventListener('timeupdate', ()=>{
  if(!isNaN(audio.duration)){
    progressBar.value = (audio.currentTime/audio.duration)*100;
    currentTime.innerText = format(audio.currentTime)
  }
})

audio.addEventListener('loadedmetadata', ()=>{
  duration.innerText = format(audio.duration)
})

progressBar.oninput = ()=>{
  audio.currentTime = (progressBar.value/100)*audio.duration
}

function format(s){
  if(isNaN(s)) return "0:00";
  let m = Math.floor(s/60);
  let sec = Math.floor(s%60);
  return `${m}:${sec<10?'0':''}${sec}`
}

audio.volume = 0.3; // volumen bajito