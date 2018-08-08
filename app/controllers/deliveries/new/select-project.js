import Ember from 'ember';

export default Ember.Controller.extend({
  project: null,
  application: Ember.inject.controller(),
  currentDukeDsUser: Ember.computed.alias('application.currentDukeDsUser'),
  currentUserProjectPermissions: Ember.computed('project', 'currentDukeDsUser.id', function () {
    const projectId = this.get('project.id');
    const currentUserId = this.get('currentDukeDsUser.id');
    if (!projectId || !currentUserId) {
      return [];
    }
    return this.get('store').query('duke-ds-project-permission', {
      'project': projectId,
      'user': currentUserId,
    });
  }),
  currentUserProjectAuthRole: Ember.computed('currentUserProjectPermissions.[]', function () {
    const authRoles = this.get('currentUserProjectPermissions').mapBy('auth_role');
    if (authRoles) {
      return authRoles[0];
    } else {
      return null;
    }
  }),
  currentUserCanDeliver: Ember.computed('currentUserProjectAuthRole', function () {
    return this.get('currentUserProjectAuthRole') == 'project_admin';
  }),
  disableNext: Ember.computed.not('currentUserCanDeliver'),
  showUserMissingPrivilegesError: Ember.computed('project.id', 'currentUserProjectAuthRole', function () {
    if (this.get('project.id') == null) {
      return false; // do not show error when no project is selected
    }
    const authRole = this.get('currentUserProjectAuthRole');
    if (!authRole) {
      return false; //do not show error while we are fetching users auth role for this project
    }
    return authRole != 'project_admin';
  }),
  actions: {
    projectSelectionChanged(actionData) {
      var selectedItem = null;
      if (actionData.selectedItems) {
        selectedItem = actionData.selectedItems[0];
      }
      this.set('project', selectedItem);
      this.set('showMissingPrivilegesError', false);
    },
    back() {
      this.transitionToRoute('deliveries');
    },
    next() {
      const projectId = this.get('project.id');
      if (projectId) {
        if (this.get('currentUserCanDeliver')) {
          this.transitionToRoute('deliveries.new.select-recipient', { queryParams: { projectId: projectId }})
        } else {
          this.set('showMissingPrivilegesError', true);
        }
      }
    }
  },
});
