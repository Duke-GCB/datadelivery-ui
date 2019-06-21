import { run } from '@ember/runloop';
import { resolve, reject } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | deliveries/new/confirm', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:deliveries/new/confirm');
    assert.ok(controller);
  });

  test('it handles saveAndSend action', function(assert) {
    assert.expect(1);
    let controller = this.owner.factoryFor('controller:deliveries/new/confirm').create({
      processSaveAndSend() {
        assert.ok(true);
      }
    });
    controller.send('saveAndSend');
  });

  test('it handles previewFailed action', function(assert) {
    assert.expect(1);
    let controller = this.owner.factoryFor('controller:deliveries/new/confirm').create({
      actionDidFail(error) {
        assert.equal(error, 'Some Error');
      }
    });
    controller.send('previewFailed', 'Some Error');
  });

  test('calling processSaveAndSend() saves, sends, and redirects', function(assert) {
    const mockTransfer = EmberObject.create({id: 'transfer-id'})
    const mockDelivery = EmberObject.create({
      project: EmberObject.create({ name: 'My-Project'}),
      transfer: mockTransfer,
      save() {
        assert.step('save');
        return resolve(this);
      },
      send() {
        assert.step('send');
        return resolve(this);
      }
    });

    const controller = this.owner.factoryFor('controller:deliveries/new/confirm').create({
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
    run(() => {
      controller.processSaveAndSend();
    });
    assert.verifySteps(['willPerform','save','send','didPerform','transition']);
  });

  test('it stops if save() fails', function(assert) {
    const mockDelivery = EmberObject.create({
      save() {
        assert.step('save');
        return reject(this);
      },
      send() {
        assert.step('send');
        return resolve(this);
      }
    });

    const controller = this.owner.factoryFor('controller:deliveries/new/confirm').create({
      willPerformAction() { assert.step('willPerform')},
      didPerformAction() { assert.step('didPerform')},
      actionDidFail() { assert.step('fail'); },
      transitionToRoute() {
        assert.step('transition');
      }
    });
    controller.set('delivery', mockDelivery);
    run(() => {
      controller.processSaveAndSend();
    });
    assert.verifySteps(['willPerform','save','fail']);
  });

  test('it stops if send() fails', function(assert) {
    const mockDelivery = EmberObject.create({
      save() {
        assert.step('save');
        return resolve(this);
      },
      send() {
        assert.step('send');
        return reject(this);
      }
    });

    const controller = this.owner.factoryFor('controller:deliveries/new/confirm').create({
      willPerformAction() { assert.step('willPerform')},
      didPerformAction() { assert.step('didPerform')},
      actionDidFail() { assert.step('fail'); },
      transitionToRoute() {
        assert.step('transition');
      }
    });
    controller.set('delivery', mockDelivery);
    run(() => {
      controller.processSaveAndSend();
    });
    assert.verifySteps(['willPerform','save','send','fail']);
  });
});
