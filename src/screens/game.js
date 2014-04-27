function GameScreen() {
  Screen.call(this);
  this._animationTimer = null;
  this._animationFrame = 0;
  this._messages = [];
  // The maximum number of turns for a message to stay on screen.
  this._messageMaxTurns = 10;
};
GameScreen.extend(Screen);

GameScreen.prototype._enter = function() {
  // If we have a level, start animating
  if (Game.currentLevel) {
    this._startAnimationTimer();
  }
};

GameScreen.prototype._exit = function(first_argument) {
  // Stop any animation timer
  this._stopAnimationTimer();
};
/**
 * Adds a message to show the player. 
 * @param  {string} message 
 */
GameScreen.prototype.writeMessage = function(message) {
  // If we have the maximum number of messages, remove the oldest message
  if (this._messages.length === Game.TEXT_HEIGHT) this._messages.shift();
  // Add the message and the number of turns that have passed.
  this._messages.push([Game.totalMoves, message]);
};

/**
 * Clears the list of old messages currently displayed to the player.
 */
GameScreen.prototype.flushMessages = function() {
  for (var i = this._messages.length - 1; i >= 0; i--) {
    // If the message is too old, remove it.
    if (Game.totalMoves - this._messages[i][0] >= this._messageMaxTurns) {
      this._messages.splice(i, 1);
    }
  }
};

/**
 * Stops any ongoing animation timers.
 */
GameScreen.prototype._stopAnimationTimer = function() {
  if (this._animationTimer) {
    clearInterval(this._animationTimer);
    this._animationTimer = null;
  }
};

/**
 * Starts the animation timer for a given level
 * @param  {Level} level
 */
GameScreen.prototype._startAnimationTimer = function(level) {
  var totalFrames = 2;
  this._animationFrame = 0;   

  this._animationTimer = setInterval(function() {
    this._animationFrame = (this._animationFrame + 1) % totalFrames;
    if (Game.currentLevel.isAnimated()) {
      Game.display.clear();
      this.render();
    }
  }.bind(this), Math.round(1000 / totalFrames));

};

/**
 * This gets called when the game changes level.
 */
GameScreen.prototype.changeLevel = function() {
  this._stopAnimationTimer();
  this._startAnimationTimer(Game.currentLevel);
};

/**
 * @return {int} The current animation frame.
 */
GameScreen.prototype.getAnimationFrame = function() {
  return this._animationFrame;
};

/**
 * @override
 */
GameScreen.prototype.render = function() {
  // If no current level, don't render
  if (!Game.currentLevel) return;
  // Render the messages
  for (var i = 0; i < this._messages.length; i++) {
    var color = ROT.Color.interpolate([0, 0, 0], [255, 255, 255], 
        (this._messageMaxTurns - (Game.totalMoves - (this._messages[i][0] + 1))) / this._messageMaxTurns);
    Game.display.drawText(0, i, "%c{rgb(" + color.join(',') +')}' + this._messages[i][1]);
  }
  // Render the level
  Game.currentLevel.draw(Game.TEXT_HEIGHT);
};

/**
 * Helper function for switching back to the game screen.
 */
GameScreen.prototype._enterAndRender = function() {
  this.enter();
  this.render();
};

/**
 * @override
 */
GameScreen.prototype.handleEvent = function(e) {
  // Ignore modified keys.
  if (e.ctrlKey || e.altKey) { return; }
  if (e.keyCode == ROT.VK_SHIFT) { return; }

  // Check if a directional key was pressed.
  if (e.keyCode in KEYS) {
    // Get corresponding direction
    var direction = KEYS[e.keyCode];
    // Get offsets
    var offsets = ROT.DIRS[8][direction];
    var newX = Game.player.getX() + offsets[0];
    var newY = Game.player.getY() + offsets[1];

    // Only move if the tile doesn't block movement
    var tile = Game.player.getLevel().getTile(newX, newY);
    if (!tile.blocksMovement()) {
      Game.player.setPosition(newX, newY, Game.player.getLevel());
    } else {
      Game.gameScreen.writeMessage(tile.getBlockMessage());
    }
    Game.player.getMovePromise().fulfill();
  }

  switch (e.keyCode) {
    case ROT.VK_QUESTION_MARK: 
    case ROT.VK_SLASH: 
      e.preventDefault();
      this.exit();
      new HelpScreen(false).enter().then(this._enterAndRender.bind(this));
      break;
  }
};