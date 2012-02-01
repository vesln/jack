/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Utils namespace.
 * 
 * @type {Object}
 */
var utils = module.exports;

/**
 * defineProperty alias.
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