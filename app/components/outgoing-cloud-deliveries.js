import { filterBy } from '@ember/object/computed';
import Component from '@ember/component';

const statusOptions = ['Pending', 'Rejected', 'Accepted', 'Canceled'];
const statusFilterFunction = function(status, selected) {
  return status.capitalize() == selected;
};

export default Component.extend({
  currentDukeDsUser: null, // required property current user's duke-ds-user model
  currentUser: null, // required property current user model
  outgoingDeliveries: filterBy('model', 'outgoing', true),
  init() {
    this._super(...arguments);
    this.columns = [
      { propertyName: "project_name", title: "Project Name", routeName: "cloud-deliveries.show"},
      { propertyName: "to_netid.full_name", title: "To" },
      {
        propertyName: "status",
        title: "State",
        component: 'delivery-state',
        filterWithSelect: true,
        predefinedFilterOptions: statusOptions,
        filterFunction: statusFilterFunction
      }
    ];
  }
});
