import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['projectId', 'toUserId', 'shareUserIds'],
  projectId: null,
  toUserId: null,
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
  errors: null,
  errorMessages: Ember.computed.mapBy('errors', 'detail'),
  actions: {
    back() {
      const projectId = this.get('projectId');
      this.transitionToRoute('deliveries.new.select-recipient', { queryParams: { projectId: projectId }});
    },
    saveAndSend() {
      const delivery = this.get('store').createRecord('delivery', {
        project: this.get('project'),
        fromUser: this.get('fromUser'),
        toUser: this.get('toUser'),
        userMessage: this.get('userMessage')
      });
      this.set('errorMessage', null);
      return delivery.save().then(
        savedDelivery => {
          return savedDelivery.send();
        },
        errorResponse => {
          this.set('errors', errorResponse.errors);
        }).then(sentDelivery => {
        this.transitionToRoute('deliveries.show', sentDelivery.get('transfer'));
      });
    }
  },
});
