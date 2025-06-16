let timer;
let timeLeft = 1500;
let isRunning = false;
let currentMode = 'work';
const timerDisplay = document.getElementById('timer');
const phaseLabel = document.getElementById('phase-label');

const durations = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function switchMode(mode) {
  currentMode = mode;
  timeLeft = durations[mode];
  phaseLabel.textContent = {
    work: "Reading/Productivity",
    shortBreak: "Break/Chat",
    longBreak: "Break/Chat",
  }[mode];
  updateDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      playSound();
      if (currentMode === 'work') {
        switchMode('shortBreak');
        startTimer();
      }
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  switchMode(currentMode);
  pauseTimer();
}

function playSound() {
  const selected = document.getElementById("soundSelect").value;
  const audio = new Audio(selected);
  audio.play();
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("mode").addEventListener("change", (e) => {
  switchMode(e.target.value);
});

document.getElementById("backgroundSelect").addEventListener("change", (e) => {
  document.body.style.backgroundImage = `url('${e.target.value}')`;
});

document.getElementById("toggle-settings").addEventListener("click", () => {
  document.getElementById("settings-panel").classList.toggle("hidden");
});

document.getElementById("minimize").addEventListener("click", () => {
  document.querySelector(".container").classList.toggle("hidden");
});

document.getElementById("workDuration").addEventListener("change", (e) => {
  durations.work = parseInt(e.target.value) * 60;
  if (currentMode === 'work') resetTimer();
});
document.getElementById("shortBreakDuration").addEventListener("change", (e) => {
  durations.shortBreak = parseInt(e.target.value) * 60;
});
document.getElementById("longBreakDuration").addEventListener("change", (e) => {
  durations.longBreak = parseInt(e.target.value) * 60;
});

// Set initial background
document.body.style.backgroundImage = "url('bridge.png')";
updateDisplay();
