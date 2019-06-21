import { resolve } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const DukeDSUserStoreStub = EmberObject.extend({
  queryRecord(modelName) {
    return resolve({
      modelName: modelName,
      username: 'dds111'
    });
  }
});


module('Unit | Service | duke ds user', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:store', DukeDSUserStoreStub);
    this.store = this.owner.lookup('service:store');
  });

  test('it queries duke-ds-users/current-duke-ds-user from the store', function(assert) {
    assert.expect(3);
    let service = this.owner.lookup('service:duke-ds-user');
    assert.ok(service);
    service.currentDukeDsUser().then(function(user) {
      assert.equal(user.modelName, 'duke-ds-user');
      assert.equal(user.username, 'dds111');
    });
  });
});
