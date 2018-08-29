import Ember from 'ember';

export default Ember.Component.extend({
  delivery: null,
  emailMessage: null,
  onFail: (/*errors*/) => {}, // Defaults to an empty operation, but should be provided as an (action 'previewFailed')
  didInsertElement() {
    this._super(...arguments);
    this.generatePreview();
  },

  generatePreview() {
    this.set('emailMessage', null); // causes loading indicator to appear
    // Delivery may be a model object that's not yet loaded (e.g. a relationship)
    let delivery = this.get('delivery');
    if(delivery.get('isLoaded')) {
      delivery = Ember.RSVP.resolve(delivery);
    }
    delivery.then((loadedDelivery) => {
      return loadedDelivery.preview();
    }).then(preview => {
      this.set('emailMessage', preview.delivery_email_text);
    }).catch(this.get('onFail'));
  },

});
