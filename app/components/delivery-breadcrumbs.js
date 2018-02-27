import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ol',
  classNames: ['breadcrumb'],
  delivery: null, /* specific delivery to be passed to child breadcrumbs */
  selectedRouteName: null, /* route we should select ('deliveries.index', 'deliveries.show', etc) */
  isDeliverySelected: Ember.computed('selectedRouteName', function () {
    return this.get('selectedRouteName') !== 'deliveries.index';
  }),
  isResendSelected: Ember.computed('selectedRouteName', function () {
    return this.get('selectedRouteName') === 'deliveries.show.resend';
  })
});
