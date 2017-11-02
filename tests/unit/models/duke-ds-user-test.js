import { moduleForModel, test } from 'ember-qunit';

moduleForModel('duke-ds-user', 'Unit | Model | duke ds user', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
