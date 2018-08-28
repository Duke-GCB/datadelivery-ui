import Ember from 'ember';
import BaseController from './base';

export default BaseController.extend({
  nextRoute: 'deliveries.show',
  backRoute: 'deliveries.new.enter-user-message',
  emailMessage: null,
  deliveryKeysChanged: Ember.on('init', Ember.observer('delivery.fromUser', 'delivery.toUser', 'delivery.userMessage', 'delivery.project', function() {
    this.generatePreview();
  })),
  generatePreview() {
    this.willPerformAction();
    const delivery = this.get('delivery');
    delivery.preview().then(preview => {
      this.set('emailMessage', preview.delivery_email_text);
      this.actionDidSucceed();
    }).catch(this.actionDidFail.bind(this));
  },

  actions: {
    saveAndSend() {
      this.processSaveAndSend();
    }
  },

  processSaveAndSend() {
    this.willPerformAction();
    const delivery = this.get('delivery');
    const handleSave = (savedDelivery) => { return savedDelivery.send(); };
    const handleSend = (sentDelivery) => {
      const projectName = sentDelivery.get('project.name');
      const deliveryMessage = `Sent delivery notification for project ${projectName}.`;
      const route = this.get('nextRoute');
      const model = sentDelivery.get('transfer');
      const options = { queryParams: { infoMessage: deliveryMessage} };
      this.didPerformAction();
      this.transitionToRoute(route, model, options);
    };
    delivery.save().then(handleSave).then(handleSend).catch(this.actionDidFail.bind(this));
  }
});
