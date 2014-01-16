describe('stub', function() {
  it('can stub a given method with empty fn', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar');
    assert(foo.bar() !== 3);
  });

  it('can stub methods that do not exist', function() {
    var foo = {};
    jack.stub(foo, 'bar');
    assert(typeof foo.bar === 'function');
  });
});
