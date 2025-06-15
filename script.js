let timer;
let totalTime;
let isRunning = false;
let currentMode = 'Reading/Productivity';

const timerDisplay = document.getElementById('timer');
const modeDisplay = document.getElementById('mode');
const container = document.querySelector('.container');
const spotifyBox = document.querySelector('.spotify-box');

function updateDisplay() {
  const minutes = String(Math.floor(totalTime / 60)).padStart(2, '0');
  const seconds = String(totalTime % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  if (modeDisplay) modeDisplay.textContent = currentMode;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  const workMinutes = parseInt(document.getElementById('workMinutes').value);
  totalTime = workMinutes * 60;
  currentMode = 'Reading/Productivity';
  updateDisplay();

  timer = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      playSound();
      autoStartShortBreak();
    }
  }, 1000);
}

function autoStartShortBreak() {
  const shortBreak = parseInt(document.getElementById('shortBreak').value);
  totalTime = shortBreak * 60;
  currentMode = 'Break/Chat';
  updateDisplay();
  isRunning = true;

  timer = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      playSound();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  const workMinutes = parseInt(document.getElementById('workMinutes').value);
  totalTime = workMinutes * 60;
  currentMode = 'Reading/Productivity';
  updateDisplay();
}

function playSound() {
  const selectedSound = document.getElementById('soundSelect').value;
  const audio = new Audio(selectedSound);
  audio.play();
}

function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.classList.toggle('hidden');
}

function changeBackground(value) {
  document.body.style.backgroundImage = `url('${value}')`;
}

function makeMovable(element) {
  let isDragging = false, xOffset = 0, yOffset = 0;

  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    xOffset = e.clientX - element.offsetLeft;
    yOffset = e.clientY - element.offsetTop;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      element.style.left = e.clientX - xOffset + 'px';
      element.style.top = e.clientY - yOffset + 'px';
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

function minimizeBox(id) {
  document.getElementById(id).classList.toggle('hidden');
}

function updateSpotifyEmbed() {
  const input = document.getElementById('spotifyInput').value;
  const container = document.getElementById('spotify-controls');
  const embed = `<iframe src="${input}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
  container.innerHTML = embed;
}

resetTimer();
makeMovable(container);
makeMovable(spotifyBox);
