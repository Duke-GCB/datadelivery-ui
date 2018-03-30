// Base controller that provides a canResend computed property based on the model and the current user
// Assumes model is a duke-ds-project-transfer. Uses service to lookup current user via an observer
// so the value of canResend may change when this service resolves.
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  user: Ember.inject.service('user'),
  currentUser: null,
  canResend: Ember.computed('model.canResend', 'model.fromUser.id', 'currentUser.dukeDsUser.id', function () {
    const modelCanResend = this.get('model.canResend');
    const fromUserId = this.get('model.fromUser.id');
    const currentUserId = this.get('currentUser.dukeDsUser.id');
    if (!currentUserId) {
      return false;
    }
    return modelCanResend && fromUserId == currentUserId;
  }),
  authenticatedDidChange: Ember.on('init',
    Ember.observer('session.isAuthenticated', function() {
      if (this.get('session.isAuthenticated')) {
        this.get('user').currentUser().then(currentUser => {
          this.set('currentUser', currentUser);
        });
      } else {
        this.set('currentUser', null);
      }
    })
  )
});
