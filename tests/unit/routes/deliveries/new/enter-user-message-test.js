import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('route:deliveries/new/enter-user-message', 'Unit | Route | deliveries/new/enter user message', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it resets errors when exiting', function(assert) {
  let route = this.subject({});
  let controller = Ember.Object.create({
    errors:'SomeErrors'
  });
  route.resetController(controller, false);
  assert.equal(controller.get('errors'), 'SomeErrors')
  route.resetController(controller, true);
  assert.equal(controller.get('errors'), null)
});
