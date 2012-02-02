/*!
 * Jack.
 *
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Stub class.
 *
 * @type {Function}
 */
var Stub = require('./stub');

/**
 * Jack.
 *
 * @type {Object}
 */
var jack = module.exports;

/**
 * Stubs a method.
 *
 * @param {Object} Object.
 * @param {String} Method name.
 * @returns {Object} Stub.
 * @api public
 */
jack.stub = function(obj, method) {
  return new Stub(obj, method);
};

/**
 * Chai integration.
 *
 *      chai.use(jack.chai);
 *
 * @param {Chai} export to extend
 * @api public
 */

jack.chai = require('./integration/chai');

/**
 * Stubs an object method.
 *
 * @param {String} Method name.
 * @returns {Object} Stub.
 * @api public
 */
Object.prototype.stub = function(method) {
  return new Stub(this, method);
};

