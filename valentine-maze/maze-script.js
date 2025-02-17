document.addEventListener('DOMContentLoaded', () => {
    const startMenu = document.getElementById('start-menu');
    const gameContainer = document.getElementById('game-container');
    const gameOverScreen = document.getElementById('game-over');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const maze = document.querySelector('#maze');
    const successEndZone = document.querySelector('.end-zone.success');
    const failureEndZone = document.querySelector('.end-zone.failure');
    const player = document.querySelector('.player');
    
    let isGameOver = false;

    // Start game
    startButton.addEventListener('click', () => {
        startMenu.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        resetGame();
    });

    // Restart game
    restartButton.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        resetGame();
    });

    // Reset game state
    function resetGame() {
        isGameOver = false;
        resetPlayerPosition();
    }

    // Reset player position to the center
    function resetPlayerPosition() {
        player.style.left = '50%';
        player.style.top = '50%';
        maze.appendChild(player);
        maze.appendChild(successEndZone);
        maze.appendChild(failureEndZone);
    }

    // Update player position with minimal delay
    function updatePlayerPosition(e) {
        if (isGameOver) return;

        const rect = maze.getBoundingClientRect();
        const x = e.clientX - rect.left - 10;
        const y = e.clientY - rect.top - 10;

        player.style.left = x + 'px';
        player.style.top = y + 'px';

        checkEndZones();
    }

    // Use requestAnimationFrame for smooth updates
    maze.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => updatePlayerPosition(e));
    });

    // Check if player reaches an end zone
    function checkEndZones() {
        const playerRect = player.getBoundingClientRect();

        // Check success end zone
        const successRect = successEndZone.getBoundingClientRect();
        if (!(playerRect.right < successRect.left ||
              playerRect.left > successRect.right ||
              playerRect.bottom < successRect.top ||
              playerRect.top > successRect.bottom)) {
            // Success condition met
            window.location.href = '../valentine-success.html';
            isGameOver = true;
        }

        // Check failure end zone
        const failureRect = failureEndZone.getBoundingClientRect();
        if (!(playerRect.right < failureRect.left ||
              playerRect.left > failureRect.right ||
              playerRect.bottom < failureRect.top ||
              playerRect.top > failureRect.bottom)) {
            // Failure condition met
            window.location.href = './images/failure.gif';
            isGameOver = true;
        }
    }
});