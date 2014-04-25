var Game = {
  MAP_WIDTH: 80,
  MAP_HEIGHT: 24,
  TEXT_HEIGHT: 3,
  currentLevel: null,
  victim: null,
  sheriff: null,
  gameScreen: null,
  init: function() {
    window.addEventListener('load', this);
  },
  handleEvent: function(e) {
    switch(e.type) {
      case 'load':
        // Load only happens once.
        window.removeEventListener('load', this);
        // Initial page load - create the display and start the introduction.
        this.SCREEN_WIDTH = this.MAP_WIDTH;
        this.SCREEN_HEIGHT = this.MAP_HEIGHT + this.TEXT_HEIGHT;
        this.display = new ROT.Display({
          width: this.SCREEN_WIDTH,
          height: this.SCREEN_HEIGHT,
          fontFamily: "droid sans mono, monospace",
          spacing: 1.1,
          fg: "#aaa"
        });
        document.body.appendChild(this.display.getContainer());
        // Set up the automatic resizing
        window.addEventListener('resize', this);
        // Initial resize
        this.resize();
        // Initial data
        this.victim = NameGenerator.generate([255, 0, 0]);
        this.sheriff = NameGenerator.generate([144, 238, 144]);
        // Enter the start screen
        new StartScreen().enter().then(function() {
          new HelpScreen(true).enter().then(function() {
            // Switch to game screen
            Game.gameScreen = new GameScreen();
            Game.gameScreen.enter();
            // Set up the level
            Levels.town = new Level.Town();
            Game.switchLevel(Levels.town);
          // Add this error handler to avoid swallowing errors.
          }).then(null, function(e) { console.log(e.stack); })
        });
        break;
      
      case 'resize':
        this.resize();
        break;
    }
  },
  resize: function() {
    // Stolen from Ondrej Zara's Goldfish
    var w = window.innerWidth;
    var h = window.innerHeight;
    var fontSize = this.display.computeFontSize(w, h);
    this.display.setOptions({fontSize:fontSize});

    var node = this.display.getContainer();
    node.style.left = Math.round((w-node.offsetWidth)/2) + "px";
    node.style.top = Math.round((h-node.offsetHeight)/2) + "px";
  },
  switchLevel: function(level) {
    // Exit the old level if there was one
    if (this.currentLevel) {
      this.currentLevel.exit();
    }
    // Clear the screen
    Game.display.clear();
    // Enter the new level
    this.currentLevel = level;
    this.currentLevel.enter();
    // Refresh the game screen
    this.gameScreen.render();
  }
};