import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from "bookstore/config/environment";
import Ember from 'ember';
import bugsnag from '@bugsnag/js';


export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

var bugsnagClient = bugsnag(config.BUGSNAG_API_KEY)

Ember.onerror = function(error) {
  bugsnagClient.notify(error);

  if(Ember.testing) {
    throw error;
  }
}
