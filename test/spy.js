describe('#spy', function() {
  it('can spy a method', function() {
    var obj = { test: function() { return 42; } };
    jack.spy(obj, 'test');
    assert(obj.test() === 42);
  });

  it('can return a spy without giving method or obj', function() {
    var spy = jack.spy();
    assert(spy.double === true);
  });

  it('reverts to noop', function() {
    var spy = jack.spy();
    spy.revert();
    assert(spy() === undefined);
  });
});
