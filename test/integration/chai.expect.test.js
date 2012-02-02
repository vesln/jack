var chai = require('chai')
  , jack = require('../..')

chai.use(jack.chai);
var expect = chai.expect;

function err(fn, msg) {
  try {
    fn();
    chai.fail('expected an error');
  } catch (err) {
    expect(msg).to.equal(err.message);
  }
}

function Foo() {};
Foo.prototype.bar = function () {};
Foo.prototype.baz = function () {};

describe('Chai expect() integration', function() {

  it('should know when its a stub', function () {
    var myfoo = new Foo();
    myfoo.stub('bar');
    expect(myfoo.bar).to.be.stub;
    expect(myfoo.baz).to.not.be.stub;

    expect(function () {
      expect(myfoo.bar).to.not.be.stub;
    }).to.throw(chai.AssertionError);

    err(function () {
      expect(myfoo.baz).to.be.stub;
    }, 'expected [Function] to be a stub');
  });

  it('should know when its been called', function () {
    var myfoo = new Foo();
    myfoo.stub('bar');
    myfoo.stub('baz');

    myfoo.bar();
    expect(myfoo.bar).to.have.been.called;
    // expect(myfoo.baz).to.not.have.been.called;

    /*
    err(function () {
      expect(myfoo.bar).to.not.have.been.called;
    }, 'expected method \'bar\' to not have been called');
    */
  });

  describe('count', function () {
    var myfoo = new Foo();
    myfoo.stub('bar');
    myfoo.stub('baz');

    it('should work for once', function () {
      myfoo.bar();
      myfoo.baz();
      myfoo.baz();
      expect(myfoo.bar).to.have.been.called.once;

      err(function () {
        expect(myfoo.bar).to.not.have.been.called.once;
      }, "expected method 'bar' to not have been called once");

      err(function () {
        expect(myfoo.baz).to.have.been.called.once;
      }, "expected method 'baz' to have been called once but got 2");

    });

    it('should work for twice', function () {
      myfoo.bar();
      myfoo.baz();
      expect(myfoo.bar).to.have.been.called.twice;
      err(function () {
        expect(myfoo.baz).to.have.been.called.twice;
      }, "expected method 'baz' to have been called twice but got 3");

    });

    it('should work for exactly', function () {
      myfoo.bar();
      myfoo.baz();
      expect(myfoo.bar).to.have.been.called.exactly(3);
      err(function () {
        expect(myfoo.baz).to.have.been.called.exactly(3);
      }, "expected method 'baz' to have been called 3 times but got 4");
    });
  });
});
