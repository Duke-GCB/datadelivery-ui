import { moduleForModel, test } from 'ember-qunit';

moduleForModel('duke-ds-project-transfer', 'Unit | Model | duke ds project transfer', {
  // Specify the other units that are required for this test.
  needs: [
    'model:duke-ds-project',
    'model:duke-ds-user',
    'model:delivery'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
