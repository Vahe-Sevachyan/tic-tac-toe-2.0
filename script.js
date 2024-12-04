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
      // console.log(e.target);
    } else if (e.target.innerText === "" && turn === "O") {
      e.target.innerText = "O";
      turn = "X";
      cellCheck(cell, index);
      // winnerCheck();
    }
    // console.log(e.target);
    // console.log(e.target);
    // console.log(cells[6]);
  });
});

function cellCheck(selectedCell, index) {
  if (index === 0) {
    gameBoard.row1.push(selectedCell);
    console.log(gameBoard);
  } else if (index === 1) {
    gameBoard.row1.push(selectedCell);
    console.log(gameBoard);
  } else if (index === 2) {
    gameBoard.row1.push(selectedCell);
    console.log(gameBoard);
  }
}

// check if the cell is empty then assign a value to it

function winnerCheck() {
  if (
    cells[0].textContent &&
    cells[1].textContent &&
    cells[2].textContent === "X"
  ) {
    console.log("winner");
  }
}
