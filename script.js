document.addEventListener('DOMContentLoaded', () => {
  // Create shower drops
  const snowContainer = document.querySelector('.snow');

  for (let i = 0; i < 100; i++) { // Create 100 shower drops
    const drop = document.createElement('div');
    drop.classList.add('drop');
    snowContainer.appendChild(drop);

    // Randomize the size, position, and animation delay of each drop
    const size = Math.random() * 5 + 5; // Shower drop size between 5px and 10px (elongated)
    drop.style.width = `${size}px`;
    drop.style.height = `${size * 2}px`; // Height is double the width for a drop shape
    drop.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    drop.style.animationDuration = `${Math.random() * 3 + 6}s`; // Faster falling duration between 1s and 3s
    drop.style.animationDelay = `${Math.random() * 2}s`; // Random delay between 0s and 2s
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

        // Update bio section by joining each paragraph with line breaks
        const bioElement = document.getElementById('bio');
        if (bioElement) {
          bioElement.innerHTML = data.bio.map(p => `<p>${p}</p>`).join('');
        }
        
        // Update work experience if needed
        const workExperience = data.workExperience;
        const workContainer = document.getElementById('workExperience');
        if (workContainer && workExperience) {
          workContainer.innerHTML = workExperience.map(experience => `
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
