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
