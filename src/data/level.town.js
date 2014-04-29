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

Level.Town.prototype._generateBuilding = function(left, top, lotWidth, lotHeight, icon) {
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

  // Place the door randomly
  var doorX = ROT.RNG.getUniformInt(0, buildingWidth - 3);
  this.setTile(left + leftOffset + doorX + 1, bottomWallY, Tiles.build('door'));
  // Carve path down from door
  var pathX = left + leftOffset + doorX + 1;
  for (var y = bottomWallY + 1; y < top + topOffset + lotHeight; y++) {
    this.setTile(pathX, y, Tiles.build('road'));
    // Chance of perturbing the path
    if (ROT.RNG.getUniform() < 0.2) {
      pathX += (ROT.RNG.getUniformInt(1, 2) == 1 ? -1 : 1);
      this.setTile(pathX, y, Tiles.build('road'));
    }
  }

  // Place an icon in the center
  var icon = icon || ['icon-bar', 'icon-church', 'icon-house', 'icon-store'].random();
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
Level.prototype._getLotPosition = function(group, index, lotWidth) {
  switch (group) {
    case 0: return [4 + (index * lotWidth), 4];
    case 1: return [Game.MAP_WIDTH / 2 + 1 + (i * lotWidth), 4];
    case 2: return [4 + (i * lotWidth), Game.MAP_HEIGHT / 2 + 1];
    case 3: return [Game.MAP_WIDTH / 2 + 1 + (i * lotWidth), Game.MAP_HEIGHT / 2 + 1];
    default: throw new Error('Invalid position.');
  }
};

Level.prototype._placeBuildings = function() {
  var lotsWidth = 44;
  var totalLots = 4;
  var lotWidth = lotsWidth / totalLots;
  var lotHeight = 6;

  // Pick random locations for the bar and the church
  var barLocation = [ROT.RNG.getUniformInt(0, 3), ROT.RNG.getUniformInt(0, 2)];
  var churchLocation;
  do {
    churchLocation = [ROT.RNG.getUniformInt(0, 3), ROT.RNG.getUniformInt(0, 2)]
  } while (churchLocation[0] != barLocation[0]);


  for (var i = 0; i < totalLots; i++) {
    for (var group = 0; group < 4; group++) {
      var position = this._getLotPosition(group, i, lotWidth);
      this._generateBuilding(position[0], position[1], lotWidth, lotHeight):
    }
  }
};