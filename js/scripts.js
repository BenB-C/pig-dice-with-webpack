// User Interface
$(document).ready(function() {
  // Test -------------------
  // Create players
  var players = [new Player("Marina"), new Player("Erin")];

  // Create new game with players
  var game = new Game (players);

  $("#current-player").text(game.currentPlayer.name);
  $("#player0name").text(game.players[0].name)
  $("#player1name").text(game.players[1].name)

  $("button#roll").click(function(){
    game.rollDie();
    $("#die-number").text(game.die.number);
    $("#turn-score").text(game.turnTotal);
    if (game.die.number === 1) {
      $("#current-player").text(game.currentPlayer.name);
    }
  });

  $("button#hold").click(function(){
    game.hold();
    $("#current-player").text(game.currentPlayer.name);
    $("#player0-score").text(game.players[0].score);
    $("#player1-score").text(game.players[1].score);
    $("#turn-score").text(game.turnTotal);
    $("#die-number").text("--");
  });


});

// Business Logic
function Die() {
  this.number; // Between 1 and 6= marina picked 3
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

function Game (players) {
  this.players = players; // array of players
  this.playerUpIndex = 0;
  this.currentPlayer = players[0];
  this.turnTotal = 0;
  this.die = new Die ();
  this.maxScore = 10;
}

Game.prototype.rollDie = function() {
  this.die.roll();
  if (this.die.number !== 1) {
    this.turnTotal += this.die.number;
  } else {
    this.turnTotal = 0;
    this.changePlayers();
  }
  // console.log(this.currentPlayer.name + " rolled a " + this.die.number);
  // console.log("turnTotal", this.turnTotal);
  // console.log("currentPlayer", this.currentPlayer);
}

Game.prototype.hold = function() {
  // update current player's score
  this.currentPlayer.score += this.turnTotal;
  // reset turn total
  this.turnTotal = 0;
  // change players
  this.changePlayers();
}

Game.prototype.changePlayers = function () {
  this.playerUpIndex = (this.playerUpIndex + 1) % this.players.length;
  this.currentPlayer = this.players[this.playerUpIndex];
  // console.log(game);
}
