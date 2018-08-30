import Ember from 'ember';

/*
  This mixin should be used by sub-routes of deliveries.new to set the newly created
  delivery object into each controller. setupController is the first route hook where
  the controller is instantiated. Note to future self - attempting to bind the queryParams to
  properties of the delivery will fail, because queryParams get bound to controller init().
  init() happens before setupController where we set the underlying delivery model object,
  so we'd be binding to a bunch of non-existent properties.
 */

export default Ember.Mixin.create({
  setupController(controller, model) {
    this._super(...arguments);
    const delivery = this.modelFor('deliveries.new');
    controller.set('delivery', delivery);
  },
});
