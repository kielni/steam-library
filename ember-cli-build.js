/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    dotEnv: {
      clientAllowedKeys: ['LIBRARY']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.min.js');
  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.min.css');

  app.import('app/styles/slate/bootstrap.min.css');
  app.import('app/styles/simple-sidebar.css');

  app.import(app.bowerDirectory + '/font-awesome/css/font-awesome.min.css');
  app.import(app.bowerDirectory + '/flat-ui/dist/fonts/fontawesome-webfont.woff', { destDir: 'fonts' });
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.ttf', { destDir: 'fonts' });
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.woff', { destDir: 'fonts' });
  app.import(app.bowerDirectory + '/bootstrap-toggle/css/bootstrap-toggle.min.css');
  app.import(app.bowerDirectory + '/bootstrap-toggle/js/bootstrap-toggle.min.js');

  app.import(app.bowerDirectory + '/select2/dist/css/select2.min.css');
  app.import(app.bowerDirectory + '/select2/dist/js/select2.min.js');
  app.import(app.bowerDirectory + '/select2/dist/js/i18n/en.js');
  return app.toTree();
};
