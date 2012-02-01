/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Utils namespace.
 * 
 * @type {Object}
 */
var utils = module.exports;

/**
 * Defines a property.
 * 
 * @param {Object} Prototype.
 * @param {String} Name.
 * @param {Function} Function.
 * @api public
 */
utils.define = function(proto, name, fn) {
  Object.defineProperty(proto, name, {
    set: function(){},
    get: fn,
    configurable: true
  });
};