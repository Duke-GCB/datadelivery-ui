import Model from '@ember-data/model';
import {attr, belongsTo} from "@ember-data/model/index";
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import {resolve} from "rsvp";

export default Model.extend({
  from_netid: belongsTo('duke-user'),
  to_netid: belongsTo('duke-user'),
  source_project: attr(),
  project_name: alias('source_project.path'),
  state: attr('string'),
  status: attr('string'),
  outgoing: attr('boolean'),
  last_updated_on: attr('date'),
  decline_reason: attr('string'),
  performed_by: attr('string'),
  delivery_email_text: attr('string'),
  user_message: attr('string'),
  url: attr('string'),
  emailTemplateSet: belongsTo('EmailTemplateSet'),
  preview() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    let details = {
      "from_netid": this.get('from_netid.id'),
      "to_netid": this.get('to_netid.id'),
      "transfer_id": this.get('id'),
      "simple_project_name": this.get('project_name'),
      user_message: this.get('user_message'),
      email_template_set_id: this.get('emailTemplateSet.id'),
    };
    return adapter.preview(details);
  },
  canResend: computed('status', function() {
    const status = this.get('status');
    return status == 'notified';
  }),
  getDeliverySummary() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.getDeliverySummary(this.id);
  },
  updateAfterAction(data) {
    // The action methods respond with an updated delivery, so we must update the local store
    // with that payload. Remember, pushPayload doesn't return.
    this.store.pushPayload('az-delivery', data);
    return resolve(this.store.peekRecord(this.constructor.modelName, this.get('id')));
  },
  send(force) {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.send(this.get('id'), force).then(this.updateAfterAction.bind(this));
  },
  cancel() {
    let adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.cancel(this.get('id'))
      .then(this.updateAfterAction.bind(this));
  },
});
