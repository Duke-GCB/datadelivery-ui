import Ember from 'ember';
import BaseController from './base';

export default BaseController.extend({
  disableNext: Ember.computed.not('toUser.id'),
  backRoute: 'deliveries.new.select-project',
  nextRoute: 'deliveries.new.enter-user-message',
  actions: {
    affiliateSelected(selectedAffiliates) {
      // When unchecking the single item, selectedItems.length drops to 0,
      // but selectedItems.firstObject still references a stale object, so check for that.
      if(selectedAffiliates.get('length') == 0) {
        this.set('toUser', null);
      } else {
        // Obtain the duke-ds-user from this affiliate
        const affiliate = selectedAffiliates.get('firstObject');
        affiliate.getOrRegisterUser().then(dukeDsUser => {
          this.set('toUser', dukeDsUser);
        });
      }
    },
  }
});
