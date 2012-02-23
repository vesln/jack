[![Build Status](https://secure.travis-ci.org/vesln/jack.png)](http://travis-ci.org/vesln/jack)

# Jack

## Description

Jack is a simple but yet powerful mock framework, that can be used with
any testing framework with your Node.js module, or in the browser.

## Synopsis

### Mocks, Stubs, Spies.

```js
var jack = require('jack');

obj.stub('foo');
obj.mock('foo');
obj.spy('foo');

jack.stub(obj, 'foo');
jack.mock(obj, 'foo');
jack.spy(obj, 'foo');

```

### Stub

#### return

```js
obj.stub('on').and.return(3);
obj.stub('foo').and.return(3, 4, 5);
```

#### replace

```js
obj.stub('on').and.replace(function() {
  // do magic here.
});
```

### reset

```js
obj.foo.reset(); // in order to reset the method
```

### throw  

```js
obj.stub('foo').and.throw('Message'); 
```

### Mock

#### calls

```js
obj.mock('on').it.should_be.called.once;

obj.mock('on').it.should_be.called.twice;

obj.mock('on').it.should_be.called.exactly(3).times;

obj.mock('on').it.should_be.called.any.number.of.times;

obj.mock('on').it.should_be.called.at.least(1).times;
```

### arguments

```js
obj.mock('on').expect.arguments('foo', 'bar');
```

You should call reset to check if an expectation is met.

```js
obj.on.reset();
```

### Spy

Spies are the same as mocks, but the original behavior of the method is
kept.

```js
obj.spy('foo');
```

### No conflict mode

```js
var jack = require('jack').noConflict();
```

### Extend your object/class

```js
var jack = require('jack');
var myObj = jack.extend(myObj);

function Obj() {}

jack.extend(Obj);
```

## Requirements

- NPM (http://npmjs.org/)
- Node.js (http://nodejs.org/)

## Install

```
$ npm install jack
```

## Chai Integration

Chai is a BDD / TDD assertion library for [node](http://nodejs.org) and the browser that
can be delightfully paired with any javascript testing framework.

For more information view the [documentation](http://chaijs.com).

### Getting Started

Include chai and jack in your testing environment.

```js
var chai = require('chai')
  , jack = require('jack');

chai.use(jack.chai);

var expect = chai.expect;
```

### Usage

The jack integration with Chai provides a unique approach to mocks/stubs. Assertions
can be defined before or after the test has taking place. This feature is referred to
as `tense` detection and is an experimental feature provided Chai, and works in the same
way has negation. Where the keyword `not` will negate a statement, the keyword `been` will
indicate that we are asserting how something has already behaved. This feature is only
available in the jack/chai integration. Here is an example:

Given our `Foo` object that has a method `bar`:

```js
var myfoo = new Foo();
myfoo.stub('bar');
```

If we wanted to assert how we expect this stub to behave in the future, we can create a new 
future tense assertion:

```js
expect(myfoo).to.be.called.once;
```

With this, when we reset our stub with `myfoo.bar.reset()`, if that assertion is invalid, the `reset`
will throw. We can attach as many assertions to the stub as needed, but be aware of conflicts.

If, instead, we prefer to test it after we have finished our work, we can create a past tense
assertion:

```js
expect(myfoo).to.have.been.called.once;
```

In this example, we are asserting after all of the work has been done but before the reset. Chai 
will look into the internals of the stub and determine if an assertion has passed or not. This 
behavior is a more native chai approach.

### API Guide

#### .stub

Assert the object is a Jack stub.

```js
expect(myfoo.bar).to.be.stub;
```

#### .called

Language chain. Negation passes through.

```js
// past
expect(myfoo.bar).to.have.been.called;
// future
expect(myfoo.bar).to.be.called; // call count > 0
```

#### .not_called

Asserts that a stub has not been called. Essentially,
negation for `called`.

```js
expect(myfoo.bar).to.have.been.not_called;
```

#### .once

Asserts that stub has been called once.

```js
// past
expect(myfoo.bar).to.have.been.called.once;
// future
expect(myfoo.bar).to.be.called.once;
```

#### .twice

Asserts that stub has been called twice.

```js
// past
expect(myfoo.bar).to.have.been.called.twice;
// future
expect(myfoo.bar).to.be.called.twice;
```

#### .exactly(n)

Asserts that stub has been called exactly `n` times.

```js
// past
expect(myfoo.bar).to.have.been.called.exactly(3);
// future
expect(myfoo.bar).to.be.called.exactly(3);
```

#### .min(n)

Asserts that stub has been called a minimum of `n` times.

```js
// past
expect(myfoo.bar).to.have.been.called.min(3);
// future
expect(myfoo.bar).to.be.called.min(3);
```

#### .max(n)

Asserts that stub has been called a maximum of `n` times.

```js
// past
expect(myfoo.bar).to.have.been.called.max(3);
// future
expect(myfoo.bar).to.be.called.max(3);
```

### Roadmap

Chai integration will expanding its assertions to include `calledWith` and
other argument assertions in the near future.

## Tests

```
$ npm install
$ make test
```
## Where to Get Help

Please post issues to [GitHub Issues](https://github.com/vesln/jack/issues).

## Tests

Tests are written in the BDD styles for the [Mocha](https://github.com/visionmedia/mocha) test runner using the
multiple assertion interfaces from [Chai](http://chaijs.com). Running tests is simple:

    make test

A browser suite is also available at `test/browser/index.js`. The same test definitions are used in both contexts.

## Contributing

Interested in contributing? Fork to get started. 

### Contibutors 

* Veselin Todorov (Github: @[vesln](https://github.com/vesln) (Twitter: @[vesln](http://twitter.com/vesln))
* Jake Luer (Github: @[logicalparadox](http://github.com/logicalparadox)) (Twitter: @[jakeluer](http://twitter.com/jakeluer))

## License

MIT License

Copyright (C) 2012 Veselin Todorov and Jake Luer.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
