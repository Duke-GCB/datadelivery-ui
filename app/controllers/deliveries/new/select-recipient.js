import Ember from 'ember';

import BaseController from './base';

export default BaseController.extend({
  disableNext: Ember.computed.not('toUser.id'),
  backRoute: 'deliveries.new.select-project',
  nextRoute: 'deliveries.new.enter-user-message',
  actions: {
    toUserSelectionChanged(actionData) {
      const toUser = actionData.get('selectedItems.firstObject');
      this.set('toUser', toUser);
    },
  }
});
