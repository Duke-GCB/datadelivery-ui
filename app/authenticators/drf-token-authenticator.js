/**
 * Authenticator that reads token created by d4s2
 * Typically an authenticator would have an authenticate method.
 * We do not need this since d4s2 creates a cookie in the format needed by this authenticator.
 */

import DRFTokenAuthenticator from 'drf-ember-frontend/authenticators/drf-token-authenticator';
import ENV from 'datadelivery-ui/config/environment';

export default DRFTokenAuthenticator.extend({
  authTokenUrl: ENV.APP.API_URL + '/api-auth-token/'
});
