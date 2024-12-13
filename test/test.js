let player1Name, player2Name;
let player1Score = 0, player2Score = 0;
let currentPlayer, board, gameActive;
const boardElement = document.getElementById("board");
const currentPlayerNameElement = document.getElementById("currentPlayerName");
const score1Element = document.getElementById("score1");
const score2Element = document.getElementById("score2");
const winnerMessageElement = document.getElementById("winnerMessage");
const nextRoundBtn = document.getElementById("nextRoundBtn");

function startGame() {
    player1Name = document.getElementById('player1Name').value;
    player2Name = document.getElementById('player2Name').value;

    if (player1Name && player2Name) {
        document.querySelector('.players').style.display = 'none';
        document.getElementById('gameUI').style.display = 'block';
        initializeBoard();
        currentPlayer = player1Name;
        currentPlayerNameElement.textContent = currentPlayer;
        gameActive = true;
    } else {
        alert("Please enter names for both players.");
    }
}

function initializeBoard() {
    board = Array(9).fill(null);
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const button = document.createElement('button');
        button.setAttribute('data-index', i);
        button.addEventListener('click', handleMove);
        boardElement.appendChild(button);
    }
}

function handleMove(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] || !gameActive) return; // Check if already marked or game over

    board[index] = currentPlayer === player1Name ? 'X' : 'O';
    event.target.textContent = board[index];
    checkForWinner();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
    currentPlayerNameElement.textContent = currentPlayer;
}

function checkForWinner() {
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

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver(board[a]);
            return;
        }
    }

    // Check for a tie (if no empty spots left)
    if (!board.includes(null)) {
        gameOver('tie');
    }
}

function gameOver(winner) {
    gameActive = false;
    if (winner === 'X') {
        player1Score++;
        winnerMessageElement.textContent = `${player1Name} wins!`;
    } else if (winner === 'O') {
        player2Score++;
        winnerMessageElement.textContent = `${player2Name} wins!`;
    } else {
        winnerMessageElement.textContent = 'It\'s a tie!';
    }
    winnerMessageElement.style.display = 'block';
    score1Element.textContent = player1Score;
    score2Element.textContent = player2Score;
    nextRoundBtn.style.display = 'block';
}

function nextRound() {
    winnerMessageElement.style.display = 'none';
    nextRoundBtn.style.display = 'none';
    initializeBoard();
    gameActive = true;
}

