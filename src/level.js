/**
 * A generic game level.
 */
function Level() {
  this._tiles = {};
  this._tileIdCache = {};
  this._ambientLight = [100, 100, 100];

  // Create the lighting and fov object.
  this._setupFOV();
  this._lighting = new ROT.Lighting(function(x, y){ return 0.3; }, {passes:2, range: 12});
  this._lighting.setFOV(this._fov);

  this._setupTiles();
};

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
  // Calculate the lighting
  var lightData = {};  
  var lightingCallback = function(x, y, color) {
      lightData[Level.key(x, y)] = color;
  }
  this._lighting.compute(lightingCallback);
  console.log(lightData);

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
};

/**
 * Finds the key of a tile on the level with a given id.
 * @param  {string} id The tile's ID.
 * @return {string?} The key for the tile if it was found, else null.
 */
Level.prototype.getTileKeyById = function(id) {
  // If already cached, simply return it.
  if (this._tileIdCache[id]) {
    return this._tileIdCache[id];
  }
  // If not cache, find it and then cache it
  for (var k in this._tiles) {
    if (this._tiles[k].getId() === id) {
      this._tileIdCache[id] = k;
      return k;
    }
  }
  return null;
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

// A global cache of all levels.
Levels = {};