import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  currentDukeDsUser: null,

  loadCurrentDukeDsUser() {
    // Use queryRecord since Ember complains that 'current-duke-ds-user'
    // doesn't match the returned ID.
    return new Ember.RSVP.Promise((resolve, reject) => {
      const authenticated = this.get('session.isAuthenticated');
      if(authenticated) {
        return this.get('store').queryRecord('duke-ds-user', {}).then((currentDukeDsUser) => {
          this.set('currentDukeDsUser', currentDukeDsUser);
          resolve();
        }, reject);
      } else {
        this.set('currentDukeDsUser', null);
        resolve();
      }
    });
  }
});
