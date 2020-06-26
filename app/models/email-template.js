import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  type: DS.attr('string'),
  body: DS.attr('string'),
  subject: DS.attr('string'),
  helpText:  DS.attr('string'),
  content: computed('subject', 'body', function() {
    return `Subject: ${this.subject}\n\n${this.body}`;
  }),
  userType: computed('type', function (){
    var emailTemplateType = `${this.type}`;
    if (!emailTemplateType) {
      emailTemplateType = '';
    }
    return emailTemplateType.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  })
});
