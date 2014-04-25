/**
 * A simple interface for a screen.
 */
function Screen() {
  this._promise = new Promise();
  // Setup the handler to automatically hide.
  this._promise.then(this.exit.bind(this), this.exit.bind(this));
};

/**
 * Enters the screen.
 * @return {Promise} The promise which is fulfilled when the user leaves a screen.
 */ 
Screen.prototype.enter = function() {
  // Clear the display
  Game.display.clear();
  // Setup the key handler.
  window.addEventListener("keydown", this);
  // Callback
  this._enter();
  // Render the scree
  this.render();
  return this._promise;
};

/**
 * Callback which should be overridden by implementations.
 */
Screen.prototype._enter = function() {};

/**
 * Callback which should be overridden by implementations.
 */
Screen.prototype._exit = function() {};

Screen.prototype.exit = function() {
  // Remove the key handler
  window.removeEventListener('keydown', this);
  // Callback
  this._exit();
};

/**
 * Handles key events.
 * @param e The event.
 */
Screen.prototype.handleEvent = function(e) {
};

/**
 * Renders the screen.
 */
Screen.prototype.render = function() {};