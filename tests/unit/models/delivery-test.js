import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { testRelationships } from '../../helpers/test-relationships';
import { settled } from '@ember/test-helpers';

module('Unit | Model | delivery', function(hooks) {
  setupTest(hooks);
  let store, deliveryAdapter;
  hooks.beforeEach(function() {
    let { owner } = this;
    store = owner.lookup('service:store');
    deliveryAdapter = store.adapterFor('delivery');
  });

  test('it exists', function(assert) {
    let model = store.createRecord('delivery');
    assert.ok(!!model);
  });

  test('it defaults state to new', function(assert) {
    let model = store.createRecord('delivery');
    const STATE_NEW = 0;
    assert.equal(model.get('state'), STATE_NEW);
  });

  test('it defaults userMessage to empty string', function(assert) {
    let model = store.createRecord('delivery');
    assert.equal(model.get('state'), '');
  });

  const relationships = [
    {key: 'project', kind: 'belongsTo', type: 'duke-ds-project'},
    {key: 'fromUser', kind: 'belongsTo', type: 'duke-ds-user'},
    {key: 'toUser', kind: 'belongsTo', type: 'duke-ds-user'}
  ];

  testRelationships('delivery', relationships);

  test('delivery.preview() calls adapter.preview()', async function (assert) {
    assert.expect(2);
    const response = EmberObject.create();
    deliveryAdapter.preview = () => {
      assert.ok(true);
      return resolve(response);
    };
    let model = store.createRecord('delivery');

    const preview = await model.preview();
    assert.equal(preview, response);
  });

  test('delivery.preview() calls adapter.preview() with properties from delivery', async function (assert) {
    assert.expect(2);
    const fromUser = store.push({data: {type: 'duke-ds-user', id: 'from-123'}});
    const toUser = store.push({data: {type: 'duke-ds-user', id: 'to-456'}});
    const project = store.push({data: {type: 'duke-ds-project', id: 'project-000'}});
    const transfer = store.push({data: {type: 'duke-ds-project-transfer', id: 'transfer-789'}});
    const emailTemplateSet = store.push({data: {type: 'email-template-set', id: 'ets-789'}});
    const userMessage = 'Hello World';
    const model = store.createRecord('delivery', {
      fromUser: fromUser,
      toUser: toUser,
      project: project,
      transfer: transfer,
      userMessage: userMessage,
      emailTemplateSet: emailTemplateSet
    });
    deliveryAdapter.preview = function(details) {
      assert.deepEqual(details, {
        from_user_id: 'from-123',
        to_user_id: 'to-456',
        transfer_id: 'transfer-789',
        project_id: 'project-000',
        user_message: 'Hello World',
        email_template_set_id: 'ets-789'
      });
      return resolve({});
    };
    const preview = await model.preview();
    assert.ok(preview);
  });

  test('delivery.preview() calls adapter.preview() with empty transfer id if not yet set', async function (assert) {
    assert.expect(2);
    const fromUser = store.push({data: {type: 'duke-ds-user', id: 'from-123'}});
    const toUser = store.push({data: {type: 'duke-ds-user', id: 'to-456'}});
    const project = store.push({data: {type: 'duke-ds-project', id: 'project-000'}});
    const emailTemplateSet = store.push({data: {type: 'email-template-set', id: 'ets-789'}});
    const userMessage = 'Hello World';
    const model = store.createRecord('delivery', {
      fromUser: fromUser,
      toUser: toUser,
      project: project,
      userMessage: userMessage,
      emailTemplateSet: emailTemplateSet
    });
    deliveryAdapter.preview = (details) => {
      assert.deepEqual(details, {
        from_user_id: 'from-123',
        to_user_id: 'to-456',
        transfer_id: '',
        project_id: 'project-000',
        user_message: 'Hello World',
        email_template_set_id: 'ets-789'
      });
      return resolve({});
    };
    const preview = await model.preview();
    assert.ok(preview);
  });

  test('delivery.cancel() calls adapter.cancel() then updates delivery and transfer', async function (assert) {
    assert.expect(7);
    const mockDelivery = {
      cancel: function (deliveryId) {
        assert.step(`Canceled delivery ${deliveryId}`);
        return resolve({});
      },
    };
    const model = store.createRecord('delivery');
    model.set('store', {
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
      },
    });
    model.set('get', function (name) {
      const data = {
        'id': '123',
        'transfer': {
          reload: function () {
            assert.step(`Reloaded transfer`);
          }
        }
      };
      return data[name];
    });
    await model.cancel();
    await settled();
    assert.verifySteps([
      'Fetch adapter for delivery',
      'Canceled delivery 123',
      'Pushed updated delivery',
      'Reloaded transfer',
    ]);
  });
});
