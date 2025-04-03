// --- Start of JS code (Variables and initial setup) ---
const imagesData = [
    { id: 1, src: 'PM1.png' },
    { id: 2, src: 'PM2.png' },
    { id: 3, src: 'PM3.png' },
    { id: 4, src: 'PM4.png' },
];
let gameCardsData = [...imagesData, ...imagesData];
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;
const gameBoard = document.getElementById('game-board');
const messageDiv = document.getElementById('message');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    console.log('Creating board...'); // Debug message
    gameBoard.innerHTML = '';
    messageDiv.textContent = ''; // Clear previous messages
    flippedCards = [];
    matchedPairs = 0;
    canFlip = true;
    const shuffledCards = shuffle(gameCardsData);
    shuffledCards.forEach((cardData) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = cardData.id;
        // Use English in generated HTML (alt text, card back)
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-back">
                    ? </div>
                <div class="card-face card-front">
                    <img src="${cardData.src}" alt="Image ${cardData.id}"> </div>
            </div>
        `;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
    console.log('Board created.'); // Debug message
}

function handleCardClick() {
    const cardId = this.dataset.id;
    // Debug messages in English
    console.log(`handleCardClick: Clicked card ID: ${cardId}, Current flipped: ${flippedCards.length}, canFlip: ${canFlip}, Matched: ${this.classList.contains('matched')}`);

    if (!canFlip || flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        console.log('handleCardClick: Click ignored.');
        return;
    }

    console.log(`handleCardClick: Flipping card ID: ${cardId}`);
    this.classList.add('flipped');
    flippedCards.push(this);
    console.log(`handleCardClick: flippedCards length now: ${flippedCards.length}`);


    if (flippedCards.length === 2) {
        console.log('handleCardClick: Two cards flipped. Disabling flips and scheduling match check.');
        canFlip = false;
        setTimeout(checkForMatch, 1000);
    }
}

function checkForMatch() {
    console.log('checkForMatch: Starting check...'); // Debug message
    const [card1, card2] = flippedCards;
    const id1 = card1.dataset.id;
    const id2 = card2.dataset.id;
    console.log(`checkForMatch: Comparing ID: ${id1} and ID: ${id2}`); // Debug message

    if (id1 === id2) {
        console.log('checkForMatch: Match found!'); // Debug message
        disableCards(card1, card2);
        matchedPairs++;
        console.log(`checkForMatch: Matched pairs count: ${matchedPairs}`); // Debug message
        checkForWin();
        flippedCards = []; // Reset flipped cards
        canFlip = true;    // Allow flipping again
        console.log('checkForMatch: Reset flippedCards, enabled flipping (canFlip = true).'); // Debug message
    } else {
        console.log('checkForMatch: No match.'); // Debug message
        flippedCards = []; // Reset flipped cards immediately
        console.log('checkForMatch: Reset flippedCards (mismatch). Calling unflipCards.'); // Debug message
        unflipCards(card1, card2);
    }
}

function disableCards(card1, card2) {
    // Debug message in English
    console.log(`disableCards: Adding .matched to cards with ID: ${card1.dataset.id}`);
    card1.classList.add('matched');
    card2.classList.add('matched');
}

function unflipCards(card1, card2) {
    // Debug message in English
    console.log(`unflipCards: Scheduling unflip for IDs: ${card1.dataset.id}, ${card2.dataset.id}`);
    setTimeout(() => {
        // Debug message in English
        console.log(`unflipCards: Executing unflip. Removing .flipped and setting canFlip = true.`);
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        canFlip = true; // Enable flips AFTER cards are visually back
    }, 600);
}

function checkForWin() {
    // Debug message in English
    console.log(`checkForWin: Checking if ${matchedPairs} === ${imagesData.length}`);
    if (matchedPairs === imagesData.length) {
        console.log('checkForWin: Game won!'); // Debug message
        // Change win message to English
        messageDiv.textContent = 'Congratulations! You Smart But Not Rich!';
    }
}

// --- End of JS code ---

createBoard(); // Start the game