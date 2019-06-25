import Jquery from 'jquery';
window.$ = Jquery;
window.Jquery = Jquery;
export default Jquery;

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import 'html-loader';
import 'file-loader';
// import 'url-loader';
import { Player } from './player.js';
import { Game } from './game.js';

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
  });

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

function hightlightCurrentPlayer(currentGame) {
  // $(`#player${game.playerUpIndex}name`).addClass("current-player");
  $("#player" + currentGame.playerUpIndex + "display").addClass("current-player");
  var otherPlayerIndex = (currentGame.playerUpIndex + 1) % currentGame.players.length;
  $("#player" + otherPlayerIndex + "display").removeClass("current-player");
}

// Business Logic ----------------------
