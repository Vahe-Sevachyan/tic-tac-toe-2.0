const cells = document.querySelectorAll(".cell");
const restartButton = document.querySelector(".restart-button");
const gameBoard = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""],
};
let turn = "X";

const playerOne = {
  player: "X",
};

restartButton.addEventListener("click", () => {
  restartGame();
  console.log("clicked");
  console.log(gameBoard);
});
function restartGame() {
  Object.keys(gameBoard).forEach((key) => {
    // Fill each array with empty strings (same length as before)
    gameBoard[key] = new Array(gameBoard[key].length).fill("");
  });
}
cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    // check if the cell is empty then assign a value to it
    if (e.target.innerText === "" && turn === "X") {
      e.target.innerText = "X";
      turn = "O";
      cellsCheck(cell, index);
      winnerCheck();
    } else if (e.target.innerText === "" && turn === "O") {
      e.target.innerText = "O";
      turn = "X";
      cellsCheck(cell, index);
      winnerCheck();
    }
  });
});
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
