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
// let gameModeLevels = ["easy", "medium", "hard"];
timerElement.style.display = "none";
// cells.style.pointerEvents = "none";

// cells.classList.add("disabled");
// rowActive.style.pointerEvents = "none";
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

// if ((startButton.disabled = true)) {
//   startButton.style.backgroundColor = "grey";
// }
//checks if gameMode is chosen before enabling the start button
// gameModeChosen = "easy";
// if (gameModeChosen === "easy") {
//   startButton.disabled = false;
//   startButton.style.backgroundColor = "dodgerBlue";
// }
// startButton.addEventListener("click", () => {
//   if ((startButton.disabled = false && gameModeChosen === "easy")) {
//     intervalX();
//   }
// });
//#!1 step one the gameModes
difficultyLevelEasyBtn.addEventListener("click", () => {
  // Update the timer every second
  timerElement.style.display = "inline-block";
  timerElement.style.opacity = 0.3;
  timerElement.innerHTML = "10";
  statusText.style.display = "block";
  gameModeChosen = "easy";
  startButton.disabled = false;
  startButton.style.backgroundColor = "dodgerBlue";
  statusText.style.color = "dodgerBlue";
});

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

restartButton.addEventListener("click", () => {
  Object.keys(gameBoard).forEach((key) => {
    gameBoard[key] = new Array(gameBoard[key].length).fill("");
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
  });
  gameModeChosen = "";
  timerElement.innerHTML = "";
  timerElement.style.display = "none";
  statusText.style.display = "none";
  startButton.disabled = true;
  startButton.style.backgroundColor = "grey";
  // cells.style.pointerEvents = "none";
  cells.forEach((cell) => {
    //activate gameBoard
    cell.style.pointerEvents = "none";
    cell.style.opacity = 0.3;
  });
  clearInterval(intervalX);
  clearInterval(intervalO);
});

// function selectedGameMode() {}
function restartGame() {
  //this works don't touch it
  Object.keys(gameBoard).forEach((key) => {
    gameBoard[key] = new Array(gameBoard[key].length).fill("");
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
  });
}

//add a timer with different difficulty levels
cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    // check if the cell is empty then assign a value to it
    if (e.target.innerText === "" && turn === "X") {
      e.target.innerText = "X";
      e.target.style.color = "dodgerBlue";
      statusText.innerHTML = "Player O's Turn";
      statusText.style.color = "green";
      turn = "O";
      cellsCheck(cell, index);
      winnerCheck();
      playerX.pick = e.target.innerText;
    } else if (e.target.innerText === "" && turn === "O") {
      playerX.pick = "";
      e.target.innerText = "O";
      turn = "X";
      playerO.pick = e.target.innerText;
      e.target.style.color = "green";
      statusText.style.color = "dodgerBlue";
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
    if (countdown === 0 && playerX.pick === "") {
      clearInterval(intervalX); // Stop the timer
      timerElement.textContent = "Time's up!";
      console.log("player x didnt pick anything");
    } else if (playerX.pick === "X") {
      countdown = 11;
      interval_O_Timer();
      clearInterval(intervalX);
      turn = "O";
      playerX.pick = "";
      console.log("player x picked something");
    }
  }, 1000);
}

function interval_O_Timer() {
  intervalO = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;
    if (countdown === 0 && playerO.pick === "") {
      clearInterval(intervalO); // Stop the timer
      timerElement.textContent = "Time's up!";
      console.log("player o didn't pick anything");
    } else if (playerO.pick === "O") {
      countdown = 11;
      turn = "X";
      interval_X_Timer();
      playerO.pick = "";
      clearInterval(intervalO);
      console.log("player 'O' picked something");
    }
  }, 1000);
}

// function triggerFunction() {
//   gameOverText.innerHTML = `Game is Over ${turn} missed his turn.`;
// }
function winnerCheck() {
  winnerCheckHorizontalX();
  winnerCheckHorizontalO();
  winnerCheckVerticalX();
  winnerCheckVerticalO();
  krisCrossX();
}

function cellsCheck(selectedCell, index) {
  //first row
  if (index === 0) {
    gameBoard.row1[0] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row1[0]);
    console.log(gameBoard);
  } else if (index === 1) {
    gameBoard.row1[1] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row1[1]);
    console.log(gameBoard);
  } else if (index === 2) {
    gameBoard.row1[2] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row1[2]);
    console.log(gameBoard);
    //second row
  } else if (index === 3) {
    gameBoard.row2[0] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row2[0]);
    console.log(gameBoard);
  } else if (index === 4) {
    gameBoard.row2[1] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row2[1]);
  } else if (index === 5) {
    gameBoard.row2[2] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row2[2]);
    //third row
  } else if (index === 6) {
    gameBoard.row3[0] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row3[0]);
  } else if (index === 7) {
    gameBoard.row3[1] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row3[1]);
  } else if (index === 8) {
    gameBoard.row3[2] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row3[2]);
  }
}

function winnerCheckHorizontalX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row1[1] === "X" &&
    gameBoard.row1[2] === "X"
  ) {
    // console.log("X is the Horizontal Winner Row 1");
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "X is the Horizontal Winner Row 1";
    statusText.innerHTML = "";
  } else if (
    gameBoard.row2[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row2[2] === "X"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "X is the Horizontal Winner Row 2";
    statusText.innerHTML = "";
  } else if (
    gameBoard.row3[0] === "X" &&
    gameBoard.row3[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "X is the Horizontal Winner Row 3";
    statusText.innerHTML = "";
  }
}
function winnerCheckHorizontalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row1[1] === "O" &&
    gameBoard.row1[2] === "O"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "O is the Horizontal Winner Row 1";
    statusText.innerHTML = "";
  } else if (
    gameBoard.row2[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row2[2] === "O"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "O is the Horizontal Winner Row 2";
    statusText.innerHTML = "";
  } else if (
    gameBoard.row3[0] === "O" &&
    gameBoard.row3[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "O is the Horizontal Winner Row 3";
    statusText.innerHTML = "";
  }
}
function winnerCheckVerticalX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[0] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "X wins vertically first row";
    statusText.innerHTML = "";
  } else if (
    gameBoard.row1[1] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[1] === "X"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "X wins vertically second row";
    statusText.innerHTML = "";
  } else if (
    gameBoard.row1[2] === "X" &&
    gameBoard.row2[2] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "X wins vertically third row";
    statusText.innerHTML = "";
  }
}
function winnerCheckVerticalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row2[0] === "O" &&
    gameBoard.row3[0] === "O"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "O wins vertically first row";
    statusText.innerHTML = "";
  } else if (
    gameBoard.row1[1] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[1] === "O"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "O wins vertically first row";
    statusText.innerHTML = "";
  } else if (
    gameBoard.row1[2] === "O" &&
    gameBoard.row2[2] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "X wins vertically third row";
    statusText.innerHTML = "";
  }
}
function krisCrossX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "X wins krisCross";
    statusText.innerHTML = "";
  } else if (
    gameBoard.row1[2] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "X Wins krisCross";
    statusText.innerHTML = "";
  }
}

function krisCrossX() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "O wins krisCross";
    statusText.innerHTML = "";
  } else if (
    gameBoard.row1[2] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[0] === "O"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "O wins krisCross";
    statusText.innerHTML = "";
  }
}
