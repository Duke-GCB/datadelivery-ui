import Service, { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  currentUser() {
    // Use queryRecord since Ember complains that 'current-user' doesn't match the returned ID.
    return this.store.queryRecord('user', {});
  }
});
