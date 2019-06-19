// User Interface


// Business Logic
function Die() {
  this.number = 3; // Between 1 and 6= marina picked 3
}

// Randomly assigns a number between 1 and 6 to the die's number
Die.prototype.roll = function() {
  this.number = Math.floor(Math.random()*6)+1;
  console.log(this.number);
}

function Player(name) {
  this.name = name;
  this.score = 0;

}

function Game () {
  this.players = [];
  this.playerUpIndex = 0;
  this.turnTotal = 0;
  this.die = new Die ();
}

var game = new Game ();
console.log(game);

var die = new Die(1);
console.log("die.number", die.number);
die.roll();
console.log("die.number", die.number);

var player1 = new Player("Marina");
var player2 = new Player("Erin");
