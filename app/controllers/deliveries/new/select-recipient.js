import Ember from 'ember';
import BaseController from './base';

export default BaseController.extend({
  disableNext: Ember.computed.not('toUser.id'),
  backRoute: 'deliveries.new.select-project',
  nextRoute: 'deliveries.new.enter-user-message',
  recipients: Ember.computed('model', 'fromUser.id', function() {
    return this.get('model')
      .sortBy('fullName')
      .rejectBy('fullName', null)
      .rejectBy('fullName', '(null)')
      .rejectBy('email', null)
      .rejectBy('id', this.get('fromUser.id'));
  }),
  actions: {
    toUserSelectionChanged(actionData) {
      const toUser = actionData.get('selectedItems.firstObject');
      this.set('toUser', toUser);
    },
  }
});
