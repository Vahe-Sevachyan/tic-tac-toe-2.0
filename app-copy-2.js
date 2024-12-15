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

//starts the game and the timer clock
startButton.addEventListener("click", () => {
  clearInterval(intervalX);
  clearInterval(intervalO);
  if (startButton.disabled === false) {
    //changes the pointer event value in css to activate the board and allow selection
    timerElement.style.opacity = 1;
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

//restart the game an resets the game board
newGameButton.addEventListener("click", () => {
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
  startButton.style.backgroundColor = "grey";
  startButton.disabled = false;
  startButton.style.backgroundColor = "dodgerBlue";
  statusText.style.color = "dodgerBlue";
});

//loops over each cell block and adds x or o depending on the players turn
cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    if (e.target.innerText === "" && turn === "X") {
      // Player X makes a move
      console.log("Player X clicked");
      e.target.innerText = "X";
      e.target.style.color = "dodgerBlue";
      playerX.pick = e.target.innerText;
      turn = "O";
      statusText.innerHTML = "Player O's Turn";
      statusText.style.color = "green";
      timerElement.style.color = "green";
      timerElement.style.borderColor = "green";

      // Clear and restart timer for Player O
      clearInterval(intervalX);
      countdown = 11;
      interval_O_Timer();

      cellsCheck(cell, index);
      winnerCheck();
    } else if (e.target.innerText === "" && turn === "O") {
      // Player O makes a move
      console.log("Player O clicked");
      e.target.innerText = "O";
      e.target.style.color = "green";
      playerO.pick = e.target.innerText;
      turn = "X";
      statusText.innerHTML = "Player X's Turn";
      statusText.style.color = "dodgerBlue";
      timerElement.style.color = "dodgerBlue";
      timerElement.style.borderColor = "dodgerBlue";

      // Clear and restart timer for Player X
      clearInterval(intervalO);
      countdown = 11;
      interval_X_Timer();

      cellsCheck(cell, index);
      winnerCheck();
    }
  });
});

function interval_X_Timer() {
  intervalX = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;

    if (countdown === 0) {
      clearInterval(intervalX); // Stop the timer
      timerElement.textContent = "Time's up! Player O's Turn";
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
      timerElement.textContent = "Time's up! Player X's Turn";
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
