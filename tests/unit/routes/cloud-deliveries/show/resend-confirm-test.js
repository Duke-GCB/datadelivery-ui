import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | cloud-deliveries/show/resend-confirm', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cloud-deliveries/show/resend-confirm');
    assert.ok(route);
  });
});
