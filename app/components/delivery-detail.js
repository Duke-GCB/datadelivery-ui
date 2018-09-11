import Ember from 'ember';

const DeliveryDetail = Ember.Component.extend({
  classNames: ['delivery-detail'],
  editUserMessage: false, /* minimal field display allowing **/
  delivery: Ember.computed.alias('transfer.delivery'),
  showEmail: Ember.computed.alias('transfer.isPending')
});

DeliveryDetail.reopenClass({
  positionalParams: ['transfer']
});

export default DeliveryDetail;
