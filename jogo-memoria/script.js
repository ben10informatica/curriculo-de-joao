const cards = [
    { icon: 'fab fa-html5', name: 'HTML' },
    { icon: 'fab fa-css3-alt', name: 'CSS' },
    { icon: 'fab fa-js', name: 'JavaScript' },
    { icon: 'fab fa-react', name: 'React' },
    { icon: 'fab fa-node-js', name: 'Node' },
    { icon: 'fab fa-python', name: 'Python' },
    { icon: 'fab fa-github', name: 'GitHub' },
    { icon: 'fab fa-git-alt', name: 'Git' }
];

let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let timeElapsed = 0;
let timer = null;

const gameBoard = document.querySelector('.game-board');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const restartButton = document.getElementById('restart');

// Inicializar jogo
function initializeGame() {
    const duplicatedCards = [...cards, ...cards];
    const shuffledCards = shuffleArray(duplicatedCards);
    
    gameBoard.innerHTML = '';
    shuffledCards.forEach((card, index) => {
        const cardElement = createCard(card, index);
        gameBoard.appendChild(cardElement);
    });
    
    matchedPairs = 0;
    score = 0;
    timeElapsed = 0;
    updateScore();
    updateTimer();
    startTimer();
}

// Criar carta
function createCard(card, index) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.index = index;
    cardElement.dataset.name = card.name;
    
    cardElement.innerHTML = `
        <div class="card-front">?</div>
        <div class="card-back">
            <i class="${card.icon}"></i>
        </div>
    `;
    
    cardElement.addEventListener('click', () => flipCard(cardElement));
    return cardElement;
}

// Virar carta
function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped') || 
        card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Verificar par
function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.name === card2.dataset.name;
    
    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        score += 10;
        updateScore();
        
        if (matchedPairs === cards.length) {
            endGame();
        }
    } else {
        score = Math.max(0, score - 1);
        updateScore();
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    
    setTimeout(() => {
        flippedCards = [];
    }, 1000);
}

// Atualizar pontuação
function updateScore() {
    scoreElement.textContent = score;
}

// Iniciar timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeElapsed++;
        updateTimer();
    }, 1000);
}

// Atualizar timer
function updateTimer() {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Finalizar jogo
function endGame() {
    clearInterval(timer);
    alert(`Parabéns! Você completou o jogo!\nPontuação: ${score}\nTempo: ${timeElement.textContent}`);
}

// Embaralhar array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Reiniciar jogo
restartButton.addEventListener('click', initializeGame);

// Iniciar jogo
initializeGame(); 