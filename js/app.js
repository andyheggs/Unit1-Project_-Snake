const gridWidth = 20;
const gridHeight = 20;
const gridSize = gridWidth * gridHeight;

const initialSnakeLength = 3;

const initialSpeed = 500;

const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};

let snake = [];
let direction = directions.ArrowRight;
let food = {};
let score = 0;
let gameInterval;
let speed = initialSpeed;
let isGameRunning = false;

const gameContainer = document.getElementById('game-container');
const newGameButton = document.getElementById('new-game');
const scoreElement = document.querySelector('.score-value');
const highScoresList = document.querySelector('.high-scores ol');


displayHighScores();

function getHighScores() {

  return JSON.parse(localStorage.getItem('snakeHighScores')) || [];
}

function saveHighScores(scores) {
  localStorage.setItem('snakeHighScores', JSON.stringify(scores));
}

function updateHighScores(newScore) {
  let scores = getHighScores();
  scores.push(newScore);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 5);
  saveHighScores(scores);
  displayHighScores();
}

function displayHighScores() {
  const scores = getHighScores();
  highScoresList.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    li.textContent = scores[i] || 0;
    highScoresList.appendChild(li);
  }
}

function initialiseGame() {
  snake = [{x: 10, y: 10}];
  direction = directions.ArrowRight;
  score = 0;
  speed = initialSpeed;
  generateFood();
  renderGame();
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(updateGame, speed);
  isGameRunning = true;
  const existingMessage = document.querySelector('.game-over-message');
  if (existingMessage) {
    gameContainer.removeChild(existingMessage);
  }
  scoreElement.textContent = score;
  gameContainer.style.backgroundImage = 'none';
  console.log('Game Initialised' , {
    snake,
    direction,
    score,
    speed,
    food,
    isGameRunning
  });
}

function generateFood() {
  let isFoodOnSnake;
  do {
    const foodX = Math.floor(Math.random() * gridWidth);
    const foodY = Math.floor(Math.random() * gridHeight);
    isFoodOnSnake = snake.some(segment => segment.x === foodX && segment.y === foodY);
    if (!isFoodOnSnake) {
      food = { x: foodX, y: foodY };
    }
  } while (isFoodOnSnake);
  console.log('Food generated:', food);
}

function updateGame() {
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;
  console.log('New head position:', head);
  if (isCollision(head)) {
    endGame();
    return;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
    speed = Math.max(50, speed - 10);
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, speed);
    console.log('Food eaten. New score:', score, 'New speed:', speed);
    scoreElement.textContent = score;
  } else {
    snake.pop();
  }
  console.log('Snake updated:', snake);
  renderGame();
}

function renderGame() {
  gameContainer.innerHTML = '';
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (isSnakeCell(x, y)) {
        cell.classList.add('snake');
      } else if (x === food.x && y === food.y) {
        cell.classList.add('food');
      }
      gameContainer.appendChild(cell);
    }
  }
  console.log('Game rendered');
}

function isSnakeCell(x, y) {
  return snake.some(segment => segment.x === x && segment.y === y);
}

function isCollision(head) {
  return (
    head.x < 0 || head.x >= gridWidth ||
    head.y < 0 || head.y >= gridHeight ||
    isSnakeCell(head.x, head.y)
  );
}

function endGame() {
  clearInterval(gameInterval);
  isGameRunning = false;
  updateHighScores(score);
  const gameOverMessage = document.createElement('div');
  gameOverMessage.classList.add('game-over-message');
  gameOverMessage.textContent = 'Game Over!';
  gameContainer.appendChild(gameOverMessage);
  console.log('Game over. Final score:', score);
}

function changeDirection(event) {
  if (!isGameRunning) return;
  const newDirection = directions[event.key];
  if (newDirection && !(newDirection.x === -direction.x && newDirection.y === -direction.y)) {
    direction = newDirection;
  }
  console.log('Direction changed', direction);
}

newGameButton.addEventListener('click', initialiseGame);
document.addEventListener('keydown', changeDirection);
document.addEventListener('keydown', (event) => {
  if (event.key === ' ' && !isGameRunning) {
    initialiseGame();
  }
});
