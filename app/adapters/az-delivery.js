import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  getDeliverySummary(deliveryId) {
    const dukeDsProjectUrl = this.buildURL('az-delivery', deliveryId);
    const url = `${dukeDsProjectUrl}summary/`;
    return this.ajax(url).then(response => {
      return response['az-project-summary'];
    });
  },
  preview(details) {
    const modelName = 'az-delivery-preview';
    const url = `${this.buildURL(modelName)}`;
    let payload = {};
    payload[modelName] = details;
    return this.ajax(url, 'POST', {data: payload}).then(response => { return response[modelName]; });
  },
  send(id, force) {
    let url = this.urlForDeliveryAction(id, 'send');
    if (force) {
      url += '?force=' + force;
    }
    return this.ajax(url, 'POST');
  },
  urlForDeliveryAction(id, action) {
    return `${this.buildURL('az-delivery', id)}${action}/`;
  },
  cancel(id) {
    const url = this.urlForDeliveryAction(id, 'cancel');
    return this.ajax(url, 'POST');
  }
});
