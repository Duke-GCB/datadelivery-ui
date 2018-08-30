import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller('application'),
  currentDukeDsUserChanged: Ember.on('init', Ember.observer('application.currentDukeDsUser', 'model', function() {
    // When the current user is loaded or our delivery model is loaded, set the fromUser
    const currentDukeDsUser  = this.get('application.currentDukeDsUser');
    const delivery = this.get('model');
    if(delivery) {
      delivery.set('fromUser', currentDukeDsUser);
    }
  })),
});