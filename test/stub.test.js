/*!
 * Jack.
 *
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Support.
 */
var EventEmitter;
if (!chai) {
  // node.js
  var chai = require('chai');
  EventEmitter = require('events').EventEmitter;
} else {
  // browser
  EventEmitter = events.EventEmitter;
}

var should = chai.should();

/**
 * The tested object.
 *
 * @type {Object}
 */
if (!jack) {
var jack = require('..')
}
var Stub = jack.Stub;

/**
 * Dummy function used in tests.
 *
 * @type {Function}
 */
var foo = function() {
  return 4;
};

describe('Stub', function() {
  describe('spy', function() {
    it('should spy an method', function(done) {
      var obj = new EventEmitter;
      obj.spy('on').it.should_be.called.once;
      obj.on('foo', function() {
        obj.on.reset();
        done();
      });
      obj.emit('foo');
    });
  });

  describe('.return()', function() {
    it('should return a supplied value when called.', function() {
      var obj = new EventEmitter;
      obj.stub('on').and.return(3);
      obj.on().should.eql(3);
      obj.on.reset();
    });

    it('should allow multiple return values to be set', function() {
      var obj = new EventEmitter;
      obj.stub('on').and.return(3, 2, 1);
      obj.on().should.eql(3);
      obj.on().should.eql(2);
      obj.on().should.eql(1);
      obj.on.reset();
    });
  });

  describe('.replace()', function() {
    it('should replace the original method with another one.', function(done) {
      var obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').and.replace(function() {
        done();
      });
      obj.foo();
    });
  })

  describe('.reset()', function() {
    it('should reset the original method functionality', function() {
      var obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').and.return(3);
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

  describe('.exactly()', function() {
    it('should should set expected calls to two.', function() {
      var obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').it.should_be.called.exactly(1).times;
      obj.foo();
      obj.foo.reset();
      obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').it.should_be.called.exactly(2).times;
      obj.foo();
      obj.foo();
      obj.foo();
      try {
        obj.foo.reset();
      } catch (err) {
        return;
      }
      throw new Error('Expected error.')
    });
  });

  describe('.number()', function() {
    it('should reset the expected calls count.', function() {
      var obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').it.should_be.called.exactly(1).times;
      obj.stub('foo').it.should_be.called.any.number.of.times;
      obj.foo.reset();
    });
  });

  describe('.least()', function() {
    it('should set expected calls count to at least n.', function() {
      var obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').it.should_be.called.at.least(1).times;
      obj.foo();
      obj.foo.reset();
      obj.stub('foo').it.should_be.called.at.least(2).times;
      obj.foo();
      try {
        obj.foo.reset();
      } catch(err) {
        return;
      }
      throw new Error('Error expected.');
    });
  });

  describe('.most()', function() {
    it('should set expected calls count to at most n.', function() {
      var obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').it.should_be.called.at.most(2).times;
      obj.foo();
      obj.foo();
      obj.foo.reset();
      obj.stub('foo').it.should_be.called.at.most(2).times;
      obj.foo();
      obj.foo();
      obj.foo();
      try {
        obj.foo.reset();
      } catch(err) {
        return;
      }
      throw new Error('Error expected.');
    });
  });

  describe('.throw()', function() {
    it('should throw an error.', function() {
      var obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').and.throw('Message');
      try {
        obj.foo();
      } catch(err) {
        return;
      }
      throw new Error('Error expected.');
    });
  });

  describe('.arguments()', function() {
    it('should set argument expectations', function() {
      var obj = new EventEmitter;
      var error = null;
      obj.foo = foo;
      obj.stub('foo').expect.arguments('foo', 'bar');
      obj.foo('foo', 'bar');
      obj.foo.reset();

      obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').expect.arguments('foo', 'bar');
      obj.foo('foo', 'zab');
      try {
        obj.foo.reset();
      } catch(err) {
        error = err;
      } finally {
        if (!error) throw new Error('Expected an error');
        error = null;
      }

      obj = new EventEmitter;
      obj.foo = foo;
      obj.stub('foo').expect.arguments('foo', 'bar');
      try {
        obj.foo.reset();
      } catch(err) {
        error = err;
      } finally {
        if (!error) throw new Error('Expected an error');
        error = null;
      }
    });
  });
});
