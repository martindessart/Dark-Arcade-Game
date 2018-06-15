/////////////// SET VARIABLES ///////////////////////


// select time
const counter = document.querySelector(".timer");

// select life title
const lifeTitle = document.querySelector(".life_title");

// select life
const life = document.querySelector(".life");

// select star title
const starTitle = document.querySelector(".star_title");

// select star
const stars = document.querySelector(".star");

// select enemy title
const enemyTitle = document.querySelector(".enemy_title");

// select enemy
const enemy = document.querySelector(".enemy");

//select results
const result = document.querySelector("#results");

//select overlay
const start_overlay=document.querySelector('#overlay');

//msg for time
const message_time = document.querySelector("#message_time");

//msg for number of moves
const message_move = document.querySelector("#message_move");

//msg for number of stars
const message_star = document.querySelector("#message_star");

//msg for result of the game
const message_resu = document.querySelector("#message_resu");

//Set type of game
typeGame = 0;

//Set life
let lifeNum = 10;
life.innerHTML = lifeNum;

//Set Stars
let starNum = 0;

//Set Enemies
let enemyNum = 0;

//time of playing
let time=0;

//seconds of playing
let seconds=0;

//minutes of playing
let minutes=0;


/////////////// ENEMY CLASS ///////////////////////


// enemies class
const Enemy = function(x,y) {
  // load img
  this.sprite = 'images/enemy-bug.png';
  // Set the enemy position
  this.x = x;
  this.y = y;
  // Set a random position
  this.multiplier=Math.floor((Math.random()*10)+1);
}

// update function: reset enemy position
Enemy.prototype.update = function(dt) {
  this.x=this.x+this.multiplier*(dt*75);
  // When enemy is at the end of his way
  if (this.x>450){
    // if game 3, count number of enemies
    if (typeGame == 3) {
      enemyNum ++;
      enemy.innerHTML = enemyNum;
      // if 10 enemies cross, player lose
      if (enemyNum == 10) {
        setTimeout(function(){
          lose();
        }, 500);
      }
    }
    this.reset();
  }
  // if there is collision, reset player or enemy depending on the game
  if (this.y == player.y && this.x>(player.x-40) && this.x<(player.x+40)){
    if (typeGame == 3) {
      this.reset();
    }
    else {
      lifeNum --;
      life.innerHTML = lifeNum;
      player.reset();
    }
  }
}
// reset function: put the enemy on a new location
Enemy.prototype.reset=function(){
  this.x=-50;
  this.multiplier = Math.floor((Math.random() * 5) + 1);
  let enPos=[120,200,280];
  this.y=enPos[Math.floor(Math.random()*3)];
  if (typeGame ==2) {
    let enPos=[40,120,200,280,360,440];
    this.y=enPos[Math.floor(Math.random()*6)];
  }
}

// draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// nothing to control here
Enemy.prototype.handleInput = function() {
}


/////////////// PLAYER CLASS ///////////////////////


// player class
const Player = function(x,y){
  // load img
  this.sprite = 'images/char-boy.png';
  // Set the player position
  this.x = x;
  this.y = y;
  // keep rest to put the player back on initial position
  this.rest = x;
  this.rest = y;
}

// draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// update function: set new positions
Player.prototype.update = function() {
  this.x=this.x;
  this.y=this.y;
}

// control movements of the player
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
  // set limits of the canvas
  if (this.x>414){
    this.x=414;
  }
  else if (this.x<10){
    this.x=10;
  }
  else if (this.y<40){
    this.y=40;
  }
  else if (this.y>440){
    this.y=440;
  }
}

// reset function: put the player on the initial location
Player.prototype.reset = function(){
  this.x = this.rest-228;
  // if it's game 2
  if (typeGame ==2) {
    //define a random x position
    let playerAlea=[40,120,200,280,360,440];
    this.y=playerAlea[Math.floor(Math.random()*6)];
  }
  else {
    // else, put the player on the initial position
    this.y = this.rest;
  }
  if (lifeNum===0){
    setTimeout(function(){
      lose();
    }, 500);
  }
}


/////////////// STAR CLASS ///////////////////////


// define Star class
const Star = function(x,y){
  //load img
  this.sprite = 'images/star.png';
  // Set the stars position
  this.x = x;
  this.y = y;
}

//update function: move to star to another location
Star.prototype.update = function() {
  // only if playing game 1
  if (typeGame == 1) {
    //if there is a collision, reset player and star
    if (this.y == ((player.y)-40) && this.x == ((player.x)-10)){
      player.reset();
      star.reset();
      //define random location for the star
      let starAlea=[0, 101, 202, 303, 404];
      let starPos=starAlea[Math.floor(Math.random()*5)];
      // increment star number
      starNum ++;
      stars.innerHTML = starNum;
    }
  }
}

