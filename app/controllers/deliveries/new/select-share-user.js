import Controller from '@ember/controller';

export default Controller.extend({
  delivery: null, // should be set in setupController
  shareUser: null,
  disableSave: true,
  actions: {
    affiliateSelected(selectedAffiliates) {
      // When unchecking the single item, selectedItems.length drops to 0,
      // but selectedItems.firstObject still references a stale object, so check for that.
      if(selectedAffiliates.get('length') == 0) {
        this.set('shareUser', null);
        this.set('disableSave', true);
      } else {
        // Obtain the duke-ds-user from this affiliate
        const affiliate = selectedAffiliates.get('firstObject');
        affiliate.getOrRegisterUser().then(dukeDsUser => {
          this.set('shareUser', dukeDsUser);
          this.set('disableSave', false);
        });
      }
    },
    save() {
      const shareUsers = this.get('delivery.shareUsers').toArray();
      shareUsers.push(this.get('shareUser'));
      this.set('delivery.shareUsers', shareUsers);
      this.transitionToRoute('deliveries.new.select-share-users');
    }
  }
});
