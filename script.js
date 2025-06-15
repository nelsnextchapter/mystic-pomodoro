let timer;
let totalTime;
let isRunning = false;
let currentMode = 'Reading/Productivity';

const timerDisplay = document.getElementById('timer');
const modeDisplay = document.getElementById('mode');
const container = document.querySelector('.container');
const spotifyBox = document.querySelector('.spotify-box');
const minimizedButtons = document.getElementById('minimized-buttons');

function updateDisplay() {
  const minutes = String(Math.floor(totalTime / 60)).padStart(2, '0');
  const seconds = String(totalTime % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  if (modeDisplay) modeDisplay.textContent = currentMode;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  let selectedMode = document.getElementById('modeSelect').value;
  let minutes = getTimerMinutes(selectedMode);
  totalTime = minutes * 60;
  updateMode(selectedMode);
  updateDisplay();

  timer = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      playSound();
      if (selectedMode === 'workMinutes') autoStartShortBreak();
    }
  }, 1000);
}

function getTimerMinutes(selectedMode) {
  if (selectedMode === 'workMinutes') return parseInt(document.getElementById('workMinutes').value);
  if (selectedMode === 'shortBreak') return parseInt(document.getElementById('shortBreak').value);
  return parseInt(document.getElementById('longBreak').value);
}

function updateMode(selectedMode) {
  if (selectedMode === 'workMinutes') {
    currentMode = 'Reading/Productivity';
  } else if (selectedMode === 'shortBreak') {
    currentMode = 'Break/Chat';
  } else {
    currentMode = 'Short Sprint';
  }
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
  let selectedMode = document.getElementById('modeSelect').value;
  let minutes = getTimerMinutes(selectedMode);
  totalTime = minutes * 60;
  updateMode(selectedMode);
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

function minimizeBox(id, buttonId) {
  const box = document.getElementById(id);
  box.classList.add('hidden');
  const restoreBtn = document.createElement('button');
  restoreBtn.textContent = `Restore ${id}`;
  restoreBtn.onclick = () => {
    box.classList.remove('hidden');
    restoreBtn.remove();
  };
  minimizedButtons.appendChild(restoreBtn);
}

function updateSpotifyEmbed() {
  const input = document.getElementById('spotifyInput').value;
  const container = document.getElementById('spotify-controls');
  const embedUrl = input.replace("https://open.spotify.com/", "https://open.spotify.com/embed/");
  const embed = `<iframe src="${embedUrl}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  container.innerHTML = embed;
}

// Set default times
window.onload = () => {
  document.getElementById('workMinutes').value = 60;
  document.getElementById('shortBreak').value = 20;
  document.getElementById('longBreak').value = 30;
  resetTimer();
  makeMovable(container);
  makeMovable(spotifyBox);

  container.style.position = 'absolute';
  container.style.left = '50%';
  container.style.top = '50%';
  container.style.transform = 'translate(-50%, -50%)';
  container.style.width = '600px'; // Expanded width
  container.style.height = 'auto';

  spotifyBox.style.position = 'absolute';
  spotifyBox.style.left = '50%';
  spotifyBox.style.top = '70%';
  spotifyBox.style.transform = 'translate(-50%, -50%)';
  spotifyBox.style.width = '350px';
};

document.getElementById('modeSelect').addEventListener('change', () => {
  let selectedMode = document.getElementById('modeSelect').value;
  let minutes = getTimerMinutes(selectedMode);
  totalTime = minutes * 60;
  updateMode(selectedMode);
  updateDisplay();
});
