// script.js

document.getElementById("rollButton").addEventListener("click", rollDice);

function rollDice() {
  // Generate random numbers between 1 and 6 for two dice
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;

  // Update dice images
  document.getElementById("dice1").src = `images/bauCuaImages/dice${dice1}.png`;
  document.getElementById("dice2").src = `images/bauCuaImages/dice${dice2}.png`;

  // Display result
  const result = document.getElementById("result");
  if (dice1 === dice2) {
    result.textContent = `It's a draw! Both rolled ${dice1}.`;
  } else if (dice1 > dice2) {
    result.textContent = `Player 1 wins with a ${dice1} vs ${dice2}.`;
  } else {
    result.textContent = `Player 2 wins with a ${dice2} vs ${dice1}.`;
  }
}
