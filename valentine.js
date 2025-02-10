function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤️';
  document.body.appendChild(heart);

  // Random position within viewport width
  heart.style.left = Math.random() * 90 + "vw"; // Prevent overflow on edges
  heart.style.top = "100vh"; // Starting from the bottom

  // Random font size for the heart
  heart.style.fontSize = Math.random() * 20 + 10 + "px";

  // Random animation duration for variety
  const duration = Math.random() * 2 + 3;
  heart.style.animationDuration = duration + "s";

  // Remove after animation ends
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Generate hearts at intervals
setInterval(createHeart, 500);
