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
startButton.disabled = true;
timerElement.style.display = "none";
let countdown = 10;
let turn = "X";
let winner = null;
let gameModeChosen = "";
let intervalX;
let intervalO;

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
  gameModeChosen = "easy";
  timerElement.style.display = "inline-block";
  timerElement.style.opacity = 0.3;
  turn = "X";
  timerElement.innerHTML = "10";
  statusText.style.display = "block";

  startButton.disabled = false;
  startButton.style.backgroundColor = "dodgerBlue";
  statusText.style.color = "dodgerBlue";
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
  clearInterval(intervalX);
  clearInterval(intervalO);
  gameModeChosen = "";
  timerElement.innerHTML = "";
  timerElement.style.display = "none";
  statusText.style.display = "none";
  startButton.disabled = true;
  startButton.style.backgroundColor = "grey";
  // cells.style.pointerEvents = "none";
  cells.forEach((cell) => {
    //deactivate gameBoard
    cell.style.pointerEvents = "none";
    cell.style.opacity = 0.3;
  });
});

function clearGameBoard() {
  cells.forEach((cell) => {
    //deactivate gameBoard
    cell.style.pointerEvents = "none";
    cell.style.opacity = 0.8;
  });
  clearInterval(intervalX);
  clearInterval(intervalO);
  statusText.innerHTML = "works";
}

//loops over each cell block and adds x or o depending on the players turn
cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    // check if the cell is empty then assign a value to it
    if (e.target.innerText === "" && turn === "X") {
      playerX.pick = e.target.innerText;
      e.target.innerText = "X";
      e.target.style.color = "dodgerBlue";
      statusText.innerHTML = "Player O's Turn";
      statusText.style.color = "green";
      turn = "O";
      cellsCheck(cell, index);
      winnerCheck();
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
  krisCrossO();
}
//checks the selected cell on the board and assigns it the array game board
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
function displayWinner(displayText) {
  clearInterval(intervalX, intervalO); // Stop the timer
  clearGameBoard();
  timerElement.textContent = displayText;
  statusText.innerHTML = "";
}
//create winner game function call the 4 lines of code below
function winnerCheckHorizontalX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row1[1] === "X" &&
    gameBoard.row1[2] === "X"
  ) {
    displayWinner("X is the Horizontal Winner Row 1");
  } else if (
    gameBoard.row2[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row2[2] === "X"
  ) {
    displayWinner("X is the Horizontal Winner Row 2");
  } else if (
    gameBoard.row3[0] === "X" &&
    gameBoard.row3[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    displayWinner("X is the Horizontal Winner Row 3");
  }
}
function winnerCheckHorizontalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row1[1] === "O" &&
    gameBoard.row1[2] === "O"
  ) {
    displayWinner("O is the Horizontal Winner Row 1");
  } else if (
    gameBoard.row2[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row2[2] === "O"
  ) {
    displayWinner("O is the Horizontal Winner Row 2");
  } else if (
    gameBoard.row3[0] === "O" &&
    gameBoard.row3[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    displayWinner("O is the Horizontal Winner Row 3");
  }
}

function winnerCheckVerticalX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[0] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    displayWinner("X is the Vertical winner Row 1");
  } else if (
    gameBoard.row1[1] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[1] === "X"
  ) {
    displayWinner("X is the Vertical winner Row 2");
  } else if (
    gameBoard.row1[2] === "X" &&
    gameBoard.row2[2] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    displayWinner("X is the Vertical winner Row 3");
  }
}
function winnerCheckVerticalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row2[0] === "O" &&
    gameBoard.row3[0] === "O"
  ) {
    displayWinner("O is the Vertical winner Row 1");
  } else if (
    gameBoard.row1[1] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[1] === "O"
  ) {
    displayWinner("O is the Vertical winner Row 2");
  } else if (
    gameBoard.row1[2] === "O" &&
    gameBoard.row2[2] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    displayWinner("O is the Vertical winner Row 3");
  }
}

function krisCrossX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    clearInterval(intervalX); // Stop the timer
    timerElement.textContent = "";
    statusText.innerHTML = "";
    displayWinner("X wins krisCross");
  } else if (
    gameBoard.row1[2] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    // clearInterval(intervalX); // Stop the timer
    displayWinner("X wins krisCross");
  }
}

function krisCrossO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    displayWinner("O wins krisCross");
  } else if (
    gameBoard.row1[2] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[0] === "O"
  ) {
    displayWinner("O wins krisCross");
  }
}
