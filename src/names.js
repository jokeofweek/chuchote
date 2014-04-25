NameGenerator = {
  MALE_FIRST_NAMES: ['James','John','Robert','Michael','William','David','Richard','Charles','Joseph','Thomas','Christopher','Daniel','Paul','Mark','Donald','George','Kenneth','Steven','Edward','Brian','Ronald','Anthony','Kevin','Jason','Matthew','Gary','Timothy','Jose','Larry','Jeffrey','Frank','Scott','Eric','Stephen','Andrew','Raymond','Gregory','Joshua','Jerry','Dennis','Walter','Patrick'],
  FEMALE_FIRST_NAMES: ['Mary','Patricia','Linda','Barbara','Elizabeth','Jennifer','Maria','Susan','Margaret','Dorothy','Lisa','Nancy','Karen','Betty','Helen','Sandra','Donna','Carol','Ruth','Sharon','Michelle','Laura','Sarah','Kimberly','Deborah','Jessica','Shirley','Cynthia','Angela','Melissa','Brenda','Amy','Anna','Rebecca','Virginia'],
  COLORS: '#6FFFC3,#6396FC,#F6CCC0,#993CF3,#FF6F60,#9F3333,#FFCC00,#C0C0C0,#99CC33,#CC60CC,#CC9360,#F9C396'.split(',').map(ROT.Color.fromString.bind(ROT.Color)),
  /**
   * Generates a random character name and gender.
   * @param {object?} color An optional color, if none is specified then the color is randomly generated.
   * @return {object} An object containing the name and whether the name is for a male charater or a female character.
   */
  generate: function(color) {
    // Pick random gender
    var male = Math.random() > 0.5 ? true : false;
    var names = male ? this.MALE_FIRST_NAMES : this.FEMALE_FIRST_NAMES;
    // Pick random name
    var nameIndex = Math.floor(Math.random() * names.length);
    var name = names[nameIndex];
    // Remove name so can't re-use.
    names.splice(nameIndex, 1);
    // Generate a color if necessary
    color = color || this.getRandomColor();
    return {
      name: name,
      male: male,
      color: color,
      toString: function() {
        return this.name + " (%c{rgb(" + color.join(',') + ")}@%c{})";
      }
    };
  },
  /**
   * Generates a random color.
   * @return {array} The array representing the color.
   */
  getRandomColor: function() {
    var colorIndex = Math.floor(Math.random() * this.COLORS.length);
    var color = this.COLORS[colorIndex];
    // Remove the color so can't re-use
    this.COLORS.splice(colorIndex, 1);
    return color;
  }
};