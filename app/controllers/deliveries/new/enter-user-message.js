import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['project_id', 'to_user_id', 'share_user_ids'],
  project_id: null,
  to_user_id: null,
  share_user_ids: null,
  deliveriesController: Ember.inject.controller('deliveries'),
  project: Ember.computed('project_id', function () {
    return this.get('store').findRecord('duke-ds-project', this.get('project_id'));
  }),
  fromUser: Ember.computed.alias('deliveriesController.currentDukeDsUser'),
  toUser: Ember.computed('to_user_id', function () {
    return this.get('store').findRecord('duke-ds-user', this.get('to_user_id'));
  }),
  shareUsers: Ember.computed('share_user_ids', function () {
    const store = this.get('store');
    return this.get('share_user_ids')
      .split(',')
      .map(user_id => store.findRecord('duke-ds-user', user_id));
  }),
  actions: {
    back() {
      const projectId = this.get('project_id');
      this.transitionToRoute('deliveries.new.select-recipient', { queryParams: { project_id: projectId }});
    },
    saveAndSend() {
      const delivery = this.get('store').createRecord({
        project: this.get('project.id'),
        toUser: this.get('toUser.id'),
        shareUsers: this.get('shareUsers').mapBy('id')
      });
      delivery.save().then(function (delivery) {
        delivery.send().then(function () {
          self.transitionToRoute('deliveries.show', delivery.get('transfer'));
        });
      });
    }
  },
});
