Level.Town = function() {
  Level.call(this);
  //
};
Level.Town.extend(Level);

Level.Town.prototype._setupTiles = function() {
  for (var x = 0; x < Game.MAP_WIDTH; x++) {
    for (var y = 0; y < Game.MAP_HEIGHT; y++) {
      this.setTile(x, y, Tiles.build('grass'));
    }
  }

  // Place a torch at the center
  this.setTile(Game.MAP_WIDTH / 2, Game.MAP_HEIGHT / 2, Tiles.build('fire', {id: 'torch'}));

  // Setup lighting
  this._ambientLighting = [130, 130, 130];
};