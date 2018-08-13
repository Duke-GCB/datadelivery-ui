import Ember from 'ember';
import DS from 'ember-data';

const PROJECT_ADMIN_AUTH_ROLE = 'project_admin';

export default Ember.Controller.extend({
  project: null,
  application: Ember.inject.controller(),
  currentDukeDsUser: Ember.computed.alias('application.currentDukeDsUser'),
  currentUserProjectPermission: Ember.computed('project', 'currentDukeDsUser.id', function () {
    const projectId = this.get('project.id');
    const currentUserId = this.get('currentDukeDsUser.id');
    if (!projectId || !currentUserId) {
      return null;
    }
    // Filter permissions for our project and user.
    // This should return an array of one item: our user's permissions.
    // Return the first item in the array.
    return DS.PromiseObject.create({
      promise: this.get('store').query('duke-ds-project-permission', {
        project: projectId,
        user: currentUserId,
      }).then(function (permissions) {
        return permissions.get('firstObject');
      })
    });
  }),
  currentUserCanDeliver: Ember.computed.equal('currentUserProjectPermission.authRole', PROJECT_ADMIN_AUTH_ROLE),
  disableNext: Ember.computed.not('currentUserCanDeliver'),
  showUserMissingPrivilegesError: Ember.computed('project.id', 'currentUserProjectPermission.authRole', function () {
    if (this.get('project.id') == null) {
      return false; // do not show error when no project is selected
    }
    const authRole = this.get('currentUserProjectPermission.authRole');
    if (!authRole) {
      return false; //do not show error while we are fetching users auth role for this project
    }
    return authRole != PROJECT_ADMIN_AUTH_ROLE;
  }),
  actions: {
    projectSelectionChanged(actionData) {
      this.set('project', actionData.selectedItems.get('firstObject'));
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
