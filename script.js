function goToGameScene() {
  const playerName = document.getElementById("playerName").value.trim();
  if (playerName) {
    // Store the player name in localStorage to use it in the game
    localStorage.setItem("playerName", playerName);
    // Redirect to the game page
    window.location.href = "gameProper.html";
  } else {
    alert("Please enter your name to continue!");
  }
}

function goToMainMenu() {
  // Clear the player name from localStorage
  localStorage.removeItem("playerName");
  // Redirect to the main menu page
  window.location.href = "index.html";
}

function tryAgain() {
  // Clear the player name from localStorage
  localStorage.removeItem("playerName");
  // Redirect to the main menu page
  window.location.href = "gameProper.html";
}

function goToLeaderboard() {
  // Redirect to the leaderboard page
  window.location.href = "leaderboard.html";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Select DOM elements
const basketImage = new Image();
basketImage.src = "/assets/basket_noBG.png";

const eggImage = new Image();
eggImage.src = "/assets/egg_noBG.png";

const gameContainer = document.querySelector(".game-container");
const scoreElement = document.getElementById("score");
const livesContainer = document.querySelector(".lives-container");

// Create basket element
const basket = document.createElement("div");
basket.classList.add("basket");
gameContainer.appendChild(basket);

// Set initial basket position
let basketPosition = 200;
basket.style.left = `${basketPosition}px`;

// Game variables
let score = 0;
let lives = 3;
let gameInterval;

// Handle keyboard input
function handleKeyDown(event) {
  const key = event.key;
  if (key === "ArrowLeft") {
    basketPosition -= 10; // Reduce from 20 to 10 for slower movement
    if (basketPosition < 0) basketPosition = 0;
  } else if (key === "ArrowRight") {
    basketPosition += 10; // Reduce from 20 to 10 for slower movement
    if (basketPosition > gameContainer.offsetWidth - basket.offsetWidth) {
      basketPosition = gameContainer.offsetWidth - basket.offsetWidth;
    }
  }
  basket.style.left = `${basketPosition}px`;
}

document.addEventListener("keydown", handleKeyDown);

// Create egg element
function createEgg() {
  const existingEggs = document.querySelectorAll(".egg");

  // Allow only up to 5 eggs at the same time
  if (existingEggs.length < 5) {
    const egg = document.createElement("div");
    egg.style.top = "0px";
    egg.classList.add("egg");
    egg.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;
    gameContainer.appendChild(egg);
    console.log("Egg created: ", egg);
    return egg;
  }
}

// Update game state
function updateGame() {
  const eggs = document.querySelectorAll(".egg");
  eggs.forEach((egg) => {
    const top = parseInt(egg.style.top || "0");
    egg.style.top = `${top + 10}px`; // Adjust falling speed here

    // Check for collision with basket
    const eggRect = egg.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();
    if (
      eggRect.bottom >= basketRect.top &&
      eggRect.top <= basketRect.bottom &&
      eggRect.right >= basketRect.left &&
      eggRect.left <= basketRect.right
    ) {
      // Caught the egg
      score += 1;
      scoreElement.textContent = score;
      egg.remove();
    } else if (top > gameContainer.offsetHeight) {
      // Missed the egg
      egg.remove();
      lives -= 1;
      livesContainer.removeChild(livesContainer.lastElementChild);
      if (lives === 0) {
        endGame();
      }
    }
  });
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  window.location.href = "gameOver.html";
  // Redirect to game over scene or reset the game
}

// Start the game
function startGame() {
  gameInterval = setInterval(() => {
    createEgg(); // Create eggs only if less than 5 exist
    updateGame();
  }, 500); // Adjust interval for egg creation
}

startGame();
