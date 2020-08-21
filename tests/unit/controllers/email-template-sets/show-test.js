import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | email-template-sets/show', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:email-template-sets/show');
    assert.ok(controller);
  });
});
