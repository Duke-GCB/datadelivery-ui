import { moduleForModel, test } from 'ember-qunit';

moduleForModel('duke-ds-auth-provider-affiliate', 'Unit | Serializer | duke ds auth provider affiliate', {
  // Specify the other units that are required for this test.
  needs: ['serializer:duke-ds-auth-provider-affiliate']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
