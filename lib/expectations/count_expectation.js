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
 */
function CountExpectation(main) {
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
  
};

/**
 * Expose `CountExpectation`.
 */
module.exports = CountExpectation;