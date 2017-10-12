import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  projectId: DS.attr('string'),
  fromUserId: DS.attr('string'),
  toUserId: DS.attr('string'),
  state: DS.attr('string'),
  transferId: DS.attr('string'),
  userMessage: DS.attr('string')
});
