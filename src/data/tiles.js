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
  'blocksMovement': true,
  'blockMessage': [
    'You bump into a torch.',
    "The torch looks warm - probably shouldn't walk into it.",
    'You stop yourself before you hit the torch.'
  ] 
});

Tiles.add('weak-torch', {
  'extends': 'torch',
  'light': [[150, 100, 0], 50]
});

Tiles.add('stone-wall', {
  'symbol': '#',
  'color': [170, 170, 190],
  'blocksMovement': true,
  'blocksLight': true,
  'blockMessage': [
    'You bump into a stone wall.',
    'Ouch - you walk face-first into a stone wall.',
    "It's a cold, stone wall."
  ]
});

Tiles.add('wooden-gate', {
  'symbol': '-',
  'color': [205, 133, 63],
  'blocksMovement': true,
  'blockMessage': 'The gate to the rest of the city is closed.'
});

Tiles.add('road', {
  'symbol': '░',
  'color': [150, 150, 150]
});

Tiles.add('window', {
  'symbol': '#',
  'color': '#0099CC',
  'blocksMovement': true,
  'blocksLight': true,
  'blockMessage': "It's a window - you can't quite make out what's inside."
});

Tiles.add('door', {
  'symbol': '⌂',
  'color': [205, 133, 63]
});