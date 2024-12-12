export function interval_X_Timer() {
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

export function interval_O_Timer() {
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
