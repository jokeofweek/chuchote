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
};