// Contador animado
const counters = document.querySelectorAll('.stat-num[data-count]');
const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-count');
    const increment = target / 100;
    const update = () => {
        const count = +counter.innerText;
        if(count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(update, 20);
        } else {
            counter.innerText = target;
        }
    };
    update();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
});
counters.forEach(counter => observer.observe(counter));

// Control de música
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let isPlaying = true;

music.volume = 0.3; // volumen bajito

musicBtn.addEventListener('click', () => {
    if(isPlaying) {
        music.pause();
        musicBtn.innerText = '🔇 Música OFF';
        isPlaying = false;
    } else {
        music.play();
        musicBtn.innerText = '🔊 Música ON';
        isPlaying = true;
    }
});