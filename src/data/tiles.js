var Tiles = new Repository(Tile);

Tiles.add('out-of-bounds', {
  'symbol': ' ',
  'color': 'black',
  'blocksMovement': true,
  'blocksLight': true
})

Tiles.add('grass', {
  'symbol': [',','.'],
  'color': [[34, 139, 34], 15]
});

Tiles.add('torch', {
  'symbol': 'φ',
  'color': [255, 153, 0],
  'light': [[300, 200, 0], 50],
  'blocksMovement': true
});

Tiles.add('weak-torch', {
  'extends': 'torch',
  'light': [[150, 100, 0], 50]
});

Tiles.add('stone-wall', {
  'symbol': '#',
  'color': [170, 170, 190],
  'blocksMovement': true,
  'blocksLight': true
});

Tiles.add('wooden-gate', {
  'symbol': '-',
  'color': [205, 133, 63],
  'blocksMovement': true
});

Tiles.add('road', {
  'symbol': '░',
  'color': [150, 150, 150]
});

Tiles.add('window', {
  'symbol': '#',
  'color': '#0099CC'
});

Tiles.add('door', {
  'symbol': '⌂',
  'color': [205, 133, 63]
});