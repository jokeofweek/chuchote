/**
 * A generic game level.
 */
function Level() {
  this._tiles = {};
  this._tileIdCache = {};
  this._lights = {};

  this._setupTiles();
  this._setupLights();
};

/**
 * A function to be overridden where the map is loaded.
 * @protected
 */
Level.prototype._setupTiles = function() {};

/**
 * A function to be overridden where the map sets up the 
 * @protected
 */
Level.prototype._setupLights = function() {};

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
  // Render the tiles.
  for (var x = 0; x < Game.MAP_WIDTH; x++) {
    for (var y = 0; y < Game.MAP_HEIGHT; y++) {
      var tile = this._tiles[this.key(x, y)];
      Game.display.draw(x, y, tile.getSymbol(), ROT.Color.toRGB(tile.getForeground()), ROT.Color.toRGB(tile.getBackground()));
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
Level.prototype.key = function(x, y) {
  return x + ',' + y;
};

// A global cache of all levels.
Levels = {};