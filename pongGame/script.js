// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game state variables
let paddleWidth = 10;
let paddleHeight = 80;
let paddleSpeed = 3; // Reduced paddle speed
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
let ballRadius = 5;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;
let player1Score = 0;
let player2Score = 0;
let upArrowPressed = false;
let downArrowPressed = false;
let wKeyPressed = false;
let sKeyPressed = false;

// Move paddles based on keyboard input
function movePaddle() {
  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 38: // Up arrow key
        upArrowPressed = true;
        break;
      case 40: // Down arrow key
        downArrowPressed = true;
        break;
      case 87: // W key
        wKeyPressed = true;
        break;
      case 83: // S key
        sKeyPressed = true;
        break;
    }
  });

  document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
      case 38: // Up arrow key
        upArrowPressed = false;
        break;
      case 40: // Down arrow key
        downArrowPressed = false;
        break;
      case 87: // W key
        wKeyPressed = false;
        break;
      case 83: // S key
        sKeyPressed = false;
        break;
    }
  });
}

// Reset the ball to the center
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX *= -1;
  ballSpeedY *= -1;
}

// Reset paddles to the beginning position
function resetPaddles() {
  paddle1Y = canvas.height / 2 - paddleHeight / 2;
  paddle2Y = canvas.height / 2 - paddleHeight / 2;
}

// Update game state
function update() {
  // Move paddles
  if (upArrowPressed && paddle2Y > 0) {
    paddle2Y -= paddleSpeed;
  }

  if (downArrowPressed && paddle2Y + paddleHeight < canvas.height) {
    paddle2Y += paddleSpeed;
  }

  if (wKeyPressed && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  }

  if (sKeyPressed && paddle1Y + paddleHeight < canvas.height) {
    paddle1Y += paddleSpeed;
  }

  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check for collisions with paddles
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > paddle1Y &&
    ballY < paddle1Y + paddleHeight
  ) {
    ballSpeedX *= -1;
  } else if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > paddle2Y &&
    ballY < paddle2Y + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Check for collisions with walls
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY *= -1;
  }

  // Update scores
  if (ballX - ballRadius < 0) {
    player2Score++;
    resetBall();
    resetPaddles();
  } else if (ballX + ballRadius > canvas.width) {
    player1Score++;
    resetBall();
    resetPaddles();
  }
}

// Render game objects
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillRect(paddleWidth, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillRect(
    canvas.width - paddleWidth * 2,
    paddle2Y,
    paddleWidth,
    paddleHeight
  );

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();

  // Draw scores
  ctx.fillText("Player 1: " + player1Score, 100, 50);
  ctx.fillText("Player 2: " + player2Score, canvas.width - 200, 50);
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game
movePaddle();
gameLoop();
