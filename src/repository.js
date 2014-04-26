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
  // Allow for template extension
  if (template['extends']) {
    var newTemplate = {};
    // First copy over parent to ensure we don't 
    // add to the actual parent's template.
    var parent = this.getTemplate(template['extends']);
    for (var k in parent) {
      newTemplate[k] = parent[k];
    }
    // Then copy over child
    for (var k in template) {
      newTemplate[k] = template[k];
    }
    template = newTemplate;
  }
  this._templates[name] = template;
};

/**
 * Builds a new object based on a given template.
 * @param  {string} name The name of the template to use.
 * @param {object?} extra An optional template to add to the original template before building.
 * @return {object} The built object.
 */
Repository.prototype.build = function(name, extra) {
  if (!this._templates[name]) {
    throw new Error('No such template: ' + name);
  }

  var template = this._templates[name];

  if (extra) {
    // First create a copy of the template
    var newTemplate = {};
    for (var k in template) {
      newTemplate[k] = template[k];
    }
    // Add every extra property to the template
    for (var k in extra) {
      newTemplate[k] = extra[k];
    }
    template = newTemplate;
  }

  // If a custom constructor is specified, use that instead.
  var ctor = this._ctor;
  if (template['ctor']) {
    ctor = template['ctor'];
  }

  // Create the object
  return new ctor(template);
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