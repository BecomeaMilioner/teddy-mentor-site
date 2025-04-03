document.addEventListener('DOMContentLoaded', () => {
    // --- Elements for Webinar Modal ---
    const enterButton = document.getElementById('enterWebinarButton');
    const modalOverlay = document.getElementById('modal-overlay'); // Reusing ID is okay if JS is page-specific
    const modalCloseButton = document.querySelector('#modal-overlay .modal-close-button'); // Target close within this modal

    // --- Modal Logic ---
    function showWebinarRevealModal() {
        if (modalOverlay) {
            modalOverlay.classList.add('visible');
        }
    }

    function hideWebinarRevealModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('visible');
        }
    }

    // --- Event Listeners ---
    if (enterButton) {
        enterButton.addEventListener('click', showWebinarRevealModal);
    }

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', hideWebinarRevealModal);
    }

    // Close modal if clicking outside the modal content
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            // Check if the click is directly on the overlay, not the modal itself
            if (event.target === modalOverlay) {
                hideWebinarRevealModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('visible')) {
            hideWebinarRevealModal();
        }
    });

    // Optional: Fake Countdown Timer Logic
    // const countdownElement = document.getElementById('countdown-timer');
    // if (countdownElement) {
    //     let timeLeft = 15 * 60 + 32; // Example: 15 minutes 32 seconds
    //     setInterval(() => {
    //         if (timeLeft <= 0) {
    //              countdownElement.textContent = "Starting NOW!";
    //              // Maybe disable button briefly or change text?
    //              return;
    //         }
    //         timeLeft--;
    //         const minutes = Math.floor(timeLeft / 60);
    //         const seconds = timeLeft % 60;
    //         countdownElement.textContent = `Webinar Starts In: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    //     }, 1000);
    // }

}); // End DOMContentLoaded