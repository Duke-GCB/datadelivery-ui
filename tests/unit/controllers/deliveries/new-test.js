import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

const mockUser = Ember.Object.create({id: 23, fullName: 'Michael Jordan', setupForDelivery: true});

const MockApplicationController = Ember.Object.extend({
  currentDukeDsUser: mockUser
});

moduleFor('controller:deliveries/new', 'Unit | Controller | deliveries/new', {
  needs: ['controller:application'],
  beforeEach() {
    this.register('controller:application', MockApplicationController);
    this.inject.controller('application', {as: 'application'});
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it updates delivery.fromUser when currentDukeDsUser changes', function(assert) {
  const newUser = Ember.Object.create({id: 33, fullName: 'Larry Bird', setupForDelivery: true});
  const mockDelivery = Ember.Object.create();
  let controller = this.subject({model: mockDelivery});
  assert.notEqual(mockDelivery.get('fromUser'), newUser);

  const application = controller.get('application');
  application.set('currentDukeDsUser', newUser);
  assert.equal(mockDelivery.get('fromUser'), newUser);
});

test('it updates delivery.fromUser when model changes', function(assert) {
  const mockDelivery = Ember.Object.create();
  let controller = this.subject();
  assert.notEqual(mockDelivery.get('fromUser'), mockUser); // Not yet set
  controller.set('model', mockDelivery);
  assert.equal(mockDelivery.get('fromUser'), mockUser);
});

test('it transitions to setup-instructions when currentUser is not setupForDelivery', function(assert) {
  const newUser = Ember.Object.create({id: 33, fullName: 'Larry Bird', setupForDelivery: false});
  const mockDelivery = Ember.Object.create();
  let controller = this.subject({model: mockDelivery});
  controller.transitionToRoute = (routeName) => {
    assert.equal(routeName, "deliveries.setup-instructions");
  };
  const application = controller.get('application');
  application.set('currentUser', newUser);
});
