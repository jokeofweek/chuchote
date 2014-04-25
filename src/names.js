NameGenerator = {
  MALE_FIRST_NAMES: ['James','John','Robert','Michael','William','David','Richard','Charles','Joseph','Thomas','Christopher','Daniel','Paul','Mark','Donald','George','Kenneth','Steven','Edward','Brian','Ronald','Anthony','Kevin','Jason','Matthew','Gary','Timothy','Jose','Larry','Jeffrey','Frank','Scott','Eric','Stephen','Andrew','Raymond','Gregory','Joshua','Jerry','Dennis','Walter','Patrick'],
  FEMALE_FIRST_NAMES: ['Mary','Patricia','Linda','Barbara','Elizabeth','Jennifer','Maria','Susan','Margaret','Dorothy','Lisa','Nancy','Karen','Betty','Helen','Sandra','Donna','Carol','Ruth','Sharon','Michelle','Laura','Sarah','Kimberly','Deborah','Jessica','Shirley','Cynthia','Angela','Melissa','Brenda','Amy','Anna','Rebecca','Virginia'],
  /**
   * Generates a random character name and gender.
   * @return {object} An object containing the name and whether the name is for a male charater or a female character.
   */
  generate: function() {
    // Pick random gender
    var male = Math.random() > 0.5 ? true : false;
    var names = male ? this.MALE_FIRST_NAMES : this.FEMALE_FIRST_NAMES;
    // Pick random name
    var nameIndex = Math.floor(Math.random() * names.length);
    var name = names[nameIndex];
    // Remove name so can't re-use.
    names.splice(nameIndex, 1);
    return {
      name: name,
      male: male
    };
  }
};