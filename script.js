import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://catch-the-egg-dbs-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const scoersInDB = ref(database, "scores");

namePlayButton.addEventListener("click", function () {
  let playerName = document.getElementById("playerName").value.trim();
  console.log(`${playerName} clicked the play button`);
  goToGameScene();
});

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

const gameContainer = document.querySelector("#gameContainer");
const scoreElement = document.getElementById("score");
const livesContainer = document.getElementById("livesContainer");

const basket = document.createElement("div");
basket.classList.add("basket");
gameContainer.appendChild(basket);

let basketPosition = 200;
basket.style.left = `${basketPosition}px`;

let score = 0;
let lives = 3;
let gameInterval;

let moveLeft = false;
let moveRight = false;

function handleKeyDown(event) {
  if (event.key === "ArrowLeft") {
    moveLeft = true;
  } else if (event.key === "ArrowRight") {
    moveRight = true;
  }
}

function handleKeyUp(event) {
  if (event.key === "ArrowLeft") {
    moveLeft = false;
  } else if (event.key === "ArrowRight") {
    moveRight = false;
  }
}

function moveBasket() {
  if (moveLeft) {
    basketPosition -= 10;
    if (basketPosition < 0) basketPosition = 0;
  }
  if (moveRight) {
    basketPosition += 10;
    if (basketPosition > gameContainer.offsetWidth - basket.offsetWidth) {
      basketPosition = gameContainer.offsetWidth - basket.offsetWidth;
    }
  }
  basket.style.left = `${basketPosition}px`;
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

document.addEventListener("keydown", handleKeyDown);

function createEgg() {
  const existingEggs = document.querySelectorAll(".egg");
  if (existingEggs.length < 5) {
    const egg = document.createElement("div");
    egg.style.top = "0px";
    egg.classList.add("egg");
    egg.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;
    gameContainer.appendChild(egg);
    console.log("Egg created:", egg);
    return egg;
  }
}

function updateGame() {
  const eggs = document.querySelectorAll(".egg");
  eggs.forEach((egg) => {
    const top = parseInt(egg.style.top || "0");
    egg.style.top = `${top + 10}px`;

    const eggRect = egg.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();
    if (
      eggRect.bottom >= basketRect.top &&
      eggRect.top <= basketRect.bottom &&
      eggRect.right >= basketRect.left &&
      eggRect.left <= basketRect.right
    ) {
      score += 1;
      scoreElement.textContent = score;
      egg.remove();
    } else if (top > gameContainer.offsetHeight) {
      egg.remove();
      lives -= 1;
      livesContainer.removeChild(livesContainer.lastElementChild);
      if (lives === 0) {
        endGame();
      }
    }
  });
}

function endGame() {
  clearInterval(gameInterval);
  window.location.href = "gameOver.html";
}

function startGame() {
  console.log("Game started");
  gameInterval = setInterval(() => {
    const eggsToCreate = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < eggsToCreate; i++) {
      createEgg();
    }
    updateGame();
    moveBasket();
  }, 50); // Reduced interval for smoother movement
}

startGame();
