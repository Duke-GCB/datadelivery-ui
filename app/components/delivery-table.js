import Ember from 'ember';

const DeliveryTable = Ember.Component.extend({
  tagName: 'table',
  classNames: ['table', 'table-striped', 'table-condensed'],
  deliveries: null
});

DeliveryTable.reopenClass({
  positionalParams: ['transfers']
});

export default DeliveryTable;
