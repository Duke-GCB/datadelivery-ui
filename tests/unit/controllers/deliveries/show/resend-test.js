import { moduleFor, test } from 'ember-qunit';
import Ember from "ember";

moduleFor('controller:deliveries/show/resend', 'Unit | Controller | deliveries/show/resend', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it resending delivery transitions to deliveris.show', function(assert) {
  let done = assert.async();
  const delivery = Ember.Object.create({
    transfer: {
      project: {
        name: 'mouse'
      }
    },
  });

  delivery.save = function () {
      return Ember.RSVP.resolve(delivery);
  };

  delivery.send = function (force) {
      assert.equal(force, true);
      return Ember.RSVP.resolve(delivery);
  };

  let controller = this.subject({
    model: delivery,
    transitionToRoute(routeName, object, options) {
      assert.equal(routeName, 'deliveries.show');
      assert.equal(object, delivery);
      assert.equal(options.queryParams.infoMessage, 'Email message resent for delivery of project mouse.');
      done();
    }
  });
  controller.send('resend');
  assert.equal(1, 1);
});
