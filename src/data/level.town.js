Level.Town = function() {
  Level.call(this);

  // Last color and frame
  this._lastColor = null;
  this._lastAnimationFrame = -1;
  //
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
  // Check if we need to generate a new color
  if (Game.gameScreen.getAnimationFrame() != this._lastAnimationFrame) {
    this._lastAnimationFrame = Game.gameScreen.getAnimationFrame();
    this._lastColor = ROT.Color.randomizeRound([300, 200, 0], 50)
  }
  this.addLight(torchPosition[0], torchPosition[1], this._lastColor);
};

Level.prototype._postDraw = function() {
  // Remove a light at the torch position.
  var torchPosition = this.unkey(this.getTileKeyById('torch'));
  this.removeLight(torchPosition[0], torchPosition[1]);
};