import Ember from 'ember';

const DeliveryTableRow = Ember.Component.extend({
  tagName: 'tr',
  classNames: ['delivery-table-row']
});

DeliveryTableRow.reopenClass({
  positionalParams: ['delivery']
});

export default DeliveryTableRow;
