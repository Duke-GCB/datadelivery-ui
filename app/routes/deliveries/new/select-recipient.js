import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // Force a reload here so that we don't first show a truncated list of
    // users that happen to be in the local store already
    return this.get('store').findAll('duke-ds-user', {reload: true});
  }
});
