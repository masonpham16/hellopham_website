document.getElementById("addIngredientButton").addEventListener("click", addIngredient);
document.getElementById("addPlayerButton").addEventListener("click", addPlayer);
document.getElementById("assignButton").addEventListener("click", assignRandomIngredients);

// Add support for Enter key
document.getElementById("playerInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") addPlayer();
});

document.getElementById("ingredientInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") addIngredient();
});

let playerIdCounter = 0; // Counter to generate unique IDs for players
let playersMap = new Map(); // This will store players and their assigned ingredients

class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.ingredients = [];
  }

  // Getter for the player's name
  getName() {
    return this.name;
  }

  // Setter for the player's name
  setName(name) {
    this.name = name;
  }

  // Getter for the ingredients assigned to this player
  getIngredients() {
    return this.ingredients;
  }

  // Setter to add an ingredient to the player
  addIngredient(ingredient) {
    if (!this.ingredients.includes(ingredient)) {
      this.ingredients.push(ingredient);
    }
  }
}

function addIngredient() {
  const ingredientInput = document.getElementById("ingredientInput");
  const value = ingredientInput.value.trim();

  if (value === "") {
    alert("Please enter an ingredient.");
    return;
  }

  // Add the ingredient to the list in the DOM
  const ingredientList = document.getElementById("ingredientList");
  const listItem = document.createElement("li");
  listItem.innerHTML = `${value} <button onclick="removeIngredient(this)">Remove</button>`;
  ingredientList.appendChild(listItem);

  ingredientInput.value = "";
}

function removeIngredient(button) {
  const listItem = button.parentElement;
  listItem.remove();
}

function addPlayer() {
  const playerInput = document.getElementById("playerInput");
  const value = playerInput.value.trim();

  if (value === "") {
    alert("Please enter a player name.");
    return;
  }

  // Generate unique player ID
  playerIdCounter++;
  const playerId = playerIdCounter;

  // Create a new Player object and add it to the playersMap
  const newPlayer = new Player(value, playerId);
  playersMap.set(playerId, newPlayer);

  // Add the player to the DOM
  const playerList = document.getElementById("playerList");
  const listItem = document.createElement("li");
  listItem.setAttribute("data-player-id", playerId);
  listItem.innerHTML = `
    <div class="player-info">
      <span class="player-name">${value.toUpperCase()}</span>
      <button class="remove-player-button" onclick="removePlayer(${playerId})">Remove</button>
    </div>
    <ul class="player-ingredients"></ul>
  `;
  playerList.appendChild(listItem);

  playerInput.value = "";
}

function removePlayer(playerId) {
  // Remove player from the map and the DOM
  playersMap.delete(playerId);

  const playerListItem = document.querySelector(`li[data-player-id="${playerId}"]`);
  playerListItem.remove();
}

function assignRandomIngredients() {
  const ingredientList = Array.from(document.querySelectorAll("#ingredientList li"));
  const playerList = Array.from(document.querySelectorAll("#playerList li"));

  // Validate that there are players and ingredients available
  if (ingredientList.length === 0 || playerList.length === 0) {
    alert("Please ensure both players and ingredients are added.");
    return;
  }

  // Loop through each player and assign a random ingredient
  playerList.forEach((playerItem) => {
    const playerId = playerItem.getAttribute("data-player-id");
    const player = playersMap.get(Number(playerId));

    // Randomly pick an ingredient
    const randomIndex = Math.floor(Math.random() * ingredientList.length);
    const randomIngredient = ingredientList[randomIndex].textContent.split(" ")[0]; // Extract ingredient text

    // Use the addIngredient method (setter) to add the ingredient to the player
    player.addIngredient(randomIngredient);

    // Append the ingredient to the player's ingredient list in the DOM
    const playerIngredients = playerItem.querySelector(".player-ingredients");
    const ingredientItem = document.createElement("li");
    ingredientItem.textContent = randomIngredient;
    playerIngredients.appendChild(ingredientItem);
  });
}
