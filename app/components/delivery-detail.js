import Ember from 'ember';

const DeliveryDetail = Ember.Component.extend({
  classNames: ['delivery-detail'],
  editUserMessage: false, /* minimal field display allowing **/
  delivery: Ember.computed.alias('transfer.delivery')
});

DeliveryDetail.reopenClass({
  positionalParams: ['transfer']
});

export default DeliveryDetail;
