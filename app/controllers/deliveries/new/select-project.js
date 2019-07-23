import { once } from '@ember/runloop';
import { observer } from '@ember/object';
import BaseController from './base';

const CAN_DELIVER_AUTH_ROLE = 'project_admin';

export default BaseController.extend({
  backRoute: 'deliveries.index',
  nextRoute: 'deliveries.new.select-recipient',

  projectChanged: observer('project', 'fromUser', function() {
    // Wrap the processing in Ember.run.once so that it does not kick off stale requests
    once(this, 'handleProjectChanged');
  }),
  handleProjectChanged() {
    this.willPerformAction(); // Ensures that next button is disabled and errors are cleared
    const project = this.get('project.id');
    const fromUser = this.get('fromUser.id');
    if(project && fromUser) {
      this.checkProjectPermissions();
    }
  },
  checkProjectPermissions() {
    this.willPerformAction();
    const userId = this.get('fromUser.id');
    this.get('project').then(project => {
      return project.getUserProjectAuthRole(userId);
    }).then((authRole) => {
      if(authRole === CAN_DELIVER_AUTH_ROLE) {
        this.didPerformAction();
      } else {
        const projectName = this.get('project.name');
        const errors = this.wrapError(`You do not have permission to deliver project ${projectName}. Please select another project.`);
        this.actionDidFail(errors);
      }
    });
  },
  actions: {
    projectSelectionChanged(project) {
      this.set('project', project);
    }
  }
});
