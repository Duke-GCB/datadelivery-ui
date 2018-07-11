import Ember from 'ember';

const DeliveryTable = Ember.Component.extend({
  tagName: 'div',
  columns: [
    { propertyName: "project.name", title: "Project Name", routeName: "deliveries.show"},
    { propertyName: "fromUser.fullName", title: "From"},
    { propertyName: "toUsersNames", title: "To"},
    { propertyName: "status", title: "State"}
  ]
});

DeliveryTable.reopenClass({
  positionalParams: ['transfers']
});

export default DeliveryTable;
