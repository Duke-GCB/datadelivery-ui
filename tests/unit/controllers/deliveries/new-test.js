import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

const mockUser = EmberObject.create({id: 23, fullName: 'Michael Jordan', setupForDelivery: true});

module('Unit | Controller | deliveries/new', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:deliveries/new');
    assert.ok(controller);
  });

  test('it updates delivery.fromUser when currentDukeDsUser changes', async function(assert) {
    const newUser = EmberObject.create({id: 33, fullName: 'Larry Bird', setupForDelivery: true});
    const mockDelivery = EmberObject.create();
    let controller = this.owner.lookup('controller:deliveries/new');
    controller.set('model', mockDelivery);
    assert.notEqual(mockDelivery.get('fromUser'), newUser);

    const application = controller.get('application');
    application.set('currentDukeDsUser', newUser);
    await settled();
    assert.equal(mockDelivery.get('fromUser'), newUser);
  });

  test('it updates delivery.fromUser when model changes', async function(assert) {
    const mockDelivery = EmberObject.create();
    let controller = this.owner.lookup('controller:deliveries/new');
    const application = controller.get('application');
    application.set('currentDukeDsUser', mockUser);
    await settled();
    assert.notEqual(mockDelivery.get('fromUser'), mockUser); // Not yet set
    controller.set('model', mockDelivery);
    await settled();
    assert.equal(mockDelivery.get('fromUser'), mockUser);
  });

  test('it transitions to setup-instructions when currentUser is not setupForDelivery', async function(assert) {
    const newUser = EmberObject.create({id: 33, fullName: 'Larry Bird', setupForDelivery: false});
    const mockDelivery = EmberObject.create();
    let controller = this.owner.factoryFor('controller:deliveries/new').create({model: mockDelivery});
    controller.transitionToRoute = (routeName) => {
      assert.equal(routeName, "deliveries.setup-instructions");
    };
    const application = controller.get('application');
    application.set('currentUser', newUser);
    await settled();
  });
});
