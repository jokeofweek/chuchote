/**
 * This class represents a repository of objects which can be instantiated
 * with a template.
 * @param {function} ctor The constructor to use when creating objects.
 */
function Repository(ctor) {
  this._templates = {};
  this._ctor = ctor;
}

/**
 * Adds an entry to the repository.
 * @param {string} name The name of the entry.
 * @param {object} template The template.
 */
Repository.prototype.add = function(name, template) {
  this._templates[name] = template;
};

/**
 * Builds a new object based on a given template.
 * @param  {string} name The name of the template to use.
 * @return {object} The built object.
 */
Repository.prototype.build = function(name) {
  if (!this._templates[name]) {
    throw new Error('No such template: ' + name);
  }
  // Create the object
  return new this._ctor(this._templates[name]);
};

/**
 * Fetches the raw template for an entry.
 * @param  {string} name The name of the template to use.
 * @return {object} The template.
 */
Repository.prototype.getTemplate = function(name) {
  if (!this._templates[name]) {
    throw new Error('No such template: ' + name);
  }
  return this._templates[name];
};