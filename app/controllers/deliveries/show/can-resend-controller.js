// Base controller that provides a canResend computed property based on the model and the current DukeDS User
// Assumes model is a duke-ds-project-transfer. Uses service to lookup current user via an observer
// so the value of canResend may change when this service resolves.
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  dukeDsUser: Ember.inject.service('duke-ds-user'),
  currentDukeDsUser: null,
  canResend: Ember.computed('model.canResend', 'model.fromUser.id', 'currentDukeDsUser.id', function () {
    const modelCanResend = this.get('model.canResend');
    const fromUserId = this.get('model.fromUser.id');
    const currentDukeDsUserId = this.get('currentDukeDsUser.id');
    if (!currentDukeDsUserId) {
      return false;
    }
    return modelCanResend && fromUserId == currentDukeDsUserId;
  }),
  authenticatedDidChange: Ember.on('init',
    Ember.observer('session.isAuthenticated', function() {
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
