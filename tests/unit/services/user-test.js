import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const UserStoreStub = {
  queryRecord(modelName) {
    return resolve({
      modelName: modelName,
      username: 'abc123'
    });
  }
};

module('Unit | Service | user', function(hooks) {
  setupTest(hooks);

  test('it queries users/current-user from the store', function(assert) {
    assert.expect(3);
    let service = this.owner.factoryFor('service:user').create({store: UserStoreStub});

    assert.ok(service);
    service.currentUser().then(function(user) {
      assert.equal(user.modelName, 'user');
      assert.equal(user.username, 'abc123');
    });
  });
});
