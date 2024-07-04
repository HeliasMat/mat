let currentTurn = 'white';

const chessBoard = document.getElementById("chessBoard");

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const square = document.createElement("div");
    square.addEventListener("click", () => handleSquareClick(row, col));
    square.classList.add("square");

    if ((row + col) % 2 === 0) {
      square.classList.add("light");
    } else {
      square.classList.add("dark");
    }

    square.id = `square-${row}-${col}`;

    chessBoard.appendChild(square);
  }
}



const pieces = {
    PAWN: "♙",
    KNIGHT: "♘",
    BISHOP: "♗",
    ROOK: "♖",
    QUEEN: "♕",
    KING: "♔",
  };
  
const startingPositions = [
    "ROOK", "KNIGHT", "BISHOP", "QUEEN", "KING", "BISHOP", "KNIGHT", "ROOK",
];
  
// Créez les pièces pour la rangée des pions
const pawnRow = Array(8).fill("PAWN");

// Créez les rangées vides
const emptyRow = Array(8).fill(null);

const boardState = [
  startingPositions.map((piece) => ({
    color: "white",
    type: pieces[piece],
    hasMoved: piece === "KING" || piece === "ROOK" ? false : undefined,
  })),
  pawnRow.map(piece => ({ color: "white", type: pieces[piece] })),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  pawnRow.map(piece => ({ color: "black", type: pieces[piece] })),
  startingPositions.map((piece) => ({
    color: "black",
    type: pieces[piece],
    hasMoved: piece === "KING" || piece === "ROOK" ? false : undefined,
  })),
];


function renderPieces() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.getElementById(`square-${row}-${col}`);
      const piece = boardState[row][col];
      square.classList.remove("white", "black"); // Remove any color classes from the square
      if (piece) {
        square.classList.add(piece.color); // Add the color class to the square
        square.textContent = piece.type;
      } else {
        square.textContent = "";
        square.classList.remove("white", "black"); // Remove any color classes from the square
      }
    }
  }
}


let selectedSquare = null;
const capturedPiecesWhite = [];
const capturedPiecesBlack = [];

function handleSquareClick(row, col) {
  const clickedSquare = { row, col };
  const clickedPiece = boardState[row][col];

  if (selectedSquare) {
    // Vérifie si la case sélectionnée contient une pièce
    const selectedPiece = boardState[selectedSquare.row][selectedSquare.col];

    // Vérifiez si le mouvement est valide
    if (isValidMove(selectedPiece, selectedSquare, clickedSquare, simulatedBoard = boardState)) {
      // Check for check and checkmate
      if (isInCheck()) {
        if (hasLegalMoves()) {
          console.log('Check!');
        } else {
          console.log('Checkmate!');
          // End the game or perform any required actions
        }
      } else {
        if (!hasLegalMoves()) {
          console.log('Stalemate!');
          // End the game or perform any required actions
        }
      }
      if (selectedPiece.type === pieces.KING && Math.abs(clickedSquare.col - selectedSquare.col) === 2) {
        const direction = clickedSquare.col === 2 ? -1 : 1;
        const rookCol = clickedSquare.col === 2 ? 0 : 7;
        const newRookCol = selectedSquare.col + direction;
    
        // Move the rook
        boardState[selectedSquare.row][newRookCol] = boardState[selectedSquare.row][rookCol];
        boardState[selectedSquare.row][rookCol] = null;
      }
      // Met à jour la variable enPassant
      const movedPiece = boardState[selectedSquare.row][selectedSquare.col];
      if (movedPiece && movedPiece.type === pieces.PAWN && Math.abs(row - selectedSquare.row) === 2) {
          enPassant = { row: (row + selectedSquare.row) / 2, col };
      } else {
          enPassant = null;
      }

      // Perform en passant capture
      if (
        movedPiece &&
        movedPiece.type === pieces.PAWN &&
        enPassant &&
        clickedSquare.row === enPassant.row &&
        clickedSquare.col === enPassant.col
      ) {
        const capturedRow = selectedPiece.color === "white" ? enPassant.row - 1 : enPassant.row + 1;
        const capturedPiece = boardState[capturedRow][enPassant.col];
        if (capturedPiece.color === "white") {
          capturedPiecesBlack.push(capturedPiece);
        } else {
          capturedPiecesWhite.push(capturedPiece);
        }
        updateCapturedPieces();
        boardState[capturedRow][enPassant.col] = null; // Remove the captured pawn from the board
      }
      if (boardState[row][col]) {
        const capturedPiece = boardState[row][col];
        if (capturedPiece.color === 'white') {
            capturedPiecesBlack.push(capturedPiece);
        } else {
            capturedPiecesWhite.push(capturedPiece);
        }
        updateCapturedPieces();
      }
      // Perform the move
    boardState[selectedSquare.row][selectedSquare.col] = null;
    boardState[row][col] = selectedPiece;

    // Mark the king and rook as moved
    if (selectedPiece.type === pieces.KING || selectedPiece.type === pieces.ROOK) {
      selectedPiece.hasMoved = true;
    }
    // Met à jour l'affichage
    renderPieces();
    // Switch turns
    currentTurn = currentTurn === 'white' ? 'black' : 'white';
    updateCurrentTurnDisplay();
  }
  // Désélectionne la case
  selectedSquare = null;
  } else if (clickedPiece) {
    // Sélectionne la case
    selectedSquare = clickedSquare;
  }
}

