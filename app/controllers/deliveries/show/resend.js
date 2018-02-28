import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    resend() {
      const thisController = this;
      const delivery = this.get('model');
      const projectName = delivery.get('transfer.project.name');
      const deliveryMessage = 'Email message resent for delivery of project ' + projectName + '.';
      delivery.setNew(); // set state back to new so we can resend
      delivery.save().then(function (delivery) {
        delivery.resend().then(function () {
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
