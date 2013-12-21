;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("jack/lib/jack.js", function(exports, require, module){
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
 * @param {Object} object
 * @param {String} method
 * @param {Fucntion} fn
 * @returns {Function} test double
 * @api public
 */

function double(obj, method, fn) {
  var original = obj[method];

  var double = util.proxy(original.length, function() {
    var args = util.slice(arguments);
    var ret = (fn || original).apply(obj, arguments)
    double.called = true;
    double.calls.push({ context: this, args: args, returned: ret });
    return ret;
  });

  double.double = true;
  double.calls = [];

  double.revert = function() {
    obj[method] = original;
  };

  double.toString = function() {
    return '[TestDouble ' + method + ']';
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
 * Primary exports.
 */

module.exports = double;
module.exports.spy = spy;
module.exports.stub = stub;
module.exports.revert = revert;
module.exports._ = util;

});
require.register("jack/lib/util.js", function(exports, require, module){
/**
 * Slice.
 */

exports.slice = function(args) {
  return Array.prototype.slice.call(args);
};

/**
 * chai-spies
 * (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT License
 */

exports.proxy = function(len, fn) {
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
};

});
require.alias("jack/lib/jack.js", "jack/index.js");if (typeof exports == "object") {
  module.exports = require("jack");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("jack"); });
} else {
  this["jack"] = require("jack");
}})();