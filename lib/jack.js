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
 * Exposing the Stub object
 */
jack.Stub = Stub;

/**
 * Keep the original mock, stub and spy methods
 * in case they are used anywhere.
 */
var _mock = Object.prototype.mock;
var _stub = Object.prototype.stub;
var _spy = Object.prototype.spy;

/**
 * Stubs a method.
 *
 * @param {Object} Object.
 * @param {String} Method name.
 * @returns {Object} Stub.
 * @api public
 */
jack.mock =
jack.stub = function(obj, method) {
  return new Stub(obj, method);
};

/**
 * Creates a spy.
 *
 * @param {Object|Function} Object or anonymous function.
 * @param {String} Method name.
 * @returns {Object} Stub.
 * @api public
 */
jack.spy = function(obj, method) {
  return new Stub(obj, method, true);
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
Object.prototype.mock =
Object.prototype.stub = function(method) {
  return new Stub(this, method);
};

/**
 * Creates a spy.
 *
 * @returns {Object} Stub.
 * @api public
 */
Object.prototype.spy = function(method) {
  return new Stub(this, method, true);
};

/**
 * No conflict mode.
 *
 * @returns {Object} `jack`.
 */
jack.noConflict = function() {
  Object.prototype.spy = _spy;
  Object.prototype.mock = _mock;
  Object.prototype.stub = _stub;
  return jack;
};
