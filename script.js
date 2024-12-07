const cells = document.querySelectorAll(".cell");
const restartButton = document.querySelector(".restart-button");
const gameBoard = {
  row1: [],
  row2: [],
  row3: [],
};
let turn = "X";

const playerOne = {
  player: "X",
};

restartButton.addEventListener("click", () => {
  restartGame();
  console.log("clicked");
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    // check if the cell is empty then assign a value to it
    if (e.target.innerText === "" && turn === "X") {
      e.target.innerText = "X";
      turn = "O";
      cellsCheck(cell, index);
      winnerCheckHorizontalX();
      winnerCheckHorizontalO();
      winnerCheckVerticalX();
      // console.log(e.target);
    } else if (e.target.innerText === "" && turn === "O") {
      e.target.innerText = "O";
      turn = "X";
      cellsCheck(cell, index);
      winnerCheckHorizontalX();
      winnerCheckHorizontalO();
      winnerCheckVerticalX();
      console.log(Object.entries(gameBoard));
      // winnerCheck();
    }
  });
});

function restartGame() {
  Object.entries(gameBoard).forEach(([key, array]) => {
    gameBoard[key] = array.map(() => ""); // Replace each value with an empty string
  });
}

function cellsCheck(selectedCell, index) {
  //first row
  if (index === 0) {
    gameBoard.row1[0] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row1[0]);
  } else if (index === 1) {
    gameBoard.row1[1] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row1[1]);
  } else if (index === 2) {
    gameBoard.row1[2] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row1[2]);
    //second row
  } else if (index === 3) {
    gameBoard.row2[0] = selectedCell.innerHTML;
    console.log(Object.entries(gameBoard));
    console.log(gameBoard.row2[0]);
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
//checks which cell to assign value to in gameBoard object
function cellCheck(selectedCell, index) {
  if (index === 0 || index === 1 || index === 2) {
    gameBoard.row1.push(selectedCell.innerHTML);
    // console.log(gameBoard);
  } else if (index === 3 || index === 4 || index === 5) {
    gameBoard.row2.push(selectedCell.innerHTML);
    // console.log(gameBoard);
  } else if (index === 6 || index === 7 || index === 8) {
    gameBoard.row3.push(selectedCell.innerHTML);
    // console.log(gameBoard);
  }
}
//rewrite the cell check function to check for the cell  then push it to correct location in the board
// you will have to write a function for each one think of a creative way to group your code
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
