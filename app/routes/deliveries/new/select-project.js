import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').query('duke-ds-project', {
      isDeliverable: true
    });
  }
});
