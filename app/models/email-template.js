import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  type: attr('string'),
  body: attr('string'),
  subject: attr('string'),
  helpText: attr('string'),
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
