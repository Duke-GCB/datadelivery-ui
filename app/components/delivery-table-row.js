import Ember from 'ember';

const DeliveryTableRow = Ember.Component.extend({
  tagName: 'tr'
});

DeliveryTableRow.reopenClass({
  positionalParams: ['delivery']
});

export default DeliveryTableRow;
