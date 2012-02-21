var Stub = require('../stub');

module.exports = function (chai) {
  var Assertion = chai.Assertion
    , i = chai.inspect;

  /**
   * # stub
   *
   * Assert that the object is a `Stub` by checking the
   * internals for the `__stub` object.
   *
   * @api public
   */

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
   * Future tense: `to.be.called`
   * Past tense: `have.been.called`
   *
   * @api public
   */

  Object.defineProperty(Assertion.prototype, 'called',
    { get: function () {
        new Assertion(this.obj).to.be.stub;
        var stub = this.obj.__stub
          , count = stub.count.count;

        if (this.tense == 'past' && !this.negate) {
          this.assert(
              count > 0
            , 'expected method ' + i(stub.method) + ' to have been called'
            , 'expected method ' + i(stub.method) + ' to not have been called'
          );
        } else if (!this.negate) {
          stub.count.expect(1, 'min');
        }
        return this;
      }
  });

  /**
   * # not_called
   *
   * Asserts object is a `Stub` that has not been called.
   *
   * Future tense: `to.be.not_called`
   * Past tense: `have.been.not_called`
   *
   * @api public
   */

  Object.defineProperty(Assertion.prototype, 'not_called',
    { get: function () {
        new Assertion(this.obj).to.be.stub;
        var stub = this.obj.__stub
          , count = stub.count.count;
        if (this.tense == 'past' && !this.negate) {
          this.assert(
              count == 0
            , 'expected method ' + i(stub.method) + ' to not have been called'
            , 'expected method ' + i(stub.method) + ' to have been called'
          );
        } else {
          this.negate = true;
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
        if (this.tense == 'past') {
          this.assert(
              count == 1
            , 'expected method ' + i(stub.method) + ' to have been called once but got ' + i(count)
            , 'expected method ' + i(stub.method) + ' to not have been called once' )
        } else if (this.negate) {
          stub.count.expect(1, 'not');
        } else {
          stub.count.expect(1);
        }
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
        if (this.tense == 'past') {
          this.assert(
              count == 2
            , 'expected method ' + i(stub.method) + ' to have been called twice but got ' + i(count)
            , 'expected method ' + i(stub.method) + ' to not have been called twice' )
        } else if (this.negate) {
          stub.count.expect(2, 'not');
        } else {
          stub.count.expect(2);
        }
        return this;
      }
  });

  /**
   * # exactly(n)
   *
   * Check the value of count for stub calls = n
   *
   * @param {Number} number to test
   * @api public
   */

  Assertion.prototype.exactly = function (n) {
    new Assertion(this.obj).to.be.stub;
    var stub = this.obj.__stub
      , count = stub.count.count;
    if (this.tense == 'past') {
      this.assert(
          count == n
        , 'expected method ' + i(stub.method) + ' to have been called ' + i(n) + ' times but got ' + i(count)
        , 'expected method ' + i(stub.method) + ' to not have been called ' + i(count) + 'times' );
    } else if (this.negate) {
      stub.count.expect(n, 'not');
    } else {
      stub.count.expect(n);
    }
    return this;
  };

  /**
   * # min(n)
   *
   * Check that the value of calls counted for a stub
   * is greater than or equal to `n`.
   *
   * @param {Number} number to test
   * @api public
   */

  Assertion.prototype.min = function (n) {
    new Assertion(this.obj).to.be.stub;
    var stub = this.obj.__stub
      , count = stub.count.count;
    if (this.tense == 'past') {
      this.assert(
          count >= n
        , 'expected method ' + i(stub.method) + ' to have been called minimum of ' + i(n) + ' times but got ' + i(count)
        , 'expected method ' + i(stub.method) + ' to have been called less than ' + i(n) + ' times but got ' + i(count) );
    } else if (this.negate) {
      stub.count.expect(n - 1, 'max');
    } else {
      stub.count.expect(n, 'min');
    }
    return this;
  };

  /**
   * # max(n)
   *
   * Check that the value of calls counted for a stub
   * is less than or equal to `n`.
   *
   * @param {Number} number to test
   * @api public
   */

  Assertion.prototype.max = function (n) {
    new Assertion(this.obj).to.be.stub;
    var stub = this.obj.__stub
      , count = stub.count.count;
    if (this.tense == 'past') {
      this.assert(
          count <= n
        , 'expected method ' + i(stub.method) + ' to have been called maximum of ' + i(n) + ' times but got ' + i(count)
        , 'expected method ' + i(stub.method) + ' to have been called more than ' + i(n) + ' times but got ' + i(count) );
    } else if (this.negate) {
      stub.count.expect(n + 1, 'min');
    } else {
      stub.count.expect(n, 'max');
    }
    return this;
  };
};
