import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | deliveries/new/enter user message', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:deliveries/new/enter-user-message');
    assert.ok(controller);
  });

  test('it sets expected routes', function(assert) {
    let controller = this.owner.factoryFor('controller:deliveries/new/enter-user-message').create({});
    assert.equal(controller.get('backRoute'), 'deliveries.new.select-share-users');
    assert.equal(controller.get('nextRoute'), 'deliveries.new.confirm');
  });
});
