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

  it('matches the number of args of the original', function() {
    var obj = {
      fn1: function(a) {},
      fn2: function(a, b) {},
      fn3: function(a, b, c) {},
      fn4: function(a, b, c, d) {},
      fn5: function(a, b, c, d, e) {},
      fn6: function(a, b, c, d, e, f) {},
      fn7: function(a, b, c, d, e, f, g) {},
      fn8: function(a, b, c, d, e, f, g, h) {},
      fn9: function(a, b, c, d, e, f, g, h, i) {},
      fn10: function(a, b, c, d, e, f, g, h, i, j) {},
    };

    for (var i = 1, len = 11; i < len; i++) {
      assert(jack.stub(obj, 'fn' + i ).length === i, i);
    }
  });

  it('can use a custom function', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar', function() {
      return 4;
    });
    assert(foo.bar() === 4);
  });
});
