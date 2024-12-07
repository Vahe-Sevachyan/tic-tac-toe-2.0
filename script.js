const cells = document.querySelectorAll(".cell");
const startButton = document.querySelector(".start-button");
const difficultyLevelEasy = document.querySelector(".easy");
const difficultyLevelMedium = document.querySelector(".medium");
const difficultyLevelHard = document.querySelector(".hard");
const timerElement = document.getElementById("timer");
const gameOverText = document.querySelector(".gameOverText");
const statusText = (document.querySelector(".status-text").style.color =
  "dodgerBlue");
let countdown = 10;
let turn = "X";
let winner = null;
let gameModeChosen = null;
let gameModeLevels = ["easy", "medium", "hard"];
startButton.disabled = true;
const gameBoard = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""],
};

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
if (gameModeChosen === "easy") {
  startButton.disabled = false;
  startButton.style.backgroundColor = "dodgerBlue";
}
startButton.addEventListener("click", () => {
  if ((startButton.disabled = false && gameModeChosen === "easy")) {
  }
  restartGame();
  console.log("clicked");
  console.log(gameBoard);
});
function selectedGameMode() {}
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
    } else if (e.target.innerText === "" && turn === "O") {
      e.target.innerText = "O";
      e.target.style.color = "green";
      statusText.style.color = "green";
      turn = "X";
      cellsCheck(cell, index);
      winnerCheck();
    }
  });
});

difficultyLevelEasy.addEventListener("click", () => {
  // Update the timer every second
  startButton.disabled = false;
  startButton.style.backgroundColor = "dodgerBlue";
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
    } else if (countdown === 0 && playerX.pick === true) {
      //restart the timer
      const intervalO = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;

        if (countdown === 0 && playerO.pick === "") {
          clearInterval(intervalO); // Stop the timer
          timerElement.textContent = "Time's up!";
          console.log("player o didnt pick anything");
        } else if (countdown === 0 && playerO.pick === true) {
          const intervalX = setInterval(() => {
            countdown--;
            timerElement.textContent = countdown;

            if (countdown === 0) {
              clearInterval(intervalX); // Stop the timer
              timerElement.textContent = "Time's up!";
            }
          }, 1000);
        }
      }, 1000);
    }
  }, 1000);
});
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
