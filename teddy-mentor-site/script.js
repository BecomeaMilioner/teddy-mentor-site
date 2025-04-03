document.addEventListener('DOMContentLoaded', () => {

    // --- Elements ---
    const gimmickButton = document.getElementById('gimmickButton');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseButton = document.querySelector('.modal-close-button');
    const typingBanner = document.getElementById('typing-banner');
    const clickSound = document.getElementById('click-sound'); // Optional sound element
    const konamiEffectContainer = document.getElementById('konami-effect');
    const animatedElements = document.querySelectorAll('.animated'); // For scroll animations

    // --- Modal Logic ---
    function showSecretMessage() {
        if (modalOverlay) {
            modalOverlay.classList.add('visible');
            // Optional: Play sound
            // playSound();
        }
    }

    function hideSecretMessage() {
        if (modalOverlay) {
            modalOverlay.classList.remove('visible');
        }
    }

    if (gimmickButton) {
        gimmickButton.addEventListener('click', showSecretMessage);
    }
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', hideSecretMessage);
    }
    // Close modal if clicking outside the modal content
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            // Check if the click is directly on the overlay, not the modal itself
            if (event.target === modalOverlay) {
                hideSecretMessage();
            }
        });
    }
    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('visible')) {
            hideSecretMessage();
        }
    });

    // --- Typing Banner Effect ---
    // ** UPDATED ENGLISH TEXT **
    const bannerText = "Stop dreaming, start memeing! Buy $MENTOR!"; // The text to type
    let charIndex = 0;
    function typeBanner() {
        if (typingBanner && charIndex < bannerText.length) {
            typingBanner.textContent += bannerText.charAt(charIndex);
            charIndex++;
            setTimeout(typeBanner, 90); // Typing speed (milliseconds)
        } else if (typingBanner) {
             // Optional: remove the blinking cursor after typing is done
            const cursorSpan = typingBanner.nextElementSibling; // Assuming cursor is the next sibling span
             if(typingBanner.style && typingBanner.style.animation) typingBanner.style.animation = 'none'; // Stop CSS blink
             // Hide the cursor element if it's separate
             // if (cursorSpan && cursorSpan.nodeName === 'SPAN') {
             //     cursorSpan.style.display = 'none';
             // }
        }
    }
    // Clear existing text content before starting (if any)
    if(typingBanner) typingBanner.textContent = '';
    // Start typing after a short delay
    setTimeout(typeBanner, 500);


    // --- Optional Sound Effect ---
    function playSound() {
        if (clickSound) {
            clickSound.currentTime = 0; // Reset sound if already playing
            clickSound.play().catch(error => console.warn("Audio play failed:", error)); // Use warn for non-critical errors
        }
    }
    // Example: Play sound on specific button clicks (or other events)
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Decide when to play the sound. Example: only on external links
            const href = button.getAttribute('href');
            if (href && !href.startsWith('#') && href !== '#') {
                // playSound(); // Uncomment to enable sound on external CTA clicks
            }
        });
    });
     if (gimmickButton) {
        gimmickButton.addEventListener('click', () => {
             // playSound(); // Uncomment to enable sound on gimmick button click
         });
     }


    // --- Konami Code Easter Egg ---
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiIndex = 0;
    document.addEventListener('keydown', (event) => {
        // Ignore if typing in input fields, etc. (basic check)
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        if (event.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonami();
                konamiIndex = 0; // Reset
            }
        } else {
            // Reset if the sequence breaks, unless it's the first key again
            konamiIndex = (event.key.toLowerCase() === konamiCode[0].toLowerCase()) ? 1 : 0;
        }
    });

    function activateKonami() {
        // ** UPDATED ENGLISH CONSOLE LOG **
        console.log("KONAMI CODE ACTIVATED! Making it rain $MENTOR (visually)...");
        if (konamiEffectContainer) {
            konamiEffectContainer.classList.add('active');
            // Create the visual effect (e.g., falling coins)
            createFallingCoins(60); // Adjust number of coins
            // Automatically deactivate after some time
            setTimeout(() => {
                konamiEffectContainer.classList.remove('active');
                 // Optional: Clear coins after effect ends
                 konamiEffectContainer.innerHTML = '';
            }, 6000); // Effect duration (milliseconds)
        }
    }

    function createFallingCoins(count) {
         if (!konamiEffectContainer) return;
         konamiEffectContainer.innerHTML = ''; // Clear previous coins
         for (let i = 0; i < count; i++) {
             const coin = document.createElement('div');
             coin.classList.add('konami-coin');
             coin.style.left = `${Math.random() * 100}vw`; // Random horizontal start
             // Adjust animation duration for varied fall speed
             coin.style.animationDuration = `${Math.random() * 2.5 + 2}s`; // Fall speed between 2s and 4.5s
             coin.style.animationDelay = `${Math.random() * 3}s`; // Random start delay up to 3s
             // Random size for coins
             const size = Math.random() * 15 + 10; // Size between 10px and 25px
             coin.style.width = `${size}px`;
             coin.style.height = `${size}px`;
              // Add Teddy's face to some coins? (Requires image)
              // if (Math.random() > 0.8) {
              //     coin.style.backgroundImage = 'url("mentor_coin_logo_512.png")';
              //     coin.style.backgroundSize = 'cover';
              //     coin.style.backgroundColor = 'transparent'; // Hide gold color if using image
              //     coin.style.border = 'none';
              // }
             konamiEffectContainer.appendChild(coin);
         }
     }

    // --- Scroll Reveal Animation (using Intersection Observer for better performance) ---
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible (if you only want it once)
            }
            // Optional: Remove class if scrolling back up
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // --- Ensure external links open in new tab (Improved slightly) ---
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//'))) {
             // Check if it's linking to the same domain or not
            if (link.hostname !== window.location.hostname) {
                 // Only add target=_blank to external links
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer'); // Security measure
            }
        }
    });

}); // End DOMContentLoaded