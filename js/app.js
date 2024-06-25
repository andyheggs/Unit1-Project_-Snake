
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
//**DEFINE GAME CONSTANTS**

// 1(a) define consts to stablish game area grid size to 400 (20x20):
const gridWidth = 20;
const gridHeight = 20;
const gridSize = gridWidth * gridHeight;

// 2(a) define const to set intial snake length:
const initialSnakeLength = 3;

// 3(a) esatblish intial game speed:
const initialSpeed = 500; //0.5 sec

// 4(a) define arrow key movement for 2d array
  // (width x axis coloumns, height y axis rows)
  // top left grid = 0,0.
  // snake start position to = grid center (cell 199 or x10, y10) to enable equal movements + an - from start point.  

//define directions object const, maping arrow keys to object reflecting snake's change in position;
const directions = {

  // 4(b) implement directional changes on snake head position;
    // Arrow up = 0 movment horizontally, -1 movement vertically (e.g. 199-1, or x10, y9)
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};  

//const maxHighScores


/*---------------------------- Variables (state) ----------------------------*/

//**INITIALISE GAME VARIABLES**
  // Define variables for the snake, food, direction, score, and game interval.
  // Select the game area container and set its dimensions.


// 1(a) intiate snake starting position to an array
let snake = [];

// 2(a) Assign initial snake direction right
let direction = directions.ArrowRight;

// 3(a) initiate food var to object to conatain X/Y coord's 
let food = {};

//intialise starting score to zero:
let score = 0;

// enable var to set adaptaive game spped based on level:
let gameInterval;

//assign starting snake speed to 500ms; 
let speed = intialSpeed

//create var to ensure intial default play state is inactive
let isGameRunning = false

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

    // add snake to board in position middle 
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

// **initialiseGame():** 
  //set game to intial/reinitialised position, establish state of all var's and el's before gameplay begins/resets

// 1(a) create a function to intialiseGame
function initialiseGame() {      
  
  // 1(b) set start/reset snake position at center of grid X10,Y10 array object as a single segment
  snake = [{x: 10, y: 10}];
  
  // 2(a) set the snakes intial direction to move right. Assign 'direction' var to 'directions' const 'arrow right' object
  direction = directions.ArrowRight;
  
  // 3(a) reset score var to zero:
  score = 0;

  // 4(a) (re)set intial speed (m/s) to const intialSpeed:
  speed = intialSpeed;

  // 5(a) call genererateFood func to impement first food item:
  generateFood();

  // 6(a) call renderGame func to generate starting game state:
  renderGame();

  // 7(a) establish the game loop and clear current interval timing 'if' multiple intervals running concurrently:
  if (gameInterval) clearInterval(gameInterval); 

    // 7(b) set new game interval timing. 
      //call updateGame func. to assign appropriate speed to start game loop and update game state
    gameInterval = setInterval(updateGame, speed);

  // 8(a) Set game running state. update bool running var to true:
  isGameRunning = true;

  
    
// **generateFood()**
  // this needs to be random position.  
  // need to ensure food doesnt generate on snake
  // needs to loop to check avalible space
  // needs to carry out multiple actions simultaneously (generate coord, check overlap, assign position) 'dowhile' loop 

  // 1. create func. generateFood to gen new food item      
function generateFood() {
  
  // 1. (a) create var to check if food on snake (isFoodOnSnake)
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
  // updateSnake() - handle primary game logic, update snake's state, collision cheking, manage game flow.
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



