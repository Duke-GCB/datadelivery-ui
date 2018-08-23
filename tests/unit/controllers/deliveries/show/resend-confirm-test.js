import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('controller:deliveries/show/resend-confirm', 'Unit | Controller | deliveries/show/resend confirm', {
  needs: ['controller:application']
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it transitions to deliveries.show after resend', function(assert) {
  let done = assert.async();
  const delivery = Ember.Object.create({});
  const transfer = Ember.Object.create({
    project: {
      name: 'mouse'
    },
    delivery: Ember.RSVP.resolve(delivery)
  });
  delivery.set('transfer', transfer);
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

test('when save fails with 500 the message is added to errorMessages', function(assert) {
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

test('when save fails due to missing delivery the message is added to errorMessages', function(assert) {
  const transfer = Ember.Object.create({
    project: {
      name: 'mouse'
    },
    delivery: Ember.RSVP.resolve(null)
  });

  let controller = this.subject({
    model: transfer
  });
  Ember.run(() => {
    controller.send('resend');
  });
  Ember.run(() => {
    assert.deepEqual(controller.get('errorMessages'), ['Delivery not found.']);
  });
});
