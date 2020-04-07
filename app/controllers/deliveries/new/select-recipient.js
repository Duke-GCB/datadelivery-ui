import { not } from '@ember/object/computed';
import BaseController from './base';

export default BaseController.extend({
  disableNext: not('toUser.id'),
  backRoute: 'deliveries.new.select-project',
  nextRoute: 'deliveries.new.select-share-users',
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
