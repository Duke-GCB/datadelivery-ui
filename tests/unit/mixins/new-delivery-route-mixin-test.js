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
