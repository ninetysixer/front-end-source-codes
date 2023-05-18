var countdown;
var timerRunning = false;

function startTimer() {
  if (!timerRunning) {
    var minutes = parseInt(document.getElementById("minutes").textContent);
    var seconds = parseInt(document.getElementById("seconds").textContent);
    var totalSeconds = minutes * 60 + seconds;

    countdown = setInterval(function() {
      minutes = Math.floor(totalSeconds / 60);
      seconds = totalSeconds % 60;

      document.getElementById("minutes").textContent = formatTime(minutes);
      document.getElementById("seconds").textContent = formatTime(seconds);

      if (totalSeconds <= 0) {
        clearInterval(countdown);
        timerRunning = false;
        alert("Time's up!");
      } else {
        totalSeconds--;
        timerRunning = true;
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(countdown);
  timerRunning = false;
}

function resetTimer() {
  clearInterval(countdown);
  document.getElementById("minutes").textContent = "25";
  document.getElementById("seconds").textContent = "00";
  timerRunning = false;
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}
