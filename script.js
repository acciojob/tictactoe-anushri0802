const submitButton = document.getElementById('submit');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const messageDiv = document.querySelector('.message');
const boardDiv = document.querySelector('.board');
const cells = document.querySelectorAll('.cell'); // Select all grid cells
let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';

submitButton.addEventListener('click', () => {
    player1Name = player1Input.value;
    player2Name = player2Input.value;
    if (player1Name && player2Name) {
        boardDiv.style.display = 'grid';
        
        // 🎨 Change only the grid cells' background to baby pink
        cells.forEach(cell => {
            cell.style.backgroundColor = '#FFC0CB';
        });

        messageDiv.textContent = `${player1Name}, you're up`;
    }
});

boardDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('cell') && event.target.textContent === '') {
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            messageDiv.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}, congratulations you won!`;
            boardDiv.style.pointerEvents = 'none';
            highlightWinningRow(); // Call function to highlight the winning row
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageDiv.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}, you're up`;
        }
    }
});

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        if (pattern.every(index => cells[index].textContent === currentPlayer)) {
            pattern.forEach(index => {
                cells[index].style.backgroundColor = 'purple'; // 🎨 Winning row turns purple
                cells[index].style.color = 'white'; // Change text color for visibility
            });
            return true;
        }
        return false;
    });
}
