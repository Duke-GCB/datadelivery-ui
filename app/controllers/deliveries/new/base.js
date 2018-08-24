import Ember from 'ember';
import { assert } from '@ember/debug';

export default Ember.Controller.extend({
  /* Don't touch these */
  queryParams: [
    'projectId',
    'toUserId',
    'userMessage'
  ],
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
  // By making these ID properties computed, changing the queryParam causes a new model to be fetched
  // and vice versa
  setDeliveryRelationship(relatedModelName, relationshipKey, relatedObjectId) {
    const delivery = this.get('delivery');
    if(Ember.isEmpty(delivery)) {
      relatedObjectId = null; // Cannot set value on a non-existent delivery
    } else if(Ember.isEmpty(relatedObjectId)) {
      // The property we are setting is empty
      // Do not attempt to look up an object, instead clear the relation
      delivery.set(relationshipKey, null);
    } else {
      // delivery is present and relatedObjectId is not empty
      const store = this.get('store');
      store.findRecord(relatedModelName, relatedObjectId).then(relatedObject => {
        delivery.set(relationshipKey, relatedObject);
      }).catch(this.handleError.bind(this));
    }
    return relatedObjectId;
  },
  projectId: Ember.computed('delivery.project.id', {
    get() { return this.get('delivery.project.id'); },
    set(key, projectId) {
      return this.setDeliveryRelationship('duke-ds-project', 'project', projectId);
    }
  }),
  toUserId: Ember.computed('delivery.toUser.id', {
    get() { return this.get('delivery.toUser.id'); },
    set(key, toUserId) {
      return this.setDeliveryRelationship('duke-ds-user', 'toUser', toUserId);
   }
  }),
  userMessage: Ember.computed.alias('delivery.userMessage'),
  currentDukeDsUserChanged: Ember.on('init', Ember.observer('application.currentDukeDsUser', function() {
    const currentDukeDsUser  = this.get('application.currentDukeDsUser');
    this.get('delivery').set('fromUser', currentDukeDsUser);
  })),
  // Generic back/next actions. Requires the route names to be set
  actions: {
    back() {
      this.processBack().then((result) => {
        this.transitionToRoute(this.get('backRoute', result.get('model'), result.get('options')));
      }).catch(error => {
        this.handleError(error);
      });
    },

    next() {
      this.processNext().then((result) => {
        const route = this.get('nextRoute');
        const model = result.get('model');
        const options = result.get('options');
        if(Ember.isEmpty(model) || Ember.isEmpty(options)) {
          this.transitionToRoute(route);
        } else {
          this.transitionToRoute(route, model, options);
        }
      }).catch(error => {
        this.handleError(error)
      });
    }
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
  processBack() { return Ember.RSVP.resolve(Ember.Object.create()); },
  processNext() { return Ember.RSVP.resolve(Ember.Object.create()); },
  disableNext: false,
});
