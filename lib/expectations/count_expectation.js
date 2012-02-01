/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Define method.
 * 
 * @type {Function}
 */
var define = require('../utils').define;

/**
 * CountExpectation constructor.
 * 
 * @param {String} The stub method.
 */
function CountExpectation(method) {
  this.method = method;
  this.count = 0;
  this.strict = true;
  this.expectations = null;
};

/**
 * Sets count expectations.
 * 
 * @param {Number} Times.
 * @param {Boolean} Strict. Default to true. [optional]
 * @api public
 */
CountExpectation.prototype.expect = function(n, strict) {
  this.expectations = n;
  strict && (this.strict = strict);
};

/**
 * Called when the stubed method was invoked.
 * 
 * @param {Object} Arguments.
 * @api public
 */
CountExpectation.prototype.notify = function(args) {
  ++this.count;
};

/**
 * Called when the the rest method of the original method was invoked.
 * 
 * @api public
 */
CountExpectation.prototype.end = function() {
  if (this.expectations === null || this.expectations === this.count) return;
  throw new Error(this.error(this.method));
};

/**
 * Returns an error message.
 * 
 * @param {String} Method.
 * @returns {String} Error message.
 * @api private
 */
CountExpectation.prototype.error = function(method) {
  return 'Expected ' + '.' + this.method + '() to have been called '
    + this.expectations + ' time(s). But it was called '
    + this.count + ' time(s).';
};

/**
 * Expose `CountExpectation`.
 */
module.exports = CountExpectation;