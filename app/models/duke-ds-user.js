import DS from 'ember-data';

export default DS.Model.extend({
  fullName: DS.attr('string'),
  email: DS.attr('string'),
  username: DS.attr('string')
});
