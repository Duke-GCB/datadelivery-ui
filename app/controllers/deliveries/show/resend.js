import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    resend() {
      const thisController = this;
      const transfer = this.get('model');
      const projectName = transfer.get('project.name');
      const deliveryMessage = 'Email message resent for delivery of project ' + projectName + '.';
      // save user message changes
      transfer.get('delivery').then(function (delivery) {
        delivery.save().then(function (delivery) {
          // resend the delivery email
          delivery.send(true).then(function () {
            thisController.transitionToRoute('deliveries.show', transfer, {
              queryParams: {
                infoMessage: deliveryMessage
              }
            });
          });
        });
      });
    }
  }
});
