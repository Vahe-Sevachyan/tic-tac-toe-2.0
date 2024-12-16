const cells = document.querySelectorAll(".cell");
const rowActive = document.querySelectorAll(".row");
const startButton = document.querySelector(".start-button");
const difficultyLevelEasyBtn = document.querySelector(".easy");
const difficultyLevelMedium = document.querySelector(".medium");
const difficultyLevelHard = document.querySelector(".hard");
const timerElement = document.getElementById("timer");
const gameOverText = document.querySelector(".gameOverText");
const statusText = document.querySelector(".status-text");
const newGameButton = document.querySelector(".new-game-button");
const resetFinalScoreButton = document.querySelector(".reset-button");
const playerXScore = document.querySelector("#scoreX");
const playerOScore = document.querySelector("#scoreO");
let currentPlayer = "Player 1"; // Can be 'Player 1' or 'Player 2'
let countdown = 10;
let turn = "X";
let winner = null;
let gameModeChosen = "";
let intervalX;
let intervalO;
// startButton.disabled = true;
timerElement.style.color = "grey";
timerElement.style.borderColor = "grey";
timerElement.style.opacity = 0.3;

const gameBoard = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""],
};

// when start game is selected a timer goes off saying player x your turn is up in ${seconds} seconds
//once the timer expires enable the game board to alow selecting

const playerX = {
  player: "X",
  pick: "",
  score: 0,
};

const playerO = {
  player: "O",
  pick: "",
  score: 0,
};
function resetFinalGameScore() {
  playerX.score = 0;
  playerO.score = 0;
  playerXScore.innerHTML = `Score: ${playerX.score}`;
  playerOScore.innerHTML = `Score: ${playerO.score}`;
}
function checkFinalGameWinner() {
  if (playerX.score === 5) {
    statusText.innerHTML = `Game Over Player X Wins${playerX.score} to ${playerO.score}`;
    timerElement.style.display = "none";
    newGameButton.disabled = true;
    console.log("code reached here");
  } else if (playerO.score === 5) {
    statusText.innerHTML = `Game Over Player O Wins${playerO.score} to ${playerX.score}`;
    timerElement.style.display = "none";
    newGameButton.disabled = true;
  }
}

// function checkFinalScore(playerX, PlayerO) {
//   if (playerX === 5) {
//   } else if (PlayerO === 5) {
//   }
// }

resetFinalScoreButton.addEventListener("click", () => {
  startNewGameButton();
  resetFinalGameScore();
  newGameButton.disabled = false;
});
function addPointPlayerX() {
  playerX.score += 1;
  playerXScore.innerHTML = `Score: ${playerX.score}`;
  checkFinalGameWinner();
}
function addPointPlayerO() {
  playerO.score += 1;
  playerOScore.innerHTML = `Score: ${playerO.score}`;
  checkFinalGameWinner();
}
// Function to update the glow color dynamically
function updateGlowColor() {
  const glowColor = currentPlayer === "Player 1" ? "blue" : "green";
  cells.forEach((cell) => {
    cell.style.setProperty("--glow-color", glowColor);
  });
}
// Function to toggle the player's turn
function togglePlayer() {
  currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
  updateGlowColor(); // Update the glow color when player changes
}
//starts the game and the timer clock
startButton.addEventListener("click", () => {
  if (startButton.disabled === false) {
    //changes the pointer event value in css to activate the board and allow selection
    timerElement.style.opacity = 1;
    currentPlayer = "Player 1";
    cells.forEach((c) => c.style.setProperty("--glow-color", "dodgerBlue"));
    // togglePlayer();
    statusText.innerHTML = "Player X's Turn";
    statusText.style.color = "dodgerBlue";
    timerElement.style.color = "dodgerBlue";
    timerElement.style.borderColor = "dodgerBlue";
    // timerElement.innerHTML = "10";
    turn = "X";
    // countdown = 10;
    cells.forEach((cell) => {
      //activate gameBoard
      cell.style.pointerEvents = "auto";
      cell.style.opacity = 1;
    });
    interval_X_Timer(); //start timer
  }
});

function startNewGameButton() {
  //clears all cell blocks in gamBoard object
  Object.keys(gameBoard).forEach((key) => {
    gameBoard[key] = new Array(gameBoard[key].length).fill("");
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
  });
  cells.forEach((cell) => {
    //deactivate gameBoard
    cell.style.pointerEvents = "none";
    cell.style.opacity = 0.1;
  });
  statusText.innerHTML = "";
  clearInterval(intervalX);
  clearInterval(intervalO);
  turn = "X";
  countdown = 10;
  timerElement.textContent = countdown;
  timerElement.style.display = "inline-block";
  timerElement.style.opacity = 0.3;
  timerElement.style.color = "grey";
  timerElement.style.borderColor = "grey";
  timerElement.innerHTML = "10";
  startButton.style.backgroundColor = "4caf50";
  startButton.disabled = false;
  // startButton.style.backgroundColor = "dodgerBlue";
  statusText.style.color = "dodgerBlue";
}

