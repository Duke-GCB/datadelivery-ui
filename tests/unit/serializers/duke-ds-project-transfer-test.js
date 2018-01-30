import { moduleForModel, test } from 'ember-qunit';

moduleForModel('duke-ds-project-transfer', 'Unit | Serializer | duke ds project transfer', {
  // Specify the other units that are required for this test.
  needs: ['serializer:duke-ds-project-transfer', 'model:duke-ds-user', 'model:duke-ds-project']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
