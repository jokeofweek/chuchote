var Tiles = new Repository(Tile);

Tiles.add('grass', {
  'symbol': [',','.'],
  'color': [[34, 139, 34], 15]
});

Tiles.add('fire', {
  'symbol': 'X',
  'color': [255, 153, 0]
});

Tiles.add('stone-wall', {
  'symbol': '#',
  'color': [170, 170, 190]
});


Tiles.add('wooden-gate', {
  'symbol': '-',
  'color': [205, 133, 63]
});