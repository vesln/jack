describe('#spy', function() {
  it('can tell if it has been called', function() {
    var spy = jack.spy();
    spy();
    assert(spy.called);
  });

  it('stores information for the calls', function() {
    var spy = jack.spy();
    spy('foo', 'bar');
    assert(spy.calls[0].args[0] === 'foo');
    assert(spy.calls[0].args[1] === 'bar');
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
