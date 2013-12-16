describe('stub', function() {
  it('can stub a given method with empty fn', function() {
    var foo = { bar: function() { return 3 } };
    jack.stub(foo, 'bar');
    assert(foo.bar() !== 3);
  });
});
