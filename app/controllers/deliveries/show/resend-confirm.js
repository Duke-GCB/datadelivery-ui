import { isEmpty } from '@ember/utils';
import { mapBy } from '@ember/object/computed';

import CanResendController from './can-resend-controller';

export default CanResendController.extend({
  errors: null,
  init() {
    this._super(...arguments);
    this.set('errors', []);
  },
  errorMessages: mapBy('errors', 'detail'),
  actions: {
    back() {
      this.transitionToRoute('deliveries.show.resend', this.get('model'));
    },
    previewFailed(error) {
      this.set('errors', [error]);
    },
    resend() {
      const transfer = this.get('model');
      const projectName = transfer.get('project.name');
      const deliveryMessage = 'Email message resent for delivery of project ' + projectName + '.';

      const handleError = (errorResponse) => {
        this.set('errors', errorResponse.errors);
      };

      const handleDelivery = (delivery) => {
        if(isEmpty(delivery)) {
          throw { errors: [{detail:'Delivery not found.'}] };
        } else {
          return delivery.save();
        }
      };

      const handleSave = (savedDelivery) => {
        return savedDelivery.send(true);
      };

      const handleSend = (sentDelivery) => {
        this.transitionToRoute('deliveries.show', sentDelivery.get('transfer'), {
          queryParams: {
            infoMessage: deliveryMessage
          }
        });
      };

      transfer.get('delivery')
        .then(handleDelivery)
        .then(handleSave)
        .then(handleSend)
        .catch(handleError);
    }
  }
});
