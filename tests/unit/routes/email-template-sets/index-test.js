import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | email-template-sets/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:email-template-sets/index');
    assert.ok(route);
  });
});
