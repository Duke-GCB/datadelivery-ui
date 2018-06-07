import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  init() {
    this.getToken();
  },
  getToken() {
    const authenticator = 'authenticator:jwt-session-authenticator'; // Find the authenticator that uses the session
    const credentials = {};
    const success = () => {
      this.transitionToRoute('/deliveries');
    };
    const failure = (/* reason */) => {
      this.transitionToRoute('/login');
    };
    this.get('session')
      .authenticate(authenticator, credentials)
      .then(success, failure);
  }
});
