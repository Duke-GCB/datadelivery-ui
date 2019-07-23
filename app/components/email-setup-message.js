import { computed } from '@ember/object';
import Component from '@ember/component';
import { assert } from '@ember/debug';

const SupportEmail = ENV.APP.CONTACT_EMAIL;

export default Component.extend({
  contactEmail: SupportEmail,
  emailSubject: null,
  mailToContactEmail: computed('contactEmail', 'emailSubject', function () {
    const contactEmail = this.get('contactEmail');
    const emailSubject = this.get('emailSubject');
    return `mailto:${contactEmail}?subject=${emailSubject}`
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    assert('EmailSetupMessage component requires emailSubject property', this.get('emailSubject'));
  }
});
