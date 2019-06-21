import { alias } from '@ember/object/computed';
import Component from '@ember/component';

const DeliveryDetail = Component.extend({
  transfer: null,
  showProjectDetails: false,
  classNames: ['delivery-detail'],
  editUserMessage: false, /* minimal field display allowing **/
  delivery: alias('transfer.delivery'),
  showEmail: alias('transfer.canResend')
});

DeliveryDetail.reopenClass({
  positionalParams: ['transfer', 'showProjectDetails']
});

export default DeliveryDetail;
