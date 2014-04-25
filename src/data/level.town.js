Level.Town = function() {
  Level.call(this);
};
Level.Town.extend(Level);

Level.Town.prototype._setupTiles = function() {
  for (var x = 0; x < Game.MAP_WIDTH; x++) {
    for (var y = 0; y < Game.MAP_HEIGHT; y++) {
      this._tiles[this.key(x, y)] = Tiles.build('grass');
    }
  }
  // Add a light in the center
  this.addLight(Game.MAP_WIDTH / 2, Game.MAP_HEIGHT / 2, [400, 0, 0]);
};