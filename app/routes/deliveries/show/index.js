import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let params = this.paramsFor('deliveries.show');
    return this.get('store').findRecord('delivery', params.delivery_id);
  },
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('infoMessage', null)
    }
  }
});
