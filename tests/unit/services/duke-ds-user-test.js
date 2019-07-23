import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const DukeDSUserStoreStub = {
  queryRecord(modelName) {
    return resolve({
      modelName: modelName,
      username: 'dds111'
    });
  }
};

module('Unit | Service | duke ds user', function(hooks) {
  setupTest(hooks);

  test('it queries duke-ds-users/current-duke-ds-user from the store', function(assert) {
    assert.expect(3);
    let service = this.owner.factoryFor('service:duke-ds-user').create({store: DukeDSUserStoreStub});
    assert.ok(service);
    service.currentDukeDsUser().then(function(user) {
      assert.equal(user.modelName, 'duke-ds-user');
      assert.equal(user.username, 'dds111');
    });
  });
});
