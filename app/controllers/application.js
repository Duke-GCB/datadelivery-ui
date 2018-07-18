import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  dukeDsUser: Ember.inject.service('duke-ds-user'),
  currentDukeDsUser: null,
  authenticatedDidChange: Ember.on('init', Ember.observer('session.isAuthenticated', function () {
      Ember.Logger.log('authenticatedDidChange');
      if (this.get('session.isAuthenticated')) {
        this.get('dukeDsUser').currentDukeDsUser().then(currentDukeDsUser => {
          this.set('currentDukeDsUser', currentDukeDsUser);
        });
      } else {
        this.set('currentDukeDsUser', null);
      }
    })
  )
});
