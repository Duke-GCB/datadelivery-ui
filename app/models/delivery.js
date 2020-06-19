import { computed } from '@ember/object';
import { resolve } from 'rsvp';
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
  userMessage: DS.attr('string', { defaultValue() { return '' }}),
  shareUsers: DS.hasMany('DukeDsUser'),
  declineReason: DS.attr('string'),
  performedBy: DS.attr('string'),
  deliveryEmailText: DS.attr('string'),
  emailTemplateSet: DS.belongsTo('EmailTemplateSet'),
  send(force) {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.send(this.get('id'), force).then(this.updateAfterAction.bind(this));
  },
  preview() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    let details = {
      from_user_id: this.get('fromUser.id'),
      to_user_id: this.get('toUser.id'),
      project_id: this.get('project.id'),
      transfer_id: this.get('transfer.id') || '',
      user_message: this.get('userMessage'),
      email_template_set: this.get('emailTemplateSet'),
    };
    return adapter.preview(details);
  },
  updateAfterAction(data) {
    // The action methods respond with an updated delivery, so we must update the local store
    // with that payload. Remember, pushPayload doesn't return.
    this.store.pushPayload('delivery', data);
    return resolve(this.store.peekRecord(this.constructor.modelName, this.get('id')));
  },
  canResend: computed('state', function() {
    const state = this.get('state');
    return state == STATE_NOTIFIED;
  }),
  setNew() {
    this.set('state', STATE_NEW);
  },
  cancel() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.cancel(this.get('id'))
      .then(this.updateAfterAction.bind(this))
      // reload transfer so it will reflect the updated status
      .then(() => this.get('transfer'))
      .then(transferRelationship => transferRelationship.reload());
  },
});
