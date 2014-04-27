CharManager = {
  characters: {},
  rolePlayers: {},
  // Every character has a feeling matrix, defining how they feel in general
  // about another character. This feeling is quantified by the range [-100, 100]
  // where -100 represents hate and 100 represents positive.
  feelings: {}, 
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
      var person = NameGenerator.generate(roles[i].color);
      person.role = roles[i].role;
      
      // Add the character by name and role
      this.characters[person.name] = person;
      this.rolePlayers[person.role] = person;
    }
  },
  setupFeelings: function() {
    // Establish neutral feelings to begin with.
    for (var k in this.characters) {
      this.feelings[k.name] = {};
      for (var k2 in this.characters) {
        this.feelings[k.name][k2.name] = 0;
      }
      // Add a neutral feeling for the player
      this.feelings[k.name].player = 0;
    }
  }
};