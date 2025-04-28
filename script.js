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
