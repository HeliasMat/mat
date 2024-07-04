let currentPlayer = "X";
let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

function makeMove(cell) {
    const cells = Array.prototype.slice.call(cell.parentElement.children);
    const index = cells.indexOf(cell);
    const rowIndex = Math.floor(index / 3);
    const colIndex = index % 3;
    if (gameBoard[rowIndex][colIndex] !== "") {
        return;
    }
    gameBoard[rowIndex][colIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin(gameBoard, currentPlayer)) {
        alert(`Player ${currentPlayer} wins!`);
        location.reload();
    } else if (checkDraw(gameBoard)) {
        alert("It's a draw!");
        location.reload();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        aiMove();
    }
    
}

function aiMove() {
    let availableMoves = [];

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (gameBoard[row][col] === "") {
                availableMoves.push({ row, col });
            }
        }
    }

    if (availableMoves.length === 0) {
        return;
    }

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    gameBoard[randomMove.row][randomMove.col] = currentPlayer;
    const cellIndex = randomMove.row * 3 + randomMove.col;
    const cell = document.getElementById("game").children[cellIndex];
    cell.textContent = currentPlayer;

    if (checkWin(gameBoard, currentPlayer)) {
        alert(`Player ${currentPlayer} wins!`);
        location.reload();
    } else if (checkDraw(gameBoard)) {
        alert("It's a draw!");
        location.reload();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}


function checkWin(board, player) {
    const winConditions = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const condition of winConditions) {
        if (
            board[condition[0][0]][condition[0][1]] === player &&
            board[condition[1][0]][condition[1][1]] === player &&
            board[condition[2][0]][condition[2][1]] === player
        ) {
            return true;
        }
    }
    return false;
}

function checkDraw(board) {
    return board.every(row => row.every(cell => cell !== ""));
}
