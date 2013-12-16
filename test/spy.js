describe('#spy', function() {
  it('can return a spy without giving method or obj', function() {
    var spy = jack.spy();
    assert(spy.double === true);
  });
});
