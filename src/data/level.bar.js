Level.Bar = function() {
  Level.Template.call(this);

  // Setup lighting
  this._hasFog = false;
};
Level.Bar.extend(Level.Template);

/**
 * @override
 */
Level.Bar.prototype._getTemplate = function() {
  return [
    "#################",
    "#^LBBBBBBBBBBBR^#",
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
 * @override
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
    'b': 'right-chair',
    'L': 'bottles-left',
    'R': 'bottles-right',
    'B': 'bottles'
  };

  if (map[symbol]) {
    return Tiles.build(map[symbol]);
  }

  if (symbol == '+') {
    // Get the warp position from the town
    return Tiles.build('door', {'warp': ['town', 'doorfront-bar']});
  } else if (symbol == '@') {
    return Tiles.build('ground', {'id': 'warp-destination'});
  }

  // for now...
  return Tiles.build('ground');
};