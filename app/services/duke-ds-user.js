import Service, { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  currentDukeDsUser() {
    // Use queryRecord since Ember complains that 'current-duke-ds-user'
    // doesn't match the returned ID.
    return this.store.queryRecord('duke-ds-user', {});
  }
});
