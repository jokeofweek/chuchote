function StartScreen() {
  Screen.call(this);
};
StartScreen.extend(Screen);

/**
 * @override
 */
StartScreen.prototype._enter = function() {
  // Setup the animation timer.
  this._animationTimer = setInterval(this._animate.bind(this), 200);
  this._animationFrame = 0;
  this._maxAnimationFrames = 20;
  this._animate();
};

/**
 * @override
 */
StartScreen.prototype._exit = function() {
  clearTimeout(this._animationTimer);
};

/**
 * Renders the screen and moves to the next animation frame.
 */
StartScreen.prototype._animate = function() {
  // Clear the screen
  Game.display.clear();
  // Render the screen
  this._render();
  // Go to next animation frame
  this._animationFrame = (this._animationFrame + 1) % this._maxAnimationFrames
};

/**
 * Renders to the screen.
 */
StartScreen.prototype._render = function() {
  // To determine how far along the animation we are, first see what half of the frames we're in.
  var interpolationFactor = 0;
  if (this._animationFrame < this._maxAnimationFrames / 2) {
    interpolationFactor = this._animationFrame / (this._maxAnimationFrames / 2);
  } else {
    interpolationFactor = (this._maxAnimationFrames - this._animationFrame) / (this._maxAnimationFrames / 2);
  }
  console.log(interpolationFactor);
  var textColor = ROT.Color.interpolate([255, 255, 0], [255, 130, 0], interpolationFactor);

  var title = "Game title";
  Game.display.drawText(Game.SCREEN_WIDTH / 2 - Math.floor(title.length / 2), 5, "%c{rgb(" + textColor.join(',') + ")}" + title);
};

StartScreen.prototype.handleEvent = function(e) {
  console.log(e);
  this._promise.fulfill();
};