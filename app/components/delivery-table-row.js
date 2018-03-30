import Ember from 'ember';

const DeliveryTableRow = Ember.Component.extend({
  tagName: 'tr',
  classNames: ['delivery-table-row']
});

DeliveryTableRow.reopenClass({
  positionalParams: ['transfer']
});

export default DeliveryTableRow;
