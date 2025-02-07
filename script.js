document.addEventListener('DOMContentLoaded', () => {
  const snowContainer = document.querySelector('.snow');

  for (let i = 0; i < 50; i++) { // Create 50 snowflakes
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowContainer.appendChild(snowflake);
    
    // Randomize the size, position, and animation delay of each snowflake
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 3}s`;
    snowflake.style.animationDelay = `${Math.random() * 3}s`;
  }

  // Fetch JSON data and update the page text
  fetch('mainSite.json')
    .then(response => response.json()) // Parse JSON
    .then(data => {
        document.getElementById('greeting').textContent = data.greeting;

        // Join paragraphs with line breaks
        document.getElementById('bio').innerHTML = data.bio.map(p => `<p>${p}</p>`).join("");    })
    .catch(error => console.error('Error loading JSON:', error));
});
