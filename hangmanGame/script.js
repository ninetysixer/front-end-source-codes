// Array of words for the game
// var words = ["APPLE", "BANANA", "CHERRY", "ORANGE", "PEAR"];
var words = ["ABRUPTLY", "ABSURD", "ABYSS", "AFFIX", "ASKEW", "AVENUE", "AWKWARD", "AXIOM", "AZURE", "BAGPIPES", "BANDWAGON", "BANJO", "BAYOU", "BEEKEEPER", "BIKINI", "BLITZ", "BLIZZARD", "BOGGLE", "BOOKWORM", "BOXCAR", "BOXFUL", "BUCKAROO", "BUFFALO", "BUFFOON", "BUXOM", "BUZZARD", "BUZZING", "BUZZWORDS", "CALIPH", "COBWEB", "COCKINESS", "CROQUET", "CRYPT", "CURACAO", "CYCLE", "DAIQUIRI", "DIRNDL", "DISAVOW", "DIZZYING", "DUPLEX", "DWARVES", "EMBEZZLE", "EQUIP", "ESPIONAGE", "EUOUAE", "EXODUS", "FAKING", "FISHHOOK", "FIXABLE", "FJORD", "FLAPJACK", "FLOPPING", "FLUFFINESS", "FLYBY", "FOXGLOVE", "FRAZZLED", "FRIZZLED", "FUCHSIA", "FUNNY", "GABBY", "GALAXY", "GALVANIZE", "GAZEBO", "GIAOUR", "GIZMO", "GLOWWORM", "GLYPH", "GNARLY", "GNOSTIC", "GOSSIP", "GROGGINESS", "HAIKU", "HAPHAZARD", "HYPHEN", "IATROGENIC", "ICEBOX", "INJURY", "IVORY", "IVY", "JACKPOT", "JAUNDICE", "JAWBREAKER", "JAYWALK", "JAZZIEST", "JAZZY", "JELLY", "JIGSAW", "JINX", "JIUJITSU", "JOCKEY", "JOGGING", "JOKING", "JOVIAL", "JOYFUL", "JUICY", "JUKEBOX", "JUMBO", "KAYAK", "KAZOO", "KEYHOLE", "KHAKI", "KILOBYTE", "KIOSK", "KITSCH", "KIWIFRUIT", "KLUTZ", "KNAPSACK", "LARYNX", "LENGTHS", "LUCKY", "LUXURY", "LYMPH", "MARQUIS", "MATRIX", "MEGAHERTZ", "MICROWAVE", "MNEMONIC", "MYSTIFY", "NAPHTHA", "NIGHTCLUB", "NOWADAYS", "NUMBSKULL", "NYMPH", "ONYX", "OVARY", "OXIDIZE", "OXYGEN", "PAJAMA", "PEEKABOO", "PHLEGM", "PIXEL", "PIZAZZ", "PNEUMONIA", "POLKA", "PSHAW", "PSYCHE", "PUPPY", "PUZZLING", "QUARTZ", "QUEUE", "QUIPS", "QUIXOTIC", "QUIZ", "QUIZZES", "QUORUM", "RAZZMATAZZ", "RHUBARB", "RHYTHM", "RICKSHAW", "SCHNAPPS", "SCRATCH", "SHIV", "SNAZZY", "SPHINX", "SPRITZ", "SQUAWK", "STAFF", "STRENGTH", "STRENGTHS", "STRETCH", "STRONGHOLD", "STYMIED", "SUBWAY", "SWIVEL", "SYNDROME", "THRIFTLESS", "THUMBSCREW", "TOPAZ", "TRANSCRIPT", "TRANSGRESS", "TRANSPLANT", "TRIPHTHONG", "TWELFTH", "TWELFTHS", "UNKNOWN", "UNWORTHY", "UNZIP", "UPTOWN", "VAPORIZE", "VIXEN", "VODKA", "VOODOO", "VORTEX", "VOYEURISM", "WALKWAY", "WALTZ", "WAVE", "WAVY", "WAXY", "WELLSPRING", "WHEEZY", "WHISKEY", "WHIZZING", "WHOMEVER", "WIMPY", "WITCHCRAFT", "WIZARD", "WOOZY", "WRISTWATCH", "WYVERN", "XYLOPHONE", "YACHTSMAN", "YIPPEE", "YOKED", "YOUTHFUL", "YUMMY", "ZEPHYR", "ZIGZAG", "ZIGZAGGING", "ZILCH", "ZIPPER", "ZODIAC", "ZOMBIE"]

