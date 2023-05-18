var randomNumber = Math.floor(Math.random() * 1000) + 1;
var attempts = 0;

// Function to check if Enter key is pressed
function handleKeyPress(event) {
  if (event.keyCode === 13) {
    checkGuess();
  }
}

function checkGuess() {
  var guessInput = document.getElementById("guess");
  var guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 1000) {
    document.getElementById("result").textContent = "Please enter a valid number between 1 and 1000";
    return;
  }

  attempts++;

  if (guess === randomNumber) {
    document.getElementById("result").textContent = "Congratulations! You guessed the correct number " + guess + " in " + attempts + " attempt(s).";
    disableInput();
  } else if (guess < randomNumber) {
    document.getElementById("result").textContent = guess + " is too low! Try again.";
  } else {
    document.getElementById("result").textContent = guess + " is too high! Try again.";
  }

  guessInput.value = ""; // Clear the input field
  document.getElementById("check-button").textContent = "Check"; // Reset the button text
}

function disableInput() {
  document.getElementById("guess").disabled = true;
  document.getElementById("check-button").disabled = true;
}

// Add event listener to the input field
document.getElementById("guess").addEventListener("keypress", handleKeyPress);
