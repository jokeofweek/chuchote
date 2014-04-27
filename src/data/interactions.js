var Interactions = {};

Interactions['smallConflict'] = {
  charactersInvolved: 2,
  postEffect: function(char1, char2) {
    char1.changeFeeling(char2, ROT.RNG.getUniformInt(-1, -3));
    char2.changeFeeling(char1, ROT.RNG.getUniformInt(-1, -3));
  }
};

Interactions['happyEncounter'] = {
  charactersInvolved: 2,
  postEffect: function(char1, char2) {
    char1.changeFeeling(char2, ROT.RNG.getUniformInt(1, 10));
    char2.changeFeeling(char1, ROT.RNG.getUniformInt(1, 10));
  }
};

Interactions['enterRelationship'] = {
  charactersInvolved: 2,
  preCondition: function(char1, char2) {
    // Require positive feelings?
    if (char1.getFeelings(char2) < 25) return false;
    if (char2.getFeelings(char1) < 25) return false;
    // If a character is in a relationship, they should like this new character more
    if (char1.getSignificantOther() && char1.getFeelings(char1.getSignificantOther()) >= char1.getFeelings(char2)) return false;
    if (char2.getSignificantOther() && char2.getFeelings(char2.getSignificantOther()) >= char1.getFeelings(char1)) return false;
    return char1.getSignificantOther() != char2;
  },
  postEffect: function(char1, char2) {
    // If a character is already in a relationship with someone else, we have to add a separate interaction
    // TODO: Handle end relationship when married
    if (char1.getSignificantOther()) CharManager.simulateInteraction('bitterEndRelationship', [char1]);
    if (char2.getSignificantOther()) CharManager.simulateInteraction('bitterEndRelationship', [char2]);

    // Boost feelings
    char1.changeFeeling(char2, ROT.RNG.getUniformInt(5, 15));
    char2.changeFeeling(char1, ROT.RNG.getUniformInt(5, 15));

    // Update significant other status
    char1.setSignificantOther(char2);
    char2.setSignificantOther(char1);
  }
};

Interactions['bitterEndRelationship'] = {
  charactersInvolved: 1,
  preCondition: function(ender) {
    return ender.getSignificantOther() && !ender.isMarried();
  },
  postEffect: function(ender) {
    var other = ender.getSignificantOther();

    ender.changeFeeling(other, ROT.RNG.getUniformInt(-5, -15));
    other.changeFeeling(ender, ROT.RNG.getUniformInt(-20, -30));

    ender.setSignificantOther(null);
    other.setSignificantOther(null);

    // TODO: If there are children, maybe negatively impact?
  }
};

// Add the interaction key to the object for easy reverse lookups
for (var k in Interactions) {
  Interactions[k].key = k;
}