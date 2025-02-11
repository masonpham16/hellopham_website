// Ensure floating hearts always appear
function createHearts() {
  const numberOfHearts = 5; // Number of hearts to create at a time

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

// Start hearts animation immediately
createHearts();

// Check if buttons exist before adding event listeners
const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');

if (noButton) {
  const moveButton = () => {
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const randomX = Math.random() * (window.innerWidth - buttonWidth);
    const randomY = Math.random() * (window.innerHeight - buttonHeight);

    noButton.style.position = 'absolute';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
  };

  const handleMouseMove = (event) => {
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const distanceX = mouseX - (noButton.offsetLeft + buttonWidth / 2);
    const distanceY = mouseY - (noButton.offsetTop + buttonHeight / 2);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 100) {
      moveButton();
    }
  };

  document.addEventListener('mousemove', handleMouseMove);
  noButton.addEventListener('touchstart', moveButton);
}

if (yesButton) {
  yesButton.addEventListener('click', () => {
    window.location.href = 'valentineYes.html';
  });
}
