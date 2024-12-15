const cells = document.querySelectorAll(".cell");
const rowActive = document.querySelectorAll(".row");
const startButton = document.querySelector(".start-button");
const difficultyLevelEasyBtn = document.querySelector(".easy");
const difficultyLevelMedium = document.querySelector(".medium");
const difficultyLevelHard = document.querySelector(".hard");
const timerElement = document.getElementById("timer");
const gameOverText = document.querySelector(".gameOverText");
const statusText = document.querySelector(".status-text");
const restartButton = document.querySelector(".restart-game");
let countdown = 10;
let turn = "X";
let winner = null;
let gameModeChosen = "";
let intervalX;
let intervalO;
startButton.disabled = true;
timerElement.style.display = "none";

const easyModeTimer = {
  gameTime: 10,
  interval: null,
};

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
};

const playerO = {
  player: "O",
  pick: "",
};

//#1 chose difficulty level
difficultyLevelEasyBtn.addEventListener("click", () => {
  // Update the timer every second
  timerElement.style.display = "inline-block";
  timerElement.style.opacity = 0.3;
  timerElement.style.color = "dodgerBlue";
  timerElement.style.borderColor = "dodgerBlue";
  timerElement.innerHTML = "10";
  statusText.style.display = "block";
  gameModeChosen = "easy";
  startButton.disabled = false;
  startButton.style.backgroundColor = "mediumSlateBlue";
  statusText.style.color = "dodgerBlue";
  statusText.innerHTML = "Player X's Turn";
});

//starts the game and the timer clock
startButton.addEventListener("click", () => {
  if (startButton.disabled === false && gameModeChosen === "easy") {
    //changes the pointer event value in css to activate the board and allow selection
    timerElement.style.opacity = 1;

    cells.forEach((cell) => {
      //activate gameBoard
      cell.style.pointerEvents = "auto";
      cell.style.opacity = 1;
    });
    interval_X_Timer(); //start timer
  }
});

//restart the game an resets the game board
restartButton.addEventListener("click", () => {
  //clears all cell blocks in gamBoard object
  Object.keys(gameBoard).forEach((key) => {
    gameBoard[key] = new Array(gameBoard[key].length).fill("");
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
  });
  gameModeChosen = "";

  console.log(turn);
  timerElement.innerHTML = "";
  timerElement.style.display = "none";
  statusText.innerHTML = "";
  statusText.style.display = "none";
  startButton.style.backgroundColor = "grey";
  clearGameBoard();
});

//loops over each cell block and adds x or o depending on the players turn
cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    // check if the cell is empty then assign a value to it
    if (e.target.innerText === "" && turn === "X") {
      console.log("turn was x");
      e.target.innerText = "X";
      e.target.style.color = "dodgerBlue";
      statusText.innerHTML = "Player O's Turn";
      statusText.style.color = "green";
      timerElement.style.borderColor = "green";
      timerElement.style.color = "green";
      turn = "O";
      cellsCheck(cell, index);
      winnerCheck();
      playerX.pick = e.target.innerText;
    } else if (e.target.innerText === "" && turn === "O") {
      console.log("turn was o");
      playerX.pick = "";
      e.target.innerText = "O";
      turn = "X";
      playerO.pick = e.target.innerText;
      e.target.style.color = "green";
      statusText.style.color = "dodgerBlue";
      timerElement.style.borderColor = "dodgerBlue";
      timerElement.style.color = "dodgerBlue";
      statusText.innerHTML = "Player X's Turn";
      cellsCheck(cell, index);
      winnerCheck();
    }
  });
});

function interval_X_Timer() {
  intervalX = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;
    if (playerX.pick === "X") {
      countdown = 11;
      interval_O_Timer();
      clearInterval(intervalX);
      turn = "O";
      playerX.pick = "";
    } else if (countdown === 0 && playerX.pick === "") {
      clearInterval(intervalX); // Stop the timer
      timerElement.textContent = "Time's up!";
    }
  }, 1000);
}
function interval_O_Timer() {
  intervalO = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;
    if (playerO.pick === "O") {
      clearInterval(intervalO);
      countdown = 11;
      turn = "X";
      interval_X_Timer();
      playerO.pick = "";
    } else if (countdown === 0 && playerO.pick === "") {
      clearInterval(intervalO); // Stop the timer
      timerElement.textContent = "Time's up!";
    }
  }, 1000);
}

