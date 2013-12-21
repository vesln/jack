var util = jack._;

describe('util', function() {
  describe('proxy', function() {
    it('returns a function with given number of params', function() {
      var proxy = null;
      var called = 0;
      var fn = function() { called++; };

      for (var i = 1, len = 11; i < len; i++) {
        proxy = util.proxy(i, fn)
        assert(proxy.length === i, i);
        proxy();
      }

      assert(called === 10);
    });
  });
});
