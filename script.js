// ===== Elements =====
const root = document.querySelector('html');
const focusBtn = document.querySelector('.app__card-button--foco');
const shortBtn = document.querySelector('.app__card-button--curto');
const longBtn  = document.querySelector('.app__card-button--longo');
const img      = document.querySelector('.app__image');
const titleEl  = document.querySelector('.app__title');
const buttons  = document.querySelectorAll('.app__card-button');
const toggleBtn = document.querySelector('#start-pause');
const musicChk  = document.querySelector('#alternar-musica');
const toggleLabel = document.querySelector('#start-pause span');
const toggleIcon  = document.querySelector('.app__card-primary-butto-icon');
const timeEl      = document.querySelector('#timer');

// ===== Audio =====
const bgm     = new Audio('./sons/luna-rise-part-one.mp3');
const sndPlay = new Audio('./sons/play.wav');
const sndPause = new Audio('./sons/pause.mp3');
const sndEnd   = new Audio('./sons/beep.mp3');

bgm.loop = true;

// ===== State =====
let secs = 1500;     // 25 min
let timerId = null;

// ===== Helpers =====
function renderTime() {
  const t = new Date(secs * 1000);
  const s = t.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' });
  timeEl.textContent = s;
}

function setMode(mode) {
  renderTime();

  buttons.forEach(btn => btn.classList.remove('active'));
  root.setAttribute('data-contexto', mode);
  img.setAttribute('src', `./imagens/${mode}.png`);

  switch (mode) {
    case 'foco':
      titleEl.innerHTML = `
        Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      break;
    case 'descanso-curto':
      titleEl.innerHTML = `
        Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `;
      break;
    case 'descanso-longo':
      titleEl.innerHTML = `
        Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
      `;
      break;
    default:
      break;
  }
}

function tick() {
  if (secs <= 0) {
    sndEnd.play();
    alert('Tempo finalizado!');
    stop();
    return;
  }
  secs -= 1;
  renderTime();
}

function start() {
  sndPlay.play();
  timerId = setInterval(tick, 1000);
  toggleLabel.textContent = 'Pausar';
  toggleIcon.setAttribute('src', './imagens/pause.png');
}

function stop() {
  clearInterval(timerId);
  timerId = null;
  toggleLabel.textContent = 'Começar';
  toggleIcon.setAttribute('src', './imagens/play_arrow.png');
}

function toggle() {
  if (timerId) {
    sndPause.play();
    stop();
  } else {
    start();
  }
}

// ===== Events =====
musicChk.addEventListener('change', () => {
  if (bgm.paused) bgm.play();
  else bgm.pause();
});

focusBtn.addEventListener('click', () => {
  secs = 1500;
  setMode('foco');
  focusBtn.classList.add('active');
});

shortBtn.addEventListener('click', () => {
  secs = 300;
  setMode('descanso-curto');
  shortBtn.classList.add('active');
});

longBtn.addEventListener('click', () => {
  secs = 900;
  setMode('descanso-longo');
  longBtn.classList.add('active');
});

toggleBtn.addEventListener('click', toggle);

// ===== Init =====
renderTime();
