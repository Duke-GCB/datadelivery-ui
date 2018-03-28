import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('controller:deliveries/show/resend', 'Unit | Controller | deliveries/show/resend', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it resending delivery transitions to deliveries.show', function(assert) {
  let done = assert.async();
  const delivery = Ember.Object.create({});
  const transfer = Ember.Object.create({
    project: {
        name: 'mouse'
    },
    delivery: Ember.RSVP.resolve(delivery)
  });

  delivery.save = function () {
      return Ember.RSVP.resolve(delivery);
  };

  delivery.send = function (force) {
      assert.equal(force, true);
      return Ember.RSVP.resolve(delivery);
  };

  let controller = this.subject({
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
  const mockError = Ember.Object.create({
      status: 400,
      detail: 'Error saving delivery.'
  });
  const delivery = Ember.Object.create({});
  const transfer = Ember.Object.create({
    project: {
      name: 'mouse'
    },
    delivery: Ember.RSVP.resolve(delivery)
  });

  delivery.save = function () {
    return Ember.RSVP.reject({errors: [mockError]});
  };

  let controller = this.subject({
    model: transfer
  });

  Ember.run(() => {
    controller.send('resend');
  });
  Ember.run(() => {
    assert.deepEqual(controller.get('errorMessages'), ['Error saving delivery.']);
  });
});

test('when save fails the message is added to errorMessages', function(assert) {
  const mockError = Ember.Object.create({
    status: 500,
    detail: 'Sending service is down.'
  });
  const delivery = Ember.Object.create({});
  const transfer = Ember.Object.create({
    project: {
      name: 'mouse'
    },
    delivery: Ember.RSVP.resolve(delivery)
  });

  delivery.save = function () {
    return Ember.RSVP.resolve(delivery);
  };

  delivery.send = function () {
    return Ember.RSVP.reject({errors: [mockError]});
  };

  let controller = this.subject({
    model: transfer
  });
  Ember.run(() => {
    controller.send('resend');
  });
  Ember.run(() => {
    assert.deepEqual(controller.get('errorMessages'), ['Sending service is down.']);
  });
});
