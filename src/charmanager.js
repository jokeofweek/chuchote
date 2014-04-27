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
      var person = NameGenerator.generate(roles[i].color);
      person.role = roles[i].role;
      
      // Add the character by name and role
      this.characters[person.name] = person;
      this.rolePlayers[person.role] = person;
    }
  }
};