import Ember from 'ember';

const DeliveryDetail = Ember.Component.extend({
  classNames: ['delivery-detail'],
  editUserMessage: false, /* minimal field display allowing **/
  toUserNames: Ember.computed.alias('transfer.toUsersNames'),
  delivery: Ember.computed.alias('transfer.delivery')
});

DeliveryDetail.reopenClass({
  positionalParams: ['transfer']
});

export default DeliveryDetail;
