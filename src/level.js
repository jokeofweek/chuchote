/**
 * A generic game level.
 */
function Level() {
  this._tiles = {};
  this._tileId = {};
  this._ambientLight = [255, 255, 255];

  // Create the lighting and fov object.
  this._setupFOV();
  this._lighting = new ROT.Lighting(function(x, y){ return 0.3; }, {passes:2, range: 12});
  this._lighting.setFOV(this._fov);

  // Animation
  this._animationFrame = 0;

  this._setupTiles();
};

/**
 * Whether the level requires animation.
 * @return {Boolean}
 */
Level.prototype.isAnimated = function() {  return false; };

/**
 * The number of frames per second that this should be animated.
 * @return {int}
 */
Level.prototype.getAnimationFrames = function() { return 0; };

/**
 * A function to be overridden where the map is loaded.
 * @protected
 */
Level.prototype._setupTiles = function() {};

/**
 * Sets up the field of vision.
 * @protected
 */
Level.prototype._setupFOV = function() {
  this._fov = new ROT.FOV.PreciseShadowcasting(function(x, y){ return true; }.bind(this), {topology:4});
};

/**
 * Adds a light to the map.
 * @param {int} x
 * @param {int} y
 * @param {array} light The light to ad
 */
Level.prototype.addLight = function(x, y, light) {
  this._lighting.setLight(x, y, light);
};

/**
 * Removes a light from a position.
 * @param  {int} x
 * @param  {int} y
 */
Level.prototype.removeLight = function(x, y) {
  this._lighting.setLight(x, y, null);
};

/**
 * Called when the player enters the level.
 */
Level.prototype.enter = function() {};

/**
 * Called when the player enters the level.
 */
Level.prototype.exit = function() {};

/**
 * Draws a level.
 */
Level.prototype.draw = function() {
  this._preDraw();

  // Calculate the lighting
  var lightData = {};
  var lightingCallback = function(x, y, color) {
      lightData[Level.key(x, y)] = color;
  }
  this._lighting.compute(lightingCallback);

  // Render the tiles.
  for (var x = 0; x < Game.MAP_WIDTH; x++) {
    for (var y = 0; y < Game.MAP_HEIGHT; y++) {
      var key = this.key(x, y);
      var tile = this._tiles[key];

      // Start with ambient lighting
      var light = this._ambientLight;
      // If we have a calculated light, modify it.
      if (key in lightData) {
        light = ROT.Color.add(light, lightData[key]);
      }
      // Draw the tile
      Game.display.draw(x, y, tile.getSymbol(), ROT.Color.toRGB(ROT.Color.multiply(tile.getColor(), light)));
    }
  }

  this._postDraw();
};

/**
 * A hook which is called before drawing begins.
 * @protected
 */
Level.prototype._preDraw = function() {};

/**
 * A hook which is called after drawing ends.
 * @protected
 */
Level.prototype._postDraw = function() {};

/**
 * Finds the key of a tile on the level with a given id.
 * @param  {string} id The tile's ID.
 * @return {string?} The key for the tile if it was found, else null.
 */
Level.prototype.getTileKeyById = function(id) {
  return this._tileId[id];
};

/**
 * Updates a tile at a given position.
 * @param {int} x
 * @param {int} y
 * @param {Tile} tile
 */
Level.prototype.setTile = function(x, y, tile) {
  var key = this.key(x, y);
  // If there was a tile here before, we have some cleanup to do.
  if (this._tiles[key]) {
    var oldTile = this._tiles[key];
    if (oldTile.getId()) {
      delete this._tileId[oldTile.getId()];
    }
  }
  // Update the tile
  this._tiles[key] = tile;
  if (tile.getId()) {
    this._tileId[tile.getId()] = key;
  }
};

/**
 * Convers a position into a key for the tile object.
 * @param  {int} x
 * @param  {int} y
 * @return {string} The key for the tile.
 */
Level.key = Level.prototype.key = function(x, y) {
  return x + ',' + y;
};

/**
 * Converts a key into a position.
 * @param  {string} k The key.
 * @return {array} An array where x is at index 0 and y at index 1
 */
Level.unkey = Level.prototype.unkey = function(k) {
  return k.split(',');
};

// A global cache of all levels.
Levels = {};