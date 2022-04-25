import Route from '@ember/routing/route';

export default class CloudDeliveriesShowRoute extends Route {
  model(params) {
    return this.store.findRecord('az-delivery', params.delivery_id);
  }
}
