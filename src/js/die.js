export function Die() {
  this.number; // Between 1 and 6= marina picked 3
}

// Randomly assigns a number between 1 and 6 to the die's number
Die.prototype.roll = function() {
  this.number = Math.floor(Math.random()*6)+1;
  return this.number;
};
