import Ember from 'ember';

const PROJECT_ADMIN_AUTH_ROLE = 'project_admin';

export default Ember.Controller.extend({
  project: null,
  application: Ember.inject.controller(),
  currentDukeDsUser: Ember.computed.alias('application.currentDukeDsUser'),
  currentUserProjectAuthRole: null,
  _fetchProjectAuthRole: Ember.observer('project', 'currentDukeDsUser.id', function() {
    const project = this.get('project');
    const currentUserId = this.get('currentDukeDsUser.id');
    if (currentUserId && project) {
      project.getUserProjectAuthRole(currentUserId).then((authRole) => {
        this.set('currentUserProjectAuthRole', authRole);
      });
    } else {
      this.set('currentUserProjectAuthRole', null);
    }
  }),
  currentUserCanDeliver: Ember.computed.equal('currentUserProjectAuthRole', PROJECT_ADMIN_AUTH_ROLE),
  disableNext: Ember.computed.not('currentUserCanDeliver'),
  showUserMissingPrivilegesError: Ember.computed('project.id', 'currentUserProjectAuthRole', function () {
    if (this.get('project.id') == null) {
      return false; // do not show error when no project is selected
    }
    const authRole = this.get('currentUserProjectAuthRole');
    if (!authRole) {
      return false; //do not show error while we are fetching users auth role for this project
    }
    return authRole != PROJECT_ADMIN_AUTH_ROLE;
  }),
  actions: {
    projectSelectionChanged(actionData) {
      this.setProperties({
        project: actionData.selectedItems.get('firstObject'),
        currentUserProjectAuthRole: null,
      });
    },
    back() {
      this.transitionToRoute('deliveries');
    },
    next() {
      const projectId = this.get('project.id');
      if (projectId) {
        if (this.get('currentUserCanDeliver')) {
          this.transitionToRoute('deliveries.new.select-recipient', { queryParams: { projectId: projectId }})
        }
      }
    }
  },
});
