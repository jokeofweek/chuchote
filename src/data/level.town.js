Level.Town = function() {
  Level.call(this);

  // Setup lighting
  this._ambientLighting = [130, 130, 130];
};
Level.Town.extend(Level);

Level.Town.prototype._setupTiles = function() {
  for (var x = 0; x < Game.MAP_WIDTH; x++) {
    for (var y = 0; y < Game.MAP_HEIGHT; y++) {
      // Stone wall on the outer edge
      if (x == 0 || y == 0 || x == Game.MAP_WIDTH - 1 || y == Game.MAP_HEIGHT - 1) {
        this.setTile(x, y, Tiles.build('stone-wall'));
      } else {
        this.setTile(x, y, Tiles.build('grass'));
      }
    }
  }

  // Gate at the bottom 4 center tiles
  for (x = 0; x < 4; x++) {
    this.setTile((Game.MAP_WIDTH / 2) - 2 + x, Game.MAP_HEIGHT - 1, Tiles.build('wooden-gate'));
  }

  this._placeRoad();
  this._placeTorches();
  this._placeBuildings();

    // Place the victim
  this.setTile(2, 1, Tiles.build('bloody-grass', {id: 'starting-position'}));
  this.setTile(4, 1, Tiles.build('bloody-grass'));
  this.setTile(3, 2, Tiles.build('bloody-road'));

  // Create the victim and place them
  CharManager.createVictim();
  this.setTile(3, 1, Tiles.build('victim', {
    'color': CharManager.rolePlayers.victim.getColor(),
    'blockMessage': 'You see ' + CharManager.rolePlayers.victim.getName() + ' lying here in a pool of blood.'
  }));
};

Level.Town.prototype._carveRectangle = function(left, top, width, height, innerTile, outerTile) {
  for (var x = left; x < left + width; x++) {
    for (var y = top; y < top + height; y++) {
      if (x == left || x == left + width - 1 || y == top || y == top + height - 1) {
        this.setTile(x, y, Tiles.build(outerTile));
      } else {
        this.setTile(x, y, Tiles.build(innerTile));
      }
    }
  }
};

Level.Town.prototype._generateBuilding = function(left, top, lotWidth, lotHeight, icon, options) {
  var options = options || {};
  var warp = options['warp'] || [3, 3, 'town'];
  var doorfrontId = options['doorfrontId'] || 'doorfront';
  var centeredDoor = options['centeredDoor'] || false;

  // Generate a random width and height
  var buildingWidth = ROT.RNG.getUniformInt(Math.round(lotWidth * 0.6), lotWidth - 2);
  var buildingHeight = ROT.RNG.getUniformInt(Math.round(lotHeight * 0.6), lotHeight - 2);
  var leftOffset = ROT.RNG.getUniformInt(1, lotWidth - buildingWidth);
  var topOffset = ROT.RNG.getUniformInt(1, lotHeight - buildingHeight);
  this._carveRectangle(left + leftOffset, top + topOffset, buildingWidth, buildingHeight, 'out-of-bounds', 'stone-wall');
  
  var bottomWallY =  top + topOffset + buildingHeight - 1;

  // Randomly place windows
  var windows = ROT.RNG.getUniformInt(1, Math.round(buildingWidth * 0.5));
  for (var i = 0; i < windows; i++) {
    // We don't want a window on the corner
    var windowX = ROT.RNG.getUniformInt(0, buildingWidth - 3);
    this.setTile(left + leftOffset + windowX + 1, bottomWallY, Tiles.build('window'));
  }

  // Place the door
  var doorX; 
  if (centeredDoor) {
    doorX = Math.ceil((buildingWidth - 3) / 2);
  } else {
    doorX = ROT.RNG.getUniformInt(0, buildingWidth - 3);
  }
  this.setTile(left + leftOffset + doorX + 1, bottomWallY, Tiles.build('door', {
    "warp": warp
  }));

  // Carve path down from door
  var pathX = left + leftOffset + doorX + 1;
  var firstRoad = true;
  for (var y = bottomWallY + 1; y < top + topOffset + lotHeight; y++) {
    // If it is the first road, add the door front ID
    if (firstRoad) {
      this.setTile(pathX, y, Tiles.build('road', {'id': doorfrontId}));  
      firstRoad = false;
    } else {
      this.setTile(pathX, y, Tiles.build('road'));  
    }
    // Chance of perturbing the path
    if (ROT.RNG.getUniform() < 0.2) {
      pathX += (ROT.RNG.getUniformInt(1, 2) == 1 ? -1 : 1);
      this.setTile(pathX, y, Tiles.build('road'));
    }
  }

  // Place an icon in the center
  this.setTile(Math.floor(left + leftOffset + buildingWidth / 2), 
      Math.floor(top + topOffset - 1 + buildingHeight / 2), Tiles.build(icon));
};

