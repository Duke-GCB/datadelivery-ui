import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  delivery: null, // should be set in setupController
  shareUser: null,
  disableSave: true,
  excludeUsers: computed('delivery.{fromUser,toUser,shareUsers.[]}', function() {
    const excludeUsers = this.get('delivery.shareUsers').toArray();
    excludeUsers.push(this.get('delivery.fromUser'));
    excludeUsers.push(this.get('delivery.toUser'));
    return excludeUsers
  }),
  actions: {
    affiliateSelected(dukeDsUser) {
      this.set('shareUser', dukeDsUser);
      this.set('disableSave', dukeDsUser == null);
    },
    save() {
      const shareUsers = this.get('delivery.shareUsers').toArray();
      shareUsers.push(this.shareUser);
      this.set('delivery.shareUsers', shareUsers);
      this.transitionToRoute('deliveries.new.select-share-users');
    }
  }
});
