import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from '@ember-data/model';
import { attr, hasMany, belongsTo } from '@ember-data/model';

export default Model.extend({
  status: attr('string'),
  statusComment: attr('string'),
  toUsers: hasMany('DukeDsUser',),
  toUsersNames: computed('toUsers', 'toUsers@each.fullName', function() {
    return this.toUsers.mapBy('fullName').join(', ');
  }),
  fromUser: belongsTo('DukeDsUser'),
  project: belongsTo('DukeDsProject'),
  delivery: belongsTo('Delivery'),
  canResend: equal('status', 'pending'),
  lastUpdatedOn: attr('date')
});
