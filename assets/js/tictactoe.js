let player1Name, player2Name;
let player1Score = 0, player2Score = 0;
let currentPlayer, board, gameActive;
const boardElement = document.getElementById("board");
const currentPlayerNameElement = document.getElementById("currentPlayerName");
const score1Element = document.getElementById("score1");
const score2Element = document.getElementById("score2");
const errorElement = document.getElementById("error");
const startGameElement = document.getElementById("startGame");


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
       errorElement.textContent = "Please enter names for both players.";
    }
}

function initializeBoard() {
    board = Array(9).fill(null);
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const button = document.createElement('button');
        button.setAttribute('data-index', i);
        button.classList.add('board-button');
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

startGameElement.addEventListener('click', function(event) {
    event.preventDefault();
    startGame();
}) 

function gameOver(winner) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalMessage = document.getElementById('modal-message');
    // Set the game state and message based on the winner
    if (winner === 'X') {
        player1Score++;
        modalMessage.textContent = `${player1Name} wins!`;
    } else if (winner === 'O') {
        player2Score++;
        modalMessage.textContent = `${player2Name} wins!`;
    } else {
        modalMessage.textContent = 'It\'s a tie!';
    }
    // Show the modal
    modalOverlay.style.display = 'flex';
    score1Element.textContent = `${player1Name}'s score: ${player1Score}`;
    score2Element.textContent = `${player2Name}'s score: ${player2Score}`;
}
function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.style.display = 'none';
    initializeBoard();
    gameActive = true; // Optionally reset game state
}