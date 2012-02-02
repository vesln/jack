var Stub = require('../stub');

module.exports = function (chai) {
  var Assertion = chai.Assertion;

  if (Assertion.prototype.hasOwnProperty('called')) {
    // we have already extended chai, so head on out
    return;
  }

  Assertion.prototype.stub = function (method) {
    this.obj = new Stub(this.obj, method);
    return this;
  };

  Object.defineProperty(Assertion.prototype, 'called',
    { get: function () {
        new Assertion(this.obj).to.be.instanceOf(Stub);
        return this;
      }
  });
};