// Variables
var selectedWord;

// Function to select a random word from the list
function selectRandomWord() {
  var randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Variables to track the guesses, wrong guesses, and remaining lives
var guessedLetters = [];
var wrongGuesses = 0;
var maxWrongGuesses = 8;
var remainingLives = maxWrongGuesses;

// Hangman image parts
var hangmanParts = [
  "hanger",
  "gallows",
  "head",
  "body",
  "left-arm",
  "right-arm",
  "left-leg",
  "right-leg"
];

// Function to initialize the game
function initializeGame() {
  selectedWord = selectRandomWord();
  
  // Display underscores for each letter of the word
  var displayWord = "";
  for (var i = 0; i < selectedWord.length; i++) {
    displayWord += "_ ";
  }
  document.getElementById("word").textContent = displayWord;

  // Clear the guessed letters and wrong guesses
  guessedLetters = [];
  wrongGuesses = 0;
  document.getElementById("wrong-guesses").textContent = "";

  // Display the remaining lives
  remainingLives = maxWrongGuesses;
  document.getElementById("remaining-lives").textContent = remainingLives;

  // Reset the hangman image
  resetHangmanImage();

  // Hide the play again button
  document.getElementById("play-again-container").style.display = "none";

  // Clear the win/loss message
  document.getElementById("game-message").textContent = "";
}

// Function to reset the hangman image
function resetHangmanImage() {
  for (var i = 0; i < hangmanParts.length; i++) {
    var part = hangmanParts[i];
    var partElement = document.querySelector("." + part);
    partElement.classList.remove("show");
  }
}

// Function to handle a letter guess
function makeGuess(letter) {
  // Check if the game is over
  if (wrongGuesses === maxWrongGuesses || !document.getElementById("word").textContent.includes("_")) {
    return;
  }

  // Check if the letter has already been guessed
  if (guessedLetters.includes(letter)) {
    return;
  }

  // Add the letter to the guessed letters array
  guessedLetters.push(letter);

  // Check if the letter is in the selected word
  if (selectedWord.includes(letter)) {
    // Update the displayed word with the correct guesses
    var displayWord = "";
    for (var i = 0; i < selectedWord.length; i++) {
      if (guessedLetters.includes(selectedWord[i])) {
        displayWord += selectedWord[i] + " ";
      } else {
        displayWord += "_ ";
      }
    }
    document.getElementById("word").textContent = displayWord.trim();

    // Check if all letters have been guessed correctly
    if (!displayWord.includes("_")) {
      displayGameMessage("Congratulations! You guessed the word.");
      endGame();
      return;
    }
  } else {
    // Increment the wrong guesses and display the wrong guesses
    wrongGuesses++;
    document.getElementById("wrong-guesses").textContent += letter + " ";

    // Decrement the remaining lives and update the display
    remainingLives--;
    document.getElementById("remaining-lives").textContent = remainingLives;

    // Update the hangman image
    var part = hangmanParts[wrongGuesses - 1];
    var partElement = document.querySelector("." + part);
    partElement.classList.add("show");

    // Check if the player has reached the maximum wrong guesses
    if (wrongGuesses === maxWrongGuesses) {
      displayGameMessage("Game over! The word was: " + selectedWord);
      endGame();
      return;
    }
  }
}

// Function to display the win/loss message
function displayGameMessage(message) {
  document.getElementById("game-message").textContent = message;
}

// Function to end the game and display the play again button
function endGame() {
  document.getElementById("play-again-container").style.display = "block";
}

// Initialize the game when the page loads
initializeGame();
