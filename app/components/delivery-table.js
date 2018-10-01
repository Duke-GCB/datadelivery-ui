import Ember from 'ember';

// Transfer status filter options from
// https://github.com/Duke-Translational-Bioinformatics/duke-data-service/blob/57258f5b44d31ca7f2cc630a14235aff70878f8f/app/models/project_transfer.rb#L24

const statusOptions = ['Pending', 'Rejected', 'Accepted', 'Canceled'];
const statusFilterFunction = function(status, selected) {
  return status.capitalize() == selected;
};

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
    { propertyName: "status",
      title: "State",
      component: 'delivery-state',
      filterWithSelect: true,
      predefinedFilterOptions: statusOptions,
      filterFunction: statusFilterFunction
    }
  ],
  incomingColumns: [
    { propertyName: "project.name", title: "Project Name", routeName: "deliveries.show"},
    { propertyName: "fromUser.fullName", title: "From"},
    { propertyName: "status",
      title: "State",
      component: 'delivery-state',
      filterWithSelect: true,
      predefinedFilterOptions: statusOptions,
      filterFunction: statusFilterFunction
    }
  ]
});

DeliveryTable.reopenClass({
  positionalParams: ['transfers', 'currentDukeDsUser']
});

export default DeliveryTable;
