
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
let speed = initialSpeed

//create var to ensure intial default play state is inactive
let isGameRunning = false

//let highScores

/*------------------------ Cached Element References ------------------------*/

// 1(a) Dynamically create HTML element displaying gamne grid to update and render board, snake and food 
const gameContainer = document.getElementById('game-container');

// 2(a) Dynamically create HTML element displaying start button
const newGameButton = document.getElementById('new-game');

// 3(a) Dynamically create HTML element displaying score
const scoreElement = document.querySelector('.score-value');

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

// 9(a) element required to remove any existing 'gameover' message:
  const existingMessage = document.querySelector('.game-over-message');

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
    const foodX = Math.floor(Math.random() * gridWidth);
    const foodY = Math.floor(Math.random() * gridHeight);
    
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

  console.log('New head position:', head);

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
    generateFood();

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

    console.log('Food eaten. New score:', score, 'New speed:', speed);

      //4(h) Update score display
      scoreElement.textContent = score;

    //4(i) maitain game state if food !== eaten. 
      // remove last snake segment in array to maintain exisitng size of snake having not eaten food and 
      //simulate the movement of the sbkae on the grid using pop() iterator
  } else {
    snake.pop();
  } 
  
  console.log('Snake updated:', snake);

  // 4(j) visually update (render) the changes to the game area with the new positons of the snake and food (as applicable) by calling the render func.  
  renderGame(); 

}  

// **renderGame()**
  //Visually update the playrs display to reflect the current state of the game.
    // clear prior state and display current.

// 1(a) define function to change game state  
function renderGame() {

  // 1(b) clear/refresh the html <div> and id 'game-container' to ensure new state of game play
  gameContainer.innerHTML = '';

  // 2(a) create a new div element for each y cell of the const GridSize, looping through for y:
  for (let y = 0; y < gridHeight; y++) {

    // 2(b) create a new div element for each x cell of the const GridSize, nesting loop for x:
    for (let x = 0; x < gridWidth; x++) {
      
      // 2(c) create a new div for each cell
      const cell = document.createElement('div');

      // 2(d) add the 'cell' to the cell classlist
      cell.classList.add('cell');

      // 2(e) Check 'if' the cells content to estblish if the current cell xy matches the snake segment(s). 
      if (isSnakeCell(x, y)) {
      
        // 2(f) if snake is in position xy add the snake to the cell classlist to dispaly
        cell.classList.add('snake');

      // 2(g) complete the same process for the food item adding to the cell classList accordingly
      } else if (x === food.x && y === food.y) {
          cell.classList.add('food');
      } 
      
      // 2(h) finally update the gameContainer appending the child to the cell
      gameContainer.appendChild(cell); 

    }    

  }

  console.log('Game rendered');

}

// **isSnakeCell()**
  // implement funcitonality to determine wether a specific cell on the grid is part of the snakes body. 
    // This is necessary for rendering snake and collision detection.

// 1(a) define function;  
function isSnakeCell(x, y) {

  //1(b) iteratate snake array to deterninbe if snkae segment is present (true) (equivlent to isFoodOnSnake syntax) (some()); 
  return snake.some(segment => segment.x === x && segment.y === y); 

}

// **isCollision**
  // function required to check if new head position results in a collision with wall || self to detemnie if game over condition met

// 1(a) define function;  
function isCollision(head) {

  return (

    // 1(b) first check the gridSize boundaries for both x & y coords;
    head.x < 0 || head.x >= gridWidth ||
    head.y < 0 || head.y >= gridHeight ||

    //1(c) then check impact with head to any segment. necessary to call isSnakeCell funciton to compare if current xy coords true;
    isSnakeCell(head.x, head.y)  
  );
}

// **endGame()**
//function executed upon snake collison - stop game loop, clear timing interval, chmnage game state to false, inform player, inc. score. 

// 1(a) define function;  
function endGame() {

  //(b) prevent game from continuing update and render by cleairning timing interval:
  clearInterval(gameInterval);

  //1(c) chenge the game state const:
  isGameRunning = false;

  //2(a) implement game page to display game over message and include score;
  // 2 (a. i) create HTML div element to display message and score:
  const gameOverMessage = document.createElement('div');

  // 2 (a. ii) add game over message to div classList:
  gameOverMessage.classList.add('game-over-message');

  // 2 (a. iii) add the game over text content and score temp lit:
  gameOverMessage.textContent = `Game Over! Your score is: ${score}`;

  // 2 (a. iv) append game over message ansd score to game container:
  gameContainer.appendChild(gameOverMessage);

  console.log('Game over. Final score:', score);

}


// **changeDirection()** 
  //impplementing arrow key exection to enable snake movement based on const directions object arrows. 
  //add event listners to listen for 'key' press events (keydown) and call function
  //function to mitigate against incorrect key presses and reversing change in direction 
 
  // 1(a) define function with event property;  
function changeDirection(event) {

  // 1(b) prevent direciton change by returning 'if' game is not running, i.e. over or unititiated:
  if (!isGameRunning) return;

  // 1(c) retrieve new direction based on key pressed with event.key property attached to const direcitons object 
  const newDirection = directions[event.key];

  // 1(d) validate and update direction checking for wrong key press and reverse.
    // 1(d. i) validate key press (newDirection) to ensure it is not undefined/null etc, (logical operator to detemrine truthy/flasy), if true check next condition
    // 1(d. ii) check if newDirection is opposite of current direction for x && y (newDirection.x/y ==== -direction.x/y)
    // 1(d. iii) invert direction check logic if direction change is true with ! operator to falsy to prevetn code block execution.   
  if (newDirection && !(newDirection.x === -direction.x && newDirection.y === -direction.y)) {

    // 1(e) if correct key press event and valid direciton implement newDirection:
    direction = newDirection;
  }

console.log('Direction changed', direction);

}
/*----------------------------- Event Listeners -----------------------------*/

// 1(a) create listener for click event on "New Game" button.
newGameButton.addEventListener('click', initialiseGame);

// 2(a) create listener for keydown events (ref. changeDirection func.)
document.addEventListener('keydown', changeDirection);

// 3(a) create listener for spcebar key press event. 
document.addEventListener('keydown', (event) => {
    // 3(b) Initialise game 'if' the spacebar pressed and game not running
    if (event.key === ' ' && !isGameRunning) {
        // 3(c) intialise game
        initialiseGame();
    }
});



