import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  user: Ember.inject.service('user'),
  dukeDsUser: Ember.inject.service('duke-ds-user'),
  currentDukeDsUser: null,
  authenticatedDidChange: Ember.on('init', Ember.observer('session.isAuthenticated', function () {
      if (this.get('session.isAuthenticated')) {
        this.get('user').currentUser().then(currentUser => {
          this.set('currentUser', currentUser);
        });
        this.get('dukeDsUser').currentDukeDsUser().then(currentDukeDsUser => {
          this.set('currentDukeDsUser', currentDukeDsUser);
        });
      } else {
        this.set('currentUser', null);
        this.set('currentDukeDsUser', null);
      }
    })
  )
});
