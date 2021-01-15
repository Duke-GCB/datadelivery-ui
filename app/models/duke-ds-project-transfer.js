import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr('string'),
  statusComment: DS.attr('string'),
  toUsers: DS.hasMany('DukeDsUser',),
  toUsersNames: computed('toUsers', 'toUsers@each.fullName', function() {
    return this.toUsers.mapBy('fullName').join(', ');
  }),
  fromUser: DS.belongsTo('DukeDsUser'),
  project: DS.belongsTo('DukeDsProject'),
  delivery: DS.belongsTo('Delivery'),
  canResend: equal('status', 'pending'),
  lastUpdatedOn: DS.attr('date')
});
