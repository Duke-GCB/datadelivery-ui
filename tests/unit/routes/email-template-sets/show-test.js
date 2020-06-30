import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | email-template-sets/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:email-template-sets/show');
    assert.ok(route);
  });
});
