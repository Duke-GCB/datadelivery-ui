import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | duke ds projects', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:duke-ds-projects');
    assert.ok(route);
  });
});
