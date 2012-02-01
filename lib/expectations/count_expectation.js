/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * CountExpectation constructor.
 * 
 * @param {String} The stub method.
 */
function CountExpectation(method) {
  this.method = method;
  this.count = 0;
  this.expectations = null;
};

/**
 * Error message.
 * 
 * @type {Object}
 * @api private
 */
CountExpectation.prototype.messages = {
  exact: 'Expected :method to have been called :n time(s). But it was called :x time(s).',
  min: 'Expected :method to have been called at least :n time(s). But it was called :x time(s).',
  max: 'Expected :method to have been called at most :n time(s). But it was called :x time(s).',
};

/**
 * Sets count expectations.
 * 
 * @param {Number} Times.
 * @param {String} Mode. Default to exact. It can also be `min` or `max`. [optional]
 * @api public
 */
CountExpectation.prototype.expect = function(n, mode) {
  this.expectations = n;
  this.mode = mode || 'strict';
};

/**
 * Called when the stubed method was invoked.
 * 
 * @param {Object} Arguments.
 * @api public
 */
CountExpectation.prototype.notify = function(args) {
  ++this.count;
};

/**
 * Called when the the rest method of the original method was invoked.
 * 
 * @api public
 */
CountExpectation.prototype.end = function() {
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
  }
  
  throw new Error(this.error(this.mode, { 
    method: this.method,
    n: this.expectations,
    x: this.count
  }));
};

/**
 * Returns an error message.
 * 
 * @param {String} Mode.
 * @param {Object} Params.
 * @returns {String} Error message.
 * @api private
 */
CountExpectation.prototype.error = function(message, params) {
  var msg = this.messages[message];
  
  Object.keys(params).forEach(function(param) {
    msg = msg.replace(':' + param, params[param]);
  });
  return msg;
};

/**
 * Expose `CountExpectation`.
 */
module.exports = CountExpectation;