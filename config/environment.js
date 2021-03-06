'use strict';

module.exports = function(environment) {
  let ENV = {
      modulePrefix: 'datadelivery-ui',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      API_URL: '',
      API_NAMESPACE: '',
      AUTHORIZE_URL: '',
      CONTACT_EMAIL: 'gcb-help@duke.edu'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.API_URL = 'http://127.0.0.1:8000';
    ENV.APP.API_NAMESPACE = 'api/v2';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.API_URL = 'http://testhost';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.APP.API_URL = '';
    ENV.APP.API_NAMESPACE = 'api/v2';
    ENV.APP.AUTHORIZE_URL = ENV.APP.API_URL + '/auth/authorize/';
  }

  ENV['ember-simple-auth-token'] = {
    refreshAccessTokens: true,
    refreshLeeway: 300, // refresh 5 minutes (300 seconds) before expiration
    serverTokenEndpoint: ENV.APP.API_URL + '/auth/api-token-auth/', // Server endpoint to send authenticate request
    serverTokenRefreshEndpoint: ENV.APP.API_URL + '/auth/api-token-refresh/',
    serverTokenSessionEndpoint: ENV.APP.API_URL + '/auth/api-token-session/', // Endpoint to get token with session authentication
    tokenPropertyName: 'token', // Key in server response that contains the access token
    refreshTokenPropertyName: 'token', // Key in server response that contains the refresh token. Same as the access token.
    authorizationPrefix: 'JWT ' // Prefix for the value of the Authorization: header. Must be expected by server
  };

  return ENV;
};
