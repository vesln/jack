/*!
 * Jack.
 *
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Expectation base.
 *
 * @type {Function}
 */
var Expectation = require('../expectation');

/**
 * Count constructor.
 *
 * @param {String} The stub method.
 */
function Count(method) {
  this.method = method;
  this.count = 0;
  this.expectations = null;
};

// `Args`. inhertis from `Expectation`.
Count.prototype.__proto__ = Expectation.prototype;

/**
 * Error message.
 *
 * @type {Object}
 * @api private
 */
Count.prototype.messages = {
  strict: 'Expected :method to have been called :n time(s). But it was called :x time(s).',
  min: 'Expected :method to have been called at least :n time(s). But it was called :x time(s).',
  max: 'Expected :method to have been called at most :n time(s). But it was called :x time(s).',
  not: 'Expected :method to not have been called :n times(s)'
};

/**
 * Sets count expectations.
 *
 * @param {Number} Times.
 * @param {String} Mode. Default to exact. It can also be `min`, `max`, or `not`. [optional]
 * @api public
 */
Count.prototype.expect = function(n, mode) {
  this.expectations = n;
  this.mode = mode || 'strict';
};

/**
 * Called when the stubed method was invoked.
 *
 * @param {Object} Arguments.
 * @api public
 */
Count.prototype.notify = function(args) {
  ++this.count;
};

/**
 * Called when the the rest method of the original method was invoked.
 *
 * @api public
 */
Count.prototype.end = function() {
  if (this.expectations === null) return;

  switch (this.mode) {
    case 'strict':
      if (this.expectations === this.count) return;
      break;
    case 'min':
      if (this.expectations <= this.count) return;
      break;
    case 'max':
      if (this.expectations >= this.count) return;
      break;
    case 'not':
      if (this.expectations !== this.count) return;
      break;
  }

  throw new Error(this.error(this.mode, {
    method: this.method,
    n: this.expectations,
    x: this.count
  }));
};

/**
 * Expose `Count`.
 */
module.exports = Count;
