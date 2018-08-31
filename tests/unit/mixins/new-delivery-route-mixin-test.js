import Ember from 'ember';
import NewDeliveryRouteMixinMixin from 'datadelivery-ui/mixins/new-delivery-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | new delivery route mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let NewDeliveryRouteMixinObject = Ember.Object.extend(NewDeliveryRouteMixinMixin);
  let subject = NewDeliveryRouteMixinObject.create();
  assert.ok(subject);
});

test('setupController sets controller.delivery to the model from deliveries.new', function (assert) {
  const mockDelivery = Ember.Object.create({name:'delivery'});
  let TestRouteObject = Ember.Object.extend(NewDeliveryRouteMixinMixin);
  let testRoute = TestRouteObject.create({
    modelFor(routeName) {
      assert.equal(routeName, 'deliveries.new');
      return mockDelivery;
    }
  });
  const controller = Ember.Object.create();
  const model = Ember.Object.create();
  testRoute.setupController(controller, model);
  assert.equal(controller.get('delivery'), mockDelivery);
});
