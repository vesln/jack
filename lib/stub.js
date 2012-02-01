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
var define = require('./utils').define;

/**
 * Expectations.
 */
var CountExpectation = require('./expectations/count_expectation');

/**
 * Stub constructor.
 * 
 * @param {Object} Object.
 * @param {String} Method name.
 */
function Stub(obj, method) {
  var self = this;
  this.target = obj;
  this.method = method;
  this.orig = obj[method];
  
  // @TODO: Refactor me.
  this.reset = function() {
    // Expect count.
    if (self.expectCount) {
      if (self.expectCount !== self.count) {
        throw new Error('Expected ' + self.target.constructor.name  + '.' + self.method + '() to have been called ' + self.expectCount + ' time(s). But it was called ' + self.count + ' time(s).');
      }
    }
    // Setting the original method back.
    self.target[method] = self.orig;
  };
  
  this.count = new CountExpectation;
  this.retValues = [];
  this.compile();
};

Stub.prototype = {
  
  /**
   * Sets return value of a method.
   * 
   * @return `this`.
   * @api public
   */
  andReturn: function() {
    this.retValues = Array.prototype.slice.call(arguments);
    return this;
  },
  
  /**
   * Compiles a function.
   * 
   * @param {Function} Desired new functionality.
   * @return `this`.
   * @api private
   */
  compile: function() {
    var self = this;
    
    this.target[this.method] = function() {
      // Incrementing the call count.
      // ++self.count;
      // 
      // // Return values set?
      // if (self.retValues.length) {
      //   if (self.retValues[self.count - 1]) return self.retValues[self.count - 1];
      //   return self.retValues[0];
      // }

      // Nothing to do, calling the original method.
      return self.orig();
    };

    // Reset function.
    this.target[this.method].reset = this.reset;

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
   * Sets expectation count to at least once.
   * 
   * @return `this`.
   * @api public
   */
  get times() {
    this.count.expect(1);
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
  'any', 'and'
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