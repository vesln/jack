describe('#stub', function() {
  it('stubs a method', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar');

    assert(typeof foo.bar() === 'undefined');

    foo.bar.revert();
  });

  it('can be configured what to return', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar', { returns: 4 });

    assert(foo.bar() === 4);

    foo.bar.revert();
  });

  it('can reset a stubbed method', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar');
    foo.bar.revert();

    assert(foo.bar() === 3);
  });
});
