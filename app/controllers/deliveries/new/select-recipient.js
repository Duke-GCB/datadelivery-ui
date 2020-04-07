import { not } from '@ember/object/computed';
import BaseController from './base';
import { computed } from '@ember/object';

export default BaseController.extend({
  disableNext: not('toUser.id'),
  backRoute: 'deliveries.new.select-project',
  nextRoute: 'deliveries.new.select-share-users',
  excludeUsers: computed('toUser', function() {
    return [this.get('toUser')]
  }),
  actions: {
    affiliateSelected(dukeDsUser) {
      this.set('toUser', dukeDsUser);
    },
  }
});