newGameButton.addEventListener("click", () => {
  startNewGameButton();
});
//restart the game an resets the game board
// newGameButton.addEventListener("click", () => {
//   //clears all cell blocks in gamBoard object
//   Object.keys(gameBoard).forEach((key) => {
//     gameBoard[key] = new Array(gameBoard[key].length).fill("");
//     cells.forEach((cell) => {
//       cell.innerHTML = "";
//     });
//   });
//   cells.forEach((cell) => {
//     //deactivate gameBoard
//     cell.style.pointerEvents = "none";
//     cell.style.opacity = 0.1;
//   });
//   statusText.innerHTML = "";
//   clearInterval(intervalX);
//   clearInterval(intervalO);

//   turn = "X";
//   countdown = 10;
//   timerElement.textContent = countdown;
//   timerElement.style.display = "inline-block";
//   timerElement.style.opacity = 0.3;
//   timerElement.style.color = "grey";
//   timerElement.style.borderColor = "grey";
//   timerElement.innerHTML = "10";
//   startButton.style.backgroundColor = "grey";
//   startButton.disabled = false;
//   startButton.style.backgroundColor = "dodgerBlue";
//   statusText.style.color = "dodgerBlue";
// });

//checks if all cells are full
function areAllCellsFull() {
  const cells = document.querySelectorAll(".cell"); // Adjust the selector if your cell class is named differently
  return Array.from(cells).every((cell) => cell.innerText !== "");
}

//loops over each cell block and adds x or o depending on the players turn
cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    if (e.target.innerText === "" && turn === "X") {
      console.log("Player X clicked");
      // **
      cells.forEach((c) => c.style.setProperty("--glow-color", "green"));
      // **
      e.target.innerText = "X";
      e.target.style.color = "dodgerBlue";
      playerX.pick = e.target.innerText;
      turn = "O";
      statusText.innerHTML = "Player O's Turn";
      statusText.style.color = "green";
      timerElement.style.color = "green";
      timerElement.style.borderColor = "green";
      countdown = 11;
      // Clear and restart timer for Player O
      clearInterval(intervalX);
      interval_O_Timer();
      cellsCheck(cell, index);
      winnerCheck();
      if (areAllCellsFull()) {
        timerElement.textContent = "It's a Tie!";
        timerElement.style.color = "orange";
        timerElement.style.borderColor = "orange";
        statusText.innerHTML = "";
        clearInterval(intervalX);
        clearInterval(intervalO);
      }
    } else if (e.target.innerText === "" && turn === "O") {
      // Player O makes a move
      // cell.classList.add("cell2");
      // **
      cells.forEach((c) => c.style.setProperty("--glow-color", "dodgerBlue"));
      // **
      e.target.innerText = "O";
      e.target.style.color = "green";
      playerO.pick = e.target.innerText;
      turn = "X";
      statusText.innerHTML = "Player X's Turn";
      statusText.style.color = "dodgerBlue";
      timerElement.style.color = "dodgerBlue";
      timerElement.style.borderColor = "dodgerBlue";
      countdown = 11;
      // Clear and restart timer for Player X
      clearInterval(intervalO);
      interval_X_Timer();
      cellsCheck(cell, index);
      winnerCheck();
      if (areAllCellsFull()) {
        timerElement.style.color = "orange";
        timerElement.style.borderColor = "orange";
        timerElement.textContent = "It's a Tie!";
        clearInterval(intervalX);
        clearInterval(intervalO);
      }
    }
  });
});

function interval_X_Timer() {
  intervalX = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;

    if (countdown === 0) {
      clearInterval(intervalX); // Stop the timer
      timerElement.textContent = "Time's up! Player O's Turn!";
      statusText.innerHTML = "Player O's Turn";
      statusText.style.color = "green";
      timerElement.style.color = "green";
      timerElement.style.borderColor = "green";
      turn = "O";
      countdown = 11;
      interval_O_Timer(); // Start Player O's timer
    }
  }, 1000);
}

function interval_O_Timer() {
  intervalO = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;

    if (countdown === 0) {
      clearInterval(intervalO); // Stop the timer
      timerElement.textContent = "Time's up! Player X's Turn!";
      statusText.innerHTML = "Player X's Turn";
      statusText.style.color = "dodgerBlue";
      timerElement.style.color = "dodgerBlue";
      timerElement.style.borderColor = "dodgerBlue";
      turn = "X";
      countdown = 11;
      interval_X_Timer(); // Start Player X's timer
    }
  }, 1000);
}

function xWinnerTextBanner(displayText) {
  timerElement.textContent = displayText;
  timerElement.style.color = "dodgerBlue";
  timerElement.style.borderColor = "dodgerBlue";
}

function oWinnerTextBanner(displayText) {
  timerElement.textContent = displayText;
  timerElement.style.color = "green";
  timerElement.style.borderColor = "green";
}

