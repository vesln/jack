/*!
 * Jack.
 * 
 * Veselin Todorov <hi@vesln.com> && Jake Luer <jake@alogicalparadox.com>
 * MIT License.
 */

/**
 * Support.
 */
var should = require('chai').should();

/**
 * The tested class.
 */
var Count = require('../../lib/expectations/count');

describe('Count', function() {
  it('should do nothing if no expectations is set.', function() {
    var count = new Count('foo');
    count.end();
  });
  
  it('should be able to handle strict expectations', function() {
    var error = null;
    var count = new Count('foo');
    count.expect(2, 'strict');
    count.notify();
    count.notify();
    count.end();
    
    count = new Count('foo');
    count.expect(3, 'strict');
    count.notify();
    count.notify();
    try {
      count.end();
    } catch(err) {
      error = err;
    } finally {
      if (!error) throw new Error('Error expected.')
      error = null;
    }
    
    count = new Count('foo');
    count.expect(3, 'strict');
    try {
      count.end();
    } catch(err) {
      error = err;
    } finally {
      if (!error) throw new Error('Error expected.')
      error = null;
    }
  });
  
  it('should be able to handle min expectations', function() {
    var error = null;
    var count = new Count('foo');
    count.expect(2, 'min');
    count.notify();
    count.notify();
    count.end();
    
    count = new Count('foo');
    count.expect(3, 'min');
    count.notify();
    count.notify();
    try {
      count.end();
    } catch(err) {
      error = err;
    } finally {
      if (!error) throw new Error('Error expected.')
      error = null;
    }
    
    count = new Count('foo');
    count.expect(3, 'min');
    try {
      count.end();
    } catch(err) {
      error = err;
    } finally {
      if (!error) throw new Error('Error expected.')
      error = null;
    }
  });
  
  it('should be able to handle max expectations', function() {
    var error = null;
    var count = new Count('foo');
    count.expect(2, 'max');
    count.notify();
    count.notify();
    count.end();
    
    count = new Count('foo');
    count.expect(1, 'max');
    count.notify();
    count.notify();
    try {
      count.end();
    } catch(err) {
      error = err;
    } finally {
      if (!error) throw new Error('Error expected.')
      error = null;
    }
  });
});
