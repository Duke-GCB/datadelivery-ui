import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  canResend: computed('model.{outgoing,status}', function () {
    if (this.get('model.outgoing')) {
      return this.get('model.status') == 'notified';
    }
    return false;
  })
})
