function GameScreen() {
  Screen.call(this);
};
GameScreen.extend(Screen);

GameScreen.prototype.render = function() {
  // If no current level, don't render
  if (!Game.currentLevel) return;
  // Render the level
  Game.currentLevel.draw();
};
