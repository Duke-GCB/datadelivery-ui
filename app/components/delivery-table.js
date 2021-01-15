import { computed } from '@ember/object';
import Component from '@ember/component';
import { assert } from '@ember/debug';

// Transfer status filter options from
// https://github.com/Duke-Translational-Bioinformatics/duke-data-service/blob/57258f5b44d31ca7f2cc630a14235aff70878f8f/app/models/project_transfer.rb#L24

const statusOptions = ['Pending', 'Rejected', 'Accepted', 'Canceled'];
const statusFilterFunction = function(status, selected) {
  return status.capitalize() == selected;
};

export default Component.extend({
  transfers: null, // required property duke-ds-project-transfers models
  currentDukeDsUser: null, // required property current user's duke-ds-user model
  currentUser: null, // required property current user model
  tagName: 'div',
  outgoingTransfers: computed('currentDukeDsUser.id', 'transfers.[]', function() {
    const currentDukeDsUserId = this.get('currentDukeDsUser.id');
    return this.transfers.filterBy('fromUser.id', currentDukeDsUserId);
  }),
  incomingTransfers: computed('currentDukeDsUser.id', 'transfers.[]', function() {
    const currentDukeDsUserId = this.get('currentDukeDsUser.id');
    return this.transfers.filter(function(transfer) {
      return transfer.get('toUsers').mapBy('id').includes(currentDukeDsUserId);
    });
  }),
  init() {
    this._super(...arguments);

    this.outgoingColumns = [
      { propertyName: "project.name", title: "Project Name", routeName: "deliveries.show"},
      { propertyName: "toUsersNames", title: "To"},
      { propertyName: "status",
        title: "State",
        component: 'delivery-state',
        filterWithSelect: true,
        predefinedFilterOptions: statusOptions,
        filterFunction: statusFilterFunction
      }
    ];
    this.incomingColumns = [
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
  },
  didReceiveAttrs() {
    this._super(...arguments);
    assert('DeliveryTable component requires transfers property', this.transfers);
    // currentDukeDsUser and currentUser are also required but are temporarily null until they resolve
  }
});
