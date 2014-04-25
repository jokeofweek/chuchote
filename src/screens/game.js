function GameScreen() {
  Screen.call(this);
  this._animationTimer = null;
  this._animationFrame = 0;
};
GameScreen.extend(Screen);

/**
 * This gets called when the game changes level.
 */
GameScreen.prototype.changeLevel = function() {
  if (this._animationTimer) {
    clearInterval(this._animationTimer);
    this._animationTimer = null;
  }
  // Test if we need to animate again
  if (Game.currentLevel.isAnimated()) {
    var totalFrames = Game.currentLevel.getAnimationFrames();

    this._animationFrame = 0;    

    this._animationTimer = setInterval(function() {
      this._animationFrame = (this._animationFrame + 1) % totalFrames;
      Game.display.clear();
      this.render();
    }.bind(this), Math.round(1000 / Game.currentLevel.getAnimationFrames()));
  }
};

GameScreen.prototype.getAnimationFrame = function() {
  return this._animationFrame;
};

GameScreen.prototype.render = function() {
  // If no current level, don't render
  if (!Game.currentLevel) return;
  // Render the level
  Game.currentLevel.draw();
};
