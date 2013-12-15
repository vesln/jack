/**
 * Modified functions.
 */

var doubles = [];

/**
 * Stub given function.
 *
 * @param {Object} object
 * @param {String} property name
 * @param {Function} new method
 * @api public
 */

exports.stub = function(obj, method, fn) {
  var original = obj[method];
  fn = fn || function(){};

  fn.revert = function() {
    obj[method] = original;
  };

  obj[method] = fn;
  doubles.push(fn);
};

/**
 * Revert all test doubles.
 *
 * @api public
 */

exports.revert = function() {
  var fn = null;

  while (fn = doubles.pop()) {
    fn.revert();
  }
};
