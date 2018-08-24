import Ember from 'ember';
import BaseController from './base';

const PROJECT_ADMIN_AUTH_ROLE = 'project_admin';

export default BaseController.extend({
  disableNext: Ember.computed.not('projectId'),
  backRoute: 'deliveries',
  nextRoute: 'deliveries.new.select-recipient',
  actions: {
    projectSelectionChanged(actionData) {
      const projectId = actionData.get('selectedItems.firstObject.id');
      this.set('projectId', projectId);
    },
  },
});
