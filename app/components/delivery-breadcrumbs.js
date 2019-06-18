import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ol',
  classNames: ['breadcrumb'],
  transfer: null, /* specific transfer to be passed to child breadcrumbs */
  selectedRouteName: null ,/* route we should select ('deliveries.index', 'deliveries.show', etc) */
  routeStartsWith(routePrefix) {
    return this.get('selectedRouteName').indexOf(routePrefix) == 0;
  },
  // delivery routes
  deliveryIndex: Ember.computed('selectedRouteName', function() {
    return this.routeStartsWith('deliveries.');
  }),
  deliveryShow: Ember.computed('selectedRouteName', function () {
    return this.routeStartsWith('deliveries.show');
  }),
  deliveryShowResend: Ember.computed.equal('selectedRouteName', 'deliveries.show.resend'),
  deliveryNew: Ember.computed.equal('selectedRouteName', 'deliveries.new'),

  // duke-ds-projects routes
  dukeDsProjects: Ember.computed('selectedRouteName', function() {
    return this.routeStartsWith('duke-ds-projects.');
  }),
  dukeDsProject: Ember.computed.equal('selectedRouteName', 'duke-ds-projects.show')
});
