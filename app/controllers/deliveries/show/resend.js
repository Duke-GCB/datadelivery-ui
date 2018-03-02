import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    resend() {
      const thisController = this;
      const delivery = this.get('model');
      const projectName = delivery.get('transfer.project.name');
      const deliveryMessage = 'Email message resent for delivery of project ' + projectName + '.';
      // save user message changes
      delivery.save().then(function (delivery) {
        // resend the delivery email
        delivery.send(true).then(function () {
          thisController.transitionToRoute('deliveries.show', delivery, {
            queryParams: {
              infoMessage: deliveryMessage
            }
          });
        });
      });
    }
  }
});
