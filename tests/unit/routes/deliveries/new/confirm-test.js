import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:deliveries/new/confirm', 'Unit | Route | deliveries/new/confirm', {
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it clears errors and disableNext when exiting', function(assert) {
  const controller = Ember.Object.create({
    errors: [1,2,3],
    disableNext: true,
  });
  let route = this.subject();
  assert.ok(controller.get('errors'));
  assert.ok(controller.get('disableNext'));

  route.resetController(controller, false);
  assert.ok(controller.get('errors'));
  assert.ok(controller.get('disableNext'));

  route.resetController(controller, true);
  assert.notOk(controller.get('errors'));
  assert.notOk(controller.get('disableNext'));
});
