describe('#stub', function() {
  it('stubs a method', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar');
    assert(typeof foo.bar() === 'undefined');
  });

  it('can reset a stubbed method', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar');
    foo.bar.revert();
    assert(foo.bar() === 3);
  });
});

describe('#revert', function() {
  it('resets all modified methods', function() {
    var foo = { bar: function bar() { return 3 } };
    var bar = { foo: function foo() { return 4 } };

    jack.stub(foo, 'bar');
    jack.stub(bar, 'foo');
    jack.stub(bar, 'foo');

    jack.revert();

    assert(foo.bar() === 3);
    assert(bar.foo() === 4);
  });
});
