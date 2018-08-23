import Ember from 'ember';
import DS from 'ember-data';

const STATE_NEW = 0;
const STATE_NOTIFIED = 1;

export default DS.Model.extend({
  url: DS.attr('string'),
  project: DS.belongsTo('DukeDsProject'),
  fromUser: DS.belongsTo('DukeDsUser'),
  toUser: DS.belongsTo('DukeDsUser'),
  state: DS.attr('string', { defaultValue() { return STATE_NEW }}),
  transfer: DS.belongsTo('DukeDsProjectTransfer'),
  userMessage: DS.attr('string'),
  shareUsers: DS.hasMany('DukeDsUser'),
  declineReason: DS.attr('string'),
  performedBy: DS.attr('string'),
  deliveryEmailText: DS.attr('string'),
  send(force) {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.send(this.get('id'), force).then(this.updateAfterAction.bind(this));
  },
  preview(props) {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    let details = {
      from_user_id: this.get('fromUser.id'),
      to_user_id: this.get('toUser.id'),
      project_id: this.get('transfer.project.id'),
      transfer_id: this.get('transfer.id'),
      user_message: this.get('userMessage')
    };
    Ember.assign(details, props);
    return adapter.preview(details);
  },
  updateAfterAction(data) {
    // The action methods respond with an updated delivery, so we must update the local store
    // with that payload. Remember, pushPayload doesn't return.
    this.store.pushPayload('delivery', data);
    return Ember.RSVP.resolve(this.store.peekRecord(this.constructor.modelName, this.get('id')));
  },
  canResend: Ember.computed('state', function() {
    const state = this.get('state');
    return state == STATE_NOTIFIED;
  }),
  setNew() {
    this.set('state', STATE_NEW);
  }
});
