import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const mockUser = EmberObject.create({id: 23, fullName: 'Michael Jordan', setupForDelivery: true});

const MockApplicationController = EmberObject.extend({
  currentDukeDsUser: mockUser
});

module('Unit | Controller | deliveries/new', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('controller:application', MockApplicationController);
    this.application = this.owner.lookup('controller:application');
  });

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:deliveries/new');
    assert.ok(controller);
  });

  test('it updates delivery.fromUser when currentDukeDsUser changes', function(assert) {
    const newUser = EmberObject.create({id: 33, fullName: 'Larry Bird', setupForDelivery: true});
    const mockDelivery = EmberObject.create();
    let controller = this.owner.factoryFor('controller:deliveries/new').create({model: mockDelivery});
    assert.notEqual(mockDelivery.get('fromUser'), newUser);

    const application = controller.get('application');
    application.set('currentDukeDsUser', newUser);
    assert.equal(mockDelivery.get('fromUser'), newUser);
  });

  test('it updates delivery.fromUser when model changes', function(assert) {
    const mockDelivery = EmberObject.create();
    let controller = this.owner.lookup('controller:deliveries/new');
    assert.notEqual(mockDelivery.get('fromUser'), mockUser); // Not yet set
    controller.set('model', mockDelivery);
    assert.equal(mockDelivery.get('fromUser'), mockUser);
  });

  test('it transitions to setup-instructions when currentUser is not setupForDelivery', function(assert) {
    const newUser = EmberObject.create({id: 33, fullName: 'Larry Bird', setupForDelivery: false});
    const mockDelivery = EmberObject.create();
    let controller = this.owner.factoryFor('controller:deliveries/new').create({model: mockDelivery});
    controller.transitionToRoute = (routeName) => {
      assert.equal(routeName, "deliveries.setup-instructions");
    };
    const application = controller.get('application');
    application.set('currentUser', newUser);
  });
});
