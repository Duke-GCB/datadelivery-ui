import Component from '@ember/component';
import { computed } from '@ember/object';
import ENV from 'datadelivery-ui/config/environment';

const SupportEmail = ENV.APP.CONTACT_EMAIL;

export default Component.extend({
  tagName: 'a',
  classNames: ['support-email-link-anchor'],
  attributeBindings: ['href'],
  contactEmail: SupportEmail,
  emailSubject: "Data Delivery Email Template Setup Request",
  href: computed('contactEmail', 'emailSubject', function () {
    const contactEmail = this.get('contactEmail');
    const emailSubject = this.get('emailSubject');
    return `mailto:${contactEmail}?subject=${emailSubject}`
  }),
});
