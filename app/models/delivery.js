import { computed } from '@ember/object';
import { resolve } from 'rsvp';
import Model from '@ember-data/model';
import { attr, belongsTo, hasMany } from '@ember-data/model';

const STATE_NEW = 0;
const STATE_NOTIFIED = 1;

export default Model.extend({
  url: attr('string'),
  project: belongsTo('DukeDsProject'),
  fromUser: belongsTo('DukeDsUser'),
  toUser: belongsTo('DukeDsUser'),
  state: attr('string', { defaultValue() { return STATE_NEW }}),
  transfer: belongsTo('DukeDsProjectTransfer'),
  userMessage: attr('string', { defaultValue() { return '' }}),
  shareUsers: hasMany('DukeDsUser'),
  declineReason: attr('string'),
  performedBy: attr('string'),
  deliveryEmailText: attr('string'),
  emailTemplateSet: belongsTo('EmailTemplateSet'),
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
      user_message: this.userMessage,
      email_template_set_id: this.get('emailTemplateSet.id'),
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
    const state = this.state;
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
