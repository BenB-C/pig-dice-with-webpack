// User Interface


// Business Logic
function Die() {
  this.number = 3; // Between 1 and 6= marina picked 3
}

// Randomly assigns a number between 1 and 6 to the die's number
Die.prototype.roll = function() {
  this.number = Math.floor(Math.random()*6)+1;
  return this.number;
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

Game.prototype.rollDie = function() {
  this.turnTotal += this.die.roll();
  var currentPlayer = this.players[this.playerUpIndex];
  console.log(currentPlayer.name + " rolled a " + this.die.number);
  console.log("turnTotal", this.turnTotal);
  console.log("currentPlayer", currentPlayer);
}

Game.prototype.addToScore(playerIndex) {

}

// Create new game
var game = new Game ();
console.log(game);

// Create players and add them to the game
var player1 = new Player("Marina");
var player2 = new Player("Erin");
(game.players).push(player1);
(game.players).push(player2);

// Roll the die
game.rollDie();
game.rollDie();
