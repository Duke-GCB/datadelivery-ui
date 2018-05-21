import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currentDukeDsUser() {
    // Use queryRecord since Ember complains that 'current-duke-ds-user'
    // doesn't match the returned ID.
    return this.get('store').queryRecord('duke-ds-user', {});
  }
});
