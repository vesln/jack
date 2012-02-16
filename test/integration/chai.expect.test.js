if (!chai) {
  var chai = require('chai')
    , jack = require('../..')
}

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
    expect(myfoo.baz).to.have.been.not_called;
  });

  describe('count', function () {

    describe('past tense', function () {
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

      it('should work for min', function () {
        expect(myfoo.bar).to.have.been.called.min(3);
        expect(myfoo.bar).to.have.been.called.min(2);
        err(function () {
          expect(myfoo.baz).to.have.been.called.min(5);
        }, "expected method \'baz\' to have been called minimum of 5 times but got 4");
        err(function () {
          expect(myfoo.baz).to.have.been.not.called.min(2);
        }, "expected method \'baz\' to have been called less than 2 times but got 4");
      });

      it('should work for max', function () {
        expect(myfoo.bar).to.have.been.called.max(3);
        expect(myfoo.bar).to.have.been.called.max(4);
        err(function () {
          expect(myfoo.baz).to.have.been.called.max(3);
        }, "expected method \'baz\' to have been called maximum of 3 times but got 4");
        err(function () {
          expect(myfoo.baz).to.have.not.been.called.max(5);
        }, "expected method \'baz\' to have been called more than 5 times but got 4");
      });
    });

    describe('future tense', function () {
      var myfoo;

      beforeEach(function () {
        myfoo = new Foo();
        myfoo.stub('bar');
        myfoo.stub('baz');
      });

      it('should work for once', function () {
        expect(myfoo.bar).to.be.called.once;
        expect(myfoo.baz).to.be.called.once;
        myfoo.bar();
        expect(function () {
          myfoo.bar.reset();
        }).to.not.throw();
        expect(function () {
          myfoo.baz.reset();
        }).to.throw();
      });

      it('should work for twice', function () {
        expect(myfoo.bar).to.be.called.twice;
        expect(myfoo.baz).to.be.called.twice;
        myfoo.bar();
        myfoo.bar();
        myfoo.baz();
        expect(function () {
          myfoo.bar.reset();
        }).to.not.throw();
        expect(function () {
          myfoo.baz.reset();
        }).to.throw();
      });

      it('should work for exacly', function () {
        expect(myfoo.bar).to.be.called.exactly(3);
        expect(myfoo.baz).to.be.called.exactly(3);
        myfoo.bar();
        myfoo.bar();
        myfoo.bar();
        myfoo.baz();
        myfoo.baz();
        expect(function () {
          myfoo.bar.reset();
        }).to.not.throw();
        expect(function () {
          myfoo.baz.reset();
        }).to.throw();
      });

      it('should work for min', function () {
        expect(myfoo.bar).to.be.called.min(2);
        expect(myfoo.baz).to.be.called.min(2);
        myfoo.bar();
        myfoo.bar();
        myfoo.baz();
        expect(function () {
          myfoo.bar.reset();
        }).to.not.throw();
        expect(function () {
          myfoo.baz.reset();
        }).to.throw();
      });

      it('should work for max', function () {
        expect(myfoo.bar).to.be.called.max(2);
        expect(myfoo.baz).to.be.called.max(2);
        myfoo.bar();
        myfoo.bar();
        myfoo.baz();
        myfoo.baz();
        myfoo.baz();
        expect(function () {
          myfoo.bar.reset();
        }).to.not.throw();
        expect(function () {
          myfoo.baz.reset();
        }).to.throw();
      });
    });
  });
});
