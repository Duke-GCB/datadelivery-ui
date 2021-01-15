import BaseController from './base';

export default BaseController.extend({
  backRoute: 'deliveries.new.select-recipient',
  nextRoute: 'deliveries.new.enter-user-message',
  actions: {
    addUser() {
      this.transitionToRoute('deliveries.new.select-share-user')
    },
    removeUser(dukeDsUser) {
      const shareUsers = this.shareUsers.toArray();
      const index = shareUsers.indexOf(dukeDsUser);
      if (index > -1) {
        shareUsers.splice(index, 1);
        this.set('shareUsers', shareUsers);
      }
    }
  }
})
