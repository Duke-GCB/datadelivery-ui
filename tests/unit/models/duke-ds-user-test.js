import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | duke ds user', function(hooks) {
  setupTest(hooks);

  test('it exists', async function(assert) {
    let model = await this.owner.lookup('service:store').createRecord('duke-ds-user');
    assert.ok(!!model);
  });
});
