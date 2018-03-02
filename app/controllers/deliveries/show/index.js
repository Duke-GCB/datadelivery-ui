import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['infoMessage'],
  infoMessage: null,
  showResend: Ember.computed.alias('model.canResend'),
});
