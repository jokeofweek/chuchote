/**
 * A visual object.
 * @param {object} template The template describing the object.
 */
function Glyph(template) {
  this._symbol = template['symbol'] || '#';
  // If can have various characters, pick a random one
  if (this._symbol instanceof Array) this._symbol = this._symbol.random();

  this._color = template['color'] || 'white';
  // If the color can have some randomness, generate it. 
  // (eg. expects [[r, g, b], randomness])
  if (this._color instanceof Array && this._color[0] instanceof Array) {
    this._color = ROT.Color.randomizeClamp(this._color[0], this._color[1]);
  } else if (typeof this._color == 'string') {
    this._color = ROT.Color.fromString(this._color);
  }
};


Glyph.prototype.getSymbol = function() { return this._symbol; };
Glyph.prototype.getColor = function() { return this._color; };