function updateCapturedPieces() {
  const capturedPiecesWhiteDiv = document.getElementById('capturedPiecesWhite');
  const capturedPiecesBlackDiv = document.getElementById('capturedPiecesBlack');

  capturedPiecesWhiteDiv.innerHTML = capturedPiecesWhite.map(piece => piece.type).join(' ');
  capturedPiecesBlackDiv.innerHTML = capturedPiecesBlack.map(piece => piece.type).join(' ');
}
function updateCurrentTurnDisplay() {
  const currentTurnDisplay = document.getElementById("currentTurnDisplay");
  if(currentTurn === 'white'){
    currentTurnDisplay.textContent = `Tour du Maitre`;
  }
  if(currentTurn === 'black'){
    currentTurnDisplay.textContent = `Tour du joueur`;
  }
  currentTurnDisplay.style.color = currentTurn === 'white' ? '#333' : '#FFF';
  currentTurnDisplay.style.backgroundColor = currentTurn === 'white' ? '#f5f5f5' : '#333';
}



let enPassant = null;
function isValidMovePawn(piece, start, end) {
    const dx = Math.abs(end.col - start.col);
    const dy = end.row - start.row;
  
    // La direction du déplacement dépend de la couleur du pion
    const direction = piece.color === "white" ? 1 : -1;
  
    // Déplacement d'une case vers l'avant
    if (dx === 0 && dy === direction) {
      return !boardState[end.row][end.col]; // Vérifie si la case d'arrivée est vide
    }
  
    // Déplacement de deux cases vers l'avant depuis la position initiale
    if (
      dx === 0 &&
      dy === 2 * direction &&
      (start.row === 1 && piece.color === "white" || start.row === 6 && piece.color === "black")
    ) {
      return (
        !boardState[start.row + direction][start.col] && // Vérifie si la première case devant est vide
        !boardState[end.row][end.col] // Vérifie si la case d'arrivée est vide
      );
    }
  
    // Capture en diagonale
    if (
      dx === 1 &&
      dy === direction &&
      boardState[end.row][end.col] &&
      boardState[end.row][end.col].color !== piece.color
    ) {
      return true;
    }

    // Prise en passant
    if (
        dx === 1 &&
        dy === direction &&
        !boardState[end.row][end.col] &&
        enPassant &&
        enPassant.row === end.row &&
        enPassant.col === end.col
      ) {
        return true;
    }

    return false;
}
  

