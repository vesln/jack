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

/**
 * Dummy function used in tests.
 * 
 * @type {Function}
 */
var foo = function() { 
  return 4; 
}

describe('Stub', function() {
  describe('.andReturn()', function() {
    it('should return a supplied value when called.', function() {
      var obj = new EventEmitter;
      obj.stub('on').andReturn(3);
      obj.on().should.eql(3);
      obj.on.reset();
    });
    
    it('should allow multiple return values to be set', function() {
      var obj = new EventEmitter;
      obj.stub('on').andReturn(3, 2, 1);
      obj.on().should.eql(3);
      obj.on().should.eql(2);
      obj.on().should.eql(1);
    });
  });
  
  describe('.reset()', function() {
    it('should reset the original method functionality', function() {
      var obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').andReturn(3);
      obj.foo().should.eql(3);
      obj.foo.reset();
      obj.foo().should.eql(4);
    });
  });
  
  describe('.once()', function() {
    it('should should set expected calls to one.', function() {
      var obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').it.should_be.called.once;
      obj.foo();
      obj.foo.reset();
      
      obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').it.should_be.called.once;
      obj.foo();
      obj.foo();
      try {
        obj.foo.reset();
        throw new Error('Expected error.')
      } catch (err) {}
    });
  });
  
  describe('.twice()', function() {
    it('should should set expected calls to two.', function() {
      var obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').it.should_be.called.twice;
      obj.foo();
      obj.foo();
      obj.foo.reset();
      
      obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').it.should_be.called.twice;
      obj.foo();
      try {
        obj.foo.reset();
        throw new Error('Expected error.')
      } catch (err) {}
    });
  });
});