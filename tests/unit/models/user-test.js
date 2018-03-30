import { moduleForModel, test } from 'ember-qunit';
import { testRelationships } from '../../helpers/test-relationships';

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: ['model:duke-ds-user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

const relationships = [
  {key: 'dukeDsUser', kind: 'belongsTo', type: 'duke-ds-user'},
];

testRelationships('user', relationships);
