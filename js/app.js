var enemyX = -100;
var enemyY = [220, 140, 60];
var enemySP = [160, 240, 320];
var playerX = 200;
var playerY = 380;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = enemyX;
    this.y = enemyY[Math.floor(Math.random() * 3)];
    this.speed = enemySP[Math.floor(Math.random() * 3)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 505) {
        this.x = enemyX;
        this.speed = enemySP[Math.floor(Math.random() * 3)];
        this.y = this.y + 80;
        if (this.y > 220) {
            this.y = enemyY[Math.floor(Math.random() * 3)];
        }
    }
    // Handles collision between player and enemy
    if (player.x > this.x - 80 && player.x < this.x + 80 && player.y > this.y - 80 && player.y < this.y + 80) {
            player.x = playerX;
            player.y = playerY;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = playerX;
    this.y = playerY;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function()  {
    for(var i = 0; i < allEnemies.length; i++) {
        if (this.x > allEnemies[i].x - 80 && this.x < allEnemies[i].x + 80 && this.y > allEnemies[i].y - 80 && this.y < allEnemies[i].y + 80) {
            this.x = playerX;
            this.y = playerY;       
    }
    }
};

Player.prototype.handleInput = function(key) {
    this.keyprs = key;
    if (this.keyprs === 'up') {
        this.y = this.y - 80;
    }
    if (this.keyprs === 'down' && this.y < playerY ) {
        this.y = this.y + 80;
    }
    if (this.keyprs === 'left' && this.x !== 0) {
        this.x = this.x - 100;
    }
    if (this.keyprs === 'right' && this.x != 400) {
        this.x = this.x + 100;
    }

    if (this.y < 50) {
        this.x = playerX;
        this.y = playerY;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var allEnemies = [enemy1, enemy2];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
