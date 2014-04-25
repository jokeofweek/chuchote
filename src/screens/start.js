function StartScreen() {
  Screen.call(this);
};
StartScreen.extend(Screen);

StartScreen.prototype._enter = function() {
  console.log("Enter start.");
  Game.display.drawText(5, 5, "Hello, world!");
};

StartScreen.prototype.handleEvent = function(e) {
  console.log(e);
  this._promise.fulfill();
};