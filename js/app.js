
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

/*
9. **Initialise the Game**
   9(a) Set the initial position of the snake and direction.
   9(b) Initialise the score and generate the first food item.
   9(c) Hide the game over message and display the initial score.
   */

//Game area grid size:
const gridWidth = 20;
const gridHeight = 20;
const gridSize = gridWidth * gridHeight;

const initialSnakeLength = 3;
const initialSpeed = 500;
const directions = 
//const maxHighScores


/*---------------------------- Variables (state) ----------------------------*/
/*
8. **Initialise Game Variables**
   8(a) Define variables for the snake, food, direction, score, and game interval.
   8(b) Select the game area container and set its dimensions.
*/

//Snake starting position
let snakePosition = 105;
let snake = [];
let food = {};
let direction
let score = 0;
let gameInterval;
let speed = intialSpeed
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
//consider the vlaue to be represented as 'i' this will not be a number.
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
/*
17. **Control Snake**
    17(a) Listen for key presses to change the snake's direction.
    17(b) Allow starting the game with the spacebar.
*/

const changeDirection = (evt) => {

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

  // initialiseGame()
      // set game to intial/reinitialised position
      // 1(a) Snake posiiton - 

  // generateFood()
      // this need to be random position.  
      // need to ensure food doesnt generate on snake
      // needs to loop to check avalible space
      // needs to carry out multiple actions simultaneously (generate coord, check overlap, assign position) 'dowhile' loop 
        // 1. (a) create var to check if food on snake (isFoodOnSnake)
        function generateFood() {
          let isFoodOnSnake;
        // 1. (b) 'do' loop to intiate random XY
          do {
        // 1. (c. i) random XY coordinates (need to keep within XY limits) math.random to gen # btw 0-1.  
        // 1  (c. ii) float scale to reflect grid size. (* by gridSize) 
              const foodX = Math.floor(Math.random() * GRID_SIZE);
              const foodY = Math.floor(Math.random() * GRID_SIZE);
        // 2. (a) check random XY co-ord's generated dont land on snake
        // 2. (b) check snake array for overlpa (use bool response) some() itirator and callback func. to check each segment of the snake XY v/s foor XY
              isFoodOnSnake = snake.some(segment => segment.x === foodX && segment.y === foodY);
        // 3. (a) 'if' isFoodOnSnake !== on snake assign XY to food var.
              if (!isFoodOnSnake) {
          food = { x: foodX, y: foodY };
              }       
        // 4. (a)  ensure food XY loop continues 'while' assign food if intial food XY invalid
           } while (isFoodOnSnake);  
        }

  // drawGame()
  // updateSnake()
  // changeDirection(event)
  // checkCollision()
  // endGame()
  // saveHighScore(score)
  // displayHighScores()

/*----------------------------- Event Listeners -----------------------------*/

/*
16. **Event Listeners**
    16(a) Start New Game
    16(b) Hide the landing page and show the game area.
    16(c) Initialise the game and start the game loop.
*/
//newGameButton.addEventListener('click', startNewGame)

document.addEventListener('keydown', changeDirection);



