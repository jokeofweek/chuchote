CharManager = {
  characters: {},
  rolePlayers: {},
  createCharacters: function() {
    var roles = [
        {role:'victim', color: [255, 0, 0]}, 
        {role:'sheriff', color: [144, 238, 144]}, 
        {role:'priest'}, 
        {role:'bartender'},
        {role:'merchant'}, 
        {role:'homeless'}];
    // Generate characters for each role
    for (var i = 0; i < roles.length; i++) {
      var template = NameGenerator.generate(roles[i].color);
      template.role = roles[i].role;

      // Create the character
      var character = new Character(template);
      
      // Add the character by name and role
      this.characters[character.getName()] = character;
      this.rolePlayers[character.getRole()] = character;
    }
  },
  setupFeelings: function() {
    // Establish neutral feelings to begin with.
    for (var k in this.characters) {
      for (var k2 in this.characters) {
        this.characters[k].setFeelings(k2, 0);
      }
      // Add a neutral feeling for the player
      this.characters[k].setFeelings('player', 0);
    }
  }
};