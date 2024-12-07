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
