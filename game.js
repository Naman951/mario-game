const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let gameRunning = true;
let gameOver = false;
let score = 0;
let coins = 0;
let lives = 3;

// Player object
const player = {
    x: 50,
    y: 250,
    width: 20,
    height: 30,
    velocityY: 0,
    velocityX: 0,
    jumping: false,
    speed: 5,
    jumpPower: 15,
    color: '#ff0000'
};

// Physics
const gravity = 0.6;
const friction = 0.8;
const groundLevel = 310;

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === ' ') {
        e.preventDefault();
        jump();
    }
    if (e.key.toLowerCase() === 'r') {
        resetGame();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Jump function
function jump() {
    if (!player.jumping && player.y >= groundLevel) {
        player.velocityY = -player.jumpPower;
        player.jumping = true;
    }
}

// Platform class
class Platform {
    constructor(x, y, width, height, color = '#8B4513') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // Draw outline
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    collidesWith(obj) {
        return obj.x < this.x + this.width &&
               obj.x + obj.width > this.x &&
               obj.y + obj.height >= this.y &&
               obj.y + obj.height <= this.y + this.height + 10 &&
               obj.velocityY >= 0;
    }
}

// Coin class
class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 6;
        this.collected = false;
    }

    draw() {
        if (!this.collected) {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#FFA500';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    collidesWith(obj) {
        const distance = Math.sqrt(
            (obj.x + obj.width / 2 - this.x) ** 2 +
            (obj.y + obj.height / 2 - this.y) ** 2
        );
        return distance < obj.width / 2 + this.radius;
    }
}

// Enemy class
class Enemy {
    constructor(x, y, width = 25, height = 25) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = 2;
        this.minX = x - 100;
        this.maxX = x + 100;
    }

    update() {
        this.x += this.velocityX;
        if (this.x <= this.minX || this.x >= this.maxX) {
            this.velocityX *= -1;
        }
    }

    draw() {
        // Draw enemy (turtle-like)
        ctx.fillStyle = '#228B22';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 5, this.y + 5, 5, 5);
        ctx.fillRect(this.x + 15, this.y + 5, 5, 5);
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    collidesWith(obj) {
        return obj.x < this.x + this.width &&
               obj.x + obj.width > this.x &&
               obj.y < this.y + this.height &&
               obj.y + obj.height > this.y;
    }
}

// Create platforms
const platforms = [
    new Platform(0, 350, 800, 50), // Ground
    new Platform(150, 280, 150, 20),
    new Platform(400, 250, 150, 20),
    new Platform(650, 200, 150, 20),
    new Platform(300, 150, 150, 20)
];

// Create coins
const coins_array = [
    new Coin(220, 250),
    new Coin(470, 220),
    new Coin(720, 170),
    new Coin(370, 120),
    new Coin(500, 300),
    new Coin(100, 320)
];

// Create enemies
const enemies = [
    new Enemy(400, 270),
    new Enemy(650, 180),
    new Enemy(200, 300)
];

// Update game state
function update() {
    if (gameOver) return;

    // Horizontal movement
    player.velocityX = 0;
    if (keys['arrowleft'] || keys['a']) {
        player.velocityX = -player.speed;
    }
    if (keys['arrowright'] || keys['d']) {
        player.velocityX = player.speed;
    }

    player.x += player.velocityX;

    // Wrap around screen
    if (player.x < 0) player.x = canvas.width;
    if (player.x > canvas.width) player.x = 0;

    // Apply gravity
    player.velocityY += gravity;
    player.y += player.velocityY;

    // Ground collision
    let onPlatform = false;
    for (let platform of platforms) {
        if (platform.collidesWith(player)) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.jumping = false;
            onPlatform = true;
        }
    }

    // Check if fell off world
    if (player.y > canvas.height) {
        lives--;
        document.getElementById('lives').textContent = lives;
        if (lives <= 0) {
            gameOver = true;
        } else {
            resetPlayerPosition();
        }
    }

    // Coin collection
    for (let coin of coins_array) {
        if (!coin.collected && coin.collidesWith(player)) {
            coin.collected = true;
            coins++;
            score += 10;
            document.getElementById('coins').textContent = coins;
            document.getElementById('score').textContent = score;
        }
    }

    // Enemy updates and collisions
    for (let enemy of enemies) {
        enemy.update();
        if (enemy.collidesWith(player)) {
            if (player.velocityY > 0 && player.y < enemy.y) {
                // Jumped on enemy
                enemy.x = -100; // Remove enemy
                score += 50;
                document.getElementById('score').textContent = score;
            } else {
                // Hit by enemy
                lives--;
                document.getElementById('lives').textContent = lives;
                if (lives <= 0) {
                    gameOver = true;
                } else {
                    resetPlayerPosition();
                }
            }
        }
    }
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, 250);
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, 250, canvas.width, canvas.height - 250);

    // Draw platforms
    for (let platform of platforms) {
        platform.draw();
    }

    // Draw coins
    for (let coin of coins_array) {
        coin.draw();
    }

    // Draw enemies
    for (let enemy of enemies) {
        enemy.draw();
    }

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Draw face
    ctx.fillStyle = '#000000';
    ctx.fillRect(player.x + 5, player.y + 8, 3, 3);
    ctx.fillRect(player.x + 12, player.y + 8, 3, 3);

    // Game over message
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = '20px Arial';
        ctx.fillText('Final Score: ' + score, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 60);
    }
}

// Reset player position
function resetPlayerPosition() {
    player.x = 50;
    player.y = 250;
    player.velocityY = 0;
    player.velocityX = 0;
}

// Reset game
function resetGame() {
    score = 0;
    coins = 0;
    lives = 3;
    gameOver = false;
    resetPlayerPosition();
    document.getElementById('score').textContent = score;
    document.getElementById('coins').textContent = coins;
    document.getElementById('lives').textContent = lives;

    // Reset coins
    for (let coin of coins_array) {
        coin.collected = false;
    }

    // Reset enemies
    enemies.length = 0;
    enemies.push(
        new Enemy(400, 270),
        new Enemy(650, 180),
        new Enemy(200, 300)
    );
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();