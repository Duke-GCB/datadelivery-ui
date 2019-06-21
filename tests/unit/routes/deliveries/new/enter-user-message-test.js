import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | deliveries/new/enter user message', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:deliveries/new/enter-user-message');
    assert.ok(route);
  });

  test('it resets errors when exiting', function(assert) {
    let route = this.owner.factoryFor('route:deliveries/new/enter-user-message').create({});
    let controller = EmberObject.create({
      errors:'SomeErrors'
    });
    route.resetController(controller, false);
    assert.equal(controller.get('errors'), 'SomeErrors')
    route.resetController(controller, true);
    assert.equal(controller.get('errors'), null)
  });
});
