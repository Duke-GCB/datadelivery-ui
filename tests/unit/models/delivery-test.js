import { moduleForModel, test } from 'ember-qunit';
import { testRelationships } from '../../helpers/test-relationships';
import Ember from 'ember';

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

test('delivery.preview() calls adapter.preview()', function (assert) {
  assert.expect(3);
  const response = Ember.Object.create();
  this.store().set('adapterFor', (modelName) => {
    return {
      preview() {
        assert.equal(modelName, 'delivery');
        assert.ok(true);
        return Ember.RSVP.resolve(response);
      }
    }
  });
  let model = this.subject();
  model.preview().then(preview => {
    assert.equal(preview, response);
  });
});

test('delivery.preview() calls adapter.preview() with properties from delivery', function (assert) {
  assert.expect(3);
  const store = this.store();
  store.set('adapterFor', (modelName) => {
    return {
      preview(details) {
        assert.equal(modelName, 'delivery');
        assert.deepEqual(details, {
          from_user_id: 'from-123',
          to_user_id: 'to-456',
          transfer_id: 'transfer-789',
          project_id: 'project-000',
          user_message: 'Hello World'
        });
        return Ember.RSVP.resolve({});
      }
    }
  });
  Ember.run(() => {
    const fromUser = store.createRecord('duke-ds-user', {id: 'from-123'});
    const toUser = store.createRecord('duke-ds-user', {id: 'to-456'});
    const project = store.createRecord('duke-ds-project', {id: 'project-000'});
    const transfer = store.createRecord('duke-ds-project-transfer', {id: 'transfer-789'});
    const userMessage = 'Hello World';
    const model = this.subject();
    model.setProperties({
      fromUser: fromUser,
      toUser: toUser,
      project: project,
      transfer: transfer,
      userMessage: userMessage
    });
    model.preview().then(preview => {
      assert.ok(preview);
    });
  });
});

test('delivery.preview() calls adapter.preview() with empty transfer id if not yet set', function (assert) {
  assert.expect(3);
  const store = this.store();
  store.set('adapterFor', (modelName) => {
    return {
      preview(details) {
        assert.equal(modelName, 'delivery');
        assert.deepEqual(details, {
          from_user_id: 'from-123',
          to_user_id: 'to-456',
          transfer_id: '',
          project_id: 'project-000',
          user_message: 'Hello World'
        });
        return Ember.RSVP.resolve({});
      }
    }
  });
  Ember.run(() => {
    const fromUser = store.createRecord('duke-ds-user', {id: 'from-123'});
    const toUser = store.createRecord('duke-ds-user', {id: 'to-456'});
    const project = store.createRecord('duke-ds-project', {id: 'project-000'});
    const userMessage = 'Hello World';
    const model = this.subject();
    model.setProperties({
      fromUser: fromUser,
      toUser: toUser,
      project: project,
      userMessage: userMessage
    });
    model.preview().then(preview => {
      assert.ok(preview);
    });
  });
});
