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

  currentDukeDsUserChanged: Ember.on('init', Ember.observer('fromUser', function() {
    if(!Ember.isEmpty(this.get('fromUser'))) {
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
    saveAndSend() {
      return;
      const delivery = this.get('store').createRecord('delivery', {
        project: this.get('project'),
        fromUser: this.get('fromUser'),
        toUser: this.get('toUser'),
        userMessage: this.get('userMessage')
      });
      return delivery.save().then(
        savedDelivery => {
          return savedDelivery.send();
        },
        errorResponse => {
          this.setProperties({
            errors: errorResponse.errors,
            disableNext: false
          });
        }).then(sentDelivery => {
        this.transitionToRoute('deliveries.show', sentDelivery.get('transfer'));
      });
    }
  }
});
