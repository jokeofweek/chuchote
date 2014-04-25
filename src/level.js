/**
 * A generic game level.
 */
function Level() {
  this._tiles = {};
  this._entities = {};
  this._tileId = {};
  this._ambientLight = [255, 255, 255];
  this._hasFog = true;

  // Create the lighting and fov object.
  this._setupFOV();
  this._lighting = new ROT.Lighting(function(x, y){ return 0.3; }, {passes: 2, range: 8});
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
 * Updates the entity at a given position.
 * @param {int} x      
 * @param {int} y      
 * @param {Entity?} entity The entity at this position, or null if none.
 */
Level.prototype.setEntity = function(x, y, entity) {
  if (!entity && this._entities[this.key(x, y)]) {
    this._entities[this.key(x, y)] = null;
  }
  this._entities[this.key(x, y)] = entity;
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

  // Add the light at the player
  this.addLight(Game.player.getX(), Game.player.getY(), [100, 100, 100]);

  // Calculate the lighting
  var lightData = {};
  var lightingCallback = function(x, y, color) {
      lightData[this.key(x, y)] = color;
  }.bind(this);
  this._lighting.compute(lightingCallback);

  // Render the tiles.
  for (var x = 0; x < Game.MAP_WIDTH; x++) {
    for (var y = 0; y < Game.MAP_HEIGHT; y++) {
      var key = this.key(x, y);
      var obj = this._entities[key] || this._tiles[key];

      var baseColor = obj.getColor();

      // If we have a calculated light, modify it.
      if (key in lightData && Math.max.apply(null, lightData[key]) > 0) {
        // Add the ambient lighting to the light data
        var light = ROT.Color.add(this._ambientLight, lightData[key]);
        baseColor = ROT.Color.multiply(obj.getColor(), light);
      } else if (this._hasFog) {
        // Since it is just a being, only draw the tile
        obj = this._tiles[key];
        // First apply the ambient lighting
        baseColor = ROT.Color.multiply(baseColor, this._ambientLight);
        // If not in a light, we want to make the tile be foggy. We convert 
        // all fog tiles to grayscale.
        var newColor = Math.round((0.299 * baseColor[0]) + (0.587 * baseColor[1]) + (0.114 * baseColor[2]));
        baseColor = [newColor, newColor, newColor];
      }

      Game.display.draw(x, y, obj.getSymbol(), ROT.Color.toRGB(baseColor));
    }
  }

  // Remove the player light
  this.removeLight(Game.player.getX(), Game.player.getY());

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