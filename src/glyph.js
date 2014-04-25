/**
 * A visual object.
 * @param {object} template The template describing the object.
 */
function Glyph(template) {
  this._symbol = template['symbol'] || '#';
  // If can have various characters, pick a random one
  if (this._symbol instanceof Array) this._symbol = this._symbol.random();

	this._foreground = template['foreground'] || '';
  // If the color can have some randomness, generate it. 
  // (eg. expects [[r, g, b], randomness])
  if (this._foreground instanceof Array) {
    this._foreground = ROT.Color.randomize(this._foreground[0], this._foreground[1]);
  }

  this._background = template['background'] || '';
};


Glyph.prototype.getSymbol = function() { return this._symbol; };
Glyph.prototype.getForeground = function() { return this._foreground; };
Glyph.prototype.getBackground = function() { return this._background; };