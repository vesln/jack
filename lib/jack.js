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
 * Creates a mock.
 *
 * @param {String} Method name.
 * @returns {Object} Stub.
 */
var mock = function(method) {
  return new Stub(this, method);
};

/**
 * Creates a spy.
 *
 * @param {String} Method name.
 * @returns {Object} Stub.
 */
var spy = function(method) {
  return new Stub(this, method, true);
};

/**
 * Extends the Object. Thanks @rstankov!
 *
 * @param {Object|Function} The object that will be extended.
 * @returns {Object} `jack`.
 * @api public
 */
jack.extend = function(obj) {
  if (typeof obj === 'object') {
    obj.spy = spy;
    obj.mock = obj.stub = mock;
  } else {
    obj.prototype.spy = spy;
    obj.prototype.mock = obj.prototype.stub = mock;
  }
  return jack;
};

/**
 * No conflict mode.
 *
 * @returns {Object} `jack`.
 * @api public
 */
jack.noConflict = function() {
  Object.prototype.spy = _spy;
  Object.prototype.mock = _mock;
  Object.prototype.stub = _stub;
  return jack;
};

// Extend the Object.
jack.extend(Object);
