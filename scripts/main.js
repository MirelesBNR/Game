// This file contains the main JavaScript logic for the game portal, handling game selection and window management.

document.getElementById('snakeGameBtn').addEventListener('click', function() {
    loadGame('snake');
});

document.getElementById('dinoGameBtn').addEventListener('click', function() {
    loadGame('dino');
});

document.getElementById('mazeGameBtn').addEventListener('click', function() {
    loadGame('maze');
});

function loadGame(game) {
    const gameWindow = document.getElementById('gameWindow');
    gameWindow.style.display = 'block';
    gameWindow.innerHTML = ''; // Clear previous game

    // Remove any previously added script elements
    const oldScript = document.getElementById('gameScript');
    if (oldScript) {
        oldScript.remove();
    }

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'gameScript';

    switch(game) {
        case 'snake':
            script.src = 'scripts/snake.js';
            break;
        case 'dino':
            script.src = 'scripts/dino.js';
            break;
        case 'maze':
            script.src = 'scripts/maze.js';
            break;
    }

    gameWindow.appendChild(script);
}