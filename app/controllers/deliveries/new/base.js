import Ember from 'ember';
import { assert } from '@ember/debug';

export default Ember.Controller.extend({
  delivery: null, // should be set in setupController
  /* Error Handling */
  errors: null,
  errorMessages: Ember.computed.mapBy('errors', 'detail'),
  handleError(errorResponse) { this.set('errors', errorResponse.errors)},
  clearError() { this.set('errors', null); },
  wrapError(errorText) { return {errors: [{detail: errorText}]}; },
  project: Ember.computed.alias('delivery.project'),
  toUser: Ember.computed.alias('delivery.toUser'),
  fromUser: Ember.computed.alias('delivery.fromUser'),
  userMessage: Ember.computed.alias('delivery.userMessage'),

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
    assert('Controller requires backRoute property', this.get('backRoute'));
    assert('Controller requires nextRoute property', this.get('nextRoute'));
  },

  /* Must override */
  backRoute: null,
  nextRoute: null,

  /* May override */
  disableNext: false,
});
