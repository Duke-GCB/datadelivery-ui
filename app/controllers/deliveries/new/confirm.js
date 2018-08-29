import Ember from 'ember';
import BaseController from './base';

export default BaseController.extend({
  nextRoute: 'deliveries.show',
  backRoute: 'deliveries.new.enter-user-message',
  actions: {
    saveAndSend() {
      this.processSaveAndSend();
    },
    previewFailed(error) { //set up as an action to pass along down to components without losing binding of `this`
      this.actionDidFail(error);
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
