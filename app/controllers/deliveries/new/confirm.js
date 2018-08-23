import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['projectId', 'toUserId', 'userMessage'],
  projectId: null,
  toUserId: null,
  userMessage: null,
  emailMessage: null,
  disableNext: false,
  errors: null,
  application: Ember.inject.controller(),
  currentDukeDsUser: Ember.computed.alias('application.currentDukeDsUser'),
  fromUser: Ember.computed.alias('currentDukeDsUser'),

  valuesPopulated: Ember.on('init', Ember.observer('fromUser', 'projectId', 'toUserId', 'userMessage', function() {
    // Don't generate preview until all values are set.
    // This is ugly because it has to deal with multiple variants of properties that aren't all set at the same time:
    // query parameters that are set by the router and a current user that is set by the application controller
    // And on top of that, the saveAndSend method resolves promises for these.
    const values = [this.get('fromUser'), this.get('projectId'), this.get('toUserId'), this.get('userMessage')];
    if(values.compact().get('length') < 4) {
      return;
    } else {
      this.generatePreview();
    }
  })
  ),

  generatePreview() {
    // make a new delivery so we can call .preview() on it
    const store = this.get('store');
    const delivery = store.createRecord('delivery');

    const details = {
      project_id: this.get('projectId'),
      from_user_id: this.get('fromUser.id'),
      to_user_id: this.get('toUserId'),
      user_message: this.get('userMessage') || '', // Must be present
      transfer_id: '', // Must be present
    };

    delivery.preview(details).then(preview => {
      this.set('emailMessage', preview.delivery_email_text);
    });
  },

  actions: {
    back() {
      const projectId = this.get('projectId');
      const toUserId = this.get('toUserId');
      this.transitionToRoute('deliveries.new.enter-user-message', { queryParams: {
        projectId: projectId,
        toUserId: toUserId
      }});
    },
    saveAndSend() {
      this.setProperties({
        disableNext: true,
        errors: null,
      });
      // We have a lot of promises to resolve here.
      const store = this.get('store');
      const project = this.get('store').findRecord('duke-ds-project', this.get('projectId'));
      const fromUser = this.get('fromUser');
      const toUser = store.findRecord('duke-ds-user', this.get('toUserId'));
      const userMessage = this.get('userMessage');

      const handleError = (errorResponse) => {
        this.set('errors', errorResponse.errors);
      };

      const handleModelResolves = (resolved) => {
        const delivery = this.get('store').createRecord('delivery', {
          project: resolved[0],
          toUser: resolved[1],
          fromUser: fromUser,
          userMessage: userMessage
        });
        return delivery.save();
      };

      const handleSave = (savedDelivery) => {
        return savedDelivery.send();
      };

      const handleSend = (sentDelivery) => {
        const projectName = sentDelivery.get('project.name');
        const deliveryMessage = `Sent delivery notification for project ${projectName}.`;
        const transfer = sentDelivery.get('transfer');
        this.transitionToRoute('deliveries.show', transfer, {
          queryParams: {
            infoMessage: deliveryMessage
          }
        });
      };

      Ember.RSVP.all([project, toUser])
        .then(handleModelResolves)
        .then(handleSave)
        .then(handleSend)
        .catch(handleError);
    }
  }
});
