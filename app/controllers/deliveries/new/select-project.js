import Ember from 'ember';
import BaseController from './base';

export default BaseController.extend({
  disableNext: Ember.computed.not('project.id'),
  backRoute: 'deliveries',
  nextRoute: 'deliveries.new.select-recipient',
  actions: {
    projectSelectionChanged(actionData) {
      const project = actionData.get('selectedItems.firstObject');
      this.set('project', project);
    },
  },
});
