
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
//Game area grid size:

const gridWidth = 20;
const gridHeight = 20;
const gridSize = gridWidth * gridHeight;

//const initialSnakeLength 
//const initialSpeed
//const speedIncrement
//const maxHighScores


/*---------------------------- Variables (state) ----------------------------*/
//Snake starting position
let snakePosition = 105;
//let snake
//let food
//let direction
//let score
//let gameInterval
//let speed
//let highScores

/*------------------------ Cached Element References ------------------------*/


  // landingPage - grid
const gameArea = document.querySelector('.gameArea');
const cellElements = []; 
  // scoreDisplay
  // gameOverMessage
  // newGameButton
  // highScoreDisplay

/*------------------------ Grid Creation ------------------------*/
//create a for loop integrating with the DOM to loop through the 20 x 20 grid ('gridSize') adding a ('cell'/div) in the 'gameArea'
//assign each 'cell'/div a char 'i' 
//add each 'cell' to the div classlist with an id of 'i' 

for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = i;
    // add snake to board in position 105
    if (snakePosition === i) {
        cell.classList.add('snake');
    }
//set the height and width of each cell in CSS ('style') proportionately to the size of the `gameArea`
cell.style.height = `${200 / gridHeight}%`; 
cell.style.width =  `${200 / gridWidth}%`;

cellElements.push(cell); //add cell to cellElements array
gameArea.appendChild(cell); //append cell to page

}

const addSnake = () => {
    cellElements[snakePosition].classList.add('snake')
  }
  
  const removeSnake = () => {
    cellElements[snakePosition].classList.remove('snake')
  }

/*-------------------------------- Functions --------------------------------*/
const handleMove = (evt) => {

    removeSnake()
  
    if (evt.code === 'ArrowRight' && snakePosition % gridWidth !== gridWidth - 1) {
      snakePosition++
    } else if (evt.code === 'ArrowLeft' && snakePosition % gridWidth !== 0) {
      snakePosition--
    } else if (evt.code === 'ArrowDown' && snakePosition + gridWidth <= gridSize - 1) {
      snakePosition += width
    } else if (evt.code === 'ArrowUp' && snakePosition - gridWidth >= 0) {
      snakePosition -= gridWidth
    } else {
      
    }
    
    addSnake()

}    

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
document.addEventListener('keydown', handleMove);
  //newGameButton.addEventListener('click', startNewGame)
  //document.addEventListener('keydown', changeDirection)

