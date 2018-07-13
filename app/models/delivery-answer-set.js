import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('DukeDsProject'),
  fromUser: DS.belongsTo('DukeDsUser'),
  toUser: DS.belongsTo('DukeDsUser'),
  shareUsers: DS.hasMany('DukeDsUser'),
  userMessage: DS.attr('string'),
});
