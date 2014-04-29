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


Tiles.add('lamp', {
  'symbol': 'Y',
  'color': [255, 153, 0],
  'light': [[150, 100, 0], 50],
  'blocksMovement': true,
  'blockMessage': [
    'You bump into a lamp.',
    'You stop yourself before you hit the lamp.'
  ] 
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

Tiles.add('bloody-grass', {
  'extends': 'grass',
  'color': [[125, 0, 0], 35]
})

Tiles.add('bloody-road', {
  'extends': 'road',
  'color': [[125, 0, 0], 35]
})

Tiles.add('victim', {
  'symbol': '@',
  'blocksMovement': true
})

Tiles.add('door', {
  'symbol': '+',
  'color': [205, 133, 63]
});

Tiles.add('counter', {
  'symbol': '≡',
  'color': [205, 133, 63],
  'blocksMovement': true,
  'blockMessage': [
    "A counter blocks the way.",
    "Ouch - you hit your hip on the counter.",
    "It's a wooden counter."
  ]
});

Tiles.add('stool', {
  'symbol': '⌐',
  'color': [235, 163, 93]
});

Tiles.add('table', {
  'symbol': '┬',
  'color': [205, 133, 63],
  'blocksMovement': true,
  'blockMessage': [
    "It's a table.",
    "Ouch - you walk right into the table.",
    "It's a wooden table."
  ]
});

Tiles.add('bottles-left', {
  'symbol': '╚',
  'blocksMovement': true,
  'color': [255, 255, 255],
  'blockMessage': "It's the end of a shelf."
});

Tiles.add('bottles-right', {
  'symbol': '╝',
  'blocksMovement': true,
  'color': [255, 255, 255],
  'blockMessage': "It's the end of a shelf."
});

Tiles.add('bottles', {
  'symbol': ['═', '╧', '╩'],
  'blocksMovement': true,
  'color': [255, 255, 255],
  'blockMessage': function() {
    if (this.getSymbol() == '═') {
      return "It's an empty shelf.";
    } else {
      return "It's a shelf with an assortment of glass bottles.";
    }
  }
});


Tiles.add('icon', {
  'blocksLight': true,
  'blocksMovement': true,
  'permanent': true
})

Tiles.add('icon-house', {
  'extends': 'icon',
  'symbol': '⌂',
  'color': [205, 133, 63]
});

Tiles.add('icon-bar', {
  'extends': 'icon',
  'symbol': 'B',
  'color': [255, 255, 255]
});

Tiles.add('icon-church', {
  'extends': 'icon',
  'symbol': '┼',
  'color': [255, 255, 255]
});

Tiles.add('icon-store', {
  'extends': 'icon',
  'symbol': '$',
  'color': [255, 255, 0]
});

Tiles.add('ground', {
  'symbol': '.',
  'color': [200, 200, 200]
});

Tiles.add('carpet', {
  'symbol': '▓',
  'color': [[180, 0, 0], 10]
});


Tiles.add('pew', {
  'symbol': '═',
  'color': [205, 133, 63],
  'blocksMovement': true,
  'blockMessage': [
    "It's a pew.",
    "Ouch - you walk into a pew.",
    "The pew is blocking your way."
  ]
});

Tiles.add('pew-left', {
  'extends': 'pew',
  'symbol': '╘'
});

Tiles.add('pew-right', {
  'extends': 'pew',
  'symbol': '╛'
});

Tiles.add('water', {
  'symbol': '≈',
  'color': [[150, 150, 245], 30]
});

Tiles.add('statue', {
  'symbol': 'δ',
  'color': [153, 50, 204]
});

Tiles.add('fountain', {
  'symbol': '#',
  'blocksMovement': true,
  'color': [100, 100, 100],
  'blockMessage': [
    "You see a fountain with a statue in the center.",
    "It's a fountain.",
    "Should have brought a coin to throw in!",
    "Careful, you don't want to fall into the fountain."
  ]
});

Tiles.add('fence', {
  'symbol': '-',
  'blocksMovement': true,
  'color': [210, 105, 30],
  'blockMessage': [
    "A fence is blocking your way.",
    "You bump into a fence.",
  ]
});

Tiles.add('gravestone', {
  'symbol': '∩',
  'color': [[200, 200, 200], 30],
  'blocksMovement': true,
  'ctor': 'Tile.Gravestone'
})