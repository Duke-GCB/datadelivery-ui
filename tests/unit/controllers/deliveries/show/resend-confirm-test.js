import { run } from '@ember/runloop';
import { resolve, reject } from 'rsvp';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | deliveries/show/resend confirm', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:deliveries/show/resend-confirm');
    assert.ok(controller);
  });

  test('it transitions to deliveries.show after resend', function(assert) {
    let done = assert.async();
    const delivery = EmberObject.create({});
    const transfer = EmberObject.create({
      project: {
        name: 'mouse'
      },
      delivery: resolve(delivery)
    });
    delivery.set('transfer', transfer);
    delivery.save = function () {
      return resolve(delivery);
    };

    delivery.send = function (force) {
      assert.equal(force, true);
      return resolve(delivery);
    };

    let controller = this.owner.factoryFor('controller:deliveries/show/resend-confirm').create({
      model: transfer,
      transitionToRoute(routeName, object, options) {
        assert.equal(routeName, 'deliveries.show');
        assert.equal(object, transfer);
        assert.equal(options.queryParams.infoMessage, 'Email message resent for delivery of project mouse.');
        done();
      }
    });
    controller.send('resend');
  });

  test('when save fails the message is added to errorMessages', function(assert) {
    const mockError = EmberObject.create({
      status: 400,
      detail: 'Error saving delivery.'
    });
    const delivery = EmberObject.create({});
    const transfer = EmberObject.create({
      project: {
        name: 'mouse'
      },
      delivery: resolve(delivery)
    });

    delivery.save = function () {
      return reject({errors: [mockError]});
    };

    let controller = this.owner.factoryFor('controller:deliveries/show/resend-confirm').create({
      model: transfer
    });

    run(() => {
      controller.send('resend');
    });
    run(() => {
      assert.deepEqual(controller.get('errorMessages'), ['Error saving delivery.']);
    });
  });

  test('when save fails with 500 the message is added to errorMessages', function(assert) {
    const mockError = EmberObject.create({
      status: 500,
      detail: 'Sending service is down.'
    });
    const delivery = EmberObject.create({});
    const transfer = EmberObject.create({
      project: {
        name: 'mouse'
      },
      delivery: resolve(delivery)
    });

    delivery.save = function () {
      return resolve(delivery);
    };

    delivery.send = function () {
      return reject({errors: [mockError]});
    };

    let controller = this.owner.factoryFor('controller:deliveries/show/resend-confirm').create({
      model: transfer
    });
    run(() => {
      controller.send('resend');
    });
    run(() => {
      assert.deepEqual(controller.get('errorMessages'), ['Sending service is down.']);
    });
  });

  test('when save fails due to missing delivery the message is added to errorMessages', function(assert) {
    const transfer = EmberObject.create({
      project: {
        name: 'mouse'
      },
      delivery: resolve(null)
    });

    let controller = this.owner.factoryFor('controller:deliveries/show/resend-confirm').create({
      model: transfer
    });
    run(() => {
      controller.send('resend');
    });
    run(() => {
      assert.deepEqual(controller.get('errorMessages'), ['Delivery not found.']);
    });
  });
});
