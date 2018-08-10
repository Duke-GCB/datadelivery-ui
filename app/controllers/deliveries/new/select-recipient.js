import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['projectId'],
  projectId: null,
  project: Ember.computed('projectId', function () {
    return this.get('store').findRecord('duke-ds-project', this.get('projectId'));
  }),
  application: Ember.inject.controller(),
  currentDukeDsUser: Ember.computed.alias('application.currentDukeDsUser'),
  validUsersList: Ember.computed('model.[]', function () {
    // remove users with invalid fullName values
    return this.get('model')
      .rejectBy('fullName', null)
      .rejectBy('fullName', '(null)')
      .rejectBy('email', null);
  }),
  otherUsersList: Ember.computed('validUsersList.[]', 'currentDukeDsUser', function () {
    const currentDukeDSUser = this.get('currentDukeDsUser');
    if (currentDukeDSUser) {
      return this.get('validUsersList').rejectBy('id', currentDukeDSUser.get('id'));
    } else {
      return this.get('validUsersList');
    }
  }),
  toUser: null,
  disableNext: Ember.computed.not('toUser'),
  actions: {
    toUserSelectionChanged(actionData) {
      let selectedItem = null;
      if (actionData.selectedItems) {
        selectedItem = actionData.selectedItems[0];
      }
      this.set('toUser', selectedItem);
    },
    back() {
      this.transitionToRoute('deliveries.new.select-project');
    },
    next() {
      const projectId = this.get('projectId');
      const toUserId = this.get('toUser.id');
      this.transitionToRoute('deliveries.new.enter-user-message', {
          queryParams: {
            projectId: projectId,
            toUserId: toUserId,
          }
      });
    }
  }
});
