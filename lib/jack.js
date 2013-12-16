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
 * @returns {Function} stub
 * @api public
 */

exports.stub = function(obj, method, fn) {
  var original = obj[method];
  var opts = {};

  if (typeof fn !== 'function') {
    opts = fn || {};
    fn = null;
  }

  var stub = wrap(obj, method, fn || function() {
    if (opts.throws) throw opts.throws;
    return opts.returns;
  });

  return stub;
};

/**
 * Create a new spy object.
 *
 * It can replace existing method if `obj` and `method` are
 * supplied.
 *
 * @param {Object} obj (optional)
 * @param {String} method (optional)
 * @returns {Function} spy
 * @api public
 */

exports.spy = function(obj, method) {
  if (!obj) {
    obj = { spy: function(){} };
    method = 'spy';
  }

  var original = obj[method];

  var spy = wrap(obj, method, function() {
    if (!spy.called) spy.calls = [];
    var args = slice(arguments);
    var ret = original.apply(obj, arguments)
    spy.called = true;
    spy.calls.push({ context: this, args: args, returned: ret });
    return ret;
  });

  return spy;
};

/**
 * Revert all test doubles.
 *
 * @api public
 */

exports.revert = function() {
  var fn = null;
  while (fn = doubles.pop()) fn.revert();
};

/**
 * Return a new function that has the
 * same number of arguments as the original one,
 * can revert the original function. Store
 * it in the doubles registry so it can be restored
 * by calling `#revert`.
 *
 * @param {Object} obj
 * @param {String} method
 * @param {Function} fn
 * @api private
 */

function wrap(obj, method, fn) {
  var original = obj[method];
  var double = proxy(fn, original.length);

  double.dobule = true;

  double.revert = function() {
    obj[method] = original;
  };

  obj[method] = double;
  doubles.push(double);

  return double;
}

/**
 * Slice.
 */

function slice(args) {
  return Array.prototype.slice.call(args);
}

/**
 * chai-spies
 * (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT
 */

function proxy(fn, len) {
  switch (len) {
    case 0 : return function () { return fn.apply(this, arguments); };
    case 1 : return function (a) { return fn.apply(this, arguments); };
    case 2 : return function (a,b) { return fn.apply(this, arguments); };
    case 3 : return function (a,b,c) { return fn.apply(this, arguments); };
    case 4 : return function (a,b,c,d) { return fn.apply(this, arguments); };
    case 5 : return function (a,b,c,d,e) { return fn.apply(this, arguments); };
    case 6 : return function (a,b,c,d,e,f) { return fn.apply(this, arguments); };
    case 7 : return function (a,b,c,d,e,f,g) { return fn.apply(this, arguments); };
    case 8 : return function (a,b,c,d,e,f,g,h) { return fn.apply(this, arguments); };
    case 9 : return function (a,b,c,d,e,f,g,h,i) { return fn.apply(this, arguments); };
    default : return function (a,b,c,d,e,f,g,h,i,j) { return fn.apply(this, arguments); };
  }
}
