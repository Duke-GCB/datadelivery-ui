import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ol',
  classNames: ['breadcrumb'],
  transfer: null, /* specific transfer to be passed to child breadcrumbs */
  selectedRouteName: null, /* route we should select ('deliveries.index', 'deliveries.show', etc) */
  isDeliverySelected: Ember.computed('selectedRouteName', function () {
    // selected route starts with deliveries.show
    return this.get('selectedRouteName').indexOf('deliveries.show') == 0;
  }),
  isResendSelected: Ember.computed.equal('selectedRouteName', 'deliveries.show.resend'),
  isNewDeliverySelected: Ember.computed.equal('selectedRouteName', 'deliveries.new')
});
