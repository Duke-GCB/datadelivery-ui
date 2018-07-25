import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['project_id'],
  project_id: null,
  project: Ember.computed('project_id', function () {
    return this.get('store').findRecord('duke-ds-project', this.get('project_id'));
  }),
  application: Ember.inject.controller(),
  currentDukeDsUser: Ember.computed.alias('application.currentDukeDsUser'),
  otherUsersList: Ember.computed('model.[]', 'currentDukeDsUser', function () {
    const currentDukeDSUser = this.get('currentDukeDsUser');
    if (currentDukeDSUser) {
      return this.get('model').rejectBy('id', currentDukeDSUser.get('id'));
    } else {
      return this.get('model');
    }
  }),
  toUser: null,
  shareUsers: null,
  disableNext: Ember.computed.not('toUser'),
  actions: {
    toUserSelectionChanged(actionData) {
      var selectedItem = null;
      if (actionData.selectedItems) {
        selectedItem = actionData.selectedItems[0];
      }
      this.set('toUser', selectedItem);
    },
    shareUsersSelectionChanged(actionData) {
      this.set('shareUsers', actionData.selectedItems);
    },
    back() {
      this.transitionToRoute('deliveries.new.select-project');
    },
    next() {
      const projectId = this.get('project.id');
      const toUserId = this.get('toUser.id');
      const shareUsers = this.get('shareUsers');
      var shareUserIds = null;
      if (shareUsers) {
        shareUserIds = shareUsers.mapBy('id').join(',');
      }
      this.transitionToRoute('deliveries.new.enter-user-message', {
          queryParams: {
              project_id: projectId,
              to_user_id: toUserId,
              share_user_ids: shareUserIds
          }
      });
      this.set('toUser', null);
      this.set('shareUsers', null);
    }
  }
});
