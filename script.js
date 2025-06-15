let timer;
let totalTime;
let isRunning = false;

function updateDisplay() {
  const minutes = String(Math.floor(totalTime / 60)).padStart(2, '0');
  const seconds = String(totalTime % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  const workMinutes = parseInt(document.getElementById('workMinutes').value);
  totalTime = workMinutes * 60;
  updateDisplay();

  timer = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("Time's up! Choose a break: short or long.");
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
  updateDisplay();
}

resetTimer();