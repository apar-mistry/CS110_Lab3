document.addEventListener('DOMContentLoaded', () => {



    const squares = document.querySelectorAll('.row > div'); 

    const displayPlayer = document.querySelector('.display_player');

    const newGameButton = document.querySelector('.new_game');

    const resetButton = document.querySelector('.reset');
    let xScore = 0;
    let oScore = 0;
    let currentPlayer = 'X';

    displayPlayer.textContent = currentPlayer; // Initialize the display for the current player
    document.getElementById('xScoreDisplay').textContent = xScore;
    document.getElementById('oScoreDisplay').textContent = oScore;
    squares.forEach(square => {
        square.addEventListener('click', clickOutcome);
    });

    newGameButton.addEventListener('click', newGame);
    resetButton.addEventListener('click', resetBoard);

    function clickOutcome(e) {
        const square = e.target;
        const xo = square.querySelector('.xo'); // Target the span inside the div
        if (xo.textContent === '') {
            xo.textContent = currentPlayer;
            if (checkWin()) {
                alert(`Player ${currentPlayer} Wins!`);
                if(currentPlayer === 'X')xScore+=1;
                else oScore+=1;
                resetBoard();
            } else if (isDraw()) {
                alert("It's a draw!");
                resetBoard();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                displayPlayer.textContent = currentPlayer;
            }
        }
    }

    function checkWin() {
        const combos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return combos.some(combination => {
            const comboWin = squares[combination[0]].querySelector('.xo').textContent === currentPlayer &&
                             squares[combination[1]].querySelector('.xo').textContent === currentPlayer &&
                             squares[combination[2]].querySelector('.xo').textContent === currentPlayer;
            return comboWin;
        });
    }

    function isDraw() {
        return [...squares].every(square => square.querySelector('.xo').textContent !== '');
    }

    function newGame() {
        squares.forEach(square => square.querySelector('.xo').textContent = '');
        currentPlayer = 'X';
        displayPlayer.textContent = currentPlayer;
    }

    function resetBoard() {
        squares.forEach(square => square.querySelector('.xo').textContent = '');
        currentPlayer = 'X';
        displayPlayer.textContent = currentPlayer;
        document.getElementById('xScoreDisplay').textContent = xScore;
        document.getElementById('oScoreDisplay').textContent = oScore;
    }
});
