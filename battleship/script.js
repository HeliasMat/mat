// Define constants for board size and ship length
const boardSize = 10;
const shipLength = 5;

// Define player and computer boards as 2D arrays
const playerBoard = createBoard();
const computerBoard = createBoard();

// Define game state
let isGameOver = false;

// Function to create an empty game board
function createBoard() {
    const board = [];
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push(null); // Initialize cells as empty
        }
        board.push(row);
    }
    return board;
}

// Function to place a ship on the board
function placeShip(board, row, col, direction) {
    if (direction === 'horizontal') {
        for (let i = 0; i < shipLength; i++) {
            board[row][col + i] = 'ship';
        }
    } else {
        for (let i = 0; i < shipLength; i++) {
            board[row + i][col] = 'ship';
        }
    }
}

// Function to handle player's turn
function playerTurn(row, col) {
    if (computerBoard[row][col] === 'ship') {
        computerBoard[row][col] = 'hit';
        document.getElementById(`computer-board-cell-${row}-${col}`).classList.add('hit');
        return true; // Player hit a ship
    } else {
        computerBoard[row][col] = 'miss';
        document.getElementById(`computer-board-cell-${row}-${col}`).classList.add('miss');
        return false; // Player missed
    }
}

// Function to handle computer's turn
function computerTurn() {
    const randomRow = Math.floor(Math.random() * boardSize);
    const randomCol = Math.floor(Math.random() * boardSize);

    if (playerBoard[randomRow][randomCol] === 'ship') {
        playerBoard[randomRow][randomCol] = 'hit';
        document.getElementById(`player-board-cell-${randomRow}-${randomCol}`).classList.add('hit');
        return true; // Computer hit a ship
    } else {
        playerBoard[randomRow][randomCol] = 'miss';
        document.getElementById(`player-board-cell-${randomRow}-${randomCol}`).classList.add('miss');
        return false; // Computer missed
    }
}

// Function to check for a winning condition
function checkWin(board) {
    let shipCount = 0;
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 'ship') {
                shipCount++;
            }
        }
    }
    return shipCount === 0; // If all ships are sunk, the game is won
}

// Event listener for player's moves
document.getElementById("computer-board").addEventListener("click", (e) => {
    if (!isGameOver && e.target.tagName === 'DIV') {
        const [row, col] = e.target.id.split('-').slice(3).map(Number);
        if (!isNaN(row) && !isNaN(col)) {
            const playerHit = playerTurn(row, col);
            if (playerHit) {
                // Check if player won
                if (checkWin(computerBoard)) {
                    document.getElementById("message").textContent = "Congratulations! You won!";
                    isGameOver = true;
                }
            } else {
                // Computer's turn after a player miss
                const computerHit = computerTurn();
                // Check if computer won
                if (checkWin(playerBoard)) {
                    document.getElementById("message").textContent = "Computer won! Try again.";
                    isGameOver = true;
                }
            }
        }
    }
});

// Event listener for starting the game
document.getElementById("start-button").addEventListener("click", () => {
    if (!isGameOver) {
        alert("Game is already in progress.");
        return;
    }

    // Reset game state
    isGameOver = false;
    playerBoard.forEach((row) => row.fill(null));
    computerBoard.forEach((row) => row.fill(null));
    document.querySelectorAll('.board div').forEach((cell) => {
        cell.classList.remove('hit', 'miss');
    });
    document.getElementById("message").textContent = "";

    // Place player's ships (you can implement a UI for this)
    placeShip(playerBoard, 0, 0, 'horizontal');
    placeShip(playerBoard, 1, 1, 'horizontal');
    placeShip(playerBoard, 2, 2, 'horizontal');
    placeShip(playerBoard, 3, 3, 'horizontal');
    placeShip(playerBoard, 4, 4, 'horizontal');

    // Place computer's ships (you can implement AI for this)
    placeShip(computerBoard, 0, 0, 'vertical');
    placeShip(computerBoard, 1, 1, 'vertical');
    placeShip(computerBoard, 2, 2, 'vertical');
    placeShip(computerBoard, 3, 3, 'vertical');
    placeShip(computerBoard, 4, 4, 'vertical');
});
