import Ember from 'ember';

export default Ember.Controller.extend({
  disableNext: Ember.computed.not('project'),
  project: null,
  actions: {
    back() {
      this.transitionToRoute('deliveries');
    },
    next() {
      const projectId = this.get('project.id');
      this.transitionToRoute('deliveries.new.select-recipient', { queryParams: { project_id: projectId }});
      this.set('project', null);
    },
    projectSelectionChanged(actionData) {
      var selectedItem = null;
      if (actionData.selectedItems) {
        selectedItem = actionData.selectedItems[0];
      }
      this.set('project', selectedItem);
    }
  },
});
