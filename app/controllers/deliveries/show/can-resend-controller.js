// Base controller that provides a canResend computed property based on the model and the current DukeDS User
// Assumes model is a duke-ds-project-transfer. Uses service to lookup current user via an observer
// so the value of canResend may change when this service resolves.
import { computed } from '@ember/object';

import { alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
  application: controller(),
  currentDukeDsUser: alias('application.currentDukeDsUser'),
  canResend: computed('model.{canResend,fromUser.id}', 'currentDukeDsUser.id', function () {
    const modelCanResend = this.get('model.canResend');
    const fromUserId = this.get('model.fromUser.id');
    const currentDukeDsUserId = this.get('currentDukeDsUser.id');
    if (!currentDukeDsUserId) {
      return false;
    }
    return modelCanResend && fromUserId == currentDukeDsUserId;
  })
});
