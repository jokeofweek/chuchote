Level.Bar = function() {
  Level.call(this);

  // Setup lighting
  this._hasFog = false;
};
Level.Bar.extend(Level);

Level.Bar.prototype._setupTiles = function() {
  var outOfBounds = Tiles.build('out-of-bounds')

  // We want to center the template
  var template = this._getTemplate();
  var templateWidth = template[0].length;
  var templateHeight = template.length;
  var offsetX = Math.floor(Game.MAP_WIDTH / 2 - templateWidth / 2);
  var offsetY = Math.floor(Game.MAP_HEIGHT / 2 - templateHeight / 2);

  for (var x = 0; x < Game.MAP_WIDTH; x++) {
    for (var y = 0; y < Game.MAP_HEIGHT; y++) {
      if (x < offsetX || x >= offsetX + templateWidth || 
          y < offsetY || y >= offsetY + templateHeight) {
        this.setTile(x, y, outOfBounds);
      } else {
        this.setTile(x, y, this._mapTile(template[y - offsetY][x - offsetX]));
      }
    }
  }
};

/**
 * The string template for the level.
 * @return {array} The string template.
 */
Level.Bar.prototype._getTemplate = function() {
  return [
    "#################",
    "#^bbbbbbbbbbbbb^#",
    "#...............#",
    "#========..=====#",
    "#ssssssss..sssss#",
    "#...............#",
    "#...............#",
    "#........@......#",
    "#########+#######",
  ];
};

/**
 * Maps a symbol on the template to a tile.
 * @param  {char} symbol The symbol on the template.
 * @return {Tile}        the corresponding tile.
 */
Level.Bar.prototype._mapTile = function(symbol) {
  if (symbol == '+') {
    return Tiles.build('door');
  } else if (symbol == '@') {
    return Tiles.build('grass', {'id': 'warp-destination'});
  } else {
    return Tiles.build('grass');
  }
};