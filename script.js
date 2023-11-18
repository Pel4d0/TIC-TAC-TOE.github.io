let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerXWins = 0;
let playerXDraws = 0;
let playerOWins = 0;
let playerODraws = 0;

function handleCellClick(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            document.getElementById('game-over-text').textContent = `${currentPlayer} GANA`;
            showGameOver();
            handleConfetti();
            updateRanking();
        } else if (boardIsFull()) {
            document.getElementById('game-over-text').textContent = "EMPATE";
            showGameOver();
            updateRanking();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function showGameOver() {
    gameActive = false;
    const gameOverElement = document.getElementById('game-over');
    gameOverElement.classList.remove('hidden');
}

function updateRanking() {
    if (checkWinner()) {
        currentPlayer === 'X' ? playerXWins++ : playerOWins++;
    } else if (boardIsFull()) {
        playerXDraws++;
        playerODraws++;
    }

    document.getElementById('playerX-wins').textContent = playerXWins;
    document.getElementById('playerX-draws').textContent = playerXDraws;
    document.getElementById('playerO-wins').textContent = playerOWins;
    document.getElementById('playerO-draws').textContent = playerODraws;
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    hideGameOver();
    removeConfetti();
    updateBoard();
}

function hideGameOver() {
    const gameOverElement = document.getElementById('game-over');
    gameOverElement.classList.add('hidden');
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] !== '' && board[a] === board[b] && board[b] === board[c];
    });
}

function boardIsFull() {
    return board.every(cell => cell !== '');
}

function handleConfetti() {
    const confettiContainer = document.getElementById('confetti-container');

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random()}s`;
        confettiContainer.appendChild(confetti);
    }
}

function removeConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
}
