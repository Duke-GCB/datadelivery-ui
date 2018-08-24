import Ember from 'ember';
import BaseController from './base';

export default BaseController.extend({
  backRoute: 'deliveries.new.select-recipient',
  nextRoute: 'deliveries.new.confirm',
  userMessage: Ember.computed.alias('delivery.userMessage')
});
