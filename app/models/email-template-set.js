import DS from 'ember-data';
export default DS.Model.extend({
  name: DS.attr('string'),
  ccAddress: DS.attr('string'),
  replyAddress: DS.attr('string'),
  default:  DS.attr('boolean'),
  emailTemplates: DS.hasMany('EmailTemplate')
});
