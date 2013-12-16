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

  if (Object(fn) === fn) {
    opts = fn;
    fn = null;
  }

  var len = obj[method] && obj[method].length
    ? obj[method].length
    : 0;

  var stub = function() {
    if (opts.throws) throw opts.throws;
    return opts.returns;
  };

  fn = fn || proxy(stub, len);

  fn.revert = function() {
    obj[method] = original;
  };

  obj[method] = fn;
  doubles.push(fn);

  return fn;
};

exports.spy = function(obj, method) {
  if (!obj) {
    obj = { spy: function(){} };
    method = 'spy';
  }

  var original = obj[method];
  var len = obj[method].length;

  var spy = function() {
    if (!spy.called) spy.calls = [];
    var args = slice(arguments);
    var ret = original.apply(obj, arguments)
    spy.called = true;
    spy.calls.push({ args: args, returned: ret });
    return ret;
  };

  spy.revert = function() {
    obj[method] = original;
  };

  obj[method] = spy;
  doubles.push(spy);

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

function slice(args) {
  return Array.prototype.slice.call(args);
}
