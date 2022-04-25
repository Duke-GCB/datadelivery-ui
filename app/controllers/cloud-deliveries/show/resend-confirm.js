import Controller from '@ember/controller';

import { isEmpty } from '@ember/utils';
import { mapBy } from '@ember/object/computed';

export default Controller.extend({
  errors: null,
  init() {
    this._super(...arguments);
    this.errors = [];
  },
  errorMessages: mapBy('errors', 'detail'),
  actions: {
    back() {
      this.transitionToRoute('cloud-deliveries.show.resend', this.model);
    },
    previewFailed(error) {
      console.log(error);
      this.set('errors', [error]);
    },
    resend() {
      const delivery = this.model;
      const projectName = delivery.get('project_name');
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

      const handleSend = () => {
        this.transitionToRoute('cloud-deliveries.show', delivery.get('id'), {
          queryParams: {
            infoMessage: deliveryMessage
          }
        });
      };

      handleDelivery(delivery)
        .then(handleSave)
        .then(handleSend)
        .catch(handleError);
    }
  }
});
