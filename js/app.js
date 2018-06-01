// Enemies our player must avoid
const Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    // Set the enemy position
    this.x = x;
    this.y = y;
    this.multiplier=Math.floor((Math.random()*10)+1);
};


// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x=this.x+this.multiplier*(dt*75);
  if (this.x>450){
    this.reset();
  }
  if (this.y == player.y && this.x>(player.x-40) && this.x<(player.x+40)){
    player.reset();
    }
}
Enemy.prototype.reset=function(){
  this.x=-50;
  this.multiplier = Math.floor((Math.random() * 5) + 1);
  let enPos=[60,140,220];
  this.y=enPos[Math.floor(Math.random()*3)];
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.handleInput = function() {
};

const Player = function(x,y){
  this.sprite = 'images/char-boy.png';
  // Set the player position
  this.x = x;
  this.y = y;
  this.rest = x;
  this.rest = y;
}

Player.prototype.update = function(dt) {
    this.x = this.x*dt;
    this.y = this.y*dt;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.update = function() {
this.x=this.x;
this.y=this.y;
}


Player.prototype.handleInput = function(move) {
  if (move ==='up') {
		this.y = this.y - 80;
}
  if (move ==='down') {
    this.y = this.y + 80;
  }
  if (move ==='left') {
    this.x = this.x - 101;
  }
  if (move ==='right') {
    this.x = this.x + 101;
  }
  if (this.x>404){
    console.log("done");
    this.x=404;
  }
  else if (this.x<0){
    this.x=0;
    console.log("done");
  }
  else if (this.y<-20){
    this.y=-20;
    console.log("done");
  }
  else if (this.y>380){
    this.y=380;
    console.log("done");
  }
}

Player.prototype.reset = function(){
  this.x = this.rest - 380;
  this.y = this.rest;
    lifeNum --;
    life.innerHTML = lifeNum;
    console.log(lifeNum);
    if (lifeNum===0){
      lose();
    }
}
function lose(){
  alert("u lose");
  clearInterval(time);
  seconds=0;
  minutes=0;
  counter.innerHTML = minutes+":"+seconds;
  time=setInterval(function() {
    seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
      counter.innerHTML = minutes+":"+seconds;
    }, 1000);
  lifeNum = 10;
  life.innerHTML = lifeNum;

}
// Now instantiate your objects.
const player = new Player(0, 380);
const allEnemies = [];
let enPos=[60,140,200];
let y=enPos[Math.floor(Math.random()*3)];
let x = -100;
let enemy1 = new Enemy(x,y);
let enemy2 = new Enemy(x,y);
let enemy3 = new Enemy(x,y);
//let enemy4 = new Enemy(x,y);
//let enemy5 = new Enemy(x,y);
//let enemy6 = new Enemy(x,y);
allEnemies.push(enemy1, enemy2, enemy3);

//time of playing
let time=0;
//seconds of playing
let seconds=0;
//minutes of playing
let minutes=0;

//Set the time
time=setInterval(function() {
  seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    counter.innerHTML = minutes+":"+seconds;
  }, 1000);

const counter = document.querySelector(".timer");
const life = document.querySelector(".life");
//Set life
let lifeNum = 10;
life.innerHTML = lifeNum;



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
