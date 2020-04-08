import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | deliveries/new/select recipient', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:deliveries/new/select-recipient');
    assert.ok(controller);
  });

  test('it sets expected routes', function(assert) {
    let controller = this.owner.factoryFor('controller:deliveries/new/select-recipient').create({});
    assert.equal(controller.get('backRoute'), 'deliveries.new.select-project');
    assert.equal(controller.get('nextRoute'), 'deliveries.new.select-share-users');
  });

  test('it disables next when a toUser is not present', function(assert) {
    const mockDelivery = EmberObject.create({});
    let controller = this.owner.factoryFor('controller:deliveries/new/select-recipient').create({delivery: mockDelivery});
    assert.ok(controller.get('disableNext'));
    controller.set('toUser', {id:'123'});
    assert.notOk(controller.get('disableNext'));
  });

  test('it handles affiliateSelected', function(assert) {
    let toUser = EmberObject.create({ id: 'user-123'});
    let delivery = EmberObject.create();
    let controller = this.owner.factoryFor('controller:deliveries/new/select-recipient').create({ delivery: delivery });
    run(() => {
      controller.send('affiliateSelected', toUser);
    });
    run(() => {
      assert.equal(controller.get('toUser'), toUser);
    });
  });

  test('it excludes fromUser', function(assert) {
    let fromUser = EmberObject.create({ id: 'user-123'});
    let delivery = EmberObject.create({fromUser: fromUser});
    let controller = this.owner.factoryFor('controller:deliveries/new/select-recipient').create({ delivery: delivery });
    assert.deepEqual(controller.get('excludeUsers'), [fromUser])
  });
});
