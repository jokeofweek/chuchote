Level.Town = function() {
  Level.call(this);

  // Setup lighting
  this._ambientLighting = [130, 130, 130];
};
Level.Town.extend(Level);

Level.Town.prototype._setupTiles = function() {
  for (var x = 0; x < Game.MAP_WIDTH; x++) {
    for (var y = 0; y < Game.MAP_HEIGHT; y++) {
      // Stone wall on the outer edge
      if (x == 0 || y == 0 || x == Game.MAP_WIDTH - 1 || y == Game.MAP_HEIGHT - 1) {
        this.setTile(x, y, Tiles.build('stone-wall'));
      } else {
        this.setTile(x, y, Tiles.build('grass'));
      }
    }
  }

  // Gate at the bottom 4 center tiles
  for (x = 0; x < 4; x++) {
    this.setTile((Game.MAP_WIDTH / 2) - 2 + x, Game.MAP_HEIGHT - 1, Tiles.build('wooden-gate'));
  }

  this._placeRoad();
  this._placeTorches();

  // Temporary building
  this._carveRectangle(5, 5, 5, 3, 'grass', 'stone-wall');
};

Level.Town.prototype._carveRectangle = function(left, top, width, height, innerTile, outerTile) {
  for (var x = left; x < left + width; x++) {
    for (var y = top; y < top + height; y++) {
      if (x == left || x == left + width - 1 || y == top || y == top + height - 1) {
        this.setTile(x, y, Tiles.build(outerTile));
      } else {
        this.setTile(x, y, Tiles.build(innerTile));
      }
    }
  }
};

Level.Town.prototype._placeRoad = function() {
  for (var x = 2; x < Game.MAP_WIDTH - 2; x++) {
    this.setTile(x, 2, Tiles.build('road'));
    this.setTile(x, 3, Tiles.build('road'));
    this.setTile(x, Game.MAP_HEIGHT / 2, Tiles.build('road'));
    this.setTile(x, -1 + Game.MAP_HEIGHT / 2, Tiles.build('road'));
    this.setTile(x, Game.MAP_HEIGHT - 3, Tiles.build('road'));
    this.setTile(x, Game.MAP_HEIGHT - 4, Tiles.build('road'));
  }
  for (var y = 4; y < Game.MAP_HEIGHT - 4; y++) {
    this.setTile(2, y, Tiles.build('road'));
    this.setTile(3, y, Tiles.build('road'));
    this.setTile(Game.MAP_WIDTH / 2, y, Tiles.build('road'));
    this.setTile(-1 + Game.MAP_WIDTH / 2, y, Tiles.build('road'));
    this.setTile(Game.MAP_WIDTH - 3, y, Tiles.build('road'));
    this.setTile(Game.MAP_WIDTH - 4, y, Tiles.build('road'));
  }

  this.setTile(Game.MAP_WIDTH / 2, Game.MAP_HEIGHT - 2, Tiles.build('road'));
  this.setTile(-1 + Game.MAP_WIDTH / 2, Game.MAP_HEIGHT - 2, Tiles.build('road'));
};

Level.Town.prototype._placeTorches = function() {
  // Place torches
  this.setTile(1, 1, Tiles.build('torch'));
  this.setTile(Game.MAP_WIDTH - 2, 1, Tiles.build('torch'));
  this.setTile(1, Game.MAP_HEIGHT - 2, Tiles.build('torch'));
  this.setTile(Game.MAP_WIDTH - 2, Game.MAP_HEIGHT - 2, Tiles.build('torch'));
  this.setTile(Game.MAP_WIDTH / 2 - 2, Game.MAP_HEIGHT / 2 - 2, Tiles.build('weak-torch'));
  this.setTile(Game.MAP_WIDTH / 2 + 1, Game.MAP_HEIGHT / 2 - 2, Tiles.build('weak-torch'));
  this.setTile(Game.MAP_WIDTH / 2 - 2, Game.MAP_HEIGHT / 2 + 1, Tiles.build('weak-torch'));
  this.setTile(Game.MAP_WIDTH / 2 + 1, Game.MAP_HEIGHT / 2 + 1, Tiles.build('weak-torch'));
  this.setTile(Game.MAP_WIDTH / 2 + 1, Game.MAP_HEIGHT - 2, Tiles.build('weak-torch'));
  this.setTile(-2 + Game.MAP_WIDTH / 2, Game.MAP_HEIGHT - 2, Tiles.build('weak-torch'));
};