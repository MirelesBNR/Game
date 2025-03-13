// This file implements the Google Chrome offline dinosaur game featuring a cat. 
// It includes functions for starting, pausing, and managing level progression, 
// as well as handling obstacles like rocks and bushes.

let canvas, ctx;
let dino;
let obstacles = [];
let score = 0;
let gameInterval;
let isPaused = false;
let level = 1;

function init() {
    const gameWindow = document.getElementById('gameWindow');
    gameWindow.innerHTML = '<canvas id="dinoCanvas" width="800" height="200"></canvas><div id="score">Score: 0</div>';
    canvas = document.getElementById('dinoCanvas');
    ctx = canvas.getContext('2d');
    dino = new Dino();
    obstacles = [];
    score = 0;
    level = 1;
    document.getElementById('score').innerText = `Score: ${score}`;
    startGame();
}

function startGame() {
    gameInterval = setInterval(updateGameArea, 20);
    generateObstacles();
}

function updateGameArea() {
    if (!isPaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dino.update();
        updateObstacles();
        checkCollisions();
        document.getElementById('score').innerText = `Score: ${score}`;
    }
}

function pauseGame() {
    isPaused = true;
    clearInterval(gameInterval);
}

function resumeGame() {
    isPaused = false;
    startGame();
}

function restartGame() {
    pauseGame();
    init();
}

function generateObstacles() {
    if (Math.random() < 0.05) {
        const obstacleType = Math.random() < 0.5 ? 'rock' : 'bush';
        obstacles.push(new Obstacle(obstacleType));
    }
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
        if (obstacles[i].x < 0) {
            obstacles.splice(i, 1);
            score++;
            if (score % 5 === 0) {
                level++;
                // Increase difficulty or speed here if needed
            }
        }
    }
}

function checkCollisions() {
    for (let obstacle of obstacles) {
        if (dino.collidesWith(obstacle)) {
            alert('Game Over! Your score: ' + score);
            restartGame();
        }
    }
}

class Dino {
    constructor() {
        this.x = 50;
        this.y = canvas.height - 60;
        this.width = 40;
        this.height = 40;
        this.jumpHeight = 60;
        this.isJumping = false;
        this.jumpSpeed = 0;
    }

    update() {
        if (this.isJumping) {
            this.y -= this.jumpSpeed;
            this.jumpSpeed -= 1;
            if (this.y >= canvas.height - 60) {
                this.y = canvas.height - 60;
                this.isJumping = false;
                this.jumpSpeed = 0;
            }
        }
        ctx.fillStyle = 'green'; // Dino color
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpSpeed = 15;
        }
    }

    collidesWith(obstacle) {
        return this.x < obstacle.x + obstacle.width &&
               this.x + this.width > obstacle.x &&
               this.y < obstacle.y + obstacle.height &&
               this.y + this.height > obstacle.y;
    }
}

class Obstacle {
    constructor(type) {
        this.x = canvas.width;
        this.y = canvas.height - 60;
        this.width = type === 'rock' ? 20 : 30;
        this.height = type === 'rock' ? 20 : 40;
        this.speed = 5;
        this.color = type === 'rock' ? 'gray' : 'brown';
    }

    update() {
        this.x -= this.speed;
        ctx.fillStyle = this.color; // Obstacle color
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Event listeners for game controls
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            dino.jump();
            break;
        case ' ':
            if (isPaused) {
                resumeGame();
            } else {
                pauseGame();
            }
            break;
    }
});

// Initialize the game when the script is loaded
init();