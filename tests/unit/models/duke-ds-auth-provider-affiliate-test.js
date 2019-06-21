import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | duke ds auth provider affiliate', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('duke-ds-auth-provider-affiliate'));
    assert.ok(!!model);
  });

  test('getOrRegisterUser uses the adapter method, loading and returning a duke-ds-user', function (assert) {
    const mockAdapter = {
      getOrRegisterUser: function(uid) {
        assert.step(`adapter.getOrRegisterUser(${uid})`);
        return resolve({
          'duke-ds-users': {
            id: 'duke-ds-id'
          }
        });
      }
    };

    const model = run(() => this.owner.lookup('service:store').createRecord('duke-ds-auth-provider-affiliate', {
      uid: 'abc123',
      store: {
        adapterFor: function(modelName) {
          assert.step(`store.adapterFor(${modelName})`);
          return mockAdapter;
        },
        pushPayload: function (modelName) {
          assert.step(`store.pushPayload(${modelName})`);
        },
        peekRecord: function (modelName, modelId) {
          assert.step(`store.peekRecord(${modelName}, ${modelId})`);
        }
      }
    }));

    run(() => {
      model.getOrRegisterUser();
    });
    assert.verifySteps([
      'store.adapterFor(duke-ds-auth-provider-affiliate)',
      'adapter.getOrRegisterUser(abc123)',
      'store.pushPayload(duke-ds-user)',
      'store.peekRecord(duke-ds-user, duke-ds-id)'
    ]);
  });
});
