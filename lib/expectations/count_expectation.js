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
  this.expect = null;
};

/**
 * Sets count expectations.
 * 
 * @param {Number} Times.
 * @param {Boolean} Strict. Default to true. [optional]
 * @api public
 */
CountExpectation.prototype.expect = function(n, strict) {
  this.expect = n;
  strict && (this.strict = strict);
};

CountExpectation.prototype.end = function() {
  
};

/**
 * Expose `CountExpectation`.
 */
module.exports = CountExpectation;