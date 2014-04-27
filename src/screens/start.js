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
  this._maxAnimationFrames = 14;
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
  this.render();
  // Go to next animation frame
  this._animationFrame = (this._animationFrame + 1) % this._maxAnimationFrames
};

/**
 * @override
 */
StartScreen.prototype.render = function() {
  // To determine how far along the animation we are, first see what half of the frames we're in.
  var interpolationFactor = 0;
  if (this._animationFrame < this._maxAnimationFrames / 2) {
    interpolationFactor = this._animationFrame / (this._maxAnimationFrames / 2);
  } else {
    interpolationFactor = (this._maxAnimationFrames - this._animationFrame) / (this._maxAnimationFrames / 2);
  }
  // Want a gradient from yellow to orange and back.
  var textColor = ROT.Color.interpolate([255, 255, 0], [255, 70, 0], interpolationFactor);

  // Render the title
  var title = "Chuchote";
  Game.display.drawText(Game.SCREEN_WIDTH / 2 - Math.floor(title.length / 2), 5, "%c{rgb(" + textColor.join(',') + ")}" + title);

  // Render the plotline
  var plotLine = "You just found your friend " + CharManager.rolePlayers.victim.getName() + " dead on the ground. Will you be able to find out who did it?";
  Game.display.drawText(Game.SCREEN_WIDTH / 2 - 20, 7, plotLine, 40);

  // Render the any key prompt
  var prompt = "<Press any key to get started>";
  Game.display.drawText((Game.SCREEN_WIDTH / 2) - (prompt.length / 2), 15, '%c{green}' + prompt);
};

/**
 * @override
 */
StartScreen.prototype.handleEvent = function(e) {
  this._promise.fulfill();
};