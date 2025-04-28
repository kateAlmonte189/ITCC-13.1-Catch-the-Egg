function startGame() {
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

/////////////////////////////////

const gameContainer = document.querySelector(".game-container");
const scoreElement = document.querySelector(".score");
const livesContainer = document.querySelector(".lives-container");

const basket = document.createElement("img");
basket.classList.add("basket");
basket.src = "/assets/basket_noBG.png";
gameContainer.appendChild(basket);

let basketX = 200;
let basketY = 400;

let score = 0;
let lives = 3;
let gameInterval;

function handleKeyDown(event) {
  const ket = event.key;
  if (key === "ArrowLeft" && basketX > 0) {
    basketX -= 20;
  } else if (
    key === "ArrowRight" &&
    basketX < gameContainer.clientWidth - 100
  ) {
    basketX += 20;
  }
  basket.style.left = `${basketX}px`;
}

document.addEventListener("keydown", handleKeyDown);

function createEgg() {
  const egg = document.createElement("img");
  egg.classList.add("egg");
  egg.src = "/assets/egg_noBG.png";
  egg.style.left = `${Math.random() * (gameContainer.clientWidth - 50)}px`;
  egg.style.top = "0px";
  gameContainer.appendChild(egg);
  return egg;
}

function updateGame() {}

// var player;
// var eggs = [];
// var numberOfEggs = 15;

// function Player() {
//   this.gameOver = false;
//   this.score = 0;
//   this.eggsCollected = 0;
//   this.lives = 3;
//   this.playerWidth = 150;
//   this.playerHeight = 90;
//   this.playerSpeed = 20;
//   this.x = canvas.width / 2;
//   this.y = canvas.height - this.playerHeight - 10;
//   this.playerImage = new Image();
//   this.playerImage.src = "/assets/basket_noBG.png";

//   this.draw = function () {
//     ctx.drawImage(
//       this.playerImage,
//       this.x,
//       this.y,
//       this.playerWidth,
//       this.playerHeight
//     );
//   };

//   this.move = function (direction) {
//     if (direction === "left" && this.x > 0) {
//       this.x -= this.playerSpeed;
//     } else if (
//       direction === "right" &&
//       this.x < canvas.width - this.playerWidth
//     ) {
//       this.x += this.playerSpeed;
//     }
//   };
// }

// function Egg() {
//   this.x = Math.random() * (canvas.width - 50);
//   this.y = Math.random() * (canvas.height - 50);
//   this.width = 50;
//   this.height = 50;
//   this.image = new Image();
//   this.image.src = "/assets/egg_noBG.png";

//   this.draw = function () {
//     ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//   };

//   this.checkCollision = function (player) {
//     return (
//       player.x < this.x + this.width &&
//       player.x + player.playerWidth > this.x &&
//       player.y < this.y + this.height &&
//       player.y + player.playerHeight > this.y
//     );
//   };

//   this.resetPosition = function () {
//     this.x = Math.random() * (canvas.width - this.width);
//     this.y = Math.random() * (canvas.height - this.height);
//   };

//   this.fall = function () {
//     this.y += 5; // Fall speed
//     if (this.y > canvas.height) {
//       this.resetPosition();
//     }
//   };

//   this.checkIfCaught = function () {
//     if (this.y + this.height > canvas.height) {
//       this.resetPosition();
//       player.lives--;
//       if (player.lives <= 0) {
//         player.gameOver = true;
//       }
//     }
//   };

//   window.addEventListener("keydown", function (event) {
//     if (event.key === "ArrowLeft") {
//       player.move("left");
//     } else if (event.key === "ArrowRight") {
//       player.move("right");
//     }
//   });

//   main();

//   function main() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     player.draw();
//     for (let i = 0; i < eggs.length; i++) {
//       eggs[i].draw();
//       eggs[i].fall();
//       if (eggs[i].checkCollision(player)) {
//         player.score++;
//         player.eggsCollected++;
//         eggs[i].resetPosition();
//       }
//       eggs[i].checkIfCaught();
//     }

//     if (player.gameOver) {
//       alert("Game Over! Your score: " + player.score);
//       window.location.href = "index.html";
//     } else {
//       requestAnimationFrame(main);
//     }
//   }

//   function startGame() {
//     player = new Player();
//     for (let i = 0; i < numberOfEggs; i++) {
//       eggs.push(new Egg());
//     }
//     main();
//   }

//   startGame();

//   function updateGame() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     player.draw();
//     for (let i = 0; i < eggs.length; i++) {
//       eggs[i].draw();
//       eggs[i].fall();
//       if (eggs[i].checkCollision(player)) {
//         player.score++;
//         player.eggsCollected++;
//         eggs[i].resetPosition();
//       }
//       eggs[i].checkIfCaught();
//     }

//     if (player.gameOver) {
//       alert("Game Over! Your score: " + player.score);
//       window.location.href = "index.html";
//     } else {
//       requestAnimationFrame(updateGame);
//     }
//   }
// }
