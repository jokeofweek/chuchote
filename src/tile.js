function Tile(template) {
  Glyph.call(this, template);

  this._id = template['id'] || null;
};
Tile.extend(Glyph);

Tile.prototype.getId = function() {return this._id;};