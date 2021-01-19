import CanResendController from './can-resend-controller';

export default CanResendController.extend({
  actions: {
    back() {
      this.transitionToRoute('deliveries.show', this.model);
    },
    resend() {
      this.transitionToRoute('deliveries.show.resend-confirm', this.model);
    }
  }
});
