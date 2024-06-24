
/*-------------------------------- User Story --------------------------------*/

// As a user, I want to see a landing page when I arrive at the website to know I’m in the right place.

// As a user, I want to see instructions on the landing page, so I can understand the rules for gameplay.

// As a user, I want to see clearly labeled buttons for “New Game”, on the landing page, so I can play again.

// As a user, I want to be able to click on the game play area, or press the spacebar to initiate play.

// As a user, I want visual feedback immediately after initiating play, so I know my choice has been registered.

// As a user, I want the computer to generate the snake's position and food item once I initiate play .

// As a user, I want to be able to use the arrow keys to direct the snake to collect the food item.

// As a user, I want to be able to record a score when I collect a food item.

// As a user, I want the game to increase in difficulty after collecting each food item

// As a user, I want to be presented with a clear message indicating if the game is over.

// As a user, I want to play another round to try to improve my score.

// As a user, I want to maintain a record of the top five highest scores.

/*-------------------------------- Constants --------------------------------*/

// const gridSize = gridWidth * gridHeight
// const gridWidth('Y')
// const gridHeight('X')
// const initialSnakeLength
// const initialSpeed
// const speedIncrement
// const maxHighScores


/*---------------------------- Variables (state) ----------------------------*/

// let snake
// let food
// let direction
// let score
// let gameInterval
// let speed
// let highScores

/*------------------------ Cached Element References ------------------------*/

// Cached Elements:
  // landingPage - grid
  // gameArea - grid-cells
  // scoreDisplay
  // gameOverMessage
  // newGameButton
  // highScoreDisplay

/*------------------------ Grid Creation ------------------------*/

/*
    
for (let i = 0; i < totalSquareCount; i++){
  const square = document.createElement('div')
  square.innerText = i
  square.classList.add('sqr')
  square.id = i
  
  ** Add Cat, if starting position
  
  if (catPosition === i) {
    square.classList.add('cat')
  }

  ** Set Height and width in CSS
  square.style.height = `${100 / height}%`
  square.style.width = `${100 / width}%`


  squareEls.push(square) // Add square to squareEls array
  grid.appendChild(square) // Add element to the page
}

const addCat = () => {
  squareEls[catPosition].classList.add('cat')
}

const removeCat = () => {
  squareEls[catPosition].classList.remove('cat')
}
*/

/*-------------------------------- Functions --------------------------------*/

  // initializeGame()
  // generateFood()
  // drawGame()
  // updateSnake()
  // changeDirection(event)
  // checkCollision()
  // endGame()
  // saveHighScore(score)
  // displayHighScores()

/*----------------------------- Event Listeners -----------------------------*/

  // newGameButton.addEventListener('click', startNewGame)
  // document.addEventListener('keydown', changeDirection)