function isValidMoveKnight(piece, start, end) {
    const rowDiff = Math.abs(end.row - start.row);
    const colDiff = Math.abs(end.col - start.col);
  
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

function isValidMoveBishop(piece, start, end) {
    const rowDiff = Math.abs(end.row - start.row);
    const colDiff = Math.abs(end.col - start.col);
  
    if (rowDiff !== colDiff) {
      return false;
    }
  
    const rowDirection = end.row > start.row ? 1 : -1;
    const colDirection = end.col > start.col ? 1 : -1;
  
    for (let i = 1; i < rowDiff; i++) {
      const row = start.row + i * rowDirection;
      const col = start.col + i * colDirection;
  
      if (boardState[row][col] !== null) {
        return false;
      }
    }
  
    return true;
}

function isValidMoveRook(piece, start, end) {
    const rowDiff = Math.abs(end.row - start.row);
    const colDiff = Math.abs(end.col - start.col);
  
    if (!((rowDiff === 0 && colDiff !== 0) || (rowDiff !== 0 && colDiff === 0))) {
      return false;
    }
  
    const rowDirection = end.row > start.row ? 1 : -1;
    const colDirection = end.col > start.col ? 1 : -1;
    const steps = rowDiff === 0 ? colDiff : rowDiff;
  
    for (let i = 1; i < steps; i++) {
      const row = rowDiff === 0 ? start.row : start.row + i * rowDirection;
      const col = colDiff === 0 ? start.col : start.col + i * colDirection;
  
      if (boardState[row][col] !== null) {
        return false;
      }
    }
  
    return true;
}

function isValidMoveQueen(piece, start, end) {
    return isValidMoveBishop(piece, start, end) || isValidMoveRook(piece, start, end);
}

function isValidMoveKing(piece, start, end) {
  const rowDiff = Math.abs(end.row - start.row);
  const colDiff = Math.abs(end.col - start.col);

  // Check for regular king moves
  if (rowDiff > 1 || colDiff > 1) {
    // Check for castling
    if (rowDiff === 0 && colDiff === 2) {
      // Ensure the king has not moved
      if (piece.hasMoved) {
        return false;
      }

      // Check the rook's position and if it has moved
      const rookCol = end.col === 2 ? 0 : 7;
      const rook = boardState[start.row][rookCol];
      if (!rook || rook.type !== pieces.ROOK || rook.hasMoved) {
        return false;
      }

      // Check if the squares between the king and the rook are empty and not under attack
      const direction = end.col === 2 ? -1 : 1;
      for (let i = 1; i < Math.abs(rookCol - start.col); i++) {
        const col = start.col + i * direction;
        if (boardState[start.row][col] !== null || isSquareUnderAttack(start.row, col, piece.color)) {
          return false;
        }
      }

      // Castling is valid
      return true;
    }

    return false;
  }

  return true;
}


function isValidMove(piece, start, end) {
  if (piece.color !== currentTurn) return false;
  if (isMovePinning(piece, start, end)) return false;
  switch (piece.type) {
    case pieces.PAWN:
      return isValidMovePawn(piece, start, end);
    case pieces.KNIGHT:
      return isValidMoveKnight(piece, start, end);
    case pieces.BISHOP:
      return isValidMoveBishop(piece, start, end);
    case pieces.ROOK:
      return isValidMoveRook(piece, start, end);
    case pieces.QUEEN:
      return isValidMoveQueen(piece, start, end);
    case pieces.KING:
      return isValidMoveKing(piece, start, end);
    default:
      return false;
  }
}
  
function isSquareUnderAttack(row, col, friendlyColor) {
  const enemyColor = friendlyColor === 'white' ? 'black' : 'white';

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = boardState[row][col];

      if (piece && piece.color === enemyColor) {
        const start = { row: row, col: col };
        const end = { row, col };

        if (isValidMove(piece, start, end)) {
          return true;
        }
      }
    }
  }

  return false;
}

function isMovePinning(piece, start, end) {
  const friendlyColor = piece.color;
  const enemyColor = friendlyColor === "white" ? "black" : "white";
  const king = boardState.find(
    (row) => row.find((p) => p && p.type === pieces.KING && p.color === friendlyColor)
  );

  if (!king) {
    return false;
  }

  const simulatedBoard = JSON.parse(JSON.stringify(boardState));
  simulatedBoard[start.row][start.col] = null;
  simulatedBoard[end.row][end.col] = piece;

  return isSquareUnderAttack(king.row, king.col, friendlyColor, simulatedBoard);
}

function evaluateBoard(board, color) {
  const pieceValues = {
    [pieces.PAWN]: 10,
    [pieces.KNIGHT]: 30,
    [pieces.BISHOP]: 30,
    [pieces.ROOK]: 50,
    [pieces.QUEEN]: 90,
    [pieces.KING]: 900,
  };

  let score = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const value = pieceValues[piece.type] * (piece.color === color ? 1 : -1);
        score += value;
      }
    }
  }

  return score;
}
function isInCheck() {
  const king = findKing(currentTurn);
  return isSquareUnderAttack(king.row, king.col, currentTurn);
}
function findKing(color) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = boardState[row][col];
      if (piece && piece.type === pieces.KING && piece.color === color) {
        return { row, col };
      }
    }
  }
  return null;
}

function hasLegalMoves() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = boardState[row][col];
      if (piece && piece.color === currentTurn) {
        for (let newRow = 0; newRow < 8; newRow++) {
          for (let newCol = 0; newCol < 8; newCol++) {
            if (isValidMove(piece, { row, col }, { row: newRow, col: newCol })) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}






  
updateCurrentTurnDisplay();

renderPieces();
  