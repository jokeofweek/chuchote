function Character(template) {
	this._name = template['name'];
  this._role = template['role'];
  this._male = template['male'];
  this._color = template['color'];
  // Every character has a feeling matrix, defining how they feel in general
  // about another character. This feeling is quantified by the range [-100, 100]
  // where -100 represents hate and 100 represents positive.
  this._feelings = {};
  this._significantOther = null;
  this._isMarried = false;
};

Character.prototype.getName = function() { return this._name; };
Character.prototype.getRole = function() { return this._role; };
Character.prototype.isMale = function() { return this._male; };
Character.prototype.getColor = function() { return this._color; };

Character.prototype.setFeelings = function(otherCharacter, value) {
  var name = (typeof otherCharacter == 'string' ? otherCharacter : otherCharacter.getName());
  this._feelings[name] = value;
};

Character.prototype.changeFeeling = function(otherCharacter, delta) {
  this.setFeelings(otherCharacter, this.getFeelings(otherCharacter) + delta);
};

Character.prototype.getFeelings = function(otherCharacter) {
  var name = (typeof otherCharacter == 'string' ? otherCharacter : otherCharacter.getName());
  return this._feelings[name];
};

/**
 * Fetches the significant other of the character if they exist.
 * @return {Character?} The significant other if there is one.
 */
Character.prototype.getSignificantOther = function() {
  return this._significantOther;
};

Character.prototype.setSignificantOther = function(other) {
  this._significantOther = other;
};

/**
 * Determines whether a character is married or not.
 * @return {Boolean} 
 */
Character.prototype.isMarried = function() {
  return this._isMarried;
};

Character.prototype.setMarried = function(isMarried) {
  this._isMarried = isMarried;
};