function winnerCheck() {
  winnerCheckHorizontalX();
  winnerCheckHorizontalO();
  winnerCheckVerticalX();
  winnerCheckVerticalO();
  krisCrossX();
  krisCrossO();
}

function cellsCheck(selectedCell, index) {
  //first row
  if (index === 0) {
    gameBoard.row1[0] = selectedCell.innerHTML;
  } else if (index === 1) {
    gameBoard.row1[1] = selectedCell.innerHTML;
  } else if (index === 2) {
    gameBoard.row1[2] = selectedCell.innerHTML;
    //second row
  } else if (index === 3) {
    gameBoard.row2[0] = selectedCell.innerHTML;
  } else if (index === 4) {
    gameBoard.row2[1] = selectedCell.innerHTML;
  } else if (index === 5) {
    gameBoard.row2[2] = selectedCell.innerHTML;
    //third row
  } else if (index === 6) {
    gameBoard.row3[0] = selectedCell.innerHTML;
  } else if (index === 7) {
    gameBoard.row3[1] = selectedCell.innerHTML;
  } else if (index === 8) {
    gameBoard.row3[2] = selectedCell.innerHTML;
  }
}

function clearGameBoard() {
  cells.forEach((cell) => {
    //deactivate gameBoard
    cell.style.pointerEvents = "none";
    cell.style.opacity = 0.8;
  });
  startButton.disabled = true;
  clearInterval(intervalX);
  clearInterval(intervalO);
  statusText.innerHTML = "";
  turn = "X";
}

function winnerCheckHorizontalX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row1[1] === "X" &&
    gameBoard.row1[2] === "X"
  ) {
    clearGameBoard();
    xWinnerTextBanner("X is the Winner R1!");
    addPointPlayerX();
    // timerElement.textContent = "X is the Horizontal Winner Row 1";
  } else if (
    gameBoard.row2[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row2[2] === "X"
  ) {
    clearGameBoard();
    // timerElement.textContent = "X is the Horizontal Winner Row 2";
    xWinnerTextBanner("X is the Winner R2!");
    addPointPlayerX();
  } else if (
    gameBoard.row3[0] === "X" &&
    gameBoard.row3[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    clearGameBoard();
    // timerElement.textContent = "X is the Horizontal Winner Row 3";
    xWinnerTextBanner("X is the Winner R3!");
    addPointPlayerX();
  }
}

function winnerCheckHorizontalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row1[1] === "O" &&
    gameBoard.row1[2] === "O"
  ) {
    clearGameBoard();
    oWinnerTextBanner("O is the Winner R1!");
    addPointPlayerO();
  } else if (
    gameBoard.row2[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row2[2] === "O"
  ) {
    clearGameBoard();
    oWinnerTextBanner("O is the Winner R2!");
    addPointPlayerO();
  } else if (
    gameBoard.row3[0] === "O" &&
    gameBoard.row3[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    clearGameBoard();
    oWinnerTextBanner("O is the Winner R3!");
    addPointPlayerO();
  }
}

function winnerCheckVerticalX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[0] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    clearGameBoard();
    xWinnerTextBanner("X is the Winner C1!");
    addPointPlayerX();
  } else if (
    gameBoard.row1[1] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[1] === "X"
  ) {
    clearGameBoard();
    xWinnerTextBanner("X is the Winner C2!");
    addPointPlayerX();
  } else if (
    gameBoard.row1[2] === "X" &&
    gameBoard.row2[2] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    clearGameBoard();
    xWinnerTextBanner("X is the Winner C3!");
    addPointPlayerX();
  }
}

function winnerCheckVerticalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row2[0] === "O" &&
    gameBoard.row3[0] === "O"
  ) {
    clearGameBoard();
    oWinnerTextBanner("O is the Winner C1!");
    addPointPlayerO();
  } else if (
    gameBoard.row1[1] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[1] === "O"
  ) {
    clearGameBoard();
    oWinnerTextBanner("O is the Winner C2!");
    addPointPlayerO();
  } else if (
    gameBoard.row1[2] === "O" &&
    gameBoard.row2[2] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    clearGameBoard();
    oWinnerTextBanner("O is the Winner C3!");
    addPointPlayerO();
  }
}

function krisCrossX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    clearGameBoard();
    xWinnerTextBanner("X is the Winner Kris-Kros!");
    addPointPlayerX();
  } else if (
    gameBoard.row1[2] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    clearGameBoard();
    xWinnerTextBanner("X is the Winner Kris-Kros!");
    addPointPlayerX();
  }
}

function krisCrossO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    clearGameBoard();
    oWinnerTextBanner("O is the Winner Kris-Kros!");
    addPointPlayerO();
  } else if (
    gameBoard.row1[2] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[0] === "O"
  ) {
    oWinnerTextBanner("O is the Winner Kris-Kros!");
    clearGameBoard();
    addPointPlayerO();
  }
}
