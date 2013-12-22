module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['hydro'],
    files: [
      'build/build.js',
      'hydro.karma.js',
      'test/*.js'
    ],
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],
    captureTimeout: 60000,
    singleRun: true,
    client: {
      hydro: {
        plugins: ['hydro-bdd'],
        setup: false
      }
    },
  });

  if (process.env.TEST_ENV === 'sauce') {
    require('./karma.sauce')(config);
  }
};
