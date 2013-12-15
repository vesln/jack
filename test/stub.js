describe('#stub', function() {
  it('stubs a method', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar');

    assert(typeof foo.bar() === 'undefined');

    foo.bar.revert();
  });

  it('can be configured what to return', function() {
    var foo = { bar: function() { return 3 } };

    jack.stub(foo, 'bar', {
      returns: 4
    });

    assert(foo.bar() === 4);

    foo.bar.revert();
  });

  it('can reset a stubbed method', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar');
    foo.bar.revert();

    assert(foo.bar() === 3);
  });

  it('can be configured to throw an error', function() {
    var foo = { bar: function() { return 3 } };
    var err = null;

    jack.stub(foo, 'bar', {
      throws: new Error('test')
    });

    try {
      foo.bar();
    } catch(e) {
      err = e;
    }

    assert(err);
    jack.revert();
  });

  it('the stubbed function matches the number of args of the original', function() {
    var first = { fn: function(a, b, c) {} };
    var second = { fn: function(a, b, c, d) {} };

    assert(jack.stub(first, 'fn').length === 3);
    assert(jack.stub(second, 'fn').length === 4);
  });
});
