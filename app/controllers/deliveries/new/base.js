import { mapBy, alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { assert } from '@ember/debug';

export default Controller.extend({
  delivery: null, // should be set in setupController
  /* Error Handling */
  errors: null,
  errorMessages: mapBy('errors', 'detail'),
  handleError(errorResponse) { this.set('errors', errorResponse.errors)},
  clearError() { this.set('errors', null); },
  wrapError(errorText) { return {errors: [{detail: errorText}]}; },
  project: alias('delivery.project'),
  toUser: alias('delivery.toUser'),
  fromUser: alias('delivery.fromUser'),
  shareUsers: alias('delivery.shareUsers'),
  userMessage: alias('delivery.userMessage'),

  willPerformAction() {
    this.set('disableNext', true);
    this.clearError();
  },
  didPerformAction() {
    this.set('disableNext', false);
    this.clearError();
  },
  actionDidFail(error) {
    this.set('disableNext', true);
    this.handleError(error)
  },

  init() {
    this._super(...arguments);
    assert('Controller requires backRoute property', this.backRoute);
    assert('Controller requires nextRoute property', this.nextRoute);
  },

  /* Must override */
  backRoute: null,
  nextRoute: null,

  /* May override */
  disableNext: false,
});