Level.Town.prototype._placeRoad = function() {
  for (var x = 2; x < Game.MAP_WIDTH - 2; x++) {
    this.setTile(x, 2, Tiles.build('road'));
    this.setTile(x, 3, Tiles.build('road'));
    this.setTile(x, Game.MAP_HEIGHT / 2, Tiles.build('road'));
    this.setTile(x, -1 + Game.MAP_HEIGHT / 2, Tiles.build('road'));
    this.setTile(x, Game.MAP_HEIGHT - 3, Tiles.build('road'));
    this.setTile(x, Game.MAP_HEIGHT - 4, Tiles.build('road'));
  }
  for (var y = 4; y < Game.MAP_HEIGHT - 4; y++) {
    this.setTile(2, y, Tiles.build('road'));
    this.setTile(3, y, Tiles.build('road'));
    this.setTile(Game.MAP_WIDTH / 2, y, Tiles.build('road'));
    this.setTile(-1 + Game.MAP_WIDTH / 2, y, Tiles.build('road'));
    this.setTile(Game.MAP_WIDTH - 3, y, Tiles.build('road'));
    this.setTile(Game.MAP_WIDTH - 4, y, Tiles.build('road'));
  }

  this.setTile(Game.MAP_WIDTH / 2, Game.MAP_HEIGHT - 2, Tiles.build('road'));
  this.setTile(-1 + Game.MAP_WIDTH / 2, Game.MAP_HEIGHT - 2, Tiles.build('road'));
};

Level.Town.prototype._placeTorches = function() {
  // Place torches
  this.setTile(1, 1, Tiles.build('torch'));
  this.setTile(Game.MAP_WIDTH - 2, 1, Tiles.build('torch'));
  this.setTile(1, Game.MAP_HEIGHT - 2, Tiles.build('torch'));
  this.setTile(Game.MAP_WIDTH - 2, Game.MAP_HEIGHT - 2, Tiles.build('torch'));
  this.setTile(Game.MAP_WIDTH / 2 - 2, Game.MAP_HEIGHT / 2 - 2, Tiles.build('weak-torch'));
  this.setTile(Game.MAP_WIDTH / 2 + 1, Game.MAP_HEIGHT / 2 - 2, Tiles.build('weak-torch'));
  this.setTile(Game.MAP_WIDTH / 2 - 2, Game.MAP_HEIGHT / 2 + 1, Tiles.build('weak-torch'));
  this.setTile(Game.MAP_WIDTH / 2 + 1, Game.MAP_HEIGHT / 2 + 1, Tiles.build('weak-torch'));
  this.setTile(Game.MAP_WIDTH / 2 + 1, Game.MAP_HEIGHT - 2, Tiles.build('weak-torch'));
  this.setTile(-2 + Game.MAP_WIDTH / 2, Game.MAP_HEIGHT - 2, Tiles.build('weak-torch'));
};

/**
 * Calculates the position of a given building lot.
 * @param  {int} group    The group to which the lot belongs to. The groups are indexed
 *                        as follows:
 *                        0 1
 *                        2 3
 * @param  {int} index    The index of the lot within the group, from left to right.
 * @param  {int} lotWidth The width of the lot
 * @return {array}          The x and y coordinate of the top left point of the lot.
 */
Level.Town.prototype._getLotPosition = function(group, index, lotWidth) {
  switch (group) {
    case 0: return [4 + (index * lotWidth), 4];
    case 1: return [Game.MAP_WIDTH / 2 + 1 + (index * lotWidth), 4];
    case 2: return [4 + (index * lotWidth), Game.MAP_HEIGHT / 2 + 1];
    case 3: return [Game.MAP_WIDTH / 2 + 1 + (index * lotWidth), Game.MAP_HEIGHT / 2 + 1];
    default: throw new Error('Invalid position.');
  }
};

/**
 * Selects a random position for a special building in the list of available positions.
 * @param  {array} availablePositions An array of [group, slot] values.
 * @param  {int} width              The width of the building
 * @return {array}                    The position of the left-most slot to build in.
 */
Level.Town.prototype._getRandomPosition = function(availablePositions, width) {
  var position;
  while (true) {
    position = availablePositions.random();
    // Make sure we can fit the building by ensuring the slots
    // are all free.
    if (position[1] + (width - 1) >= 4) continue;
    for (var i = 2; i <= width; i++) {
      var found = false;
      for (var p = 0; p < availablePositions.length; p++) {
        if (availablePositions[p][0] == position[0] && availablePositions[p][1] == position[1] + (i - 1)) {
          found = true;
          break;
        }
      }
      if (!found) continue;
    }
    // Found one! 
    break;
  }
  // Remove the used slots from availablePositions
  for (var i = availablePositions.length - 1; i >= 0; i--) {
    if (availablePositions[i][0] == position[0] && availablePositions[i][1] >= position[1] &&
        availablePositions[i][1] < position[1] + width) {
      availablePositions.splice(i, 1);
    }
  }
  return position;
};

