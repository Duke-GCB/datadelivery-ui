// Base controller that provides a canResend computed property based on the model and the current DukeDS User
// Assumes model is a duke-ds-project-transfer. Uses service to lookup current user via an observer
// so the value of canResend may change when this service resolves.
import Ember from 'ember';

export default Ember.Controller.extend({
  deliveriesController: Ember.inject.controller('deliveries'),
  canResend: Ember.computed('deliveriesController.currentDukeDsUser.id', function () {
    const modelCanResend = this.get('model.canResend');
    const fromUserId = this.get('model.fromUser.id');
    const currentDukeDsUserId = this.get('deliveriesController.currentDukeDsUser.id');
    if (!currentDukeDsUserId) {
      return false;
    }
    return modelCanResend && fromUserId == currentDukeDsUserId;
  })
});
