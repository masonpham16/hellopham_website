const noButton = document.getElementById('noButton');
const container = document.querySelector('.container');
const eyes = document.querySelectorAll('.eye');
const pupils = document.querySelectorAll('.pupil');

// Function to move the "No" button to a random position
const moveButton = () => {
  const containerRect = container.getBoundingClientRect();
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  const randomX = Math.random() * (containerRect.width - buttonWidth);
  const randomY = Math.random() * (containerRect.height - buttonHeight);

  noButton.style.position = 'absolute';
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
};

// Add event listener to move the button when the mouse gets close
noButton.addEventListener('mouseover', moveButton);

// Function to make the pupils follow the mouse
const followMouse = (event) => {
  const containerRect = container.getBoundingClientRect();
  const mouseX = event.clientX - containerRect.left;
  const mouseY = event.clientY - containerRect.top;

  eyes.forEach((eye, index) => {
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
    const pupil = pupils[index];

    const maxDistance = 8; // Limit the distance the pupil can move
    const x = Math.cos(angle) * maxDistance;
    const y = Math.sin(angle) * maxDistance;

    pupil.style.transform = `translate(${10 + x}px, ${10 + y}px)`;
  });
};

// Add event listener to track mouse movement
document.addEventListener('mousemove', followMouse);
