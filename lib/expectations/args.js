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
 * Sets count expectations.
 * 
 * @param {Number} Times.
 * @param {String} Mode. Default to exact. It can also be `min` or `max`. [optional]
 * @api public
 */
Args.prototype.expect = function(arg) {
  this.expectations = Array.prototype.slice.call(args);
};

/**
 * Called when the the rest method of the original method was invoked.
 * 
 * @api public
 */
Args.prototype.end = function() {
  if (!this.expectations) return;
  if (this.expectations && !this.args) this.triggerError();
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
  if (this.args != this.expectations) this.triggerError();
};

/**
 * Triggers an error.
 * 
 * @api private
 */
Args.prototype.triggerError = function() {
  throw new Error(this.error(this.mode, { 
    expectations: util.inspect(this.expectations),
    args: util.inspect(this.args)
  }));
};

/**
 * Expose `Args`.
 */
module.exports = Args;