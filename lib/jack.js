/**
 * Modified functions.
 */

var doubles = [];

/**
 * Stub given function.
 *
 * Options:
 *
 *  - returns: Set return value
 *  - throws:  Supply an error to be thrown
 *
 * @param {Object} object
 * @param {String} property name
 * @param {Function|Object} new method || options
 * @api public
 */

exports.stub = function(obj, method, fn) {
  var original = obj[method];
  var opts = {};

  if (Object(fn) === fn) {
    opts = fn;
    fn = null;
  }

  fn = fn || function() {
    if (opts.throws) throw opts.throws;
    return opts.returns;
  };

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
