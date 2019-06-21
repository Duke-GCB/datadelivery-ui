import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
  application: controller('application'),
  currentDukeDsUserChanged: on('init', observer('application.currentDukeDsUser', 'model', function() {
    // When the current user is loaded or our delivery model is loaded, set the fromUser
    const currentDukeDsUser  = this.get('application.currentDukeDsUser');
    const delivery = this.get('model');
    if(delivery) {
      delivery.set('fromUser', currentDukeDsUser);
    }
  })),
  currentUserChanged: on('init', observer('application.currentUser', 'model', function() {
    const currentUser  = this.get('application.currentUser');
    // if the current user is loaded but is not setup for delivery show instructions
    if (currentUser) {
      if (!currentUser.get('setupForDelivery')) {
        this.transitionToRoute('deliveries.setup-instructions');
      }
    }
  })),
});
