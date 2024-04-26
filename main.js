let currentPlayer = 'X'; // Starting with X

const squares = document.querySelectorAll('.row > div'); // selector all returns a node list
const currentPlayerDisplay = document.querySelector('.display_player'); // currentPlayerDisplay reflects the who's turn it is
// const newGameButton = document.querySelector('.new_game');
const resetButton = document.querySelector('.reset');


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
    // If the square is already filled, do nothing
    if (squareSpan.innerText !== '') return; // inner text refers to the text inside the span

    // Add the current player's mark to the square
    squareSpan.innerText = currentPlayer; // setting the inner text to the current player, starts off as X
    
    // Check for win or draw, etc.
    // ...

    // Switch the player                    condition ? value_if_true : value_if_false;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Set the currentPlayer variable to 'O' if currentPlayer is currently 'X'. If currentPlayer is not 'X', then set it to 'X'
    currentPlayerDisplay.innerText = currentPlayer;
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

    currentPlayer = 'X';
    currentPlayerDisplay.innerText = currentPlayer;
}







