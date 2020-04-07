import { not } from '@ember/object/computed';
import BaseController from './base';

export default BaseController.extend({
  disableNext: not('toUser.id'),
  backRoute: 'deliveries.new.select-project',
  nextRoute: 'deliveries.new.select-share-users',
  actions: {
    affiliateSelected(dukeDsUser) {
      this.set('toUser', dukeDsUser);
    },
  }
});
