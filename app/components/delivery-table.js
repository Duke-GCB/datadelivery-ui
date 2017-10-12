import Ember from 'ember';

const DeliveryTable = Ember.Component.extend({
  tagName: 'table',
  classNames: ['table', 'table-striped', 'table-bordered'],
  deliveries: null
});

DeliveryTable.reopenClass({
  positionalParams: ['deliveries']
});

export default DeliveryTable;
