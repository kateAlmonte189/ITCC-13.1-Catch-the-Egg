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

//////////////////////////

let score = 0; // Initialize score variable

function updateScore(newScore) {
  score = newScore; // Update score
  document.getElementById("scoreDisplay").innerText = `Score: ${score}`; // Update displayed score
}

// Example function to simulate score increase
function increaseScore() {
  updateScore(score + 1); // Increase score by 1
}

// Call increaseScore() whenever you want to update the score, e.g., when catching an egg
