document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('intro-modal');
    const startButton = document.getElementById('start-button');

    startButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });
});

// Preload all sounds
const sounds = [];
document.querySelectorAll('.grid img').forEach((img, index) => {
    const hoverSound = new Audio();
    hoverSound.src = `sounds/sound${index + 1}.mp3`;
    hoverSound.preload = 'auto';
    hoverSound.volume = 0.3; // Set the volume to 30% (adjust as needed)
    sounds.push(hoverSound); // Store preloaded sounds
});

// Add event listeners for hover effects
document.querySelectorAll('.grid img').forEach((img, index) => {
    const original = img.src;
    const alt = img.dataset.alt;

    img.addEventListener('mouseenter', () => {
        img.src = alt;
        sounds[index].currentTime = 0; // Reset sound to the beginning
        sounds[index].play().catch((err) => console.error('Playback error:', err));
    });
    img.addEventListener('mouseleave', () => {
        img.src = original; // Restore the original image
        sounds[index].pause(); // Pause the sound
        sounds[index].currentTime = 0; // Reset sound to the beginning
    });
});