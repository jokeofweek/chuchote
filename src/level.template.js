/**
 * This is a special level which provides functions for defining
 * a level from a template.
 */
Level.Template = function() {
  Level.call(this);
};
Level.Template.extend(Level);

Level.Template.prototype._setupTiles = function() {
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
Level.Template.prototype._getTemplate = function() {};

/**
 * Maps a symbol on the template to a tile.
 * @param  {char} symbol The symbol on the template.
 * @return {Tile}        the corresponding tile.
 */
Level.Template.prototype._mapTile = function(symbol) {}
