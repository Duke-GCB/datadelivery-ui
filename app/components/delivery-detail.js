import Ember from 'ember';

const DeliveryDetail = Ember.Component.extend({
  transfer: null,
  showProjectDetails: false,
  classNames: ['delivery-detail'],
  editUserMessage: false, /* minimal field display allowing **/
  delivery: Ember.computed.alias('transfer.delivery'),
  showEmail: Ember.computed.alias('transfer.canResend')
});

DeliveryDetail.reopenClass({
  positionalParams: ['transfer', 'showProjectDetails']
});

export default DeliveryDetail;
