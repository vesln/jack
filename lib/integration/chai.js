var Stub = require('../stub');

module.exports = function (chai) {
  var Assertion = chai.Assertion
    , i = chai.inspect;

  if (Assertion.prototype.hasOwnProperty('called')) {
    // we have already extended chai, so head on out
    return;
  }

  Object.defineProperty(Assertion.prototype, 'stub',
    { get: function () {
        this.assert(
            undefined !== this.obj.__stub
          , 'expected ' + this.inspect + ' to be a stub'
          , 'expected ' + this.inspect + ' to not be a stub');
        return this;
      }
  });

  /**
   * # called
   *
   * Language chain. Also asserts object is a `Stub`.
   * We cannot do assertions here has `not.called.twice`
   * would fail if it would be interpretted as `not called`.
   *
   * @api public
   */

  Object.defineProperty(Assertion.prototype, 'called',
    { get: function () {
        new Assertion(this.obj).to.be.stub;
        var stub = this.obj.__stub
          , count = stub.count.count;
        if (!this.negate) {
          this.assert(
              count > 0
            , 'expected method ' + i(stub.method) + ' to have been called'
            , 'expected method ' + i(stub.method) + ' to not have been called'
          );
        }
        return this;
      }
  });

  /**
   * # once
   *
   * Checks the value of count for a stub calls == 1
   *
   * @api public
   */

  Object.defineProperty(Assertion.prototype, 'once',
    { get: function () {
        new Assertion(this.obj).to.be.stub;
        var stub = this.obj.__stub
          , count = stub.count.count;
        this.assert(
            count == 1
          , 'expected method ' + i(stub.method) + ' to have been called once but got ' + i(count)
          , 'expected method ' + i(stub.method) + ' to not have been called once' )
        return this;
      }
  });

  /**
   * # twice
   *
   * Checks the value of count for a stub calls == 2
   *
   * @api public
   */

  Object.defineProperty(Assertion.prototype, 'twice',
    { get: function () {
        new Assertion(this.obj).to.be.stub;
        var stub = this.obj.__stub
          , count = stub.count.count;
        this.assert(
            count == 2
          , 'expected method ' + i(stub.method) + ' to have been called twice but got ' + i(count)
          , 'expected method ' + i(stub.method) + ' to not have been called twice' )
        return this;
      }
  });

  /**
   * # exactly(n)
   *
   * Check the value of count for stub calls = n
   *
   * @api public
   */

  Assertion.prototype.exactly = function (n) {
    new Assertion(this.obj).to.be.stub;
    var stub = this.obj.__stub
      , count = stub.count.count;
    this.assert(
        count == n
      , 'expected method ' + i(stub.method) + ' to have been called ' + i(n) + ' times but got ' + i(count)
      , 'expected method ' + i(stub.method) + ' to not have been called ' + i(count) + 'times' );
  };
};
