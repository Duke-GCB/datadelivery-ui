import Model from '@ember-data/model';
import { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  ccAddress: attr('string'),
  replyAddress: attr('string'),
  default:  attr('boolean'),
  storageName: attr('string'),
  emailTemplates: hasMany('EmailTemplate')
});
