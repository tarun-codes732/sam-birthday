let currentSlide = 0;
const music = document.getElementById('bgMusic');
const slider = document.getElementById('mainSlider');

function createDecor() {
    const container = document.getElementById('balloon-container');
    const icons = ['🎈', '🎀', '💖', '🐈‍⬛', '✨'];
    setInterval(() => {
        const b = document.createElement('div');
        b.className = 'balloon';
        b.innerText = icons[Math.floor(Math.random() * icons.length)];
        b.style.left = Math.random() * 100 + 'vw';
        b.style.animationDuration = (Math.random() * 3 + 6) + 's';
        container.appendChild(b);
        setTimeout(() => b.remove(), 8000);
    }, 600);
}

function startExperience() {
    music.play();
    createDecor();
    currentSlide = 1;
    update();
}

function nextSlide() {
    currentSlide++;
    update();
    if(currentSlide === 3) { // When entering video page
        music.pause();
        const bdayVideo = document.getElementById('bdayVideo');
        bdayVideo.play().catch(e => console.log("User must click play manually"));
    }
}

function update() {
    slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
}

// Drag & Drop Cake Logic
const knife = document.getElementById('knife');
const cake = document.getElementById('cake');

knife.addEventListener('dragstart', (e) => e.dataTransfer.setData('text', 'cut'));
cake.addEventListener('dragover', (e) => e.preventDefault());
cake.addEventListener('drop', (e) => {
    e.preventDefault();
    cake.innerText = "🍰🍰";
    knife.classList.add('hidden');
    setTimeout(() => document.getElementById('greetingCard').classList.remove('hidden'), 500);
});

function restart() {
    const v = document.getElementById('bdayVideo');
    v.pause(); v.currentTime = 0;
    currentSlide = 0;
    update();
    document.getElementById('greetingCard').classList.add('hidden');
    document.getElementById('cake').innerText = "🎂";
    document.getElementById('knife').classList.remove('hidden');
    music.currentTime = 0;
    music.play();
}