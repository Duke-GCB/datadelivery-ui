import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('DukeDsProject'),
  user: DS.belongsTo('DukeDsUser'),
  auth_role: DS.attr('string')
});
