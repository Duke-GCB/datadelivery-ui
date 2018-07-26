import { moduleForModel, test } from 'ember-qunit';
import { testRelationships } from '../../helpers/test-relationships';

moduleForModel('delivery', 'Unit | Model | delivery', {
  // Specify the other units that are required for this test.
  needs: [
    'model:duke-ds-project',
    'model:duke-ds-user',
    'model:duke-ds-project-transfer'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it defaults state to new', function(assert) {
  let model = this.subject();
  const STATE_NEW = 0;
  assert.equal(model.get('state'), STATE_NEW);
});

const relationships = [
  {key: 'project', kind: 'belongsTo', type: 'duke-ds-project'},
  {key: 'fromUser', kind: 'belongsTo', type: 'duke-ds-user'},
  {key: 'toUser', kind: 'belongsTo', type: 'duke-ds-user'}
];

testRelationships('delivery', relationships);
