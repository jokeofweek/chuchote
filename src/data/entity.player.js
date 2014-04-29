Entity.Player = function (template) {
  Entity.call(this, template);
  console.log("Player created.");
};
Entity.Player.extend(Entity);

/**
 * @override
 */
Entity.Player.prototype.act = function() {
  // Refresh the game screen
  Game.display.clear();
  Game.gameScreen.render();
  // Simply create a move promise and wait.
  this._movePromise = new Promise();
  this._movePromise.then(function() {
    // Increment the game move counter
    Game.totalMoves++;
    // Clear the old messages
    Game.gameScreen.flushMessages();
  });
  return this._movePromise;
};

/**
 * @return {Promise} The promise to be fulfilled when the player's turn is complete.
 */
Entity.Player.prototype.getMovePromise = function() {
  return this._movePromise;
};



/**
 * @override
 */
Entity.Player.prototype.setPosition = function(x, y, level) {
  var oldLevel = this._level;
  // Call the parent first
  Entity.prototype.setPosition.call(this, x, y, level);
  // If we switched levels, call the switchLevel.
  if (oldLevel && this._level != oldLevel) {
    Game.switchLevel(this._level);
  }
};