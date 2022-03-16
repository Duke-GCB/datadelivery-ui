import Component from '@ember/component';
import {resolve} from "rsvp";

export default Component.extend({
  infoMessage: null,
  showEmail: true,
  brief: false,
  deliverySummary: "A",
  didInsertElement() {
    this._super(...arguments);
    this.fetchSummary();
  },
  fetchSummary() {
    let delivery = this.model;
    // If delivery is already fulfilled, make it into a simple promise
    if(delivery.get('isLoaded')) {
      delivery = resolve(delivery);
    }
    return delivery.then((loadedDelivery) => {
      return loadedDelivery.getDeliverySummary();
    }).then((summary) => {
      this.set('deliverySummary', summary);
    });
  },
});
