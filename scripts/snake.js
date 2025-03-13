// This file implements the classic Snake game with pause/resume and restart options, level progression, and score display.

let canvas, ctx;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = {};
let score = 0;
let level = 1;
let gameInterval;
let isPaused = false;

function initializeGame() {
    const gameWindow = document.getElementById('gameWindow');
    gameWindow.innerHTML = '<canvas id="snakeCanvas" width="400" height="400"></canvas>';
    canvas = document.getElementById('snakeCanvas');
    ctx = canvas.getContext('2d');
    startGame();
}

function startGame() {
    resetGame();
    gameInterval = setInterval(gameLoop, 100);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    level = 1;
    spawnFood();
    draw();
}

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * canvas.width / 10) * 10,
        y: Math.floor(Math.random() * canvas.height / 10) * 10
    };
}

function gameLoop() {
    if (!isPaused) {
        moveSnake();
        checkCollision();
        draw();
    }
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        spawnFood();
        if (score % 50 === 0) {
            level++;
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, 100 - (level * 10)); // Increase speed with level
        }
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 20);
    ctx.fillText('Level: ' + level, 10, 40);
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

function pauseGame() {
    isPaused = true;
}

function resumeGame() {
    isPaused = false;
}

document.addEventListener('keydown', changeDirection);

// Initialize the game when the script is loaded
initializeGame();