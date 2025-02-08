document.addEventListener('DOMContentLoaded', () => {
  // Create snowflakes
  const snowContainer = document.querySelector('.snow');

  for (let i = 0; i < 50; i++) { // Increased snowflakes for a better effect
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.innerHTML = '*'; // Asterisk symbol for snowflake
    snowContainer.appendChild(drop);

    // Randomize snowflake properties
    const size = Math.random() * 10 + 10; // Size between 10px and 20px
    const rotation = Math.random() * 360; // Random rotation between 0 and 360 degrees

    drop.style.fontSize = `${size}px`;
    drop.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    drop.style.opacity = Math.random() * 0.7 + 0.3; // Opacity between 0.3 and 1
    drop.style.animationDuration = `${Math.random() * 5 + 10}s`; // Fall speed only
    drop.style.animationDelay = `${Math.random() * 3}s`; // Random delay
    drop.style.transform = `rotate(${rotation}deg)`; // Random rotation
  }

  // Fetch JSON data and update the page text
  fetch('mainSite.json')
    .then(response => response.json()) // Parse JSON
    .then(data => {
      // Update greeting text
      const greetingElement = document.getElementById('greeting');
      if (greetingElement) {
        greetingElement.textContent = data.greeting;
      }

      // Update bio section
      const bioElement = document.getElementById('bio');
      if (bioElement) {
        bioElement.innerHTML = data.bio.map(p => `<p>${p}</p>`).join('');
      }
      
      // Update work experience
      const workContainer = document.getElementById('workExperience');
      if (workContainer && data.workExperience) {
        workContainer.innerHTML = data.workExperience.map(experience => `
          <h3>${experience.company}</h3>
          <p>${experience.location}</p>
          <p><strong>Positions:</strong></p>
          <ul>
            ${experience.positions.map(position => `
              <li><strong>${position.title}</strong> | ${position.duration}</li>
              <ul>
                ${position.achievements.map(ach => `<li>${ach}</li>`).join('')}
              </ul>
            `).join('')}
          </ul>
        `).join('');
      }
    })
    .catch(error => console.error('Error loading JSON:', error));
});
