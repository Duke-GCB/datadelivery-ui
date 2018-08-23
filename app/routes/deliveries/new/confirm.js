import Ember from 'ember';

export default Ember.Route.extend({
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('errors', null);
      controller.set('disableNext', false);
    }
  }
});