import DS from 'ember-data';
import Ember from "ember";

export default DS.Model.extend({
  status: DS.attr('string'),
  statusComment: DS.attr('string'),
  toUsers: DS.hasMany('DukeDsUser',),
  toUsersNames: Ember.computed('toUsers[].fullName', function() {
    return this.get('toUsers').reduce(function(acc, value) {
      if (acc) acc = acc.concat(", ");
      acc = acc.concat(value.get('fullName'));
      return acc
    }, '')
  }),
  fromUser: DS.belongsTo('DukeDsUser'),
  project: DS.belongsTo('DukeDsProject'),
  delivery: DS.belongsTo('Delivery'),
  canResend: Ember.computed('status', function() {
    const status = this.get('status');
    return status == 'pending';
  }),
});
