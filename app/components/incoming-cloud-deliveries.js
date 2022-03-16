import { filterBy } from '@ember/object/computed';
import Component from '@ember/component';

const statusOptions = ['Pending', 'Rejected', 'Accepted', 'Canceled'];
const statusFilterFunction = function(status, selected) {
  return status.capitalize() == selected;
};

export default Component.extend({
  currentDukeDsUser: null, // required property current user's duke-ds-user model
  currentUser: null, // required property current user model
  incomingDeliveries: filterBy('model', 'outgoing', false),
  init() {
    this._super(...arguments);
    this.columns = [
      { propertyName: "project_name", title: "Project Name", routeName: "cloud-deliveries.show"},
      { propertyName: "from_netid.full_name", title: "From" },
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
