import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    back() {
      this.transitionToRoute('deliveries.show', this.get('model'));
    },
    recallDelivery() {
      this.get('model.delivery')
        .then(delivery => delivery.cancel())
        .then(() => this.transitionToRoute('deliveries.show', this.get('model')));
    }
  }
});
