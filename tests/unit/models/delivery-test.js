import { moduleForModel, test } from 'ember-qunit';
import { testRelationships } from '../../helpers/test-relationships';

moduleForModel('delivery', 'Unit | Model | delivery', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});



const relationships = [
  {key: 'project', kind: 'belongsTo', type: 'duke-ds-project'},
  {key: 'fromUser', kind: 'belongsTo', type: 'duke-ds-user'},
  {key: 'toUser', kind: 'belongsTo', type: 'duke-ds-user'}
];

testRelationships('delivery', relationships);
