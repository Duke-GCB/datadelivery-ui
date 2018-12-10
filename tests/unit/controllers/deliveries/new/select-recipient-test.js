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

test('it filters out the fromUser from the list of affiliates', function(assert) {
  let fromUser = Ember.Object.create({ id: 'user-123', username: 'affiliate-123' });
  let affiliates  = [
    Ember.Object.create({ uid: 'affiliate-123'}),
    Ember.Object.create({ uid: 'affiliate-456'})
  ];

  let delivery  = Ember.Object.create({
    fromUser: fromUser
  });

  let controller = this.subject({
    affiliates: affiliates,
    delivery: delivery
  });

  assert.equal(controller.get('affiliates.length'), 2);
  assert.equal(controller.get('filteredAffiliates.length'), 1);
  assert.equal(controller.get('filteredAffiliates.firstObject.uid'), 'affiliate-456');
});

test('it filters out null names and emails from the list of recipients', function(assert) {
  let affiliates = [
    Ember.Object.create({ uid: '1', fullName: 'John Smith', email: 'john@smith.org'}),
    Ember.Object.create({ uid: '2', fullName: null, email: 'john@smith.org'}),
    Ember.Object.create({ uid: '3', fullName: '(null)', email: 'john@smith.org'}),
    Ember.Object.create({ uid: '4', fullName: 'John Smith', email: null}),
  ];

  let delivery  = Ember.Object.create({});

  let controller = this.subject({
    affiliates: affiliates,
    delivery: delivery
  });

  assert.equal(controller.get('affiliates.length'), 4);
  assert.equal(controller.get('filteredAffiliates.length'), 1);
  assert.equal(controller.get('filteredAffiliates.firstObject.uid'), '1');
});


test('it handles affiliateSelected', function(assert) {
  let toUser = Ember.Object.create({ id: 'user-123'});
  let affiliate = Ember.Object.create({
    uid: 'affiliate-123',
    getOrRegisterUser() {
      return Ember.RSVP.resolve(toUser);
    }
  });
  let delivery = Ember.Object.create();
  let controller = this.subject({ delivery: delivery });
  Ember.run(() => {
    controller.send('affiliateSelected', [affiliate]);
  });
  Ember.run(() => {
    assert.equal(controller.get('toUser'), toUser);
  });

});
