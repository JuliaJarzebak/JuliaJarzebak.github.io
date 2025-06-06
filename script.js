document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('intro-modal');
    const closeImage = document.querySelector('.icon'); // Target the image used to close the modal
    const headerText = document.querySelector('.headerText'); // Target the header text

    // Hide modal when clicking the close image
    closeImage.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });

    // Hide modal when clicking anywhere inside the modal (including modal content)
    modal.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });

    // Show modal when clicking the header text
    headerText.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent conflict with page click listener
        modal.style.display = 'flex'; // Show the modal
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

// Preload all images
const preloadImages = () => {
    const images = [];
    document.querySelectorAll('.grid img').forEach((img) => {
        const original = img.src;
        const alt = img.dataset.alt;

        // Preload original image
        const originalImage = new Image();
        originalImage.src = original;
        images.push(originalImage);

        // Preload alternate image
        const altImage = new Image();
        altImage.src = alt;
        images.push(altImage);
    });
};
preloadImages();

// Add event listeners for hover/touch effects
document.querySelectorAll('.grid img').forEach((img, index) => {
    const original = img.src;
    const alt = img.dataset.alt;

    // Handle touchstart for iOS devices
    img.addEventListener('touchstart', () => {
        img.src = alt;
        const sound = sounds[index];
        if (sound) {
            sound.currentTime = 0; // Reset sound to the beginning
            sound.play().catch((err) => console.error('Playback error:', err));
        }
    });

    img.addEventListener('touchend', () => {
        img.src = original; // Restore the original image
        const sound = sounds[index];
        if (sound) {
            sound.pause(); // Pause the sound
            sound.currentTime = 0; // Reset sound to the beginning
        }
    });

    // Handle mouse events for non-touch devices
    img.addEventListener('mouseenter', () => {
        img.src = alt;
        const sound = sounds[index];
        if (sound) {
            sound.currentTime = 0; // Reset sound to the beginning
            sound.play().catch((err) => console.error('Playback error:', err));
        }
    });

    img.addEventListener('mouseleave', () => {
        img.src = original; // Restore the original image
        const sound = sounds[index];
        if (sound) {
            sound.pause(); // Pause the sound
            sound.currentTime = 0; // Reset sound to the beginning
        }
    });
});

//jak ktoś wpadł na pomysł przeglądać ten kod to odradzam bo jest pisany na szybko