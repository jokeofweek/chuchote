Level.Church = function() {
  Level.Template.call(this);

  // Setup lighting
  this._hasFog = false;
};
Level.Church.extend(Level.Template);

/**
 * @override
 */
Level.Church.prototype._getTemplate = function() {
  return [
    "###############",
    "#.....---.....#",
    "#.....---.....#",
    "#.....---.....#",
    "#{===}---{===}#",
    "#.....---.....#",
    "#{===}---{===}#",
    "#.....---.....#",
    "#{===}---{===}#",
    "#.....---.....#",
    "#{===}---{===}#",
    "#.....---.....#",
    "#{===}---{===}#",
    "######---######",
    "   #..---..#   ",
    "   #..---..#   ",
    "   #..-@-..#   ",
    "   ####+####   ",
  ];
};

/**
 * @override
 */
Level.Church.prototype._mapTile = function(symbol) {
  var map = {
    ' ': 'out-of-bounds',
    '#': 'stone-wall',
    '.': 'ground',
    '-': 'carpet',
    '=': 'pew',
    '{': 'pew-left',
    '}': 'pew-right'
  };

  if (map[symbol]) {
    return Tiles.build(map[symbol]);
  }

  if (symbol == '+') {
    // Get the warp position from the town
    var warpPosition = Level.unkey(Levels.town.getTileKeyById('doorfront-church'));
    return Tiles.build('door', {
      'warp': [warpPosition[0], warpPosition[1], 'town']
    });
  } else if (symbol == '@') {
    return Tiles.build('carpet', {'id': 'warp-destination'});
  }

  // for now...
  return Tiles.build('ground');
};