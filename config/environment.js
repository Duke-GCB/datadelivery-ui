/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'datadelivery-ui',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
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
  }

  if (environment === 'production') {
    ENV.APP.API_URL = '';
    ENV.APP.API_NAMESPACE = 'api/v2';
  }

  ENV['ember-simple-auth-token'] = {
    refreshAccessTokens: true,
    refreshLeeway: 300, // refresh 5 minutes (300 seconds) before expiration
    serverTokenEndpoint: ENV.APP.API_URL + '/auth/api-token-auth/', // Server endpoint to send authenticate request
    serverTokenRefreshEndpoint: ENV.APP.API_URL + '/auth/api-token-refresh/',
    serverTokenSessionEndpoint: ENV.APP.API_URL + '/auth/api-token-session/', // Endpoint to get token with session authentication
    tokenPropertyName: 'token', // Key in server response that contains the access token
    refreshTokenPropertyName: 'token', // Key in server response that contains the refresh token. Same as the access token.
    authorizationPrefix: 'JWT '
  };

  return ENV;
};
