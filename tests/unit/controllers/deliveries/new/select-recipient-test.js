import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('controller:deliveries/new/select-recipient', 'Unit | Controller | deliveries/new/select recipient', {
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it sets expected routes', function(assert) {
  let controller = this.subject({});
  assert.equal(controller.get('backRoute'), 'deliveries.new.select-project');
  assert.equal(controller.get('nextRoute'), 'deliveries.new.enter-user-message');
});

test('it disables next when a toUser is not present', function(assert) {
  const mockDelivery = Ember.Object.create({});
  let controller = this.subject({delivery: mockDelivery});
  assert.ok(controller.get('disableNext'));
  controller.set('toUser', {id:'123'});
  assert.notOk(controller.get('disableNext'));
});

test('it filters out the fromUser from the list of recipients', function(assert) {
  let fromUser = Ember.Object.create({ id: '123', fullName: 'Jane Smith' });
  let allUsers = [
    fromUser,
    Ember.Object.create({ id: '456', fullName: 'John Smith'})
  ];

  let delivery  = Ember.Object.create({
    fromUser: fromUser
  });

  let controller = this.subject({
    model: allUsers,
    delivery: delivery
  });

  assert.equal(controller.get('model.length'), 2);
  assert.equal(controller.get('recipients.length'), 1);
  assert.equal(controller.get('recipients.firstObject.id'), '456');
});

test('it filters out null names and emails from the list of recipients', function(assert) {
  let allUsers = [
    Ember.Object.create({ id: '1', fullName: 'John Smith', email: 'john@smith.org'}),
    Ember.Object.create({ id: '2', fullName: null, email: 'john@smith.org'}),
    Ember.Object.create({ id: '3', fullName: '(null)', email: 'john@smith.org'}),
    Ember.Object.create({ id: '4', fullName: 'John Smith', email: null}),
  ];

  let delivery  = Ember.Object.create({});

  let controller = this.subject({
    model: allUsers,
    delivery: delivery
  });

  assert.equal(controller.get('model.length'), 4);
  assert.equal(controller.get('recipients.length'), 1);
  assert.equal(controller.get('recipients.firstObject.id'), '1');
});


test('it handles toUserSelectionChanged', function(assert) {
  let toUser = Ember.Object.create({ id: '123' });
  let delivery = Ember.Object.create();
  let controller = this.subject({ delivery: delivery });
  controller.send('toUserSelectionChanged', [toUser]);
  assert.equal(controller.get('toUser'), toUser);
});
