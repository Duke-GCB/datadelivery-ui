import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  project: DS.belongsTo('DukeDsProject'),
  fromUser: DS.belongsTo('DukeDsUser'),
  toUser: DS.belongsTo('DukeDsUser'),
  state: DS.attr('string'),
  transferId: DS.attr('string'),
  userMessage: DS.attr('string')
});
