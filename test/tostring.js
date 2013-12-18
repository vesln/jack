describe('toString', function() {
  it('returns a configured string', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar');
    assert(foo.bar.toString() === '[TestDouble bar]');
  });
});
