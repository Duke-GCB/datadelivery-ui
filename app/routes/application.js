import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  dukeDsUser: Ember.inject.service('duke-ds-user'),
  // Ensure that the current user is loaded
  beforeModel() {
    return this.get('dukeDsUser').loadCurrentDukeDsUser().catch(() => {
      // No session could be loaded, transition to login
      this.transitionTo('login');
    });
  }
});
