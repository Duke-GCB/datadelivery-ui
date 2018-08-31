import Ember from 'ember';
import NewDeliveryRouteMixin from 'datadelivery-ui/mixins/new-delivery-route-mixin';

export default Ember.Route.extend(NewDeliveryRouteMixin, {
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('errors', null);
    }
  }
});
