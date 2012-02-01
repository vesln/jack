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
var jack = require('../lib');

/**
 * The tested object.
 * 
 * @type {Object}
 */
var Stub = require('../lib/stub');

describe('Stub', function() {
  describe('andReturn', function() {
    it('should return a supplied value when called.', function() {
      var obj = new EventEmitter;
      obj.stub('on').andReturn(3);
      obj.on().should.eql(3);
    });
  });
  
  describe('.reset()', function() {
    it('should reset the original method functionality', function() {
      var obj = new EventEmitter;
      obj.foo = function() { 
        return 4; 
      }
      obj.stub('foo').andReturn(3);
      obj.foo().should.eql(3);
      obj.foo.reset();
      obj.foo().should.eql(4);
    });
  });
});