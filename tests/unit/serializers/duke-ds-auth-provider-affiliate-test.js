import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | duke ds auth provider affiliate', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it serializes records', async function(assert) {
    let record = await this.owner.lookup('service:store').createRecord('duke-ds-auth-provider-affiliate');
    let serializedRecord = record.serialize();
    assert.ok(serializedRecord);
  });
});
