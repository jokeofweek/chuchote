var Game = {
  init: function() {
    window.addEventListener('load', this);
  },
  handleEvent: function(e) {
    switch(e.type) {
      case 'load':
        // Load only happens once.
        window.removeEventListener('load', this);
        // Initial page load - create the display and start the introduction.
        this.display = new ROT.Display({
          width: 80,
          height: 24,
          fontFamily: "droid sans mono, monospace",
          spacing: 1.1,
          fg: "#aaa"
        });
        document.body.appendChild(this.display.getContainer());
        // Set up the automatic resizing
        window.addEventListener('resize', this);
        // Initial resize
        this.resize();
        // Enter the game screen
        new StartScreen().enter().then(function() {
          new GameScreen().enter();
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
  }
}