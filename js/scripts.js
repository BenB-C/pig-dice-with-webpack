// User Interface
$(document).ready(function() {

  var game;

  $(".names").submit(function(event){
    event.preventDefault();
    var player1Input = $("#playerOne").val();
    var player2Input = $("#playerTwo").val();
    if (player1Input == "") {
      player1Input = "Player 1";
    }
    if (player2Input == "") {
      player2Input = "Player 2";
    }
    var players = [new Player(player1Input), new Player(player2Input)];

    // Create new game with players
    game = new Game (players);
    $("#current-player").text(game.currentPlayer.name);
    $("#player0name").text(player1Input);
    $("#player1name").text(player2Input);
    hightlightCurrentPlayer(game);

    $("#game-div").fadeIn();
    $(".names").fadeOut();
  })

  $("button#roll").click(function(){
    game.rollDie();
    $(".dice").hide();
    $("#die" + game.die.number).show();
    $("#die-number").text(game.die.number);
    $("#turn-score").text(game.turnTotal);
    if (game.die.number === 1) {
      $("#die-roll").effect("bounce");
      $("#current-player").text(game.currentPlayer.name);
      hightlightCurrentPlayer(game);
    }
  });

  $("button#hold").click(function(){
    game.hold();
    $("#player0-score").text(game.players[0].score);
    $("#player1-score").text(game.players[1].score);
    $("#turn-score").text(game.turnTotal);
    $("#die-number").text("--");
    if (game.currentPlayer.score >= game.maxScore) {
      $("#winner").text(game.currentPlayer.name.toUpperCase());
      $("#game-div").hide();
      $("#pig").show();
    } else {
      game.changePlayers();
      hightlightCurrentPlayer(game);
      $("#current-player").text(game.currentPlayer.name);
    }
  });

});

function refreshPage() {
  window.location.reload();
}

function hightlightCurrentPlayer(currentGame) {
  // $(`#player${game.playerUpIndex}name`).addClass("current-player");
  $("#player" + currentGame.playerUpIndex + "display").addClass("current-player");
  var otherPlayerIndex = (currentGame.playerUpIndex + 1) % currentGame.players.length;
  $("#player" + otherPlayerIndex + "display").removeClass("current-player");
}

// Business Logic ----------------------
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
  this.maxScore = 100;
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
}

Game.prototype.changePlayers = function () {
  this.playerUpIndex = (this.playerUpIndex + 1) % this.players.length;
  this.currentPlayer = this.players[this.playerUpIndex];
  // console.log(game);
}
