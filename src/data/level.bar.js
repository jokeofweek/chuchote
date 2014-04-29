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
    "#^BBBBBBBBBBBBB^#",
    "#...............#",
    "#========..=====#",
    "#s.s.s.s...s.s.s#",
    "#...............#",
    "#............T..#",
    "#..T..T......T..#",
    "#...............#",
    "#..T.........T..#",
    "#^.......@.....^#",
    "#########+#######",
  ];
};

/**
 * Maps a symbol on the template to a tile.
 * @param  {char} symbol The symbol on the template.
 * @return {Tile}        the corresponding tile.
 */
Level.Bar.prototype._mapTile = function(symbol) {
  var map = {
    '#': 'stone-wall',
    '^': 'lamp',
    '=': 'counter',
    's': 'stool',
    '.': 'ground',
    'd': 'left-chair',
    'T': 'table',
    'b': 'right-chair'
  };

  if (map[symbol]) {
    return Tiles.build(map[symbol]);
  }

  if (symbol == '+') {
    // Get the warp position from the town
    var warpPosition = Level.unkey(Levels.town.getTileKeyById('doorfront-bar'));
    return Tiles.build('door', {
      'warp': [warpPosition[0], warpPosition[1], 'town']
    });
  } else if (symbol == '@') {
    return Tiles.build('ground', {'id': 'warp-destination'});
  }

  // for now...
  return Tiles.build('ground');
};