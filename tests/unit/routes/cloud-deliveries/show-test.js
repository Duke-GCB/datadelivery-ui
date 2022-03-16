import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | cloud-deliveries/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cloud-deliveries/show');
    assert.ok(route);
  });
});
