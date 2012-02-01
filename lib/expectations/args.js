/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Module dependencies.
 */
var util = require('util');

/**
 * Expectation base.
 * 
 * @type {Function}
 */
var Expectation = require('../expectation');

/**
 * Args constructor.
 * 
 * @param {String} The stub method.
 */
function Args(method) {
  this.method = method;
  this.expectations = null;
  this.args = null;
};

// `Args`. inhertis from `Expectation`.
util.inherits(Args, Expectation);

/**
 * Error message.
 * 
 * @type {Object}
 * @api private
 */
Args.prototype.messages = {
  main: 'Expected :method to have been called with :expectations. But it was called :args.',
};

/**
 * Sets expectations.
 * 
 * @param {Object} Arguments.
 * @api public
 */
Args.prototype.expect = function(args) {
  this.expectations = Array.prototype.slice.call(args);
};

/**
 * Called when the the rest method of the original method was invoked.
 * 
 * @api public
 */
Args.prototype.end = function() {
  var eql = true;
  if (!this.expectations) return;
  
  for (var i = -1, len = this.expectations.length; ++i < len;) {
    if (this.expectations[i] !== this.args[i]) eql = false;
  }
  
  if (eql) return;
  
  throw new Error(this.error('main', { 
    expectations: util.inspect(this.expectations),
    args: util.inspect(this.args)
  }));
};

/**
 * Called when the stubed method was invoked.
 * 
 * @param {Object} Arguments.
 * @api public
 */
Args.prototype.notify = function(args) {
  if (!this.expectations) return;
  this.args = Array.prototype.slice.call(args);
};

/**
 * Expose `Args`.
 */
module.exports = Args;