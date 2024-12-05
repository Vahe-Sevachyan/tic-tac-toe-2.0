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

// restartButton.addEventListener("click", () => {
//   console.log("clicked");
// });

cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    if (e.target.innerText === "" && turn === "X") {
      e.target.innerText = "X";
      turn = "O";
      // console.log(`Index: ${index}, Element:`, cell);
      // winnerCheck();
      cellCheck(cell, index);
      // console.log(Object.entries(gameBoard));
      winnerCheckHorizontalX();
      winnerCheckVerticalX();
      // console.log(e.target);
    } else if (e.target.innerText === "" && turn === "O") {
      e.target.innerText = "O";
      turn = "X";
      cellCheck(cell, index);
      console.log(Object.entries(gameBoard));
      // winnerCheck();
    }
  });
});

function WinnerCheck() {
  Object.entries(gameBoard).every(([key, array]) => {
    return array.every((value) => value === array[0]);
  });
}

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

// check if the cell is empty then assign a value to it

function winnerCheckHorizontalX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row1[1] === "X" &&
    gameBoard.row1[2] === "X"
  ) {
    console.log("X is the Winner");
  } else if (
    gameBoard.row2[0] === "X" &&
    gameBoard.row2[1] === "X" &&
    gameBoard.row2[2] === "X"
  ) {
    console.log("X is the Winner");
  } else if (
    gameBoard.row3[0] === "X" &&
    gameBoard.row3[1] === "X" &&
    gameBoard.row3[2] === "X"
  ) {
    console.log("X is the Winner");
  }
}
function winnerCheckHorizontalO() {
  if (
    gameBoard.row1[0] === "O" &&
    gameBoard.row1[1] === "O" &&
    gameBoard.row1[2] === "O"
  ) {
    console.log("O is the Winner");
  } else if (
    gameBoard.row2[0] === "O" &&
    gameBoard.row2[1] === "O" &&
    gameBoard.row2[2] === "O"
  ) {
    console.log("O is the Winner");
  } else if (
    gameBoard.row3[0] === "O" &&
    gameBoard.row3[1] === "O" &&
    gameBoard.row3[2] === "O"
  ) {
    console.log("O is the Winner");
  }
}
function winnerCheckVerticalX() {
  if (
    gameBoard.row1[0] === "X" &&
    gameBoard.row2[0] === "X" &&
    gameBoard.row3[0] === "X"
  ) {
    console.log("X wins vertically");
  }
}
