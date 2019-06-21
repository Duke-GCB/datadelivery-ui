import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | deliveries/setup instructions', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:deliveries/setup-instructions');
    assert.ok(route);
  });
});
