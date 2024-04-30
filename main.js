let currentPlayer = 'X'; // Starting with X

const squares = document.querySelectorAll('.row > div'); // selector all returns a node list
const currentPlayerDisplay = document.querySelector('.display_player'); // currentPlayerDisplay reflects the who's turn it is
// const newGameButton = document.querySelector('.new_game');
const resetButton = document.querySelector('.reset');
const newGameButton = document.querySelector('.new_game');
let xScore = 0; // #FIXME ill handle this later when i develop winning logic
let OScore = 0;
let xArr = [];
let OArr = [];

document.getElementById('x-score').textContent = 0;
document.getElementById('o-score').textContent = 0;


// for each square, add an event listener to handle the click
squares.forEach(square => { // event listerners are used for each square to watch for clicks
    square.addEventListener('click', handleSquareClick);
}); // for each square, add an event listener to handle the click
// newGameButton.addEventListener('click', startNewGame); // event listener for the new game button
resetButton.addEventListener('click', resetBoard)

newGameButton.addEventListener('click', newGame);

currentPlayerDisplay.innerText = 'X';


function resetBoard() {
    console.log("Resetting board..."); // for debig

    squares.forEach(square => {
        const squareSpan = square.querySelector('.xo');
        square.style.backgroundColor = '';
        if (squareSpan) {
            squareSpan.innerText = ''; // clears the text
        } else {
            console.log("Failed to find .xo in square:", square);
        }
    });
    xScore = 0;
    OScore = 0;
    xArr = [];
    OArr = [];
    currentPlayer = 'X';
    currentPlayerDisplay.innerText = currentPlayer;
    document.getElementById('x-score').textContent = 0;
    document.getElementById('o-score').textContent = 0;
}



function handleSquareClick(event) {
    const squareSpan = event.target.querySelector('.xo');
    const square = event.target;
    square.style.backgroundColor = 'orange';
    if (squareSpan.innerText !== '' || currentPlayer !== 'X') return; // Only act on empty squares and if it's human's turn

    makeMove(squareSpan, 'X'); // Human player is always 'X'
    checkGameState(); // Check if the game is over immediately after the move

    // If no win or draw, AI makes a move
    if (currentPlayer === 'O') {
        aiMove();
    }
}




// function checks if a player has won the game by comparing their moves to the winning combinations.
// It takes two parameters: 'player' represents the current player ('X' or 'O'), and 'playerMoves' represents an array of the player's moves.
function winCheck(player, playerMoves) {
    // An array of arrays representing the winning combinations.
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // rows
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    // check if winCombos.some returns true by finding if it contains any of the combinations in winCombos and if every index in the playerMoves lines up with the combox
    return winCombos.some(combination =>
        combination.every(index => playerMoves.includes(index))
    );
}

function updateScore(player) {
    console.log("Updating score for player:", player); 
    if (player === 'X') {
        xScore++;
        document.getElementById('x-score').textContent = xScore;
    } else if (player === 'O') {
        OScore++;
        document.getElementById('o-score').textContent = OScore;
    }
    console.log("Scores X:", xScore, "O:", OScore); // Verify scores are incremented
}

function newGame() {
    console.log("Starting a new game..."); // for debug
    
    squares.forEach(square => {
        square.style.backgroundColor = '';
        const squareSpan = square.querySelector('.xo');
        if (squareSpan) { // if the span is not null
            squareSpan.innerText = ''; // clears the text
        } else {
            console.log("Failed to find .xo in square:", square);
        }
    });
    xArr = [];
    OArr = [];
    currentPlayer = 'X'; // reset the current player to X
    currentPlayerDisplay.innerText = currentPlayer; // update the display to show the current player
}



function checkGameState() {
    const playerMoves = currentPlayer === 'X' ? xArr : OArr;
    if (winCheck(currentPlayer, playerMoves)) {
        updateScore(currentPlayer);
        setTimeout(() => {
            alert(`${currentPlayer} wins!!!!`);
            newGame();
        }, 100);  // Delay the alert and new game reset to allow UI to update
    } else if (xArr.length + OArr.length === 9) {
        setTimeout(() => {
            alert("It's a draw!");
            newGame();
        }, 100);
    } else {
        // Only switch players if no win or draw
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.innerText = currentPlayer;
}

function aiMove() {
    const emptySquares = Array.from(squares).filter(square => square.querySelector('.xo').innerText === '');
    if (emptySquares.length > 0) {
        const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        randomSquare.style.backgroundColor = 'orange';
        makeMove(randomSquare.querySelector('.xo'), 'O');
        checkGameState();
    }
}

function makeMove(squareSpan, player) {
    squareSpan.innerText = player;
    recordMove(player, Array.from(squares).indexOf(squareSpan.parentNode)); // this works by finding the index of the squareSpan's parent node in the squares array
}

function recordMove(player, index) {
    if (player === 'X') {
        xArr.push(index);
    } else {
        OArr.push(index);
    }
}





