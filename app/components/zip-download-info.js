import Ember from 'ember';
import ENV from 'datadelivery-ui/config/environment'

const SupportEmail = ENV.APP.CONTACT_EMAIL;

export default Ember.Component.extend({
  classNames: ['zip-download-info'],
  supportEmail: SupportEmail,
  mailToSupportEmail: Ember.computed('supportEmail', function() {
    const supportEmail = this.get('supportEmail');
    return `mailto:${supportEmail}`;
  })
});
