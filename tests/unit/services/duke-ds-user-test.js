import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

const DukeDSUserStoreStub = Ember.Object.extend({
  queryRecord(modelName) {
    return Ember.RSVP.resolve({
      modelName: modelName,
      username: 'dds111'
    });
  }
});


moduleFor('service:duke-ds-user', 'Unit | Service | duke ds user', {
  needs: ['model:duke-ds-user'],
  beforeEach() {
    this.register('service:store', DukeDSUserStoreStub);
    this.inject.service('store', {as: 'store'});
  }
});

test('it queries duke-ds-users/current-duke-ds-user from the store', function(assert) {
  assert.expect(3);
  let service = this.subject();
  assert.ok(service);
  service.currentDukeDsUser().then(function(user) {
    assert.equal(user.modelName, 'duke-ds-user');
    assert.equal(user.username, 'dds111');
  });
});
