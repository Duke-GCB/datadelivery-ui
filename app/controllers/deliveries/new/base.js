import Ember from 'ember';
import { assert } from '@ember/debug';

export default Ember.Controller.extend({
  // This controller needs access to the new delivery object that
  // is the model in deliveries.new. Setting it in route.setupController did not happen
  // early enough in the controller lifecycle to be compatible with queryParams, so
  // we inject it instead

  newDeliveryController: Ember.inject.controller('deliveries.new'),
  delivery: Ember.computed.alias('newDeliveryController.model'),
  application: Ember.inject.controller('application'),
  /* Error Handling */
  errors: null,
  errorMessages: Ember.computed.mapBy('errors', 'detail'),
  handleError(errorResponse) { this.set('errors', errorResponse.errors)},
  clearError() { this.set('errors', null); },
  makeError(errorText) { return {errors: [{detail: errorText}]}; },
  project: Ember.computed.alias('delivery.project'),
  toUser: Ember.computed.alias('delivery.toUser'),
  fromUser: Ember.computed.alias('delivery.fromUser'),
  userMessage: Ember.computed.alias('delivery.userMessage'),
  currentDukeDsUserChanged: Ember.on('init', Ember.observer('application.currentDukeDsUser', function() {
    const currentDukeDsUser  = this.get('application.currentDukeDsUser');
    this.set('fromUser', currentDukeDsUser);
  })),

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
  working: false
});
