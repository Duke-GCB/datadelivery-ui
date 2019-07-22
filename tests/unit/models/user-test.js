import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | user', function(hooks) {
  setupTest(hooks);

  test('it exists', async function(assert) {
    let model = await this.owner.lookup('service:store').createRecord('user');
    assert.ok(!!model);
  });
});
