!function (name, definition) {
  if (typeof define == 'function' && typeof define.amd  == 'object') define(definition);
  else this[name] = definition();
}('jack', function () {
  // CommonJS require()
  function require(p){
    var path = require.resolve(p)
      , mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
      mod.exports = {};
      mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
  }

  require.modules = {};

  require.resolve = function (path){
    var orig = path
      , reg = path + '.js'
      , index = path + '/index.js';
    return require.modules[reg] && reg
      || require.modules[index] && index
      || orig;
  };

  require.register = function (path, fn){
    require.modules[path] = fn;
  };

  require.relative = function (parent) {
    return function(p){
      if ('.' != p[0]) return require(p);

      var path = parent.split('/')
        , segs = p.split('/');
      path.pop();

      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if ('..' == seg) path.pop();
        else if ('.' != seg) path.push(seg);
      }

      return require(path.join('/'));
    };
  };



require.register("expectation", function (module, exports, require) {
/*!
 * Jack.
 *
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Expectation base class.
 */
function Expectation() {}

/**
 * Returns an error message.
 * 
 * @param {String} Message.
 * @param {Object} Params.
 * @returns {String} Error message.
 * @api private
 */
Expectation.prototype.error = function(message, params) {
  var msg = this.messages[message];
  
  Object.keys(params).forEach(function(param) {
    msg = msg.replace(':' + param, params[param]);
  });
  
  return msg;
};

/**
 * Expose `Expectation`.
 */
module.exports = Expectation;

}); // module expectation


require.register("expectations/args", function (module, exports, require) {
/*!
 * Jack.
 *
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Expectation base.
 *
 * @type {Function}
 */
var Expectation = require('../expectation');

/**
 * Args constructor.
 *
 * @param {String} The stub method.
 */
function Args(method) {
  this.method = method;
  this.expectations = null;
  this.args = [];
};

// `Args`. inhertis from `Expectation`.
Args.prototype.__proto__ = Expectation.prototype;

/**
 * Error message.
 *
 * @type {Object}
 * @api private
 */
Args.prototype.messages = {
  main: 'Expected :method to have been called with :expectations. But it was called with :args.',
};

/**
 * Sets expectations.
 *
 * @param {Object} Arguments.
 * @api public
 */
Args.prototype.expect = function(args) {
  this.expectations = Array.prototype.slice.call(args);
};

/**
 * Called when the the rest method of the original method was invoked.
 *
 * @api public
 */
Args.prototype.end = function() {
  var eql = true;
  if (!this.expectations) return;

  for (var i = -1, len = this.expectations.length; ++i < len;) {
    if (this.expectations[i] !== this.args[i]) eql = false;
  }

  if (eql) return;

  throw new Error(this.error('main', {
    expectations: util.inspect(this.expectations),
    args: util.inspect(this.args)
  }));
};

/**
 * Called when the stubed method was invoked.
 *
 * @param {Object} Arguments.
 * @api public
 */
Args.prototype.notify = function(args) {
  if (!this.expectations) return;
  this.args = Array.prototype.slice.call(args);
};

/**
 * Expose `Args`.
 */
module.exports = Args;

}); // module args


require.register("expectations/count", function (module, exports, require) {
/*!
 * Jack.
 *
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Expectation base.
 *
 * @type {Function}
 */
var Expectation = require('../expectation');

/**
 * Count constructor.
 *
 * @param {String} The stub method.
 */
function Count(method) {
  this.method = method;
  this.count = 0;
  this.expectations = null;
};

// `Args`. inhertis from `Expectation`.
Count.prototype.__proto__ = Expectation.prototype;

/**
 * Error message.
 *
 * @type {Object}
 * @api private
 */
Count.prototype.messages = {
  strict: 'Expected :method to have been called :n time(s). But it was called :x time(s).',
  min: 'Expected :method to have been called at least :n time(s). But it was called :x time(s).',
  max: 'Expected :method to have been called at most :n time(s). But it was called :x time(s).',
  not: 'Expected :method to not have been called :n times(s)'
};

/**
 * Sets count expectations.
 *
 * @param {Number} Times.
 * @param {String} Mode. Default to exact. It can also be `min`, `max`, or `not`. [optional]
 * @api public
 */
Count.prototype.expect = function(n, mode) {
  this.expectations = n;
  this.mode = mode || 'strict';
};

/**
 * Called when the stubed method was invoked.
 *
 * @param {Object} Arguments.
 * @api public
 */
Count.prototype.notify = function(args) {
  ++this.count;
};

/**
 * Called when the the rest method of the original method was invoked.
 *
 * @api public
 */
Count.prototype.end = function() {
  if (this.expectations === null) return;

  switch (this.mode) {
    case 'strict':
      if (this.expectations === this.count) return;
      break;
    case 'min':
      if (this.expectations <= this.count) return;
      break;
    case 'max':
      if (this.expectations >= this.count) return;
      break;
    case 'not':
      if (this.expectations !== this.count) return;
      break;
  }

  throw new Error(this.error(this.mode, {
    method: this.method,
    n: this.expectations,
    x: this.count
  }));
};

/**
 * Expose `Count`.
 */
module.exports = Count;

}); // module count


require.register("integration/chai", function (module, exports, require) {
var Stub = require('../stub');

module.exports = function (chai) {
  var Assertion = chai.Assertion
    , i = chai.inspect;

  /**
   * # stub
   *
   * Assert that the object is a `Stub` by checking the
   * internals for the `__stub` object.
   *
   * @api public
   */

  Object.defineProperty(Assertion.prototype, 'stub',
    { get: function () {
        this.assert(
            undefined !== this.obj.__stub
          , 'expected ' + this.inspect + ' to be a stub'
          , 'expected ' + this.inspect + ' to not be a stub');
        return this;
      }
  });

  /**
   * # called
   *
   * Language chain. Also asserts object is a `Stub`.
   * We cannot do assertions here has `not.called.twice`
   * would fail if it would be interpretted as `not called`.
   *
   * Future tense: `to.be.called`
   * Past tense: `have.been.called`
   *
   * @api public
   */

  Object.defineProperty(Assertion.prototype, 'called',
    { get: function () {
        new Assertion(this.obj).to.be.stub;
        var stub = this.obj.__stub
          , count = stub.count.count;

        if (this.tense == 'past' && !this.negate) {
          this.assert(
              count > 0
            , 'expected method ' + i(stub.method) + ' to have been called'
            , 'expected method ' + i(stub.method) + ' to not have been called'
          );
        } else if (!this.negate) {
          stub.count.expect(1, 'min');
        }
        return this;
      }
  });

  /**
   * # not_called
   *
   * Asserts object is a `Stub` that has not been called.
   *
   * Future tense: `to.be.not_called`
   * Past tense: `have.been.not_called`
   *
   * @api public
   */

  Object.defineProperty(Assertion.prototype, 'not_called',
    { get: function () {
        new Assertion(this.obj).to.be.stub;
        var stub = this.obj.__stub
          , count = stub.count.count;
        if (this.tense == 'past' && !this.negate) {
          this.assert(
              count == 0
            , 'expected method ' + i(stub.method) + ' to not have been called'
            , 'expected method ' + i(stub.method) + ' to have been called'
          );
        } else {
          this.negate = true;
        }
        return this;
      }
  });
  /**
   * # once
   *
   * Checks the value of count for a stub calls == 1
   *
   * @api public
   */

  Object.defineProperty(Assertion.prototype, 'once',
    { get: function () {
        new Assertion(this.obj).to.be.stub;
        var stub = this.obj.__stub
          , count = stub.count.count;
        if (this.tense == 'past') {
          this.assert(
              count == 1
            , 'expected method ' + i(stub.method) + ' to have been called once but got ' + i(count)
            , 'expected method ' + i(stub.method) + ' to not have been called once' )
        } else if (this.negate) {
          stub.count.expect(1, 'not');
        } else {
          stub.count.expect(1);
        }
        return this;
      }
  });

  /**
   * # twice
   *
   * Checks the value of count for a stub calls == 2
   *
   * @api public
   */

  Object.defineProperty(Assertion.prototype, 'twice',
    { get: function () {
        new Assertion(this.obj).to.be.stub;
        var stub = this.obj.__stub
          , count = stub.count.count;
        if (this.tense == 'past') {
          this.assert(
              count == 2
            , 'expected method ' + i(stub.method) + ' to have been called twice but got ' + i(count)
            , 'expected method ' + i(stub.method) + ' to not have been called twice' )
        } else if (this.negate) {
          stub.count.expect(2, 'not');
        } else {
          stub.count.expect(2);
        }
        return this;
      }
  });

  /**
   * # exactly(n)
   *
   * Check the value of count for stub calls = n
   *
   * @param {Number} number to test
   * @api public
   */

  Assertion.prototype.exactly = function (n) {
    new Assertion(this.obj).to.be.stub;
    var stub = this.obj.__stub
      , count = stub.count.count;
    if (this.tense == 'past') {
      this.assert(
          count == n
        , 'expected method ' + i(stub.method) + ' to have been called ' + i(n) + ' times but got ' + i(count)
        , 'expected method ' + i(stub.method) + ' to not have been called ' + i(count) + 'times' );
    } else if (this.negate) {
      stub.count.expect(n, 'not');
    } else {
      stub.count.expect(n);
    }
    return this;
  };

  /**
   * # min(n)
   *
   * Check that the value of calls counted for a stub
   * is greater than or equal to `n`.
   *
   * @param {Number} number to test
   * @api public
   */

  Assertion.prototype.min = function (n) {
    new Assertion(this.obj).to.be.stub;
    var stub = this.obj.__stub
      , count = stub.count.count;
    if (this.tense == 'past') {
      this.assert(
          count >= n
        , 'expected method ' + i(stub.method) + ' to have been called minimum of ' + i(n) + ' times but got ' + i(count)
        , 'expected method ' + i(stub.method) + ' to have been called less than ' + i(n) + ' times but got ' + i(count) );
    } else if (this.negate) {
      stub.count.expect(n - 1, 'max');
    } else {
      stub.count.expect(n, 'min');
    }
    return this;
  };

  /**
   * # max(n)
   *
   * Check that the value of calls counted for a stub
   * is less than or equal to `n`.
   *
   * @param {Number} number to test
   * @api public
   */

  Assertion.prototype.max = function (n) {
    new Assertion(this.obj).to.be.stub;
    var stub = this.obj.__stub
      , count = stub.count.count;
    if (this.tense == 'past') {
      this.assert(
          count <= n
        , 'expected method ' + i(stub.method) + ' to have been called maximum of ' + i(n) + ' times but got ' + i(count)
        , 'expected method ' + i(stub.method) + ' to have been called more than ' + i(n) + ' times but got ' + i(count) );
    } else if (this.negate) {
      stub.count.expect(n + 1, 'min');
    } else {
      stub.count.expect(n, 'max');
    }
    return this;
  };
};

}); // module chai


require.register("jack", function (module, exports, require) {
/*!
 * Jack.
 *
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Stub class.
 *
 * @type {Function}
 */
var Stub = require('./stub');

/**
 * Jack.
 *
 * @type {Object}
 */
var jack = module.exports;

/**
 * Exposing the Stub object
 */
jack.Stub = Stub;

/**
 * Keep the original mock, stub and spy methods
 * in case they are used anywhere.
 */
var _mock = Object.prototype.mock;
var _stub = Object.prototype.stub;
var _spy = Object.prototype.spy;

/**
 * Stubs a method.
 *
 * @param {Object} Object.
 * @param {String} Method name.
 * @returns {Object} Stub.
 * @api public
 */
jack.mock =
jack.stub = function(obj, method) {
  return new Stub(obj, method);
};

/**
 * Creates a spy.
 *
 * @param {Object|Function} Object or anonymous function.
 * @param {String} Method name.
 * @returns {Object} Stub.
 * @api public
 */
jack.spy = function(obj, method) {
  return new Stub(obj, method, true);
};

/**
 * Chai integration.
 *
 *      chai.use(jack.chai);
 *
 * @param {Chai} export to extend
 * @api public
 */

jack.chai = require('./integration/chai');

/**
 * Creates a mock.
 *
 * @param {String} Method name.
 * @returns {Object} Stub.
 */
var mock = function(method) {
  return new Stub(this, method);
};

/**
 * Creates a spy.
 *
 * @param {String} Method name.
 * @returns {Object} Stub.
 */
var spy = function(method) {
  return new Stub(this, method, true);
};

/**
 * Extends the Object. Thanks @rstankov!
 *
 * @param {Object|Function} The object that will be extended.
 * @returns {Object} `jack`.
 * @api public
 */
jack.extend = function(obj) {
  if (typeof obj === 'object') {
    obj.spy = spy;
    obj.mock = obj.stub = mock;
  } else {
    obj.prototype.spy = spy;
    obj.prototype.mock = obj.prototype.stub = mock;
  }
  return jack;
};

/**
 * No conflict mode.
 *
 * @returns {Object} `jack`.
 * @api public
 */
jack.noConflict = function() {
  Object.prototype.spy = _spy;
  Object.prototype.mock = _mock;
  Object.prototype.stub = _stub;
  return jack;
};

// Extend the Object.
jack.extend(Object);

}); // module jack


require.register("stub", function (module, exports, require) {
/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */
 
/**
 * Define method.
 * 
 * @type {Function}
 */
var define = require('./utils').define;

/**
 * Expectations.
 */
var Count = require('./expectations/count');
var Args = require('./expectations/args');

/**
 * Stub constructor.
 * 
 * @param {Object} Object.
 * @param {String} Method name.
 * @param {Boolean} Spy. Default to false. [optional]
 */
function Stub(obj, method, spy) {
  // It's stubbed already.
  if (obj[method].__stub) return obj[method].__stub;
  
  this.spy = spy || false;
  this.target = obj;
  this.method = method;
  this.orig = obj[method];
  this.count = new Count(method);
  this.args = new Args(method);
  this.expectations = [this.count, this.args];
  this.retValues = [];
  this.error = null;
  this.compile();
};

Stub.prototype = {
  
  /**
   * Compiles a function.
   * 
   * @param {Function} Desired new functionality.
   * @return `this`.
   * @api private
   */
  compile: function() {
    var self = this;
    
    this.reset = function() {
      // Notifies all expectation that this is the end of the method.
      self.expectations.forEach(function(expectation) {
        expectation.end();
      });

      // Setting the original method back.
      self.target[self.method] = self.orig;
    };
    
    this.target[this.method] = function() {
      var args = arguments;
      
      // Checks if an error should be trown.
      if (self.error) throw new Error(self.error);
      
      // Checks if a function exists.
      if (self.fn) return self.fn.apply(self.target, args);
      
      // Checks the existence of a return value.
      switch (self.retValues.length) {
        case 0: break;
        case 1: return self.retValues[0];
        default: return self.retValues.shift();
      }
      
      // Notifies all expectations that the method was called.
      self.expectations.forEach(function(expectation) {
        expectation.notify(args);
      });
      
      // Is it a spy?
      if (self.spy) self.orig.apply(self.target, args);
    };

    // Reset function.
    this.target[this.method].reset = this.reset;
    this.target[this.method].__stub = this;
    return this;
  },
  
  /**
   * Sets return value of a method.
   * 
   * @return `this`.
   * @api public
   */
  return: function() {
    this.retValues = Array.prototype.slice.call(arguments);
    return this;
  },
  
  /**
   * Replaces the original method with a function.
   * 
   * @param {Function} Function.
   * @returns `this`.
   * @api public
   */
  replace: function(fn) {
    this.fn = fn;
    return this;
  },
  
  /**
   * Sets expectation count to 1.
   * 
   * @return `this`.
   * @api public
   */
  get once() {
    this.count.expect(1);
    return this;
  },
  
  /**
   * Sets expectation count to 1.
   * 
   * @return `this`.
   * @api public
   */
  get twice() {
    this.count.expect(2);
    return this;
  },
  
  /**
   * Sets expectation to exact number.
   * 
   * @param {Number} Positive number.
   * @return `this`.
   * @api public
   */
  exactly: function(n) {
    this.count.expect(n);
    return this;
  },
  
  /**
   * Sets expectation count to at least n times.
   * 
   * @return `this`.
   * @api public
   */
  least: function(n) {
    this.count.expect(n, 'min');
    return this;
  },
  
  /**
   * Sets expectation count to at least n times.
   * 
   * @return `this`.
   * @api public
   */
  throw: function(msg) {
    this.error = msg;
    return this;
  },
  
  /**
   * Sets arguments expectations.
   * 
   * @return `this`.
   * @api public
   */
  arguments: function() {
    this.args.expect(arguments);
    return this;
  },
  
  /**
   * Sets expectation count to at most n times.
   * 
   * @return `this`.
   * @api public
   */
  most: function(n) {
    this.count.expect(n, 'max');
    return this;
  },
  
  /**
   * Sets expectation count to 1.
   * 
   * @return `this`.
   * @api public
   */
  get number() {
    this.count.expect(null);
    return this;
  },
};

/**
 * Helper properties.
 * 
 * @type {Array}
 */
var props = [
  'it', 'be', 'to', 
  'has', 'must', 'should_be', 
  'called', 'times', 'of', 
  'any', 'and', 'at', 
  'expect', 'with'
];

props.forEach(function(prop) {
  define(Stub.prototype, prop, function() {
    return this;
  });
});

/**
 * Expose `Stub`.
 */
module.exports = Stub;
}); // module stub


require.register("utils", function (module, exports, require) {
/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Utils namespace.
 * 
 * @type {Object}
 */
var utils = module.exports;

/**
 * defineProperty alias.
 * 
 * @param {Object} Prototype.
 * @param {String} Name.
 * @param {Function} Function.
 * @api public
 */
utils.define = function(proto, name, fn) {
  Object.defineProperty(proto, name, {
    set: function(){},
    get: fn,
    configurable: true
  });
};
}); // module utils
  return require('jack');
});
