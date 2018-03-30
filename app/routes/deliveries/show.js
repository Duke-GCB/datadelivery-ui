import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('duke-ds-project-transfer', params.transfer_id);
  },
});
