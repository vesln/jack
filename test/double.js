describe('double', function() {
  it('returns a function the matches the number of args of the original', function() {
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
      assert(jack(obj, 'fn' + i ).length === i, i);
    }
  });

  it('replaces the original method with provided fn', function() {
    var foo = { bar: function() { return 42 } };
    jack(foo, 'bar', function() { return 4; });
    assert(foo.bar() === 4);
  });

  it('cen revert to the original method', function() {
    var foo = { bar: function() { return 42 } };
    jack(foo, 'bar', function() {});
    foo.bar.revert();
    assert(foo.bar() === 42);
  });

  it('stores information about the calls', function() {
    var ctx = {};
    var obj = { test: function(){} };
    var double = jack(obj, 'test');

    double('foo', 'bar');
    double.call(ctx);

    assert(double.called === true);
    assert(double.calls[0].args[0] === 'foo');
    assert(double.calls[0].args[1] === 'bar');

    assert(double.calls[1].context === ctx);
  });

  it('can spy object methods', function() {
    var obj = { test: function() { return 42; } };

    jack(obj, 'test');

    assert(obj.test() === 42);
    assert(obj.test.called);
    assert(obj.test.calls.length === 1);
  });

  it('has the correct number of params', function() {
    var obj = { test: function(a, b, c) {} };
    var double = jack(obj, 'test');
    assert(double.length === 3);
  });
});
