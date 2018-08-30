import Ember from 'ember';

import NewDeliveryRouteMixin from 'datadelivery-ui/mixins/new-delivery-route-mixin';

export default Ember.Route.extend(NewDeliveryRouteMixin, {
  model() {
    // Force a reload here so that we don't first show a truncated list of
    // users that happen to be in the local store already
    return this.get('store').findAll('duke-ds-user', {reload: true});
  }
});
