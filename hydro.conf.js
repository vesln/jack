/**
 * External dependencies.
 */

var assert = require('assert');

/**
 * Internal dependencies.
 */

var jack = require('./');

/**
 * Test config.
 *
 * @param {Object} hydro
 * @api public
 */

module.exports = function(hydro) {
  hydro.set({
    formatter: 'hydro-dot',
    globals: {
      assert: assert,
      jack: jack
    },
    tests: ['test/*.js'],
    plugins: [
      'hydro-bdd',
      'hydro-focus'
    ],
  });
};
