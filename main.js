let currentPlayer = 'X'; // Starting with X

const squares = document.querySelectorAll('.row > div'); // selector all returns a node list
const currentPlayerDisplay = document.querySelector('.display_player'); // currentPlayerDisplay reflects the who's turn it is
// const newGameButton = document.querySelector('.new_game');
const resetButton = document.querySelector('.reset');
let xScore = 0; // #FIXME ill handle this later when i develop winning logic
let OScore = 0;
let xArr = [];
let OArr = [];


// for each square, add an event listener to handle the click
squares.forEach(square => { // event listerners are used for each square to watch for clicks
    square.addEventListener('click', handleSquareClick);
}); // for each square, add an event listener to handle the click
// newGameButton.addEventListener('click', startNewGame); // event listener for the new game button
resetButton.addEventListener('click', resetBoard)




function handleSquareClick(event) {
    console.log("Clicked:", event.target); // for debuging
    
    const squareSpan = event.target.querySelector('.xo'); // this gets the span inside the square div
// span will be changed to the current player's mark
    // if the square is already filled, do nothing
    if (squareSpan.innerText !== '') return; // inner text refers to the text inside the span

    // add the current player's mark to the square
    squareSpan.innerText = currentPlayer; // setting the inner text to the current player, starts off as X
    
    // for player moves array

    // convert the node list to an array and find the index of the clicked square
    const index = Array.from(squares).indexOf(event.target); // get the index of the square that was clicked
    // console.log(index);
    // Check for win or draw, etc.

    if (currentPlayer === 'X') { // tracks the moves for x
        xArr.push(index);
    }
    else {
        OArr.push(index); // same for O
    }


    console.log("Square index:", index); // Log the index of the clicked square
    console.log("Current Player's Moves:", currentPlayer === 'X' ? xArr : OArr); // Log the move arrays for debugging



        // Delay win check and alert
    setTimeout(() => {
        if (winCheck(currentPlayer, currentPlayer === 'X' ? xArr : OArr)) {
            alert(`${currentPlayer} wins!!!!`);
            updateScore(currentPlayer);
            resetBoard();
        } else if (xArr.length + OArr.length === 9) { // Check for a draw
            alert("It's a draw!");
            resetBoard();
        } else {
            // Switch players if no win or draw
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerDisplay.innerText = currentPlayer;
        }
    }, 10);  
}


function resetBoard() {
    console.log("Resetting board..."); // for debig

    squares.forEach(square => {
        const squareSpan = square.querySelector('.xo');
        if (squareSpan) {
            squareSpan.innerText = ''; // clears the text
        } else {
            console.log("Failed to find .xo in square:", square);
        }
    });

    xArr = [];
    OArr = [];
    currentPlayer = 'X';
    currentPlayerDisplay.innerText = currentPlayer;
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







