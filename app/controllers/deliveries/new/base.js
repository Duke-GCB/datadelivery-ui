import Ember from 'ember';
import { assert } from '@ember/debug';

export default Ember.Controller.extend({
  // Note from D. Leehr 2018-08-29 on injecting controller 'deliveries'
  // This controller needs access to the delivery object created as model in routes/deliveries/new
  // The Ember convention is to inject other models in this controller's route.setupController(),
  // so that controllers don't have hard-coded knowledge of other routes.
  // setupController() does happen early enough in the controller's lifecycle for our needs
  // Specifically, it happens after queryParam properties are set, which were bound to relationships
  // in the delivery object. When simplifying this controller, I removed the queryParams,
  // so it's not actually an issue now.

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
