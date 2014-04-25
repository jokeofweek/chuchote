function Entity(template) {
  Glyph.call(this, template);

  this._name = template['name'] || '';

  this._x = null;
  this._y = null;
  this._level = null;
};
Entity.extend(Glyph);

/**
 * AI function called by the engine when it is this entity's turn.
 */
Entity.prototype.act = function() {};

/**
 * Moves an entity to a different position.
 * @param {int} x The new x position.
 * @param {int} y The new y position.
 * @param {Level} level The new level.
 */
Entity.prototype.setPosition = function(x, y, level) {
  // Remove the entity from the old position.
  if (this._level) {
    this._level.setEntity(this._x, this._y, null);
  }
  this._level = level;
  this._x = x;
  this._y = y;
  this._level.setEntity(this._x, this._y, this);
};

Entity.prototype.getName = function() { return this._name; };