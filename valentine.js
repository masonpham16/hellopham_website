// Function to move the "No" button to a random position when the mouse gets close
const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');

// Function to move the "No" button away from the mouse
const moveButton = (event) => {
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  // Get mouse position relative to the viewport
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Calculate the distance between mouse and button
  const distanceX = mouseX - (noButton.offsetLeft + buttonWidth / 2);
  const distanceY = mouseY - (noButton.offsetTop + buttonHeight / 2);
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // If the mouse is within 100px, move the button to a random location on the page
  if (distance < 100) {
    const randomX = Math.random() * (window.innerWidth - buttonWidth);
    const randomY = Math.random() * (window.innerHeight - buttonHeight);

    noButton.style.position = 'absolute';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
  }
};

// Add event listener for mouse movement to move the "No" button
document.addEventListener('mousemove', moveButton);

// Create floating hearts animation
function createHearts() {
  const numberOfHearts = 5; // Number of hearts to create at a time

  // Create hearts at intervals
  setInterval(() => {
    for (let i = 0; i < numberOfHearts; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerHTML = '❤️';
      document.body.appendChild(heart);

      // Random position within viewport width (prevents overflow on edges)
      heart.style.left = `${Math.random() * 90}vw`; 
      heart.style.top = '100vh'; // Start from the bottom

      // Random font size for the heart
      heart.style.fontSize = `${Math.random() * 20 + 10}px`;

      // Random animation duration for variety
      const duration = Math.random() * 2 + 3;
      heart.style.animationDuration = `${duration}s`;

      // Remove heart after animation ends
      setTimeout(() => heart.remove(), duration * 1000);
    }
  }, 500); // Create hearts every 500ms
}

// Ensure hearts are created when the page loads
createHearts();

// Add event listener for the "Yes" button to redirect to valentineYes.html
yesButton.addEventListener('click', () => {
  window.location.href = 'valentineYes.html'; // Redirect to valentineYes.html
});
