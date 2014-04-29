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
 * Function required by the engine.
 * @return {int} the speed of the entity.
 */
Entity.prototype.getSpeed = function() {
  return 100;
};

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
  } else {
    // No level before, so add them to the scheduler
    Game.scheduler.add(this, true);
  }
  this._level = level;
  this._x = x;
  this._y = y;
  this._level.setEntity(this._x, this._y, this);
};

/**
 * This warps an entity to another level.
 * @param  {int} x         
 * @param  {int} y         
 * @param  {string} levelName 
 */
Entity.prototype.warp = function(x, y, levelName) {
  // First we have to find the level.
  var level = Levels[levelName];
  if (!level) {
    throw new Error('Level not found: ' + levelName);
  }
  this.setPosition(x, y, level);
};

/**
 * Kills an entity.
 */
Entity.prototype.die = function() {
  // Remove them from the old level
  if (this._level) {
    this._level.setEntity(this._x, this._y, null);
    this._level = null;
    Game.scheduler.remove(this);
  }
};

Entity.prototype.getName = function() { return this._name; };
Entity.prototype.getX = function() { return this._x; };
Entity.prototype.getY = function() { return this._y; };
Entity.prototype.getLevel = function() { return this._level; };