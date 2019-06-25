import { Die } from './die.js';

export function Game (players) {
  this.players = players; // array of players
  this.playerUpIndex = 0;
  this.currentPlayer = players[0];
  this.turnTotal = 0;
  this.die = new Die ();
  this.maxScore = 1;
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
};

Game.prototype.hold = function() {
  // update current player's score
  this.currentPlayer.score += this.turnTotal;
  // reset turn total
  this.turnTotal = 0;
};

Game.prototype.changePlayers = function () {
  this.playerUpIndex = (this.playerUpIndex + 1) % this.players.length;
  this.currentPlayer = this.players[this.playerUpIndex];
  // console.log(game);
};
