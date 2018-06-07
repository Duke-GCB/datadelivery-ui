import JWTAuthenticator from 'drf-ember-frontend/authenticators/jwt-authenticator';
import config from 'ember-get-config';

const JWTSessionAuthenticator = JWTAuthenticator.extend({
  cookies: Ember.inject.service('cookies'),
  init() {
    this._super(...arguments);
    const conf = config['ember-simple-auth-token'] || {};
    this.serverTokenEndpoint = conf.serverTokenSessionEndpoint || '/api/token-session/';
    // This authenticator needs to include the CSRF token
    const csrftoken =  this.get('cookies').read('csrftoken');
    this.headers = {'X-CSRFTOKEN': csrftoken};
  },
});

export default JWTSessionAuthenticator;
