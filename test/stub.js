describe('#stub', function() {
  it('replaces the original method with provided fn', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar', function() {
      return 4;
    });
    assert(foo.bar() === 4);
  });

  it('can reset a stubbed method', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar', function() {});
    foo.bar.revert();
    assert(foo.bar() === 3);
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
});
