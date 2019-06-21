import EmberObject from '@ember/object';
import NewDeliveryRouteMixinMixin from 'datadelivery-ui/mixins/new-delivery-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | new delivery route mixin', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let NewDeliveryRouteMixinObject = EmberObject.extend(NewDeliveryRouteMixinMixin);
    let subject = NewDeliveryRouteMixinObject.create();
    assert.ok(subject);
  });

  test('setupController sets controller.delivery to the model from deliveries.new', function (assert) {
    const mockDelivery = EmberObject.create({name:'delivery'});
    let TestRouteObject = EmberObject.extend(NewDeliveryRouteMixinMixin);
    let testRoute = TestRouteObject.create({
      modelFor(routeName) {
        assert.equal(routeName, 'deliveries.new');
        return mockDelivery;
      }
    });
    const controller = EmberObject.create();
    const model = EmberObject.create();
    testRoute.setupController(controller, model);
    assert.equal(controller.get('delivery'), mockDelivery);
  });
});
