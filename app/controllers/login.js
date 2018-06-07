import Ember from 'ember';
import ENV from 'datadelivery-ui/config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  isDevelopmentMode: ENV.environment === 'development',
  authorizeUrl: ENV.APP.AUTHORIZE_URL,
  actions: {
    authenticate() {
      // Now using JWT
      const authenticator = 'authenticator:jwt-authenticator'; // Causes JWT authenticator to be used
      const credentials = this.getProperties('username', 'password');
      this.get('session').authenticate(authenticator, credentials).catch((reason) => {
        this.set('errorMessage', reason);
      });
    }
  }
});
