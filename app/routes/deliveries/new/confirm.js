import Route from '@ember/routing/route';
import NewDeliveryRouteMixin from 'datadelivery-ui/mixins/new-delivery-route-mixin';

export default Route.extend(NewDeliveryRouteMixin, {
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('errors', null);
      controller.set('disableNext', false);
    }
  }
});
