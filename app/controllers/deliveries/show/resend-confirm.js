import Ember from 'ember';

import CanResendController from './can-resend-controller';

export default CanResendController.extend({
  errors: null,
  init() {
    this._super(...arguments);
    this.set('errors', []);
  },
  errorMessages: Ember.computed.mapBy('errors', 'detail'),

  generatePreview() {
    this.get('model.delivery').then((delivery) => {
      return delivery.preview();
    }).then(preview => {
      this.set('emailMessage', preview.delivery_email_text);
    });
  },
  actions: {
    back() {
      this.transitionToRoute('deliveries.show.resend', this.get('model'));
    },
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
    }
  }
});
