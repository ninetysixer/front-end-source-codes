// Timer variables
let workMinutes = 25;
let breakMinutes = 5;
let timerRunning = false;
let timerInterval;
let secondsRemaining;
let isWorkPeriod = true;

// Timer elements
const timerDisplay = document.getElementById('timer');
const periodDisplay = document.getElementById('period');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

// Start the timer
function startTimer() {
  if (!timerRunning) {
    secondsRemaining = workMinutes * 60;
    timerRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

// Reset the timer
function resetTimer() {
  pauseTimer();
  secondsRemaining = workMinutes * 60;
  updateTimer();
}

// Update the timer display
function updateTimer() {
  const minutes = Math.floor(secondsRemaining / 60);
  let seconds = secondsRemaining % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  timerDisplay.textContent = minutes + ':' + seconds;

  if (secondsRemaining === 0) {
    if (isWorkPeriod) {
      // Work period completed, start the break period
      secondsRemaining = breakMinutes * 60;
      isWorkPeriod = false;
      periodDisplay.textContent = 'Break Time';
      alert('Work period completed! Take a break.');
    } else {
      // Break period completed, reset the timer
      secondsRemaining = workMinutes * 60;
      isWorkPeriod = true;
      periodDisplay.textContent = 'Work Time';
      alert('Break period completed! Start working.');
    }
  } else {
    secondsRemaining--;
  }
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
