import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  send(id, force) {
    var url = this.urlForDeliveryAction(id, 'send');
    if (force) {
      url += '?force=' + force;
    }
    return this.ajax(url, 'POST');
  },
  urlForDeliveryAction(id, action) {
    return `${this.buildURL('delivery', id)}${action}/`;
  }
});
