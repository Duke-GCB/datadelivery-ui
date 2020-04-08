import { not } from '@ember/object/computed';
import BaseController from './base';
import { computed } from '@ember/object';

export default BaseController.extend({
  disableNext: not('toUser.id'),
  backRoute: 'deliveries.new.select-project',
  nextRoute: 'deliveries.new.select-share-users',
  excludeUsers: computed('fromUser', function() {
    return [this.get('fromUser')]
  }),
  actions: {
    affiliateSelected(dukeDsUser) {
      this.set('toUser', dukeDsUser);
    },
  }
});
