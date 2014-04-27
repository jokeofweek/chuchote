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
        {role:'homeless'},
        {role:'homeless'},
        {role:'wealthy'},
        {role:'wealthy'},
        {role:'wealthy'},
        {role:'wealthy'},
        {role:'villager'},
        {role:'villager'},
        {role:'villager'},
        {role:'villager'},
        {role:'villager'},
        {role:'villager'},
        {role:'villager'},
        {role:'villager'},
        {role:'villager'},
        {role:'poor'},
        {role:'poor'},
        {role:'poor'}];

    // Generate characters for each role
    for (var i = 0; i < roles.length; i++) {
      var template = NameGenerator.generate(roles[i].color);
      template.role = roles[i].role;

      // Create the character
      var character = new Character(template);
      
      // Add the character by name and role
      this.characters[character.getName()] = character;

      // If there is already a character with that role, turn it into an array
      // else we keep a direct reference for convenience (eg. only 1 victim)
      if (this.rolePlayers[character.getRole()]) {
        if (this.rolePlayers[character.getRole()] instanceof Array) {
          this.rolePlayers[character.getRole()].push(character);
        } else {
          this.rolePlayers[character.getRole()] = [
            this.rolePlayers[character.getRole()], character
          ];
        }
      } else {
        this.rolePlayers[character.getRole()] = character;
      }
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
    // Simulate interactions
    var simulatedInteractions = 0;
    var interactionNames = Object.keys(Interactions);
    var characterNames = Object.keys(this.characters);

    // Cache lookup function
    var self = this;
    var lookupCharacter = function(k){ return self.characters[k]; };

    while (simulatedInteractions < 0) {
      // Pick a random interaction
      var interaction = Interactions[interactionNames.random()];
      // Pick prerequisite number of characters
      var chars = shuffle(characterNames).slice(0, interaction.charactersInvolved).map(lookupCharacter);
      // If there is a precondition, make sure it works
      if (interaction.preCondition && !interaction.preCondition.apply(null, chars)) continue;
      // Actually simulate the interaction
      this.simulateInteraction(interaction, chars);
      simulatedInteractions++;
    }
  },
  simulateInteraction: function(interaction, chars) {
    // If we received a key, convert it to the object
    var interaction = (typeof interaction === 'string' ? Interactions[interaction] : interaction);
    // Ensure pre-conditions are met
    if (interaction.preCondition && !interaction.preCondition.apply(null, chars)) {
      throw new Error("Interaction '" + interaction.key + "' precondition not met, but was simulated.");
    }
    console.log("Interaction '" + interaction.key + "' involving " + chars.map(function(c){return c.getName()}).join(','));
    interaction.postEffect.apply(null, chars);
  }
};