function LoadingScreen() {
  Screen.call(this);
};
LoadingScreen.extend(Screen);

/**
 * @override
 */
LoadingScreen.prototype._enter = function() {
  this.tasks = [
    ['Building town...', this._buildTown.bind(this)],
    ['Creating characters...', CharManager.createCharacters.bind(CharManager)],
    ['Simulating feelings...', CharManager.setupFeelings.bind(CharManager)]
  ];
  this.totalTasks = this.tasks.length;

  window.setTimeout(this.doTask.bind(this), 1);
};

/**
 * @override
 */
LoadingScreen.prototype._exit = function() {
  clearTimeout(this._animationTimer);
};

/**
 * Performs the next task in line, refreshing the screen at the same time.
 */
LoadingScreen.prototype.doTask = function() {

  // If no tasks left, then fulfill the promise to go to next screen
  if (this.tasks.length == 0) {
    this._promise.fulfill();
    return;
  }

  Game.display.clear();

  // Render the title
  var textColor = ROT.Color.interpolate([255, 255, 255], [255, 0, 0], (1 - (this.tasks.length / this.totalTasks)));
  var title = "Chuchote";
  var y = Game.SCREEN_HEIGHT / 2 - 7;
  Game.display.drawText(Game.SCREEN_WIDTH / 2 - Math.floor(title.length / 2), y, "%c{rgb(" + textColor.join(',') + ")}" + title);
  y += 4;

  // Render current task
  var currentTask = this.tasks.shift();
  Game.display.drawText(Game.SCREEN_WIDTH / 2 - Math.round(currentTask[0].length / 2), y, currentTask[0]);
  y += 2;

  // Render progress bar
  var totalBars = 20;
  var progress = Math.round((((this.totalTasks - this.tasks.length - 1) / this.totalTasks) * totalBars));
  var left = Game.SCREEN_WIDTH / 2 - (totalBars / 2);
  for (var i = 0; i < totalBars; i++) {
    Game.display.draw(left + i, y, ' ', null, ROT.Color.toRGB((i < progress) ? [255, 255, 255] : [35, 35, 35]));
  }

  // Perform the task
  window.setTimeout(function() {
    currentTask[1]();
    this.doTask();
  }.bind(this), 2000);
};

LoadingScreen.prototype._buildTown = function() {
  // Set up the level
  Levels.town = new Level.Town()
};