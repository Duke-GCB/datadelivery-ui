import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  resend(id) {
    return this.ajax(this.urlForJobControlAction(id, 'send'), 'POST');
  },
  urlForJobControlAction(id, action) {
    return `${this.buildURL('delivery', id)}${action}/`;
  }
});
