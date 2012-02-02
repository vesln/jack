var chai = require('chai')
  , jack = require('../..')

chai.use(jack.chai);
var expect = chai.expect;

function Foo() {};
Foo.prototype.bar = function () {};
Foo.prototype.baz = function () {};

describe('Chai integration', function() {

  it('should have the called getter', function () {
    var myfoo = new Foo()
      , stubbed = new chai.Assertion(myfoo.stub('bar'))
      , not_stubbed = new chai.Assertion(myfoo.baz);

    expect(stubbed).to.have.property('called');

    expect(function () {
      // hasn't been stubbed yet
      expect(not_stubbed).to.have.property('called');
    }).to.throw(chai.AssertionError);

    expect(function () {
      expect(myfoo.stub('baz')).to.have.property('called');
    }).to.not.throw(chai.AssertionError);
  });

  it('should have a stub method', function () {
    var myfoo = new Foo();

    expect(function () {
      expect(myfoo).stub('bar').to.be.called;
    }).to.not.throw(chai.AssertionError);
  });

});
