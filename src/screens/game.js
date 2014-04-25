function GameScreen() {
  Screen.call(this);
  this._animationTimer = null;
  this._animationFrame = 0;
};
GameScreen.extend(Screen);

GameScreen.prototype._enter = function() {
  // If we have a level, start animating
  if (Game.currentLevel) {
    this._startAnimationTimer(Game.currentLevel);
  }
};

GameScreen.prototype._exit = function(first_argument) {
  // Stop any animation timer
  this._stopAnimationTimer();
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
  // Test if we need to animate again
  this._animationFrame = 0;    
  if (level.isAnimated()) {
    var totalFrames = level.getAnimationFrames();

    this._animationTimer = setInterval(function() {
      this._animationFrame = (this._animationFrame + 1) % totalFrames;
      Game.display.clear();
      this.render();
    }.bind(this), Math.round(1000 / level.getAnimationFrames()));
  }
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
  // Render the level
  Game.currentLevel.draw();
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
  switch (e.keyCode) {
    case ROT.VK_QUESTION_MARK: 
    case ROT.VK_SLASH: 
      e.preventDefault();
      this.exit();
      new HelpScreen(false).enter().then(this._enterAndRender.bind(this));
      break;
  }
};