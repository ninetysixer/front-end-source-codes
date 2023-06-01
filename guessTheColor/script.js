// Generate a random RGB value
function generateRGBValue() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

// Generate an array of random colors
function generateColors(numColors) {
  var colors = [];
  for (var i = 0; i < numColors; i++) {
    colors.push(generateRGBValue());
  }
  return colors;
}

// Display the colors on the page
function displayColors(colors) {
  var colorContainer = document.getElementById('color-container');
  colorContainer.innerHTML = '';

  colors.forEach(function(color) {
    var colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;

    colorBox.addEventListener('click', function() {
      checkAnswer(this.style.backgroundColor);
    });

    colorContainer.appendChild(colorBox);
  });
}

// Pick a random color from the array
function pickRandomColor(colors) {
  var randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Update the RGB value displayed on the page
function updateRGBValue(rgbValue) {
  var rgbValueSpan = document.getElementById('rgb-value');
  rgbValueSpan.textContent = rgbValue;
}

// Initialize variables
var isGameActive = true;
var timeoutID;

// Check if the selected color matches the RGB value
function checkAnswer(selectedColor) {
  if (!isGameActive) {
    return;
  }

  var rgbValueSpan = document.getElementById('rgb-value');
  var rgbValue = rgbValueSpan.textContent;

  if (selectedColor === rgbValue) {
    var resultMessage = document.getElementById('result-message');
    resultMessage.textContent = 'Correct!';
    resultMessage.style.color = 'green';
    isGameActive = false;
  } else {
    var resultMessage = document.getElementById('result-message');
    resultMessage.textContent = 'Wrong answer. Try again.';
    resultMessage.style.color = 'red';
  }

  clearTimeout(timeoutID);
  timeoutID = setTimeout(resetGame, 5000);
}

// Reset the game
function resetGame() {
  isGameActive = true;
  clearTimeout(timeoutID);

  var colors = generateColors(6);
  var pickedColor = pickRandomColor(colors);

  displayColors(colors);
  updateRGBValue(pickedColor);

  var resultMessage = document.getElementById('result-message');
  resultMessage.textContent = '';

  var colorBoxes = document.getElementsByClassName('color-box');
  for (var i = 0; i < colorBoxes.length; i++) {
    colorBoxes[i].style.opacity = 1;
  }

  timeoutID = setTimeout(resetGame, 5000);
}

// Initialize the game
resetGame();

// Add event listener to the reset button
var resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);
