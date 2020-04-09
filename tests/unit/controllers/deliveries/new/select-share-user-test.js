import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Controller | deliveries/new/select-share-user', function(hooks) {
  setupTest(hooks);

  test('it creates excludeUsers based on delivery', async function(assert) {
    let controller = this.owner.lookup('controller:deliveries/new/select-share-user');
    controller.set('delivery', EmberObject.create({
      fromUser: 'joe',
      toUser: 'bob',
      shareUsers: ['tom']
    }));
    const excludeUsers = await controller.get('excludeUsers');
    assert.deepEqual(excludeUsers, ['tom','joe', 'bob']);
  });
});
