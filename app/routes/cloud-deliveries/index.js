import Route from '@ember/routing/route';

export default class CloudDeliveriesIndexRoute extends Route {
  model() {
    return this.store.findAll('az-delivery');
  }
}
