function Tile(template) {
  Glyph.call(this, template);

  this._id = template['id'] || null;
  this._blocksMovement = (typeof template['blocksMovement'] === 'boolean') ? template['blocksMovement'] : false;
  this._blocksLight = (typeof template['blocksLight'] === 'boolean') ? template['blocksLight'] : false;
  this._light = template['light'] || null;
  this._dynamicLight = this._light && this._light[0] instanceof Array;
  this._blockMessage = template['blockMessage'] || 'You bump into something.';
  // If this is true, then the tile is always visible.
  this._permanent =  (typeof template['permanent'] === 'boolean') ? template['permanent'] : false;
  // A tile can define a position to warp to when stepped on. This position is a 3-d array of
  // [x, y, level name]. It can also be just a level name, assuming the level has a tile with
  // the id warp-destination.
  this._warp = template['warp'];
};
Tile.extend(Glyph);

Tile.prototype.getId = function() {return this._id;};
Tile.prototype.setId = function(id) {this._id = id;};
Tile.prototype.blocksMovement = function() { return this._blocksMovement; };
Tile.prototype.blocksLight = function() { return this._blocksLight; };
Tile.prototype.getLight = function() { return this._light; };
Tile.prototype.isDynamicLight = function() { return this._dynamicLight; };
Tile.prototype.isPermanent = function() { return this._permanent; };
Tile.prototype.getWarp = function() { return this._warp; };

Tile.prototype.getBlockMessage = function() {
  if (this._blockMessage instanceof Array) {
    return this._blockMessage.random();
  } else {
    return this._blockMessage;
  }
};

