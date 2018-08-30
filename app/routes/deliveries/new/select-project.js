import Ember from 'ember';
import NewDeliveryRouteMixin from 'datadelivery-ui/mixins/new-delivery-route-mixin';

export default Ember.Route.extend(NewDeliveryRouteMixin, {
  model() {
    // The duke-ds-project response returns only non-deleted when querying for all records
    // however it will return projects that are deleted if queried individually.
    // This can cause deleted projects to be included in the project list due to caching in
    // ember-data for projects referenced in duke-ds-project-transfers.
    return this.get('store').query('duke-ds-project', {
      is_deleted: false
    });
  },
});
