function HelpScreen(first) {
  Screen.call(this);
  this._first = first;
};
HelpScreen.extend(Screen);

/**
 * @override
 */
HelpScreen.prototype._enter = function() {
  var y = 1;
  // Render the header
  if (this._first) {
    var message = String.format('Welcome to %c{#fff}Chuchote%c{}! The objective of the game is to figure out who murdered your friend ' + 
        '%s. Once you believe that you know who the murderer was, present your evidence to ' +
        'the %c{#fff}town sheriff%c{} %s.', Game.victim, Game.sheriff);
    y += Game.display.drawText(1, y, message, Game.SCREEN_WIDTH - 2) + 1;
  } else {
    // TODO
  }

  Game.display.drawText(1, y, '- To move your character, use %c{#fff}arrow keys%c{} or the %c{#fff}numpad%c{}.')
  y += 2;
  Game.display.drawText(1, y, '- To interrogate or talk to another character, %c{#fff}walk%c{} into them.')
  y += 2;
  Game.display.drawText(1, y, '- To examine an object, %c{#fff}walk%c{} into it.')
  y += 2;
  Game.display.drawText(1, y, "- To view the list of facts you've discovered, %c{#fff}press f%c{}.")
  y += 2;
};
