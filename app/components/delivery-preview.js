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
    // delivery should not be a promise
    const delivery = this.get('delivery');
    delivery.preview().then(preview => {
      this.set('emailMessage', preview.delivery_email_text);
    }).catch(this.get('onFail'));
  },

});
