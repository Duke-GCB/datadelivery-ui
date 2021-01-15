import { resolve } from 'rsvp';
import Component from '@ember/component';

export default Component.extend({
  delivery: null,
  emailMessage: null,
  emailTemplateSets: null,
  errors: null, // Default value
  onFail: (/*errors*/) => {}, // Defaults to an empty operation, but should be provided as an (action 'previewFailed')
  didInsertElement() {
    this._super(...arguments);
    this.generatePreview();
  },

  generatePreview() {
    this.set('emailMessage', null); // causes loading indicator to appear
    let delivery = this.delivery;
    // `delivery` should be a model object, but may not be loaded yet (e.g. a
    // relationship property from a transfer. We cannot call preview() until
    // the delivery is loaded (resolved), and we cannot call then() on an already
    // loaded delivery. So if delivery is already loaded, we wrap it in a promise,
    // so that delivery.then() resolves to a loaded delivery in both cases.
    if(delivery.get('isLoaded')) {
      delivery = resolve(delivery);
    }
    delivery.then((loadedDelivery) => {
      return loadedDelivery.preview();
    }).then(preview => {
      this.set('emailMessage', preview.delivery_email_text);
    }).catch(this.onFail);
  },

  actions: {
    onChangeEmailTemplateSet(emailTemplateSet) {
      const delivery = this.delivery;
      delivery.set('emailTemplateSet', emailTemplateSet);
      this.generatePreview();
    }
  }

});
