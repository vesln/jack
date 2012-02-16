/*!
 * Jack.
 *
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Support. (node + browser)
 */
var EventEmitter;
if (!chai) {
  // nodejs
  var chai = require('chai');
  EventEmitter = require('events').EventEmitter;
} else {
  // browser
  EventEmitter = events.EventEmitter;
}

var should = chai.should();
var expect = chai.expect;

/**
 * The tested object.
 *
 * @type {Object}
 */
if (!jack) {
  var jack = require('..')
}
var Stub = jack.Stub;

describe('jack', function() {
  describe('.stub()', function() {
    it('should return new Stub instance.', function() {
      var obj = new EventEmitter;
      jack.stub(obj, 'on').should.be.an.instanceof(Stub);
      jack.mock(obj, 'on').should.be.an.instanceof(Stub);
    });
  });

  describe('.spy()', function() {
    it('should return new Stub instance.', function() {
      var obj = new EventEmitter;
      jack.spy(obj, 'on').should.be.an.instanceof(Stub);
    });
  });

  describe('.noConflict()', function() {
    it('should revert the stub, mock and spy methods', function() {
      jack.noConflict();
      expect(Object.prototype.stub === undefined).to.be.true;
      expect(Object.prototype.mock === undefined).to.be.true;
      expect(Object.prototype.spy === undefined).to.be.true;
      jack.extend(Object);
    });
  });

  describe('.extend()', function() {
    it('should extend object', function() {
      var obj = {};
      jack.extend(obj);
      expect(obj.stub === undefined).to.be.false;
      expect(obj.mock === undefined).to.be.false;
      expect(obj.spy === undefined).to.be.false;
    });

    it('should extend constructor', function() {
      var ctor = function() {};
      jack.extend(ctor);
      expect(ctor.prototype.stub === undefined).to.be.false;
      expect(ctor.prototype.mock === undefined).to.be.false;
      expect(ctor.prototype.spy === undefined).to.be.false;
    });
  });
});

describe('Object', function() {
  describe('.stub()', function() {
    it('should return new Stub instance.', function() {
      var obj = new EventEmitter;
      obj.stub('on').should.be.an.instanceof(Stub);
      obj.mock('on').should.be.an.instanceof(Stub);
    });
  });

  describe('.spy()', function() {
    it('should return new Stub instance.', function() {
      var obj = new EventEmitter;
      obj.spy('on').should.be.an.instanceof(Stub);
    });
  });
});
