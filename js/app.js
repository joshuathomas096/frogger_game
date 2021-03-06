// Enemies our player must avoid
var Enemy = function() {
    this.x = -10;
    var yValues = [60, 140, 220];
    this.y = yValues[Math.floor(Math.random()*3)];
    this.speed = Math.floor((Math.random() * 200) + 100);

    this.sprite = 'images/enemy-bug.png';
};

//use this to constantly check for collisions
Enemy.prototype.update = function(dt) {
    
    if (this.x <= 550) {
        this.x += this.speed * dt;
    }else{
        this.y = [60, 140, 220][Math.floor(Math.random()*3)];
        this.x = -10;
    }

    this.checkCollisions();
};

//draws enemy image
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//checks to see if there is a collision and if so returns the player back to original spot
Enemy.prototype.checkCollisions = function() {
    if (this.y >= 60 && this.y <= 220) {
        
        allEnemies.forEach(function(enemy) {
            if (enemy.y === player.y || enemy.y === player.y + 10 || enemy.y === player.y - 10) {
                if (enemy.x >= player.x - 30 && enemy.x <= player.x + 30) {
                    player.x = 200;
                    player.y = 410;
                };
            };
        });
    }
}

//new class player
var Player = function() {

    this.x = 200;
    this.y = 410;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt) {
    if (this.y < 50){
        this.y = 410;
        this.x = 200;
    }
};

//draws the player on the canvas!
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//translates arrow presses to movements of the player on the canvas
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        if (this.x < 90) {

        }else{
            this.x -= 100;
        }
        

    }else if (key === 'up') {
        if (this.y < 0) {

        }else{
            this.y -= 90;
        }
        

    }else if (key === 'right') {
        if (this.x > 350) {

        }else{
            this.x += 100;
        }
        

    }else if (key === 'down') {
        if (this.y > 409) {

        }else{
            this.y += 90;
        }
    }
}

var player = new Player();
var allEnemies = [];

for (var i = 0; i < 3; i++) {
    allEnemies.push (new Enemy());
}

console.log(allEnemies);

//the keys allowed to play the game
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
