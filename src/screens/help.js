function HelpScreen(first) {
  Screen.call(this);
  this._first = first;
};
HelpScreen.extend(Screen);

/**
 * @override
 */
HelpScreen.prototype.handleEvent = function(e) {
  // Close the screen after hitting enter.
  if (e.keyCode == 13) {
    e.preventDefault();
    this._promise.fulfill();
  }
};

/**
 * @override
 */
HelpScreen.prototype.render = function() {
  var y = 1;
  // Render the header
  if (this._first) {
    var message = String.format('Welcome to %c{#fff}Chuchote%c{}! The objective of the game is to figure out who murdered your friend ' + 
        '%s. Once %c{#fff}you (@) %c{} believe that you know who the murderer was, present your evidence to ' +
        'the %c{#fff}town sheriff%c{} %s. When you are ready to play, press %c{#fff}Enter%c{}.', 
         CharManager.rolePlayers.victim,  CharManager.rolePlayers.sheriff);
    y += Game.display.drawText(1, y, message, Game.SCREEN_WIDTH - 2) + 1;
  } else {
    var message = 'Help';
    Game.display.drawText(Game.SCREEN_WIDTH / 2 - message.length / 2, y, '%c{#fff}' + message);
    y += 2;
    Game.display.drawText(1, y, 'Press %c{#fff}Enter%c{} to return to the game.')
    y += 2;
  }

  Game.display.drawText(1, y, '- To move your character, use %c{#fff}arrow keys%c{} or the %c{#fff}numpad%c{}.')
  y += 2;
  Game.display.drawText(1, y, '- To interrogate or talk to another character, %c{#fff}walk%c{} into them.')
  y += 2;
  Game.display.drawText(1, y, '- To examine an object, %c{#fff}walk%c{} into it.')
  y += 2;
  Game.display.drawText(1, y, "- To view the list of facts you've discovered, %c{#fff}press f%c{}.")
  y += 2;
  Game.display.drawText(1, y, "- To view this screen again, %c{#fff}press ?%c{}.")
  y += 4;

  var text = 'Useful Icons'
  Game.display.drawText(Game.SCREEN_WIDTH / 2 - text.length / 2, y, '%c{#fff}' + text);
  y += 2;

  Game.display.drawText(2, y, String.format("%rep - Bar", Tiles.build('icon-bar')))
  Game.display.drawText(2, y + 1, String.format("%rep - Church", Tiles.build('icon-church')));
  Game.display.drawText(2, y + 2, String.format("%rep - Store", Tiles.build('icon-store')));
  Game.display.drawText(2, y + 3, String.format("%rep - House", Tiles.build('icon-house')));
};

