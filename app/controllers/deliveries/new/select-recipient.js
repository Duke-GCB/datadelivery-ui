import Ember from 'ember';
import BaseController from './base';

export default BaseController.extend({
  disableNext: Ember.computed.not('toUser.id'),
  backRoute: 'deliveries.new.select-project',
  nextRoute: 'deliveries.new.enter-user-message',
  recipients: Ember.computed('model', 'fromUser.id', function() {
    return this.get('model')
      .rejectBy('fullName', null)
      .rejectBy('fullName', '(null)')
      .rejectBy('email', null)
      .rejectBy('id', this.get('fromUser.id'));
  }),
  actions: {
    recipientSelectionChanged(selectedItems) {
      // When unchecking the single item, selectedItems.length drops to 0,
      // but selectedItems.firstObject still references a stale object, so check for that.
      if(selectedItems.get('length') == 0) {
        this.set('toUser', null);
      }  else {
        this.set('toUser',  selectedItems.get('firstObject'));
      }
    },
  }
});
