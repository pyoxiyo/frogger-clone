'use strict';
const ENEMY_X = -100;
const ENEMY_Y = [220, 140, 60];
const ENEMY_SP = [160, 240, 320];
const ENEMY_IMG = 'images/enemy-bug.png';
const PLAYER_X = 200;
const PLAYER_Y = 380;
const PLAYER_IMG = 'images/char-boy.png';
const VICTORY_MSG = ["GG", "YOU WIN", "you made it to the water!"];
const DEATH_MSG = ["oh no...", "YOU DIED", "WASTED"];

// The Enemy class and Player class inherit from this class
var Char = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

// Enemies our player must avoid
var Enemy = function() {
    Char.call(this, ENEMY_X, ENEMY_Y, ENEMY_IMG)
    // // The Enemies spawn randomly in one of the 3 stone roads
    this.y = ENEMY_Y[Math.floor(Math.random() * 3)];
    // Gave the enemies multiple speeds
    this.speed = ENEMY_SP[Math.floor(Math.random() * 3)];
};


Enemy.prototype.update = function(dt) {
    // Makes the enemies move
    this.x = this.x + (this.speed * dt);
    // this if statement's job is to deal with enemies when they move off the edge
    if (this.x > 505) {
        this.x = ENEMY_X;
        this.speed = ENEMY_SP[Math.floor(Math.random() * 3)];
        // Enemies will go down a row, unless they are in the lowest row,
        //  then the enemy posistion will be randomized
        this.y = this.y + 80;
        if (this.y > 220) {
            this.y = ENEMY_Y[Math.floor(Math.random() * 3)];
        }
    }
    

};

// Handles collision between player and enemy,
Enemy.prototype.checkCollisions = function() {
    // if the player is only 80 units or less away from the enemy,
    // the game will reset and it count's as a loss.
    if (player.x > this.x - 80 && player.x < this.x + 80 && player.y > this.y - 80 && player.y < this.y + 80) {
        player.reset();
        alert(DEATH_MSG[Math.floor(Math.random() * 3)]);
    }
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// The player Class
var Player = function(){
    Char.call(this, PLAYER_X, PLAYER_Y, PLAYER_IMG);
};

// rendering the player character
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function()  {
    // Winning by reaching the water
    if (this.y < 50) {
        this.reset();
        alert(VICTORY_MSG[Math.floor(Math.random() * 3)]);
    }
    // Losing by colliding with the enemy
    for(var i = 0, len = allEnemies.length; i < len; i++) {
        if (this.x > allEnemies[i].x - 80 && this.x < allEnemies[i].x + 80 && this.y > allEnemies[i].y - 80 && this.y < allEnemies[i].y + 80) {
            this.reset();
            alert(DEATH_MSG[Math.floor(Math.random() * 3)]);
        }
    }
};
// Reset the player position
Player.prototype.reset = function() {
    this.x = PLAYER_X;
    this.y = PLAYER_Y;
}

// Controls
Player.prototype.handleInput = function(key) {
    this.keyprs = key;
    if (this.keyprs === 'up') {
        this.y = this.y - 80;
    }
    if (this.keyprs === 'down' && this.y < PLAYER_Y ) {
        this.y = this.y + 80;
    }
    if (this.keyprs === 'left' && this.x !== 0) {
        this.x = this.x - 100;
    }
    if (this.keyprs === 'right' && this.x != 400) {
        this.x = this.x + 100;
    }
};


// Now instantiate your objects.

// all enemy objects are in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy()];

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
