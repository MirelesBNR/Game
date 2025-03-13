// This file implements the maze game similar to Pac-Man. It includes functions for navigating through the maze, managing levels, and controlling the green dot.

let canvas, ctx;
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

let player = {
    x: 1,
    y: 1,
    color: 'green'
};

let level = 1;
let score = 0;
let isPaused = false;

function init() {
    const gameWindow = document.getElementById('gameWindow');
    gameWindow.innerHTML = '<canvas id="mazeCanvas" width="400" height="400"></canvas>';
    canvas = document.getElementById('mazeCanvas');
    ctx = canvas.getContext('2d');
    drawMaze();
}

function drawMaze() {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            ctx.fillStyle = maze[row][col] === 1 ? 'black' : 'white';
            ctx.fillRect(col * 50, row * 50, 50, 50);
        }
    }
    drawPlayer();
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x * 50 + 10, player.y * 50 + 10, 30, 30);
}

function movePlayer(dx, dy) {
    if (!isPaused) {
        const newX = player.x + dx;
        const newY = player.y + dy;
        if (maze[newY][newX] === 0) {
            player.x = newX;
            player.y = newY;
            score++;
            checkLevelUp();
            drawMaze();
        }
    }
}

function checkLevelUp() {
    if (score >= 10) {
        level++;
        score = 0;
        alert(`Level Up! Welcome to Level ${level}`);
        resetPlayer();
    }
}

function resetPlayer() {
    player.x = 1;
    player.y = 1;
    drawMaze();
}

function pauseGame() {
    isPaused = true;
}

function resumeGame() {
    isPaused = false;
}

function restartGame() {
    level = 1;
    score = 0;
    resetPlayer();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
        case 'p':
            pauseGame();
            break;
        case 'r':
            resumeGame();
            break;
        case 'R':
            restartGame();
            break;
    }
});

// Initialize the game when the script is loaded
init();