const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const player1SendBtn = document.getElementById('player1-send');
const player2SendBtn = document.getElementById('player2-send');
const player1WithdrawBtn = document.getElementById('player1-withdraw');
const player2WithdrawBtn = document.getElementById('player2-withdraw');
let currentPlayer = 'X';
let gameActive = false;
let gameStarted = false;
let player1AmountSent = false;
let player2AmountSent = false;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    if (!gameActive) return;

    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkForWinner();
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        enableWithdrawForWinner(currentPlayer);
        return;
    }

    let roundDraw = !gameState.includes('');

    if (roundDraw) {
        statusText.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function startGame() {
    if (!player1AmountSent || !player2AmountSent) {
        alert("Both players must send their funds to start the game.");
        return;
    }

    gameStarted = true;
    gameActive = true;
    startBtn.disabled = true; // Disable the start button
    document.querySelector('.board').style.pointerEvents = 'auto'; // Enable board interaction
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    // Disable send and withdraw buttons
    player1SendBtn.disabled = true;
    player2SendBtn.disabled = true;
    player1WithdrawBtn.disabled = true;
    player2WithdrawBtn.disabled = true;
}

// Function to enable the withdraw button for the winner
function enableWithdrawForWinner(winner) {
    if (winner === 'X') {
        player1WithdrawBtn.disabled = false;
    } else {
        player2WithdrawBtn.disabled = false;
    }
}

function handleSend(player) {
    const amount = document.getElementById(`${player}-amount`).value;
    if (amount) {
        alert(`${player} is sending ${amount}`);
        if (player === 'player1') {
            player1AmountSent = true;
        } else if (player === 'player2') {
            player2AmountSent = true;
        }

        // Check if both players have sent their amounts to enable the start button
        if (player1AmountSent && player2AmountSent) {
            startBtn.disabled = false;
        }
    } else {
        alert(`Please enter an amount for ${player}`);
    }
}

function handleWithdraw(player) {
    alert(`${player} is withdrawing`);
    // Implement logic to withdraw the amount
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
startBtn.addEventListener('click', startGame);

player1SendBtn.addEventListener('click', () => handleSend('player1'));
player2SendBtn.addEventListener('click', () => handleSend('player2'));
player1WithdrawBtn.addEventListener('click', () => handleWithdraw('player1'));
player2WithdrawBtn.addEventListener('click', () => handleWithdraw('player2'));

statusText.textContent = "Both players must send their amounts to start the game.";
startBtn.disabled = true; // Disable the start button initially
document.querySelector('.board').style.pointerEvents = 'none'; // Disable board interaction initially
