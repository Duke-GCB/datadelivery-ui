import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    back() {
      this.transitionToRoute('deliveries.show', this.get('model'));
    },
    recallDelivery() {
      const projectName = this.get('model.project.name');
      const deliveryMessage = 'Canceled delivery of project ' + projectName + '.';
      this.get('model.delivery')
        .then(delivery => delivery.cancel())
        .then(() => this.transitionToRoute('deliveries.show', this.get('model'), {
          queryParams: {
            infoMessage: deliveryMessage
          }
        }));
    }
  }
});
