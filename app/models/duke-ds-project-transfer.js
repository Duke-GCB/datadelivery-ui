import DS from 'ember-data';
import Ember from "ember";

export default DS.Model.extend({
  status: DS.attr('string'),
  statusComment: DS.attr('string'),
  toUsers: DS.hasMany('DukeDsUser',),
  toUsersNames: Ember.computed('toUsers[].fullName', function() {
    return this.get('toUsers').mapBy('fullName').join(', ');
  }),
  fromUser: DS.belongsTo('DukeDsUser'),
  project: DS.belongsTo('DukeDsProject'),
  delivery: DS.belongsTo('Delivery'),
  canResend: Ember.computed.alias('isPending'),
  isPending: Ember.computed.equal('status', 'pending')
});
