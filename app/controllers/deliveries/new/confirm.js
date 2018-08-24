import Ember from 'ember';
import BaseController from './base';

export default BaseController.extend({
  nextRoute: 'deliveries.show', // TODO: Include the transfer!
  backRoute: 'deliveries.new.enter-user-message',
  disableNext: false,
  emailMessage: null,
  generatePreview() {
    const delivery = this.get('delivery');
    delivery.preview().then(preview => {
      this.set('emailMessage', preview.delivery_email_text);
    });
  },

  processNext() {
    // should return a promise resolving a result object
    this.setProperties({
      disableNext: true,
      errors: null,
    });
    const delivery = this.get('delivery');
    const handleSave = (savedDelivery) => { return savedDelivery.send(); };
    const handleSend = (sentDelivery) => {
      const projectName = sentDelivery.get('project.name');
      const deliveryMessage = `Sent delivery notification for project ${projectName}.`;
      const transfer = sentDelivery.get('transfer');
      const model = transfer;
      const options = { queryParams: { infoMessage: deliveryMessage} };
      return Ember.RSVP.resolve(Ember.Object.create({ model: model, options: options}));
    };
    return delivery.save().then(handleSave).then(handleSend);
  }
});
