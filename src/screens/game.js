function GameScreen() {
  Screen.call(this);
};
GameScreen.extend(Screen);

GameScreen.prototype._enter = function() {
  console.log("Enter Game.");
  Game.display.drawText(5, 5, "Hello, game!");
};