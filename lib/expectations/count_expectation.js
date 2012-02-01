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
 * @param {Object} The stub object.
 */
function CountExpectation(main) {
  this.main = main;
  this.count = 0;
  this.strict = true;
  this.expect = null;
  this.init();
};

/**
 * Initializes the expectation.
 * 
 * @api private
 */
CountExpectation.prototype.init = function() {
  var self = this;
  
  // Sets expectation count to 1.
  define(this.main, 'once', function() {
    self.expect = 1;
    return this;
  });
  
  
};