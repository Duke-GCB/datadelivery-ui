import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const store = this.store;
    return store.query('email-template-set', {
      filter: {
        default: true,
      }
    }).then(function(emailTemplateSets) {
      const delivery = store.createRecord('delivery');
      delivery.set('emailTemplateSet', emailTemplateSets.get('firstObject'));
      return delivery;
    });
  }
});
