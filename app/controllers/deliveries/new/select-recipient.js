import Ember from 'ember';

import BaseController from './base';

export default BaseController.extend({
  disableNext: Ember.computed.not('toUserId'),
  backRoute: 'deliveries.new.select-project',
  nextRoute: 'deliveries.new.enter-user-message',
  actions: {
    toUserSelectionChanged(actionData) {
      this.set('toUserId', actionData.selectedItems.get('firstObject.id'));
    },
  }
});
