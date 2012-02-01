/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Stub constructor.
 * 
 * @param {Object} Object.
 * @param {String} Method name.
 */
function Stub(obj, method) {
  var self = this;
  this.target = obj;
  this.method = method;
  this.orig = obj[method];
  this.reset = function() {
    self.target[method] = self.orig;
  };
};

/**
 * Sets return value of a method.
 * 
 * @param {Mixed} Return value.
 * @return `this`.
 * @api public
 */
Stub.prototype.andReturn = function(ret) {
  this.compile(function() {
    return ret;
  });
};

Stub.prototype.compile = function(fn) {
  fn.reset = this.reset;
  this.target[this.method] = fn;
};

/**
 * Helper method.
 * 
 * @returns `this`
 * @api public
 */
Stub.prototype.should = function() {
  return this;
};

/**
 * Expose `Stub`.
 */
module.exports = Stub;