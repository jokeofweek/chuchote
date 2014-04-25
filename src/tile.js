function Tile(template) {
  Glyph.call(this, template);

  this._id = template['id'] || null;
  this._blocksMovement = (typeof template['blockMovement'] === 'boolean') ? template['blockMovement'] : false;
};
Tile.extend(Glyph);

Tile.prototype.getId = function() {return this._id;};
Tile.prototype.setId = function(id) {this._id = id;};
Tile.prototype.blocksMovement = function() { return this._blocksMovement; };