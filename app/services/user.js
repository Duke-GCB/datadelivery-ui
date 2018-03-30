import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currentUser() {
    // Use queryRecord since Ember complains that 'current-user' doesn't match the returned ID.
    return this.get('store').queryRecord('user', {});
  }
});
