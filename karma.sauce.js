/**
 * Browsers.
 */

var browsers = {
  'SL_Chrome': {
    base: 'SauceLabs',
    browserName: 'chrome'
  },
  'SL_Firefox': {
    base: 'SauceLabs',
    browserName: 'firefox'
  },
  'SL_Safari': {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'Mac 10.8',
    version: '6'
  },
  'SL_IE_8': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '8'
  },
  'SL_IE_9': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 2008',
    version: '9'
  },
};

/**
 * Configure Karma to run the tests on SauceLabs.
 *
 * @param {Object} config
 * @api public
 */

module.exports = function(config) {
  var package = require('./package.json');
  var branch = process.env.TRAVIS_BRANCH || 'local';

  // Credentials
  var user = process.env.SAUCE_JACK_USERNAME || process.env.SAUCE_USERNAME;
  var key = process.env.SAUCE_JACK_ACCESS_KEY || process.env.SAUCE_ACCESS_KEY;

  // Browser versions
  var versions = process.env.BROWSERS
    ? process.env.BROWSERS.split(',')
    : Object.keys(browsers);

  // Do not run when on Travis CI and the current node version
  // doesn't match the configured one
  if (process.version.indexOf(process.env.RUN_ON) !== 0 && process.env.TRAVIS) {
    process.exit(0);
  }

  config.browsers = versions;
  config.customLaunchers = {};
  config.reporters.push('saucelabs');
  config.transports = ['xhr-polling'];

  versions.forEach(function(key) {
    if (!browsers[key]) throw new Error('Invalid browser: ' + key);
    config.customLaunchers[key] = browsers[key];
  });

  config.sauceLabs = {
    username: user,
    accessKey: key,
    startConnect: true,
    tags: [package.name + '_' + package.version, user + '@' + branch],
    testName: package.name,
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER || new Date().getTime()
  };
};
