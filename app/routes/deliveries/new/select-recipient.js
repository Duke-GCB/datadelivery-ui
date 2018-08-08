import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // force loading all list of users so they don't start filling in after a few seconds
    return this.get('store').findAll('duke-ds-user', {reload: true});
  }
});
