// script.js

document.getElementById("rollButton").addEventListener("click", rollDice);

function rollDice() {
  const button = document.getElementById("rollButton");
  const dice1Element = document.getElementById("dice1");
  const dice2Element = document.getElementById("dice2");
  const dice3Element = document.getElementById("dice3");
  const result = document.getElementById("result");
  const totalRolls = 15; // Number of times dice faces will change during the animation
  let rollCount = 0;

  button.disabled = true; // Disable the button during animation
  result.textContent = ""; // Clear any previous result text

  // Play dice roll sound
  const diceSound = new Audio('sounds/diceRoll.mp3');
  diceSound.play();

  // Start the rolling animation
  const rollInterval = setInterval(() => {
    // Random temporary values for animation
    const tempDice1 = Math.floor(Math.random() * 6) + 1;
    const tempDice2 = Math.floor(Math.random() * 6) + 1;
    const tempDice3 = Math.floor(Math.random() * 6) + 1;

    // Update dice images during rolling
    dice1Element.src = `images/bauCuaImages/dice${tempDice1}.png`;
    dice2Element.src = `images/bauCuaImages/dice${tempDice2}.png`;
    dice3Element.src = `images/bauCuaImages/dice${tempDice3}.png`;

    rollCount++;
    if (rollCount >= totalRolls) {
      clearInterval(rollInterval); // Stop rolling animation
      finalizeRoll(button, result);
    }
  }, 100); // Change dice face every 100ms
}

function finalizeRoll(button, result) {
  // Final dice values
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const dice3 = Math.floor(Math.random() * 6) + 1;

  // Update dice images with final values
  document.getElementById("dice1").src = `images/bauCuaImages/dice${dice1}.png`;
  document.getElementById("dice2").src = `images/bauCuaImages/dice${dice2}.png`;
  document.getElementById("dice3").src = `images/bauCuaImages/dice${dice3}.png`;


  // Re-enable the button
  button.disabled = false;
}
