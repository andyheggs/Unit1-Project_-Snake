
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


/*-------------------------------- Functions --------------------------------*/

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
  speed = initialSpeed;

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

// 9(a) function required to remove any existing 'gameover' message:
function existingMessage = document.querySelector('.game-over-message');

//9(b) if statement to check and remove 'gameover' message child:
  if (existingMessage) {
    gameContainer.removeChild(existingMessage) 
  }  
 // console log var status
  console.log('Game Initialised' , {
    snake,
    direction,
    score,
    speed,
    food,
    isGameRunning
  });
}     

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
  
  console.log('Food generated:', food)
}

// **updateGame()**
  // - handle primary game logic, update snake's state, collision cheking, manage game flow.

// 1(a) define function to change game state  
function updateGame() {

  //2(a) idetify snakes head in the object array, (snake[0]), create imutable duplicate, (spread operator) and; 
  const head = { ...snake[0] };
  
  // 2(b) ...assign the copy to a the new XY direction. 
  head.x += direction.x;
  head.y += direction.y;

  // 3(a) handle 'head' collision event, call endGame and exit:
  if (isCollision(head)) {
    endGame();
    return;
  }

  //4(a) Move the snake. 
    //create the effect of movement by adding a new segment to the head of the snake (the begininng of the game array).  
    //implement unshift iterator to add the head segment to the beginning of the array
  snake.unshift(head);

  //4(b) Check 'if' snake has eaten food (if snake head XY matches food XY)
  if (head.x === food.x && head.y === food.y) {

    //4(c) increase the score by one if food has been eaten:
    score++;

    //4(d) if food eaten add new food item to game play, call foodEaten func.
    foodEaten();

    // 4(e) if food eaten, increase speed of game/difficulty.
      // update the speed var to reduce the time it takes for the gameInterval to move the head, subtracting from intialSpeed const.
      // implement a modest time reduction to test first and adjust accordingly in testing (-10ms)
      // ensure a time/speed limiter can prevent the snkae moving too quickly. Set a min gameInterval speed, (max snake speed) to control this.
      // establish a method to compare min inteval with new interval speed to ensure it doesnt exceed the limts set (math.max)
    speed = Math.max(50, speed - 10);

    // 4(f) clear previous timing in gameInterval to implement new speed if food eaten. 
    clearInterval(gameInterval);

    // 4(g) update gameInterval timing to implement new speed if food eaten. 
    gameInterval = setInterval(updateGame, speed);

    //4(h) maitain game state if food !== eaten. 
      // remove last snake segment in array to maintain exisitng size of snake having not eaten food and 
      //simulate the movement of the sbkae on the grid using pop() iterator
  } else {
    snake.pop();
  } 
  
  // 4(i) visually update (render) the changes to the game area with the new positons of the snake and food (as applicable) by calling the render func.  
  renderGame(); 

}  

// **RendereGame()**







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



