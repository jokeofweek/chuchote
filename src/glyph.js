/**
 * A visual object.
 * @param {object} template The template describing the object.
 */
function Glyph(template) {
  this._symbol = template['symbol'] || '#';
  // If can have various characters, pick a random one
  if (this._symbol instanceof Array) this._symbol = this._symbol.random();

  this._foreground = template['foreground'] || 'white';
  // If the color can have some randomness, generate it. 
  // (eg. expects [[r, g, b], randomness])
  if (this._foreground instanceof Array) {
    this._foreground = ROT.Color.randomizeClamp(this._foreground[0], this._foreground[1]);
  } else if (typeof this._foreground == 'string') {
    this._foreground = ROT.Color.fromString(this._foreground);
  }

  this._background = template['background'] || 'black';
   if (typeof this._background == 'string') {
    this._background = ROT.Color.fromString(this._background);
  }
};


Glyph.prototype.getSymbol = function() { return this._symbol; };
Glyph.prototype.getForeground = function() { return this._foreground; };
Glyph.prototype.getBackground = function() { return this._background; };