const Asteroid = require('./asteroid');

function Game(size) {
  this.DIM_X = size[0];
  this.DIM_Y = size[1];
  this.NUM_ASTEROIDS = 15;
  this.asteroids = this.addAsteroids();
}

Game.prototype.addAsteroids = function() {
  let asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    let options = { pos: this.randomPos(), game: this };
    asteroids.push(new Asteroid(options));
  }
  return asteroids;
};

Game.prototype.randomPos = function() {
  const x = Math.floor(Math.random() * this.DIM_X);
  const y = Math.floor(Math.random() * this.DIM_Y);
  return [x,y];
};

Game.prototype.draw = function(context) {
  context.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.addBackground(context);
  this.asteroids.forEach(asteroid => {
    asteroid.draw(context);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(asteroid => {
    asteroid.move();
  });
};

Game.prototype.wrap = function(pos) {
  let newX = pos[0];
  let newY = pos[1];
  if (pos[0] > this.DIM_X + 50) {
    newX = pos[0] - this.DIM_X - 100;
  } else if (pos[0] < -50) {
    newX = pos[0] + this.DIM_X + 100;
  }

  if (pos[1] > this.DIM_Y + 50) {
    newY = pos[1] - this.DIM_Y - 100;
  } else if (pos[1] < -50) {
    newY = pos[1] + this.DIM_Y + 100;
  }
  return [newX, newY];
};

Game.prototype.addBackground = function(context) {
  let grd = context.createLinearGradient(166.000, 0.000, 134.000, 300.000);
  grd.addColorStop(0.000, 'rgba(0, 0, 0, 1.000)');
  grd.addColorStop(1.000, 'rgba(53, 44, 44, 1.000)');
  context.fillStyle = grd;
  context.fillRect(0, 0, this.DIM_X, this.DIM_Y);
}

module.exports = Game;
