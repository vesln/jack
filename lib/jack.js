/**
 * Internal dependencies.
 */

var util = require('./util');

/**
 * Double storage.
 *
 * @see revert
 */

var doubles = [];

/**
 * Create a new test double.
 *
 * @param {Object} obj
 * @param {String} method
 * @param {Fucntion} fn
 * @returns {Function} test double
 * @api public
 */

function double(obj, method, fn) {
  var original = obj[method];

  var double = util.proxy(original.length, function() {
    if (!double.called) double.calls = [];
    var args = util.slice(arguments);
    var ret = (fn || original).apply(obj, arguments)
    double.called = true;
    double.calls.push({ context: this, args: args, returned: ret });
    return ret;
  });

  double.double = true;

  double.revert = function() {
    obj[method] = original;
  };

  obj[method] = double;
  doubles.push(double);

  return double;
}

/**
 * Stub given method.
 *
 * @param {Object} object
 * @param {String} method
 * @param {Function} fn (optional)
 * @returns {Function} test double
 * @api public
 */

function stub(obj, method, fn) {
  fn = fn || function(){};
  return double(obj, method, fn);
}

/**
 * Create a new spy object.
 *
 * It can replace existing method if `obj` and `method` are
 * supplied.
 *
 * @param {Object} obj (optional)
 * @param {String} method (optional)
 * @returns {Function} test double
 * @api public
 */

function spy(obj, method) {
  if (!obj && !method) {
    obj = { spy: function(){} };
    method = 'spy';
  }
  return double(obj, method);
}

/**
 * Revert all test doubles.
 *
 * @api public
 */

function revert() {
  var fn = null;
  while (fn = doubles.pop()) fn.revert();
}

/**
 * Primary export.
 */

module.exports = double;

/**
 * Export `spy`.
 */

module.exports.spy = spy;

/**
 * Export `stub`.
 */

module.exports.stub = stub;

/**
 * Export `revert`.
 */

module.exports.revert = revert;
