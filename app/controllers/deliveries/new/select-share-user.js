import Controller from '@ember/controller';

export default Controller.extend({
  delivery: null, // should be set in setupController
  shareUser: null,
  disableSave: true,
  actions: {
    affiliateSelected(dukeDsUser) {
      this.set('shareUser', dukeDsUser);
      this.set('disableSave', dukeDsUser == null);
    },
    save() {
      const shareUsers = this.get('delivery.shareUsers').toArray();
      shareUsers.push(this.get('shareUser'));
      this.set('delivery.shareUsers', shareUsers);
      this.transitionToRoute('deliveries.new.select-share-users');
    }
  }
});
