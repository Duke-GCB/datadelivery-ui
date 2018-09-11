import CanResendController from './can-resend-controller';
import Ember from "ember";

export default CanResendController.extend({
  queryParams: ['infoMessage'],
  infoMessage: null,
  canRecall: Ember.computed.alias('canResend')
});
