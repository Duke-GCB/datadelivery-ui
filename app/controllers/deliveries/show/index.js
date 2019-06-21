import { computed } from '@ember/object';
import CanResendController from './can-resend-controller';

export default CanResendController.extend({
  queryParams: ['infoMessage'],
  infoMessage: null,
  showProjectDetails: computed('model.status', 'model.fromUser.id', 'currentDukeDsUser.id', function () {
    // Show the details if the currentDukeDsUser is the sender or if they're the recipient and they've received it
    const currentDukeDsUserId = this.get('currentDukeDsUser.id');
    if (!currentDukeDsUserId) {
      // Cannot determine current user, assume we should not show
      return false;
    }
    const fromUserId = this.get('model.fromUser.id');
    if (fromUserId === currentDukeDsUserId) {
      // Delivery sender is the current user, assume they'll have download access
      return true;
    } else {
      // User must be a recipient if they have access to the transfer and are not the sender
      // Only show the details if they've accepted the project and would have access
      return this.get('model.status') === 'accepted';
    }
  })
});
