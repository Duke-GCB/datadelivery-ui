import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('DukeDsProject'),
  user: DS.belongsTo('DukeDsUser'),
  authRole: DS.attr('string')
});
