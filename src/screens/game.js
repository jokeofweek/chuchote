function GameScreen() {
  Screen.call(this);
};
GameScreen.extend(Screen);

GameScreen.prototype._enter = function() {
  console.log("Enter Game.");
  for (var x = 0; x < Game.MAP_WIDTH; x++) {
    for (var y = 0; y < Game.MAP_HEIGHT; y++) {
      var glyph = Tiles.build('grass');
      Game.display.draw(x, y, glyph.getSymbol(), ROT.Color.toRGB(glyph.getForeground()), ROT.Color.toRGB(glyph.getBackground()));
    }
  }
  Game.display.drawText(5, 5, "Hello, game!");
};

