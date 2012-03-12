/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */
 
/**
 * Define method.
 * 
 * @type {Function}
 */
var define = require('./utils').define;

/**
 * Expectations.
 */
var Count = require('./expectations/count');
var Args = require('./expectations/args');

/**
 * Stub constructor.
 * 
 * @param {Object} Object.
 * @param {String} Method name.
 * @param {Boolean} Spy. Default to false. [optional]
 */
function Stub(obj, method, spy) {
  // It's stubbed already.
  if (obj[method].__stub) return obj[method].__stub;
  
  this.spy = spy || false;
  this.target = obj;
  this.method = method;
  this.orig = obj[method];
  this.count = new Count(method);
  this.args = new Args(method);
  this.expectations = [this.count, this.args];
  this.retValues = [];
  this.error = null;
  this.compile();
};

Stub.prototype = {
  
  /**
   * Compiles a function.
   * 
   * @param {Function} Desired new functionality.
   * @return `this`.
   * @api private
   */
  compile: function() {
    var self = this;
    
    this.reset = function() {
      // Notifies all expectation that this is the end of the method.
      self.expectations.forEach(function(expectation) {
        expectation.end();
      });

      // Setting the original method back.
      self.target[self.method] = self.orig;
    };
    
    this.target[this.method] = function() {
      var args = arguments;

      // Notifies all expectations that the method was called.
      self.expectations.forEach(function(expectation) {
        expectation.notify(args);
      });

      // Checks if an error should be trown.
      if (self.error) throw new Error(self.error);
      
      // Checks if a function exists.
      if (self.fn) return self.fn.apply(self.target, args);
      
      // Checks the existence of a return value.
      switch (self.retValues.length) {
        case 0: break;
        case 1: return self.retValues[0];
        default: return self.retValues.shift();
      }
      
      // Is it a spy?
      if (self.spy) self.orig.apply(self.target, args);
    };

    // Reset function.
    this.target[this.method].reset = this.reset;
    this.target[this.method].__stub = this;
    return this;
  },
  
  /**
   * Sets return value of a method.
   * 
   * @return `this`.
   * @api public
   */
  return: function() {
    this.retValues = Array.prototype.slice.call(arguments);
    return this;
  },
  
  /**
   * Replaces the original method with a function.
   * 
   * @param {Function} Function.
   * @returns `this`.
   * @api public
   */
  replace: function(fn) {
    this.fn = fn;
    return this;
  },
  
  /**
   * Sets expectation count to 1.
   * 
   * @return `this`.
   * @api public
   */
  get once() {
    this.count.expect(1);
    return this;
  },
  
  /**
   * Sets expectation count to 1.
   * 
   * @return `this`.
   * @api public
   */
  get twice() {
    this.count.expect(2);
    return this;
  },
  
  /**
   * Sets expectation to exact number.
   * 
   * @param {Number} Positive number.
   * @return `this`.
   * @api public
   */
  exactly: function(n) {
    this.count.expect(n);
    return this;
  },
  
  /**
   * Sets expectation count to at least n times.
   * 
   * @return `this`.
   * @api public
   */
  least: function(n) {
    this.count.expect(n, 'min');
    return this;
  },
  
  /**
   * Sets expectation count to at least n times.
   * 
   * @return `this`.
   * @api public
   */
  throw: function(msg) {
    this.error = msg;
    return this;
  },
  
  /**
   * Sets arguments expectations.
   * 
   * @return `this`.
   * @api public
   */
  arguments: function() {
    this.args.expect(arguments);
    return this;
  },
  
  /**
   * Sets expectation count to at most n times.
   * 
   * @return `this`.
   * @api public
   */
  most: function(n) {
    this.count.expect(n, 'max');
    return this;
  },
  
  /**
   * Sets expectation count to 1.
   * 
   * @return `this`.
   * @api public
   */
  get number() {
    this.count.expect(null);
    return this;
  },
};

/**
 * Helper properties.
 * 
 * @type {Array}
 */
var props = [
  'it', 'be', 'to', 
  'has', 'must', 'should_be', 
  'called', 'times', 'of', 
  'any', 'and', 'at', 
  'expect', 'with'
];

props.forEach(function(prop) {
  define(Stub.prototype, prop, function() {
    return this;
  });
});

/**
 * Expose `Stub`.
 */
module.exports = Stub;
