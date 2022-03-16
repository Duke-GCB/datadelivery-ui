import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';
'reads'

export default Controller.extend({
  canResend: reads('model.canResend'),
  actions: {
    back() {
      this.transitionToRoute('cloud-deliveries.show', this.model);
    },
    resend() {
      this.transitionToRoute('cloud-deliveries.show.resend-confirm', this.model);
    }
  }
});