/**
 * This places a centered template on a given lot.
 * @param  {int} group         The group.
 * @param  {int} index         The index.
 * @param  {int} lotWidth      The general lot width.
 * @param  {int} buildingWidth The width that this building will take up (eg. multi-lot buildings)
 * @param  {int} lotHeight     The general lot height
 * @param  {array} template      An array of strings representing the template
 * @param  {function(string):Tile?} mapperFn      A function maps symbols to tiles in the template.
 */
Level.Town.prototype._placeCenteredTemplate = function(group, index, lotWidth, buildingWidth, lotHeight, template, mapperFn) {
  // Get the center of the lot.
  var center = this._getLotPosition(group, index, lotWidth);
  center[0] += Math.round(buildingWidth / 2);
  center[1] += Math.round(lotHeight / 2);

  var offsetX = center[0] - Math.floor(template[0].length / 2);
  var offsetY = center[1] - Math.floor(template.length / 2);

  for (var y = 0; y < template.length; y++) {
    for (var x = 0; x < template[0].length; x++) {
      var tile = mapperFn(template[y][x]);
      if (tile) {
        this.setTile(offsetX + x, offsetY + y, tile);
      }
    }
  }
};

Level.Town.prototype._placeChurch = function(group, index, lotWidth, lotHeight) {
  var template = [
  "#########──────┐",
  "#       #g.g.g.│",
  "#   t   #......│",
  "#       #g.g.g.│",
  "#### ####══════╛",
  "...#+#..........",
  "....r..........."
  ];
  this._placeCenteredTemplate(group, index, lotWidth, lotWidth * 2, lotHeight, template, function(symbol) {
    switch (symbol) {
      case '#': return Tiles.build('stone-wall');
      case 't': return Tiles.build('icon-church');
      case ' ': return Tiles.build('out-of-bounds');
      case 'g': return Tiles.build('gravestone');
      case '+': return Tiles.build('door', {warp: 'church'});
      case 'r': return Tiles.build('road', {id: 'doorfront-church'});
      case '.': return;
      default: return Tiles.build('fence', {symbol: symbol});
    }
  });
};

/**
 * Places a fountain at a given lot
 * @param  {int} group The lot group.
 * @param  {int} index The lot index.
 * @param {int} lotWidth The lot width
 * @param {int} lotHeight The lot height
 */
Level.Town.prototype._placeFountain = function(group, index, lotWidth, lotHeight) {
  var template = [
    ".╔═══╗.",
    "╔╝~~~╚╗",
    "║~~S~~║",
    "╚╗~~~╔╝",
    ".╚═══╝."
  ];

  this._placeCenteredTemplate(group, index, lotWidth, lotWidth, lotHeight, template, function(symbol) {
    switch(symbol) {
      case '.': return;
      case 'S': return Tiles.build('statue');
      case '~': return Tiles.build('water');
      default: return Tiles.build('fountain', {symbol: symbol});
    }
  });
};

Level.Town.prototype._placeBuildings = function() {
  var lotsWidth = 44;
  var totalLots = 4;
  var lotWidth = lotsWidth / totalLots;
  var lotHeight = 6;

  // Generate the set of available positions
  var availablePositions = [];
  for (var g = 0; g < 4; g++) {
    for (var i = 0; i < 4; i++) {
      availablePositions.push([g, i]);
    }
  }

  // Pick random locations for the bar and the church. The locations are
  // described by [group, index]. Index can not be the last tile as we want
  // to make the bar and the church 2 lots wide. We finally need to pick a
  // store location.
  var barLocation = this._getRandomPosition(availablePositions, 2);
  var churchLocation = this._getRandomPosition(availablePositions, 2);
  var storeLocation = this._getRandomPosition(availablePositions, 1);
  var fountainLocation = this._getRandomPosition(availablePositions, 1);

  // Build the special buildings
  var position = this._getLotPosition(barLocation[0], barLocation[1], lotWidth);
  this._generateBuilding(position[0], position[1], lotWidth * 2, lotHeight, 'icon-bar', {
    'warp': 'bar', 
    'doorfrontId': 'doorfront-bar',
    'centeredDoor': true
  });

  this._placeChurch(churchLocation[0], churchLocation[1], lotWidth, lotHeight);

  position = this._getLotPosition(storeLocation[0], storeLocation[1], lotWidth);
  this._generateBuilding(position[0], position[1], lotWidth, lotHeight, 'icon-store');

  this._placeFountain(fountainLocation[0], fountainLocation[1], lotWidth, lotHeight);

  // Build houses on the remaining locations
  for (var l = 0; l < availablePositions.length; l++) {
    position = this._getLotPosition(availablePositions[l][0], availablePositions[l][1], lotWidth);
    this._generateBuilding(position[0], position[1], lotWidth, lotHeight, 'icon-house');
  }
};