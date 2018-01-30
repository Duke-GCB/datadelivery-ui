import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  project: DS.belongsTo('DukeDsProject'),
  fromUser: DS.belongsTo('DukeDsUser'),
  toUser: DS.belongsTo('DukeDsUser'),
  state: DS.attr('string'),
  transfer: DS.belongsTo('DukeDsProjectTransfer'),
  userMessage: DS.attr('string')
});
