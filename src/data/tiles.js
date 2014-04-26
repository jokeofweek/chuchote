var Tiles = new Repository(Tile);

Tiles.add('grass', {
  'symbol': [',','.'],
  'color': [[34, 139, 34], 15]
});

Tiles.add('torch', {
  'symbol': 'φ',
  'color': [255, 153, 0],
  'light': [[300, 200, 0], 50],
  'blockMovement': true
});

Tiles.add('stone-wall', {
  'symbol': '#',
  'color': [170, 170, 190],
  'blockMovement': true
});

Tiles.add('wooden-gate', {
  'symbol': '-',
  'color': [205, 133, 63],
  'blockMovement': true
});

Tiles.add('road', {
  'symbol': '░',
  'color': [150, 150, 150]
});