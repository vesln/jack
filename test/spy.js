describe('#spy', function() {
  it('stores if it has been called', function() {
    var spy = jack.spy();
    spy();
    assert(spy.called);
  });

  it('stores the arguments of the calls', function() {
    var spy = jack.spy();
    spy('foo', 'bar');
    assert(spy.calls[0].args[0] === 'foo');
    assert(spy.calls[0].args[1] === 'bar');
  });

  it('stores the context it was called with', function() {
    var spy = jack.spy();
    var obj = {};
    spy.call(obj);
    assert(spy.calls[0].context === obj);
  });

  it('can spy object methods', function() {
    var foo = {
      bar: function() { return 3; }
    };

    jack.spy(foo, 'bar');

    assert(foo.bar() === 3);
    assert(foo.bar.called);
    assert(foo.bar.calls.length === 1);
  });

  it('can revert the original method', function() {
    var foo = {
      bar: function() {}
    };

    jack.spy(foo, 'bar');
    foo.bar.revert();
    foo.bar() === 3;

    assert(!foo.bar.called);
  });
});
