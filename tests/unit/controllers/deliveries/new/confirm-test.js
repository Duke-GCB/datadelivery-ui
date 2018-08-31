import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('controller:deliveries/new/confirm', 'Unit | Controller | deliveries/new/confirm', {
  needs: ['controller:application', 'service:duke-ds-user', 'service:session']
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it handles saveAndSend action', function(assert) {
  assert.expect(1);
  let controller = this.subject({
    processSaveAndSend() {
      assert.ok(true);
    }
  });
  controller.send('saveAndSend');
});

test('it handles previewFailed action', function(assert) {
  assert.expect(1);
  let controller = this.subject({
    actionDidFail(error) {
      assert.equal(error, 'Some Error');
    }
  });
  controller.send('previewFailed', 'Some Error');
});

test('calling processSaveAndSend() saves, sends, and redirects', function(assert) {
  const mockTransfer = Ember.Object.create({id: 'transfer-id'})
  const mockDelivery = Ember.Object.create({
    project: Ember.Object.create({ name: 'My-Project'}),
    transfer: mockTransfer,
    save() {
      assert.step('save');
      return Ember.RSVP.resolve(this);
    },
    send() {
      assert.step('send');
      return Ember.RSVP.resolve(this);
    }
  });

  const controller = this.subject({
    willPerformAction() { assert.step('willPerform')},
    didPerformAction() { assert.step('didPerform')},
    actionDidFail() { assert.step('fail'); },
    transitionToRoute(routeName, model, params) {
      assert.step('transition');
      assert.equal(routeName, 'deliveries.show');
      assert.equal(model, mockTransfer);
      assert.equal(params.queryParams.infoMessage, 'Sent delivery notification for project My-Project.');
    }
  });
  controller.set('delivery', mockDelivery);
  Ember.run(() => {
    controller.processSaveAndSend();
  });
  assert.verifySteps(['willPerform','save','send','didPerform','transition']);
});

test('it stops if save() fails', function(assert) {
  const mockDelivery = Ember.Object.create({
    save() {
      assert.step('save');
      return Ember.RSVP.reject(this);
    },
    send() {
      assert.step('send');
      return Ember.RSVP.resolve(this);
    }
  });

  const controller = this.subject({
    willPerformAction() { assert.step('willPerform')},
    didPerformAction() { assert.step('didPerform')},
    actionDidFail() { assert.step('fail'); },
    transitionToRoute() {
      assert.step('transition');
    }
  });
  controller.set('delivery', mockDelivery);
  Ember.run(() => {
    controller.processSaveAndSend();
  });
  assert.verifySteps(['willPerform','save','fail']);
});

test('it stops if send() fails', function(assert) {
  const mockDelivery = Ember.Object.create({
    save() {
      assert.step('save');
      return Ember.RSVP.resolve(this);
    },
    send() {
      assert.step('send');
      return Ember.RSVP.reject(this);
    }
  });

  const controller = this.subject({
    willPerformAction() { assert.step('willPerform')},
    didPerformAction() { assert.step('didPerform')},
    actionDidFail() { assert.step('fail'); },
    transitionToRoute() {
      assert.step('transition');
    }
  });
  controller.set('delivery', mockDelivery);
  Ember.run(() => {
    controller.processSaveAndSend();
  });
  assert.verifySteps(['willPerform','save','send','fail']);
});
