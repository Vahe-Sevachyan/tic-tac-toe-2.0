const cells = document.querySelectorAll(".cell");
const startButton = document.querySelector(".start-button");
const difficultyLevelEasy = document.querySelector(".easy");
const difficultyLevelMedium = document.querySelector(".medium");
const difficultyLevelHard = document.querySelector(".hard");
const timerElement = document.getElementById("timer");
const gameOverText = document.querySelector(".gameOverText");
const statusText = document.querySelector(".status-text");
let countdown = 10;
let turn = "X";
let winner = null;
let gameModeChosen = "";
let gameModeLevels = ["easy", "medium", "hard"];
startButton.disabled = true;

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

//#!1 step one the gameMode
difficultyLevelEasy.addEventListener("click", () => {
  // Update the timer every second
  gameModeChosen = "easy";
  // console.log(gameModeChosen);
  // intervalX();
  startButton.disabled = false;
  // console.log(startButton.disabled);
  startButton.style.backgroundColor = "dodgerBlue";
});
startButton.addEventListener("click", () => {
  // intervalX();
  if (startButton.disabled === false && gameModeChosen === "easy") {
    interval_X_Timer();
    // console.log(gameModeChosen);
    // console.log("clicked");
  }
});
// function selectedGameMode() {}
function restartGame() {
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
      statusText.style.color = "dodgerBlue";
      turn = "O";
      cellsCheck(cell, index);
      winnerCheck();
      playerX.pick = e.target.innerText;
      // interval_O_Timer();
    } else if (e.target.innerText === "" && turn === "O") {
      playerX.pick = "";
      e.target.innerText = "O";
      turn = "X";
      playerO.pick = e.target.innerText;
      e.target.style.color = "green";
      statusText.style.color = "green";
      cellsCheck(cell, index);
      winnerCheck();
      // interval_X_Timer();
    }
  });
});

function interval_X_Timer() {
  const intervalX = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;
    //you have to call the reset timer function after each selection
    if (countdown === 0 && playerX.pick === "") {
      clearInterval(intervalX); // Stop the timer
      timerElement.textContent = "Time's up!";
      console.log("player x didnt pick anything");
      // triggerFunction(); // Call the function after 10 seconds
      // startTimer();
    } else if (playerX.pick === "X") {
      //restart the timer
      countdown = 11;
      interval_O_Timer();
      clearInterval(intervalX);
      turn = "O";
      playerX.pick = "";
      // return;
      // clearInterval(intervalX);
      console.log("player x picked something");
    }
  }, 1000);
}

// function intervalX() {}
function interval_O_Timer() {
  const intervalO = setInterval(() => {
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
      // return;
    }
  }, 1000);
}

function triggerFunction() {
  gameOverText.innerHTML = `Game is Over ${turn} missed his turn.`;
}
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
    console.log("X is the Horizontal Winner Row 1");
  } else if (
    gameBoard.row2[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row2[2] === "X"
  ) {
    console.log("X is the Horizontal Winner Row 2");
  } else if (
    gameBoard.row3[0] === "X" &&
    gameBoard.row3[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    console.log("X is the Horizontal Winner Row 3");
  }
}
function winnerCheckHorizontalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row1[1] === "O" &&
    gameBoard.row1[2] === "O"
  ) {
    console.log("O is the Horizontal Winner Row 1");
  } else if (
    gameBoard.row2[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row2[2] === "O"
  ) {
    console.log("O is the Horizontal Winner Row 2");
  } else if (
    gameBoard.row3[0] === "O" &&
    gameBoard.row3[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    console.log("O is the Horizontal Winner Row 3");
  }
}
function winnerCheckVerticalX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[0] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    console.log("the code reached vertical x");
    console.log("X wins vertically first row");
  } else if (
    gameBoard.row1[1] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[1] === "X"
  ) {
    console.log("X wins vertically second row");
  } else if (
    gameBoard.row1[2] === "X" &&
    gameBoard.row2[2] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    console.log("X wins vertically third row");
  }
}
function winnerCheckVerticalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row2[0] === "O" &&
    gameBoard.row3[0] === "O"
  ) {
    console.log("the code reached vertical x");
    console.log("O wins vertically first row");
  } else if (
    gameBoard.row1[1] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[1] === "O"
  ) {
    console.log("O wins vertically second row");
  } else if (
    gameBoard.row1[2] === "O" &&
    gameBoard.row2[2] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    console.log("X wins vertically third row");
  }
}
function krisCrossX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    console.log("X wins krisCross");
  } else if (
    gameBoard.row1[2] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    console.log("X Wins krisCross");
  }
}

function krisCrossX() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    console.log("O wins krisCross");
  } else if (
    gameBoard.row1[2] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row3[0] === "O"
  ) {
    console.log("O Wins krisCross");
  }
}
