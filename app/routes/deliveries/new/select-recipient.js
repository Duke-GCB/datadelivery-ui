import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // TODO: Filter out null users and sort the list
    return this.get('store').findAll('duke-ds-user');
  }
});
