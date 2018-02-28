import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['infoMessage'],
  infoMessage: null,
  showResend: Ember.computed('model.isPending', function () {
    const isNew = this.get('model.isPending');
    return isNew; //delivery.isNew() || delivery.isPending();
  }),
});
