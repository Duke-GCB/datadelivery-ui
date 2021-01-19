import Component from '@ember/component';
import { computed } from '@ember/object';
import ENV from 'datadelivery-ui/config/environment'

const SupportEmail = ENV.APP.CONTACT_EMAIL;

export default Component.extend({
  classNames: ['zip-download-info'],
  supportEmail: SupportEmail,
  mailToSupportEmail: computed('supportEmail', function() {
    const supportEmail = this.supportEmail;
    return `mailto:${supportEmail}`;
  })
});
