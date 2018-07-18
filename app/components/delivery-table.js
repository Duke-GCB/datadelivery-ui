import Ember from 'ember';

const DeliveryTable = Ember.Component.extend({
  currentDukeDsUser: null,
  tagName: 'div',
  outgoingTransfers: Ember.computed('transfers.[]', 'currentDukeDsUser', function() {
    const currentDukeDsUserId = this.get('currentDukeDsUser.id');
    return this.get('transfers').filterBy('fromUser.id', currentDukeDsUserId);
  }),
  incomingTransfers: Ember.computed('transfers.[]', 'currentDukeDsUser', function() {
    const currentDukeDsUserId = this.get('currentDukeDsUser.id');
    return this.get('transfers').filter(function(transfer) {
      return transfer.get('toUsers').mapBy('id').includes(currentDukeDsUserId);
    });
  }),
  outgoingColumns: [
    { propertyName: "project.name", title: "Project Name", routeName: "deliveries.show"},
    { propertyName: "toUsersNames", title: "To"},
    { propertyName: "status", title: "State"}
  ],
  incomingColumns: [
    { propertyName: "project.name", title: "Project Name", routeName: "deliveries.show"},
    { propertyName: "fromUser.fullName", title: "From"},
    { propertyName: "status", title: "State"}
  ]

});

DeliveryTable.reopenClass({
  positionalParams: ['transfers', 'currentDukeDsUser']
});

export default DeliveryTable;
