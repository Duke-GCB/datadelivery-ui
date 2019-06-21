import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | deliveries/new/confirm', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:deliveries/new/confirm');
    assert.ok(route);
  });

  test('it clears errors and disableNext when exiting', function(assert) {
    const controller = EmberObject.create({
      errors: [1,2,3],
      disableNext: true,
    });
    let route = this.owner.lookup('route:deliveries/new/confirm');
    assert.ok(controller.get('errors'));
    assert.ok(controller.get('disableNext'));

    route.resetController(controller, false);
    assert.ok(controller.get('errors'));
    assert.ok(controller.get('disableNext'));

    route.resetController(controller, true);
    assert.notOk(controller.get('errors'));
    assert.notOk(controller.get('disableNext'));
  });
});
