import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['projectId', 'toUserId', 'shareUserIds'],
  projectId: null,
  toUserId: null,
  shareUserIds: null,
  userMessage: null,
  application: Ember.inject.controller(),
  currentDukeDsUser: Ember.computed.alias('application.currentDukeDsUser'),
  project: Ember.computed('projectId', function () {
    return this.get('store').findRecord('duke-ds-project', this.get('projectId'));
  }),
  fromUser: Ember.computed.alias('currentDukeDsUser'),
  toUser: Ember.computed('toUserId', function () {
    return this.get('store').findRecord('duke-ds-user', this.get('toUserId'));
  }),
  shareUsers: Ember.computed('shareUserIds', function () {
    const store = this.get('store');
    const shareUserIds = this.get('shareUserIds');
    if (!shareUserIds) {
      return [];
    }
    return shareUserIds
        .split(',')
        .map(userId => store.findRecord('duke-ds-user', userId));
  }),
  actions: {
    back() {
      const projectId = this.get('projectId');
      this.transitionToRoute('deliveries.new.select-recipient', { queryParams: { projectId: projectId }});
    },
    saveAndSend() {
      // shareUsers returns a javascript array of promises, these promises need to be resolved
      // into models before we can use them in saving the delivery
      return Ember.RSVP.all(this.get('shareUsers')).then((shareUsers) => {
        const delivery = this.get('store').createRecord('delivery', {
          project: this.get('project'),
          fromUser: this.get('fromUser'),
          shareUsers: shareUsers,
          toUser: this.get('toUser'),
          userMessage: this.get('userMessage')
        });
        return delivery.save();
      }).then(savedDelivery => {
          return savedDelivery.send();
      }).then(sentDelivery => {
        this.transitionToRoute('deliveries.show', sentDelivery.get('transfer'));
      });
    }
  },
});