// draw the star on the screen
Star.prototype.render = function() {
  if (typeGame == 1) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// reset function: put the star on the initial location
Star.prototype.reset = function(){
  // only if it's game 1
  if (typeGame == 1) {
    // define random location
    starAlea=[0, 101, 202, 303, 404];
    this.x=starAlea[Math.floor(Math.random()*5)];
    //if star is number 10, you win
    if (starNum===9){
      setTimeout(function(){
        win();
      }, 500);
    }
  }
}


/////////////// FUNCTIONS ///////////////////////


//lose function
function lose(){
  //show result table
  result.classList=("show");
  //hide the other part
  document.body.style.overflow = 'hidden';
  // stop time
  clearInterval(time);
  //display some sad messages ! :(
  message_resu.textContent="You lose!";
  message_time.textContent="You lose "+minutes+" minutes and "+seconds+" seconds of your life, congratulations!";
  if (starNum==0){
    message_star.textContent="But no worries, you can still play again !";
  }
  else {
    message_star.textContent="And finally, you only won "+starNum+" beautiful stars!";
  }
  counter.classList.remove("show");
  life.classList.remove("show");
  stars.classList.remove("show");
  enemy.classList.remove("show");
}

//win function
function win(){
  //show result table
  result.classList=("show");
  //hide the other part
  document.body.style.overflow = 'hidden';
  // stop time
  clearInterval(time);
  //display some good messages ! :)
  message_resu.textContent="You won!";
  message_time.textContent="You lose "+minutes+" minutes and "+seconds+" seconds of your life, congratulations!";
  message_move.textContent="You also kept "+lifeNum+" life(s) that you could use against the bad guys.";
  if (starNum==0){
    message_star.textContent="Now try to play another game!";
  }
  else {
    message_star.textContent="And finally, you also won "+starNum+" beautiful stars!";
  }
  counter.classList.remove("show");
  life.classList.remove("show");
  stars.classList.remove("show");
  enemy.classList.remove("show");
}

// function for the first game
function first() {
  // create audio element
  const sound = document.createElement("audio");
  sound.id = "audio";
  sound.controls = "controls";
  sound.src = "Star.mp3";
  sound.type = "audio/mpeg";
  sound.autoplay = true;
  document.getElementById('song').appendChild(sound);
  // hide the overlay
  document.getElementById("overlay").style.display = "none";
  //show informations
  counter.classList.add("show");
  lifeTitle.classList.add("show");
  starTitle.classList.add("show");
  life.classList.add("show");
  stars.classList.add("show");
  stars.innerHTML = starNum;
  typeGame = 1;
}

// function for the second game
function second() {
  const sound = document.createElement("audio");
  // create audio element
  sound.id = "audio";
  sound.controls = "controls";
  sound.src = "Resist.mp3";
  sound.type = "audio/mpeg";
  sound.autoplay = true;
  document.getElementById('song').appendChild(sound);
  // hide the overlay
  document.getElementById("overlay").style.display = "none";
  //show informations
  counter.classList.add("show");
  life.classList.add("show");
  lifeTitle.classList.add("show");
  typeGame = 2;
  // create more enemies
  let enemy4 = new Enemy(x,y);
  let enemy5 = new Enemy(x,y);
  let enemy6 = new Enemy(x,y);
  allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);
}

// function for the third game
function third() {
  // create audio element
  const sound = document.createElement("audio");
  sound.id = "audio";
  sound.controls = "controls";
  sound.src = "Heal.mp3";
  sound.type = "audio/mpeg";
  sound.autoplay = true;
  document.getElementById('song').appendChild(sound);
  // hide the overlay
  document.getElementById("overlay").style.display = "none";
  //show informations
  counter.classList.add("show");
  life.classList.add("show");
  lifeTitle.classList.add("show");
  enemyTitle.classList.add("show");
  enemy.classList.add("show");
  enemy.innerHTML = enemyNum;
  typeGame = 3;
}

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

//Set the time
time=setInterval(function() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  counter.innerHTML = minutes+":"+seconds;
  if (typeGame != 1 && minutes == 1) {
    setTimeout(function(){
      win();
    }, 500);
  }
}, 1000);


/////////////// INITIALIZE THE GAME ///////////////////////


// Now instantiate your objects.
// create player
const player = new Player(212, 440);
// create enemy array
const allEnemies = [];
//set random position
let enPos=[120,200,280];
let y=enPos[Math.floor(Math.random()*3)];
//set x position
let x = -100;
//create 3 enemies
let enemy1 = new Enemy(x,y);
let enemy2 = new Enemy(x,y);
let enemy3 = new Enemy(x,y);
allEnemies.push(enemy1, enemy2, enemy3);

//Instantiate stars
//create star array
let starAlea=[0, 101, 202, 303, 404];
// set random position
let starPos=starAlea[Math.floor(Math.random()*5)];
const star= new Star(starPos, 0);
