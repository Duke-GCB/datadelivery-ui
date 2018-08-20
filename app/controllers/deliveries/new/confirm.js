import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['projectId', 'toUserId', 'userMessage'],
  projectId: null,
  toUserId: null,
  userMessage: null,
  emailMessage: null,
  errors: null,
  application: Ember.inject.controller(),
  currentDukeDsUser: Ember.computed.alias('application.currentDukeDsUser'),
  fromUser: Ember.computed.alias('currentDukeDsUser'),

  valuesPopulated: Ember.on('init', Ember.observer('fromUser', 'projectId', 'toUserId', 'userMessage', function() {
    // Don't generate preview until all values are set.
    // This is ugly
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
      // We have a lot of promises to resolve here.
      const store = this.get('store');
      const project = this.get('store').findRecord('duke-ds-project', this.get('projectId'));
      const fromUser = this.get('fromUser');
      const toUser = store.findRecord('duke-ds-user', this.get('toUserId'));
      const userMessage = this.get('userMessage');

      Ember.RSVP.all([project, toUser]).then((resolved) => {
        const delivery = this.get('store').createRecord('delivery', {
          project: resolved[0],
          toUser: resolved[1],
          fromUser: fromUser,
          userMessage: userMessage
        });
        return delivery.save();
      }).then(
        savedDelivery => { return savedDelivery.send(); },
          errorResponse => { this.setProperties({ errors: errorResponse.errors, disableNext: false });
      }).then(sentDelivery => {
        this.transitionToRoute('deliveries.show', sentDelivery.get('transfer'));
      });
    }
  }
});
