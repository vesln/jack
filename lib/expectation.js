/*!
 * Jack.
 *
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Expectation base class.
 */
function Expectation() {}

/**
 * Returns an error message.
 * 
 * @param {String} Message.
 * @param {Object} Params.
 * @returns {String} Error message.
 * @api private
 */
Expectation.prototype.error = function(message, params) {
  var msg = this.messages[message];
  
  Object.keys(params).forEach(function(param) {
    msg = msg.replace(':' + param, params[param]);
  });
  
  return msg;
};

/**
 * Expose `Expectation`.
 */
module.exports = Expectation;
