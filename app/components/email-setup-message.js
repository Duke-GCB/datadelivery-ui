import Ember from 'ember';
import { assert } from '@ember/debug';

export default Ember.Component.extend({
  contactEmail: null,
  emailSubject: null,
  mailToContactEmail: Ember.computed('contactEmail', 'emailSubject', function () {
    const contactEmail = this.get('contactEmail');
    const emailSubject = this.get('emailSubject');
    return `mailto:${contactEmail}?subject=${emailSubject}`
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    assert('EmailSetupMessage component requires contactEmail property', this.get('contactEmail'));
    assert('EmailSetupMessage component requires emailSubject property', this.get('emailSubject'));
  }
});
