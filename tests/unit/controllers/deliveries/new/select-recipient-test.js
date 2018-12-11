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
