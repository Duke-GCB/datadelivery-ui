import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
  queryParams: ['projectId', 'toUserId'],
  projectId: null,
  toUserId: null,
  userMessage: null,
  application: Ember.inject.controller(),
  currentDukeDsUser: Ember.computed.alias('application.currentDukeDsUser'),
  project: Ember.computed('projectId', function () {
    return DS.PromiseObject.create({
      promise: this.get('store').findRecord('duke-ds-project', this.get('projectId'))
    });
  }),
  fromUser: Ember.computed.alias('currentDukeDsUser'),
  toUser: Ember.computed('toUserId', function () {
    return DS.PromiseObject.create({
      promise: this.get('store').findRecord('duke-ds-user', this.get('toUserId'))
    });
  }),
  errors: null,
  errorMessages: Ember.computed.mapBy('errors', 'detail'),
  disableNext: false,
  actions: {
    back() {
      const projectId = this.get('projectId');
      this.transitionToRoute('deliveries.new.select-recipient', { queryParams: { projectId: projectId }});
    },
    next() {
      this.setProperties({
        disableNext: true,
        errorMessage: null
      });
      const params = {
        projectId: this.get('projectId'),
        toUserId: this.get('toUserId'),
        userMessage: this.get('userMessage')
      };
      this.transitionToRoute('deliveries.new.confirm', { queryParams: params});
    },
  },
});
