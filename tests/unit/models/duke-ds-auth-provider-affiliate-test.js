import { moduleForModel, test } from 'ember-qunit';
import Ember from "ember";

moduleForModel('duke-ds-auth-provider-affiliate', 'Unit | Model | duke ds auth provider affiliate', {
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

test('getOrRegisterUser uses the adapter method, loading and returning a duke-ds-user', function (assert) {
  const mockAdapter = {
    getOrRegisterUser: function(uid) {
      assert.step(`adapter.getOrRegisterUser(${uid})`);
      return Ember.RSVP.resolve({
        'duke-ds-users': {
          id: 'duke-ds-id'
        }
      });
    }
  };

  const model = this.subject({
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
  });

  Ember.run(() => {
    model.getOrRegisterUser();
  });
  assert.verifySteps([
    'store.adapterFor(duke-ds-auth-provider-affiliate)',
    'adapter.getOrRegisterUser(abc123)',
    'store.pushPayload(duke-ds-user)',
    'store.peekRecord(duke-ds-user, duke-ds-id)'
  ]);
});
