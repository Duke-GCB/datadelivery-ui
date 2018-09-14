import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  send(id, force) {
    let url = this.urlForDeliveryAction(id, 'send');
    if (force) {
      url += '?force=' + force;
    }
    return this.ajax(url, 'POST');
  },

  preview(details) {
    const modelName = 'delivery-preview';
    const url = `${this.buildURL(modelName)}`;
    let payload = {};
    payload[modelName] = details;
    return this.ajax(url, 'POST', {data: payload}).then(response => { return response[modelName]; });
  },

  urlForDeliveryAction(id, action) {
    return `${this.buildURL('delivery', id)}${action}/`;
  },

  cancel(id) {
    const url = this.urlForDeliveryAction(id, 'cancel');
    return this.ajax(url, 'POST');
  },
});
