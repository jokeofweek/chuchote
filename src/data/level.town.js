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


Level.Town.prototype.isAnimated = function() {  return true; };
Level.Town.prototype.getAnimationFrames = function() { return 2; };


Level.prototype._preDraw = function() {
  // Add a light at the torch position.
  var torchPosition = this.unkey(this.getTileKeyById('torch'));
  this.addLight(torchPosition[0], torchPosition[1], ROT.Color.randomizeClamp([255, 200, 0], 30));
};

Level.prototype._postDraw = function() {
  // Remove a light at the torch position.
  var torchPosition = this.unkey(this.getTileKeyById('torch'));
  this.addLight(torchPosition[0], torchPosition[1], ROT.Color.randomizeClamp([255, 200, 0], 30));
};