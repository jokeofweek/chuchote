function Tile(template) {
  Glyph.call(this, template);

  this._id = template['id'] || null;
  this._blocksMovement = (typeof template['blockMovement'] === 'boolean') ? template['blockMovement'] : false;
  this._light = template['light'] || null;
  this._dynamicLight = this._light && this._light[0] instanceof Array;
};
Tile.extend(Glyph);

Tile.prototype.getId = function() {return this._id;};
Tile.prototype.setId = function(id) {this._id = id;};
Tile.prototype.blocksMovement = function() { return this._blocksMovement; };
Tile.prototype.getLight = function() { return this._light; };
Tile.prototype.isDynamicLight = function() { return this._dynamicLight; };