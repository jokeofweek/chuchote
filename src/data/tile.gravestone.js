Tile.Gravestone = function(template) {
  // Generate the block message.
  var person = NameGenerator.generate();
  template['blockMessage'] = 
    String.format("Here lies %s. %s died %s.",
      person.name,
      person.male ? 'He' : 'She',
      Tile.Gravestone.causes.shift());
  Tile.call(this, template);
};
Tile.Gravestone.extend(Tile);

Tile.Gravestone.causes = shuffle(["after choking on a glass of water",
  "after eating a bad piece of cheese",
  "after walking into the building walls too often",
  "of a heart attack",
  "due to Witzelsucht. It was a grave problem",
  "after teasing a bear",
  "after tripping on the town fountain"]);