import Ember from 'ember';
import CanResendController from './can-resend-controller';

export default CanResendController.extend({
  errors: [],
  errorMessages: Ember.computed.mapBy('errors', 'detail'),
  emailMessage: null,
  actions: {
    resend() {
      const thisController = this;
      function consumeError(error) {
        thisController.set('errors', error.errors);
      }
      const transfer = this.get('model');
      const projectName = transfer.get('project.name');
      const deliveryMessage = 'Email message resent for delivery of project ' + projectName + '.';
      // save user message changes
      transfer.get('delivery').then(function (delivery) {
        if (delivery) {
          delivery.save().then(function (delivery) {
            // resend the delivery email
            delivery.send(true).then(function () {
              thisController.transitionToRoute('deliveries.show', transfer, {
                queryParams: {
                  infoMessage: deliveryMessage
                }
              });
            }, consumeError);
          }, consumeError);
        } else {
          consumeError({
            errors: [{detail:'Delivery not found.'}]
          });
        }
      });
    },
    preview() {
      const delivery = this.get('model.delivery');
      delivery.then(delivery => {
        Ember.Logger.log(`delivery ${delivery}`);
        return delivery.preview();
      }).then(preview => {
        Ember.Logger.log(`preview ${JSON.stringify(preview)}`);
        this.set('emailMessage', preview.delivery_email_text);
      });
    }
  }
});
