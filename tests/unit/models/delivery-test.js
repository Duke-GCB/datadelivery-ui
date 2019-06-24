import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { testRelationships } from '../../helpers/test-relationships';

module('Unit | Model | delivery', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('delivery'));
    // let store = this.store();
    assert.ok(!!model);
  });

  test('it defaults deliveryState to new', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('delivery'));
    const STATE_NEW = 0;
    assert.equal(model.get('deliveryState'), STATE_NEW);
  });

  test('it defaults userMessage to empty string', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('delivery'));
    assert.equal(model.get('deliveryState'), '');
  });

  const relationships = [
    {key: 'project', kind: 'belongsTo', type: 'duke-ds-project'},
    {key: 'fromUser', kind: 'belongsTo', type: 'duke-ds-user'},
    {key: 'toUser', kind: 'belongsTo', type: 'duke-ds-user'}
  ];

  testRelationships('delivery', relationships);

  test('delivery.preview() calls adapter.preview()', function (assert) {
    assert.expect(3);
    const response = EmberObject.create();
    this.owner.lookup('service:store').set('adapterFor', (modelName) => {
      return {
        preview() {
          assert.equal(modelName, 'delivery');
          assert.ok(true);
          return resolve(response);
        }
      };
    });
    let model = run(() => this.owner.lookup('service:store').createRecord('delivery'));
    model.preview().then(preview => {
      assert.equal(preview, response);
    });
  });

  test('delivery.preview() calls adapter.preview() with properties from delivery', function (assert) {
    assert.expect(3);
    const store = this.owner.lookup('service:store');
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
          return resolve({});
        }
      };
    });
    run(() => {
      const fromUser = store.createRecord('duke-ds-user', {id: 'from-123'});
      const toUser = store.createRecord('duke-ds-user', {id: 'to-456'});
      const project = store.createRecord('duke-ds-project', {id: 'project-000'});
      const transfer = store.createRecord('duke-ds-project-transfer', {id: 'transfer-789'});
      const userMessage = 'Hello World';
      const model = run(() => this.owner.lookup('service:store').createRecord('delivery'));
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
    const store = this.owner.lookup('service:store');
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
          return resolve({});
        }
      };
    });
    run(() => {
      const fromUser = store.createRecord('duke-ds-user', {id: 'from-123'});
      const toUser = store.createRecord('duke-ds-user', {id: 'to-456'});
      const project = store.createRecord('duke-ds-project', {id: 'project-000'});
      const userMessage = 'Hello World';
      const model = run(() => this.owner.lookup('service:store').createRecord('delivery'));
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

  test('delivery.cancel() calls adapter.cancel() then updates delivery and transfer', function (assert) {
    assert.expect(7);
    const mockDelivery = {
      cancel: function (deliveryId) {
        assert.step(`Canceled delivery ${deliveryId}`);
        return resolve({});
      },
    };
    const model = run(() => this.owner.lookup('service:store').createRecord('delivery', {
      store: {
        adapterFor: function (modelName) {
          assert.step(`Fetch adapter for ${modelName}`);
          return mockDelivery;
        },
        pushPayload: function (modelName) {
          assert.step(`Pushed updated ${modelName}`);
        },
        peekRecord: function (modelName, modelId) {
          assert.equal(modelName, 'delivery');
          assert.equal(modelId, '123');
        }
      },
      get: function (name) {
        const data = {
          'id': '123',
          'transfer': {
            reload: function () {
              assert.step(`Reloaded transfer`);
            }
          }
        };
        return data[name];
      }
    }));
    run(() => {
      model.cancel();
    });
    assert.verifySteps([
      'Fetch adapter for delivery',
      'Canceled delivery 123',
      'Pushed updated delivery',
      'Reloaded transfer',
    ]);
  });
});
