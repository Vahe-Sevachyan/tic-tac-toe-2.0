const cells = document.querySelectorAll(".cell");
const restartButton = document.querySelector(".restart-button");

let turn = "X";
// restartButton.addEventListener("click", () => {
//   console.log("clicked");
// });
console.log(cells);
cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    if (e.target.innerText === "" && turn === "X") {
      e.target.innerText = "X";
      turn = "O";
    } else if (e.target.innerText === "" && turn === "O") {
      e.target.innerText = "O";
      turn = "X";
    }

    // console.log(e.target);
    // console.log(cells[6]);
  });
});
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