// function interval_X_Timer() {
//   intervalX = setInterval(() => {
//     countdown--;
//     timerElement.textContent = countdown;
//     if (countdown === 0 && playerX.pick === "") {
//       clearInterval(intervalX); // Stop the timer
//       timerElement.textContent = "Time's up!";
//     } else if (playerX.pick === "X") {
//       countdown = 11;
//       interval_O_Timer();
//       clearInterval(intervalX);
//       turn = "O";
//       playerX.pick = "";
//     }
//   }, 1000);
// }

// function interval_O_Timer() {
//   intervalO = setInterval(() => {
//     countdown--;
//     timerElement.textContent = countdown;
//     if (countdown === 0 && playerO.pick === "") {
//       clearInterval(intervalO); // Stop the timer
//       timerElement.textContent = "Time's up!";
//     } else if (playerO.pick === "O") {
//       countdown = 11;
//       turn = "X";
//       interval_X_Timer();
//       playerO.pick = "";
//       clearInterval(intervalO);
//     }
//   }, 1000);
// }

// function triggerFunction() {
//   gameOverText.innerHTML = `Game is Over ${turn} missed his turn.`;
// }

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
    timerElement.textContent = "X is the Horizontal Winner Row 1";
  } else if (
    gameBoard.row2[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row2[2] === "X"
  ) {
    clearGameBoard();
    timerElement.textContent = "X is the Horizontal Winner Row 2";
  } else if (
    gameBoard.row3[0] === "X" &&
    gameBoard.row3[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    clearGameBoard();
    timerElement.textContent = "X is the Horizontal Winner Row 3";
  }
}
function winnerCheckHorizontalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row1[1] === "O" &&
    gameBoard.row1[2] === "O"
  ) {
    clearGameBoard();
    timerElement.textContent = "O is the Horizontal Winner Row 1";
  } else if (
    gameBoard.row2[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row2[2] === "O"
  ) {
    clearGameBoard();
    timerElement.textContent = "O is the Horizontal Winner Row 2";
  } else if (
    gameBoard.row3[0] === "O" &&
    gameBoard.row3[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    clearGameBoard();
    timerElement.textContent = "O is the Horizontal Winner Row 3";
  }
}

function winnerCheckVerticalX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[0] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    clearGameBoard();
    timerElement.textContent = "X wins vertically first row";
  } else if (
    gameBoard.row1[1] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[1] === "X"
  ) {
    clearGameBoard();
    timerElement.textContent = "X wins vertically second row";
  } else if (
    gameBoard.row1[2] === "X" &&
    gameBoard.row2[2] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    clearGameBoard();
    timerElement.textContent = "X wins vertically third row";
  }
}
function winnerCheckVerticalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row2[0] === "O" &&
    gameBoard.row3[0] === "O"
  ) {
    clearGameBoard();
    timerElement.textContent = "O wins vertically first row";
  } else if (
    gameBoard.row1[1] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[1] === "O"
  ) {
    clearGameBoard();
    timerElement.textContent = "O wins vertically first row";
  } else if (
    gameBoard.row1[2] === "O" &&
    gameBoard.row2[2] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    clearGameBoard();
    timerElement.textContent = "X wins vertically third row";
  }
}
function krisCrossX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    clearGameBoard();
    timerElement.textContent = "X wins krisCross";
  } else if (
    gameBoard.row1[2] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    clearGameBoard();
    timerElement.textContent = "X Wins krisCross";
  }
}

function krisCrossO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    clearGameBoard();
    timerElement.textContent = "O wins krisCross";
  } else if (
    gameBoard.row1[2] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[0] === "O"
  ) {
    timerElement.textContent = "O wins krisCross";
    clearGameBoard();
  }
}
