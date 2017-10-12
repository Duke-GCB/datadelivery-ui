import DS from 'ember-data';

export default DS.Model.extend({
  ddsId: DS.attr('string'),
  fullName: DS.attr('string'),
  email: DS.attr('string')
});
