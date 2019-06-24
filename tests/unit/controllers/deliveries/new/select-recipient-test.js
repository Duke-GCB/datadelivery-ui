import { run } from '@ember/runloop';
import { resolve } from 'rsvp';
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
    assert.equal(controller.get('nextRoute'), 'deliveries.new.enter-user-message');
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
    let affiliate = EmberObject.create({
      uid: 'affiliate-123',
      getOrRegisterUser() {
        return resolve(toUser);
      }
    });
    let delivery = EmberObject.create();
    let controller = this.owner.factoryFor('controller:deliveries/new/select-recipient').create({ delivery: delivery });
    run(() => {
      controller.send('affiliateSelected', [affiliate]);
    });
    run(() => {
      assert.equal(controller.get('toUser'), toUser);
    });

  });
});
