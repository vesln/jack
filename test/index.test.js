/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com>
 * MIT License.
 */

/**
 * Support.
 */
var EventEmitter = require('events').EventEmitter;
var Stub = require('../lib/stub');

/**
 * The tested object.
 * 
 * @type {Object}
 */
var jack = require('../lib');

describe('jack', function() {
  describe('.stub()', function() {
    it('should return new Stub instance.', function() {
      var obj = new EventEmitter;
      jack.stub(obj, 'on').should.be.an.instanceof(Stub);
    });
  });
});

describe('Object', function() {
  describe('.stub()', function() {
    it('should return new Stub instance.', function() {
      var obj = new EventEmitter;
      obj.stub('on').should.be.an.instanceof(Stub);
    });
  });
});